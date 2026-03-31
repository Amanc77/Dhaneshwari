const express = require('express');
const router = express.Router();
const Amenity = require('../models/Amenity');
const auth = require('../middleware/auth');

// ─── Public: Get all amenities ────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.json(amenities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Create amenity ────────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    const amenity = await Amenity.create(req.body);
    res.status(201).json(amenity);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'Amenity already exists' });
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Update amenity ────────────────────────────────────────────────────
router.put('/:id', auth, async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(amenity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Delete amenity ────────────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    await Amenity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Amenity deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;