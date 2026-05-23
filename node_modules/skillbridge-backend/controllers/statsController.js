import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Settings from '../models/Settings.js';

export const getPlatformStats = async (req, res) => {
  try {
    const settings = await Settings.findOne({ key: 'site' });
    const workerCount = await User.countDocuments({ role: 'worker' });
    const customerCount = await User.countDocuments({ role: 'customer' });
    const jobsCompleted = await Booking.countDocuments({ status: 'completed' });

    const avgResult = await User.aggregate([
      { $match: { role: 'worker', 'workerProfile.rating': { $gt: 0 } } },
      { $group: { _id: null, avg: { $avg: '$workerProfile.rating' } } },
    ]);

    const averageRating =
      avgResult[0]?.avg?.toFixed(1) ||
      settings?.platformStats?.averageRating ||
      4.8;

    res.json({
      verifiedWorkers: workerCount || settings?.platformStats?.verifiedWorkers || 0,
      jobsCompleted: jobsCompleted || settings?.platformStats?.jobsCompleted || 0,
      averageRating: Number(averageRating),
      serviceCategories: settings?.platformStats?.serviceCategories || 12,
      activeWorkers: workerCount || settings?.platformStats?.activeWorkers || 0,
      totalCustomers: customerCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublicSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ key: 'site' });
    if (!settings) {
      settings = await Settings.create({ key: 'site' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
