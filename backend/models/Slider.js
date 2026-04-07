const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  buttonText: { type: String, default: '' },
  buttonLink: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.models.Slider || mongoose.model('Slider', sliderSchema);