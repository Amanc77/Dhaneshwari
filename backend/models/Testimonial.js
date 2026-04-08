const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  name: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  photo: String,
  tripType: { type: String, enum: ['Holiday', 'Business', 'Family', 'Couple', 'Solo'] },
  daysStayed: { type: Number, min: 1 },
  // task 15: Rajat sir explicitly asked for month and year to show on frontend
  month: { type: String },   // e.g. "March"
  year: { type: Number },    // e.g. 2024
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);