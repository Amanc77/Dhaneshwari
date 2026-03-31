const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const auth = require('../middleware/auth');

// ─── Public: Get all rooms ────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Public: Get single room ──────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Create room ───────────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Update room ───────────────────────────────────────────────────────
router.put('/:id', auth, async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Admin: Delete room ───────────────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Public: Price calculator with full breakdown + GST (task 16 updated) ────
router.post('/:id/calculate-price', async (req, res) => {
  try {
    const { checkIn, checkOut, adults, discountPercent } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // Date-wise pricing override
    const dateOverride = room.datePricing.find(dp =>
      start >= new Date(dp.startDate) && end <= new Date(dp.endDate)
    );
    const basePricePerNight = dateOverride ? dateOverride.price : room.pricePerNight;

    // Extra adults
    const extraAdults = Math.max(0, (adults || room.baseOccupancy) - room.baseOccupancy);
    const maxExtra = room.maxOccupancy - room.baseOccupancy;
    if (extraAdults > maxExtra) {
      return res.status(400).json({ error: `Max occupancy is ${room.maxOccupancy} adults` });
    }

    // Full breakdown
    const basePriceTotal = basePricePerNight * nights;
    const extraAdultTotal = extraAdults * room.extraAdultPrice * nights;
    const subtotal = basePriceTotal + extraAdultTotal;

    // Optional discount
    const discount = discountPercent ? Math.round((discountPercent / 100) * subtotal) : 0;
    const afterDiscount = subtotal - discount;

    // GST 5%
    const gst = Math.round(0.05 * afterDiscount);
    const finalAmount = afterDiscount + gst;

    res.json({
      nights,
      basePricePerNight,
      basePriceTotal,
      extraAdults,
      extraAdultPricePerNight: room.extraAdultPrice,
      extraAdultTotal,
      subtotal,
      discountPercent: discountPercent || 0,
      discount,
      afterDiscount,
      gstPercent: 5,
      gst,
      finalAmount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;