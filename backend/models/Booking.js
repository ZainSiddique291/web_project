import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceCategory: { type: String, required: true },
    needDescription: { type: String, default: '' },
    customerFair: { type: Number, default: 0 },
    workerFair: { type: Number, default: null },
    amount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'countered', 'denied', 'completed', 'cancelled'],
      default: 'pending',
    },
    workerResponse: { type: String, default: '' },
    bookedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
