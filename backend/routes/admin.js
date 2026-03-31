const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// ─── Admin Login ──────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Dashboard Stats (task 11) ────────────────────────────────────────────────
router.get('/dashboard', auth, async (req, res) => {
  try {
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

module.exports = router;