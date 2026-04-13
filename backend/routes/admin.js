const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// ─── Admin Login ──────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: admin._id, email: admin.email, role: 'admin' } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Dashboard Stats (task 11) ────────────────────────────────────────────────
router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    // Total revenue from confirmed bookings
    const revenueResult = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Room occupancy per room type
    const rooms = await Room.find({}, 'roomType totalRooms bookedRooms');
    const occupancy = rooms.map(r => ({
      roomType: r.roomType,
      totalRooms: r.totalRooms,
      bookedRooms: r.bookedRooms,
      availableRooms: r.totalRooms - r.bookedRooms,
      occupancyPercent: r.totalRooms > 0
        ? Math.round((r.bookedRooms / r.totalRooms) * 100)
        : 0
    }));

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .populate('room', 'roomType')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      bookings: {
        total: totalBookings,
        confirmed: confirmedBookings,
        pending: pendingBookings,
        cancelled: cancelledBookings
      },
      totalRevenue,
      occupancy,
      recentBookings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── List users (admin) ───────────────────────────────────────────────────────
router.get('/users', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));
    res.json({
      users,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)) || 1,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Create user (admin) ─────────────────────────────────────────────────────
router.post(
  '/users',
  auth,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['user', 'admin']),
    body('phone').optional(),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, password, phone = '', role = 'user' } = req.body;
      const existing = await User.findOne({ email: email.trim().toLowerCase() });
      if (existing) return res.status(400).json({ error: 'Email already registered' });
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hash,
        phone: String(phone || '').trim(),
        role,
      });
      const safe = await User.findById(user._id).select('-password');
      res.status(201).json(safe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Update user (admin) ─────────────────────────────────────────────────────
router.put(
  '/users/:id',
  auth,
  [
    body('name').optional().trim().notEmpty(),
    body('phone').optional(),
    body('role').optional().isIn(['user', 'admin']),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, phone, role, password } = req.body;
      if (name === undefined && phone === undefined && role === undefined && password === undefined) {
        return res.status(400).json({ error: 'No fields to update' });
      }
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (name !== undefined) user.name = name.trim();
      if (phone !== undefined) user.phone = String(phone).trim();
      if (role !== undefined) user.role = role;
      if (password) user.password = await bcrypt.hash(password, 10);
      await user.save();
      const safe = await User.findById(user._id).select('-password');
      res.json(safe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Delete user (admin) ─────────────────────────────────────────────────────
router.delete('/users/:id', auth, async (req, res) => {
  try {
    if (req.auth.id.toString() === req.params.id) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;