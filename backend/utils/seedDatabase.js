import User from '../models/User.js';
import Settings from '../models/Settings.js';
import Booking from '../models/Booking.js';

const workersSeed = [
  {
    firstName: 'Ahmed',
    lastName: 'Raza',
    email: 'ahmed.raza@skillbridge.pk',
    phoneNumber: '+92 300 1112233',
    location: 'Lahore, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Master Electrician',
      category: 'electrical',
      experience: 8,
      rating: 4.9,
      jobsDone: 134,
      completionRate: 98,
      monthlyEarnings: 45000,
      skills: ['Wiring & Rewiring', 'Panel Repair', 'Lighting Installation', 'Circuit Breakers', 'Solar Panel Setup', 'Emergency Repairs'],
      about: 'Professional electrician with 8+ years of experience in residential and commercial wiring, panel installation, and electrical repairs. Licensed and insured.',
      availability: 'Monday - Saturday: 9:00 AM - 7:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 28000 },
        { month: 'Month 2', earnings: 32000 },
        { month: 'Month 3', earnings: 38000 },
        { month: 'Month 4', earnings: 42000 },
        { month: 'Month 5', earnings: 45000 },
        { month: 'Month 6', earnings: 48000 },
      ],
    },
  },
  {
    firstName: 'Ali',
    lastName: 'Hassan',
    email: 'ali.hassan@skillbridge.pk',
    phoneNumber: '+92 321 4455667',
    location: 'Karachi, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Licensed Plumber',
      category: 'plumbing',
      experience: 6,
      rating: 4.7,
      jobsDone: 98,
      completionRate: 97,
      monthlyEarnings: 38000,
      skills: ['Pipe Fitting', 'Leak Repair', 'Water Heater', 'Drain Cleaning', 'Bathroom Fitting'],
      about: 'Expert plumber specializing in residential plumbing, leak detection, and bathroom renovations.',
      availability: 'Monday - Friday: 8:00 AM - 6:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 22000 },
        { month: 'Month 2', earnings: 26000 },
        { month: 'Month 3', earnings: 30000 },
        { month: 'Month 4', earnings: 34000 },
        { month: 'Month 5', earnings: 36000 },
        { month: 'Month 6', earnings: 38000 },
      ],
    },
  },
  {
    firstName: 'Sara',
    lastName: 'Khan',
    email: 'sara.khan@skillbridge.pk',
    phoneNumber: '+92 333 7788990',
    location: 'Islamabad, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Math & Science Tutor',
      category: 'tutoring',
      experience: 5,
      rating: 4.8,
      jobsDone: 210,
      completionRate: 99,
      monthlyEarnings: 52000,
      skills: ['O-Level Math', 'A-Level Physics', 'Matric Science', 'Online Tutoring', 'Exam Prep'],
      about: 'Experienced tutor helping students excel in mathematics and science with personalized lesson plans.',
      availability: 'Monday - Sunday: 10:00 AM - 8:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 35000 },
        { month: 'Month 2', earnings: 40000 },
        { month: 'Month 3', earnings: 44000 },
        { month: 'Month 4', earnings: 48000 },
        { month: 'Month 5', earnings: 50000 },
        { month: 'Month 6', earnings: 52000 },
      ],
    },
  },
  {
    firstName: 'Usman',
    lastName: 'Malik',
    email: 'usman.malik@skillbridge.pk',
    phoneNumber: '+92 345 1122334',
    location: 'Lahore, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'AC & Appliance Technician',
      category: 'technical',
      experience: 7,
      rating: 4.6,
      jobsDone: 156,
      completionRate: 96,
      monthlyEarnings: 41000,
      skills: ['AC Installation', 'AC Repair', 'Refrigerator Repair', 'Washing Machine', 'Gas Refill'],
      about: 'Certified technician for air conditioning and home appliance repair across Lahore.',
      availability: 'Monday - Saturday: 9:00 AM - 8:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 25000 },
        { month: 'Month 2', earnings: 30000 },
        { month: 'Month 3', earnings: 34000 },
        { month: 'Month 4', earnings: 37000 },
        { month: 'Month 5', earnings: 39000 },
        { month: 'Month 6', earnings: 41000 },
      ],
    },
  },
  {
    firstName: 'Fatima',
    lastName: 'Noor',
    email: 'fatima.noor@skillbridge.pk',
    phoneNumber: '+92 300 9988776',
    location: 'Rawalpindi, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Professional Painter',
      category: 'painting',
      experience: 4,
      rating: 4.5,
      jobsDone: 72,
      completionRate: 95,
      monthlyEarnings: 32000,
      skills: ['Interior Painting', 'Exterior Painting', 'Wall Texture', 'Waterproofing', 'Color Consultation'],
      about: 'Creative painter delivering quality finishes for homes and offices.',
      availability: 'Tuesday - Sunday: 8:00 AM - 6:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 18000 },
        { month: 'Month 2', earnings: 22000 },
        { month: 'Month 3', earnings: 26000 },
        { month: 'Month 4', earnings: 29000 },
        { month: 'Month 5', earnings: 30000 },
        { month: 'Month 6', earnings: 32000 },
      ],
    },
  },
  {
    firstName: 'Bilal',
    lastName: 'Ahmed',
    email: 'bilal.ahmed@skillbridge.pk',
    phoneNumber: '+92 322 5544332',
    location: 'Faisalabad, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Expert Carpenter',
      category: 'carpentry',
      experience: 10,
      rating: 4.8,
      jobsDone: 189,
      completionRate: 98,
      monthlyEarnings: 48000,
      skills: ['Furniture Making', 'Door Installation', 'Kitchen Cabinets', 'Wood Polishing', 'Custom Shelving'],
      about: 'Master carpenter with a decade of experience in custom woodwork and furniture.',
      availability: 'Monday - Saturday: 7:00 AM - 5:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 30000 },
        { month: 'Month 2', earnings: 35000 },
        { month: 'Month 3', earnings: 39000 },
        { month: 'Month 4', earnings: 42000 },
        { month: 'Month 5', earnings: 45000 },
        { month: 'Month 6', earnings: 48000 },
      ],
    },
  },
  {
    firstName: 'Ayesha',
    lastName: 'Tariq',
    email: 'ayesha.tariq@skillbridge.pk',
    phoneNumber: '+92 301 6677889',
    location: 'Lahore, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Home Cleaning Specialist',
      category: 'cleaning',
      experience: 3,
      rating: 4.7,
      jobsDone: 245,
      completionRate: 99,
      monthlyEarnings: 28000,
      skills: ['Deep Cleaning', 'Move-in/out Cleaning', 'Sofa Cleaning', 'Kitchen Sanitization', 'Office Cleaning'],
      about: 'Reliable cleaning professional using eco-friendly products for spotless homes.',
      availability: 'Monday - Sunday: 8:00 AM - 6:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 15000 },
        { month: 'Month 2', earnings: 18000 },
        { month: 'Month 3', earnings: 22000 },
        { month: 'Month 4', earnings: 25000 },
        { month: 'Month 5', earnings: 26000 },
        { month: 'Month 6', earnings: 28000 },
      ],
    },
  },
  {
    firstName: 'Hassan',
    lastName: 'Sheikh',
    email: 'hassan.sheikh@skillbridge.pk',
    phoneNumber: '+92 333 2211445',
    location: 'Multan, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Electrician',
      category: 'electrical',
      experience: 5,
      rating: 4.4,
      jobsDone: 87,
      completionRate: 94,
      monthlyEarnings: 35000,
      skills: ['House Wiring', 'Fan Installation', 'UPS Setup', 'Generator Wiring'],
      about: 'Affordable and reliable electrical services for homes and small businesses.',
      availability: 'Monday - Friday: 9:00 AM - 6:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 20000 },
        { month: 'Month 2', earnings: 24000 },
        { month: 'Month 3', earnings: 28000 },
        { month: 'Month 4', earnings: 31000 },
        { month: 'Month 5', earnings: 33000 },
        { month: 'Month 6', earnings: 35000 },
      ],
    },
  },
  {
    firstName: 'Zainab',
    lastName: 'Ali',
    email: 'zainab.ali@skillbridge.pk',
    phoneNumber: '+92 300 4433221',
    location: 'Karachi, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'English Tutor',
      category: 'tutoring',
      experience: 6,
      rating: 4.9,
      jobsDone: 178,
      completionRate: 99,
      monthlyEarnings: 46000,
      skills: ['IELTS Prep', 'Spoken English', 'Grammar', 'Essay Writing', 'Business English'],
      about: 'Certified English language instructor with proven results in IELTS and academic English.',
      availability: 'Monday - Saturday: 11:00 AM - 9:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 28000 },
        { month: 'Month 2', earnings: 33000 },
        { month: 'Month 3', earnings: 37000 },
        { month: 'Month 4', earnings: 41000 },
        { month: 'Month 5', earnings: 43000 },
        { month: 'Month 6', earnings: 46000 },
      ],
    },
  },
  {
    firstName: 'Imran',
    lastName: 'Butt',
    email: 'imran.butt@skillbridge.pk',
    phoneNumber: '+92 321 9900112',
    location: 'Lahore, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Plumber',
      category: 'plumbing',
      experience: 4,
      rating: 4.3,
      jobsDone: 65,
      completionRate: 93,
      monthlyEarnings: 30000,
      skills: ['Kitchen Plumbing', 'Toilet Repair', 'Geyser Installation', 'Water Tank'],
      about: 'Quick-response plumber available for emergency repairs in Lahore.',
      availability: 'Monday - Sunday: 7:00 AM - 9:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 18000 },
        { month: 'Month 2', earnings: 21000 },
        { month: 'Month 3', earnings: 24000 },
        { month: 'Month 4', earnings: 27000 },
        { month: 'Month 5', earnings: 29000 },
        { month: 'Month 6', earnings: 30000 },
      ],
    },
  },
  {
    firstName: 'Nadia',
    lastName: 'Rashid',
    email: 'nadia.rashid@skillbridge.pk',
    phoneNumber: '+92 345 6677880',
    location: 'Islamabad, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'IT Technician',
      category: 'technical',
      experience: 5,
      rating: 4.6,
      jobsDone: 112,
      completionRate: 97,
      monthlyEarnings: 44000,
      skills: ['PC Repair', 'Network Setup', 'CCTV Installation', 'Software Install', 'Data Recovery'],
      about: 'IT support specialist for home and small office computer and network needs.',
      availability: 'Monday - Friday: 10:00 AM - 7:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 26000 },
        { month: 'Month 2', earnings: 31000 },
        { month: 'Month 3', earnings: 35000 },
        { month: 'Month 4', earnings: 39000 },
        { month: 'Month 5', earnings: 42000 },
        { month: 'Month 6', earnings: 44000 },
      ],
    },
  },
  {
    firstName: 'Kamran',
    lastName: 'Siddiqui',
    email: 'kamran.siddiqui@skillbridge.pk',
    phoneNumber: '+92 300 5566778',
    location: 'Peshawar, Pakistan',
    password: 'worker123',
    role: 'worker',
    isVerified: true,
    workerProfile: {
      profession: 'Painter & Decorator',
      category: 'painting',
      experience: 6,
      rating: 4.5,
      jobsDone: 94,
      completionRate: 96,
      monthlyEarnings: 36000,
      skills: ['Wallpaper', 'Stucco', 'Ceiling Paint', 'Commercial Painting', 'Touch-ups'],
      about: 'Detail-oriented painter for residential and commercial projects.',
      availability: 'Monday - Saturday: 8:00 AM - 5:00 PM',
      earningsHistory: [
        { month: 'Month 1', earnings: 20000 },
        { month: 'Month 2', earnings: 25000 },
        { month: 'Month 3', earnings: 29000 },
        { month: 'Month 4', earnings: 32000 },
        { month: 'Month 5', earnings: 34000 },
        { month: 'Month 6', earnings: 36000 },
      ],
    },
  },
];

const seedDatabase = async () => {
  try {
    await Settings.findOneAndUpdate(
      { key: 'site' },
      { key: 'site' },
      { upsert: true, new: true }
    );

    let adminUser = await User.findOne({ email: 'admin@skillbridge.pk' });
    if (!adminUser) {
      adminUser = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@skillbridge.pk',
        phoneNumber: '+92 300 0000000',
        location: 'Lahore, Pakistan',
        password: 'admin123',
        role: 'admin',
        isVerified: true,
      });
      console.log('Admin user created: admin@skillbridge.pk / admin123');
    } else {
      adminUser.role = 'admin';
      adminUser.password = 'admin123';
      await adminUser.save();
      console.log('Admin account ready: admin@skillbridge.pk / admin123');
    }

    let demoCustomer = await User.findOne({ email: 'demo@skillbridge.pk' });
    if (!demoCustomer) {
      demoCustomer = await User.create({
        firstName: 'Demo',
        lastName: 'Customer',
        email: 'demo@skillbridge.pk',
        phoneNumber: '+92 300 9998887',
        location: 'Lahore, Pakistan',
        password: 'demo123',
        role: 'customer',
      });
    }

    const workerCount = await User.countDocuments({ role: 'worker' });
    if (workerCount === 0) {
      const workers = await User.insertMany(workersSeed);
      console.log(`Seeded ${workers.length} workers`);

      const categories = ['Electrical', 'Plumbing', 'Tutoring', 'Technical', 'Painting'];
      for (let i = 0; i < 30; i++) {
        const worker = workers[i % workers.length];
        await Booking.create({
          customer: demoCustomer._id,
          worker: worker._id,
          serviceCategory: categories[i % categories.length],
          amount: Math.floor(Math.random() * 5000) + 2000,
          status: 'completed',
          bookedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        });
      }
      console.log('Seeded sample bookings');
    }
  } catch (error) {
    console.error('Seed error:', error.message);
  }
};

export default seedDatabase;
