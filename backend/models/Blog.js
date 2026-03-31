const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  image: String,
  altText: String,
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  h1: String,
  h2: String,
  h3: String,
  isPublished: { type: Boolean, default: false },
  // task 10: multi-select categories (checkboxes on admin panel)
  // e.g. ["Places you can't forget", "Local Tips", "Travel Guide"]
  categories: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);