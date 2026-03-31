const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  distance: { type: String, required: true }, // e.g. "2.5 km"
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Attraction', attractionSchema);