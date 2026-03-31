const express = require('express');
const router = express.Router();
const Attraction = require('../models/Attraction');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// Public: Get all attractions
router.get('/', async (req, res) => {
  try {
    const attractions = await Attraction.find().sort({ createdAt: -1 });
    res.json(attractions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: Get single attraction
router.get('/:id', async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) return res.status(404).json({ error: 'Attraction not found' });
    res.json(attraction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Upload attraction image
router.post('/upload-image', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Admin: Create attraction
router.post('/', auth, async (req, res) => {
  try {
    const attraction = await Attraction.create(req.body);
    res.status(201).json(attraction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update attraction
router.put('/:id', auth, async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attraction) return res.status(404).json({ error: 'Attraction not found' });
    res.json(attraction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete attraction
router.delete('/:id', auth, async (req, res) => {
  try {
    await Attraction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attraction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;