// ─── models/Gallery.js ────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
});

const gallerySectionSchema = new mongoose.Schema({
  name: { type: String, required: true },         // e.g. "Rooms", "Pool", "Events"
  description: { type: String },                  // short single line description
  items: [galleryItemSchema],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('GallerySection', gallerySectionSchema);