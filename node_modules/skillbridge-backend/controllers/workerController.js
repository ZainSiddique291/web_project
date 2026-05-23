import User from '../models/User.js';

const categoryMap = {
  electrical: 'electrical',
  plumbing: 'plumbing',
  tutoring: 'tutoring',
  technical: 'technical',
  painting: 'painting',
  carpentry: 'carpentry',
  cleaning: 'cleaning',
};

export const getWorkers = async (req, res) => {
  try {
    const { search, location, category, minRating, sort } = req.query;
    const filter = { role: 'worker' };

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { 'workerProfile.profession': { $regex: search, $options: 'i' } },
        { 'workerProfile.skills': { $regex: search, $options: 'i' } },
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (category && category !== 'all' && categoryMap[category]) {
      filter['workerProfile.category'] = categoryMap[category];
    }

    if (minRating) {
      filter['workerProfile.rating'] = { $gte: Number(minRating) };
    }

    let sortOption = { 'workerProfile.rating': -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'jobs') sortOption = { 'workerProfile.jobsDone': -1 };

    const workers = await User.find(filter)
      .select('-password')
      .sort(sortOption);

    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkerById = async (req, res) => {
  try {
    const worker = await User.findOne({
      _id: req.params.id,
      role: 'worker',
    }).select('-password');

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkerCategories = async (req, res) => {
  try {
    const counts = await User.aggregate([
      { $match: { role: 'worker' } },
      { $group: { _id: '$workerProfile.category', count: { $sum: 1 } } },
    ]);
    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
