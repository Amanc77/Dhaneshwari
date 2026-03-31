const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const userAuth = require('../middleware/userAuth');

// ─── Validation helper ────────────────────────────────────────────────────────
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// ─── Email Transporter ────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const sendBookingConfirmation = async (booking, room) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: booking.guestEmail,
    subject: 'Dhaneshwari - Booking Confirmation',
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Dear ${booking.guestName},</p>
      <p>Your booking has been received successfully.</p>
      <table>
        <tr><td><b>Room:</b></td><td>${room.roomType}</td></tr>
        <tr><td><b>Check-in:</b></td><td>${new Date(booking.checkIn).toDateString()}</td></tr>
        <tr><td><b>Check-out:</b></td><td>${new Date(booking.checkOut).toDateString()}</td></tr>
        <tr><td><b>Total Amount:</b></td><td>₹${booking.totalAmount}</td></tr>
        <tr><td><b>Status:</b></td><td>${booking.status}</td></tr>
      </table>
      <p>We look forward to hosting you at Dhaneshwari!</p>
    `
  });
};

// ─── Check availability ───────────────────────────────────────────────────────
router.post('/check-availability',
  [
    body('roomId').notEmpty().withMessage('Room ID is required'),
    body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
    body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  ],
  validate,
  async (req, res) => {
    try {
      const { roomId, checkIn, checkOut } = req.body;
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ error: 'Room not found' });

      const overlappingBookings = await Booking.countDocuments({
        room: roomId,
        status: { $ne: 'cancelled' },
        $or: [{ checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }]
      });

      const available = overlappingBookings < room.totalRooms;
      res.json({ available, remainingRooms: room.totalRooms - overlappingBookings });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Create booking ───────────────────────────────────────────────────────────
router.post('/',
  [
    body('guestName').trim().notEmpty().withMessage('Guest name is required'),
    body('guestEmail').isEmail().withMessage('Valid guest email is required'),
    body('room').notEmpty().withMessage('Room ID is required'),
    body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
    body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  ],
  validate,
  async (req, res) => {
    try {
      const room = await Room.findById(req.body.room);
      if (!room) return res.status(404).json({ error: 'Room not found' });

      const overlappingBookings = await Booking.countDocuments({
        room: req.body.room,
        status: { $ne: 'cancelled' },
        $or: [{ checkIn: { $lt: new Date(req.body.checkOut) }, checkOut: { $gt: new Date(req.body.checkIn) } }]
      });

      if (overlappingBookings >= room.totalRooms) {
        return res.status(400).json({ error: 'No rooms available for selected dates' });
      }

      const booking = new Booking(req.body);
      await booking.save();

      room.bookedRooms += 1;
      await room.save();

      sendBookingConfirmation(booking, room).catch(err => console.error('Email error:', err));

      res.status(201).json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── Get all bookings — admin + pagination ────────────────────────────────────
router.get('/', auth, async (req, res) => {
  try {
    const { status, guest, checkIn, checkOut, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (guest) filter.guestName = { $regex: guest, $options: 'i' };
    if (checkIn) filter.checkIn = { $gte: new Date(checkIn) };
    if (checkOut) filter.checkOut = { $lte: new Date(checkOut) };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .populate('room')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ bookings, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Update booking status — admin ───────────────────────────────────────────
router.put('/:id',
  auth,
  [body('status').isIn(['pending', 'confirmed', 'cancelled']).withMessage('Invalid status value')],
  validate,
  async (req, res) => {
    try {
      const { status } = req.body;
      const booking = await Booking.findById(req.params.id).populate('room');
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      const prevStatus = booking.status;
      booking.status = status;
      await booking.save();

      const room = await Room.findById(booking.room._id || booking.room);

      if (status === 'cancelled' && prevStatus !== 'cancelled' && room) {
        room.bookedRooms = Math.max(0, room.bookedRooms - 1);
        await room.save();
      }

      if (prevStatus === 'cancelled' && status !== 'cancelled' && room) {
        room.bookedRooms += 1;
        await room.save();
      }

      res.json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ─── User's own bookings — must be before /:id ────────────────────────────────
router.get('/my-bookings', userAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await Booking.countDocuments({ guestEmail: req.user.email });
    const bookings = await Booking.find({ guestEmail: req.user.email })
      .populate('room')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ bookings, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;