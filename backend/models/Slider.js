const mongoose = require('mongoose');

const datePricingSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
});

const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  // task 16: added shortDescription and size
  shortDescription: { type: String },
  size: { type: String },               // e.g. "350 sq ft"
  totalRooms: { type: Number, required: true },
  bookedRooms: { type: Number, default: 0 },
  pricePerNight: { type: Number, required: true },
  baseOccupancy: { type: Number, required: true },
  maxOccupancy: { type: Number, required: true },
  extraAdultPrice: { type: Number, default: 0 },
  datePricing: [datePricingSchema],
  amenities: [String],
  images: [String],
}, { timestamps: true });

roomSchema.virtual('remainingRooms').get(function () {
  return this.totalRooms - this.bookedRooms;
});

roomSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Room', roomSchema);