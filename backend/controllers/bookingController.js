import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const createBookingRequest = async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can create booking requests' });
    }
    const { workerId, serviceCategory, needDescription, customerFair } = req.body;

    if (!workerId || !serviceCategory || !needDescription) {
      return res.status(400).json({ message: 'Worker, service category, and need are required' });
    }

    const worker = await User.findOne({ _id: workerId, role: 'worker' });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const booking = await Booking.create({
      customer: req.user._id,
      worker: workerId,
      serviceCategory,
      needDescription,
      customerFair: Number(customerFair) || 0,
      amount: Number(customerFair) || 0,
      status: 'pending',
    });

    const populated = await Booking.findById(booking._id)
      .populate('customer', 'firstName lastName email phoneNumber')
      .populate('worker', 'firstName lastName email workerProfile.profession');

    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can view order history' });
    }
    const orders = await Booking.find({ customer: req.user._id })
      .populate('worker', 'firstName lastName email workerProfile.profession')
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getWorkerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Only workers can access worker bookings' });
    }
    const bookings = await Booking.find({ worker: req.user._id })
      .populate('customer', 'firstName lastName email phoneNumber')
      .sort({ createdAt: -1 });

    const totals = bookings.reduce(
      (acc, b) => {
        if (['accepted', 'completed'].includes(b.status)) {
          acc.earnings += b.amount || 0;
        }
        if (b.status === 'pending') acc.pending += 1;
        return acc;
      },
      { earnings: 0, pending: 0 }
    );

    return res.json({
      bookings,
      stats: {
        totalBookings: bookings.length,
        pendingBookings: totals.pending,
        totalEarnings: totals.earnings,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateWorkerBookingDecision = async (req, res) => {
  try {
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Only workers can respond to requests' });
    }
    const { action, workerFair, workerResponse } = req.body;
    const booking = await Booking.findOne({ _id: req.params.id, worker: req.user._id });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (!['pending', 'countered'].includes(booking.status)) {
      return res.status(400).json({ message: 'Booking request already finalized' });
    }

    if (action === 'accept') {
      booking.status = 'accepted';
      booking.workerFair = booking.customerFair;
      booking.amount = booking.customerFair;
      booking.workerResponse = workerResponse || 'Accepted on requested fair';
    } else if (action === 'counter') {
      if (!Number(workerFair)) {
        return res.status(400).json({ message: 'Counter fair is required' });
      }
      booking.status = 'countered';
      booking.workerFair = Number(workerFair);
      booking.amount = Number(workerFair);
      booking.workerResponse = workerResponse || 'Worker suggested a different fair';
    } else if (action === 'deny') {
      booking.status = 'denied';
      booking.workerResponse = workerResponse || 'Worker denied this booking request';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await booking.save();

    const updated = await Booking.findById(booking._id)
      .populate('customer', 'firstName lastName email phoneNumber')
      .populate('worker', 'firstName lastName email workerProfile.profession');

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
