const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');
const auth = require('../middleware/auth');

// Get all slides (public)
router.get('/', async (req, res) => {
  try {
    const slides = await Slider.find();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create slide (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const slide = new Slider(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete slide (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;