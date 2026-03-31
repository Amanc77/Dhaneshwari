const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// ─── Public: Get all slides sorted by order ───────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const slides = await Slider.find().sort({ order: 1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Upload slide image (task 18) ──────────────────────────────────────
router.post('/upload-image', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// ─── Admin: Create slide ──────────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    const slide = new Slider(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Update slide ──────────────────────────────────────────────────────
router.put('/:id', auth, async (req, res) => {
  try {
    const slide = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(slide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Delete slide ──────────────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;