const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // task 17: link booking to logged-in user for my-bookings route
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional — guests can book without account
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: String,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalAmount: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);