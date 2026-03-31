const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');
const auth = require('../middleware/auth');

// ─── Public: Get all promotions ───────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find().populate('rooms');
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Public: Apply promotion (used during booking flow) ──────────────────────
router.post('/apply', async (req, res) => {
  try {
    const { roomId, date, amount } = req.body;
    const promos = await Promotion.find({
      rooms: roomId,
      isActive: true,
      startDate: { $lte: new Date(date) },
      endDate: { $gte: new Date(date) },
    });

    if (!promos.length) return res.json({ discount: 0, finalAmount: amount });

    let finalAmount = amount;
    let totalDiscount = 0;
    const applied = [];

    for (const promo of promos) {
      const discount = promo.discountType === 'flat'
        ? promo.discountValue
        : Math.round((promo.discountValue / 100) * finalAmount);
      totalDiscount += discount;
      finalAmount -= discount;
      applied.push(promo.title);
    }

    res.json({ discount: totalDiscount, finalAmount, promotionsApplied: applied });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Create promotion ──────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    const promotion = await Promotion.create(req.body);
    res.status(201).json(promotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Update promotion ──────────────────────────────────────────────────
router.put('/:id', auth, async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Toggle promotion active/inactive ──────────────────────────────────
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    promotion.isActive = !promotion.isActive;
    await promotion.save();
    res.json({ isActive: promotion.isActive });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Delete promotion ──────────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Promotion deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;