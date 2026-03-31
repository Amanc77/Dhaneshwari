const express = require('express');
const router = express.Router();
const GallerySection = require('../models/Gallery');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// ─── Public: Get all gallery sections with items ──────────────────────────────
router.get('/', async (req, res) => {
  try {
    const sections = await GallerySection.find().sort({ order: 1, createdAt: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Public: Get single section ───────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const section = await GallerySection.findById(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Upload gallery image ──────────────────────────────────────────────
router.post('/upload-image', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// ─── Admin: Create new section ────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    const section = await GallerySection.create(req.body);
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Update section (name, description, order) ────────────────────────
router.put('/:id', auth, async (req, res) => {
  try {
    const section = await GallerySection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Add image/video item to a section ────────────────────────────────
router.post('/:id/items', auth, async (req, res) => {
  try {
    const section = await GallerySection.findById(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    section.items.push(req.body); // { url, type }
    await section.save();
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Remove an item from a section ────────────────────────────────────
router.delete('/:id/items/:itemId', auth, async (req, res) => {
  try {
    const section = await GallerySection.findById(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    section.items = section.items.filter(item => item._id.toString() !== req.params.itemId);
    await section.save();
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Delete entire section ────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    await GallerySection.findByIdAndDelete(req.params.id);
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;