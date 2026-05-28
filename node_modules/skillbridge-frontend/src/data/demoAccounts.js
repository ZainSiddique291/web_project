/** Seeded demo accounts (created when backend starts with empty DB) */

export const DEMO_ACCOUNTS = {
  admin: {
    role: 'Admin',
    email: 'admin@skillbridge.pk',
    password: 'admin123',
    note: 'Opens /admin dashboard',
  },
  customer: {
    role: 'Customer',
    email: 'demo@skillbridge.pk',
    password: 'demo123',
    note: 'Browse services, update profile in Settings',
  },
  workers: [
    { name: 'Ahmed Raza', profession: 'Electrician', email: 'ahmed.raza@skillbridge.pk', password: 'worker123' },
    { name: 'Ali Hassan', profession: 'Plumber', email: 'ali.hassan@skillbridge.pk', password: 'worker123' },
    { name: 'Sara Khan', profession: 'Tutor', email: 'sara.khan@skillbridge.pk', password: 'worker123' },
    { name: 'Usman Malik', profession: 'Technician', email: 'usman.malik@skillbridge.pk', password: 'worker123' },
    { name: 'Fatima Noor', profession: 'Painter', email: 'fatima.noor@skillbridge.pk', password: 'worker123' },
    { name: 'Bilal Ahmed', profession: 'Carpenter', email: 'bilal.ahmed@skillbridge.pk', password: 'worker123' },
    { name: 'Ayesha Tariq', profession: 'Cleaner', email: 'ayesha.tariq@skillbridge.pk', password: 'worker123' },
    { name: 'Hassan Sheikh', profession: 'Electrician', email: 'hassan.sheikh@skillbridge.pk', password: 'worker123' },
    { name: 'Zainab Ali', profession: 'Tutor', email: 'zainab.ali@skillbridge.pk', password: 'worker123' },
    { name: 'Imran Butt', profession: 'Plumber', email: 'imran.butt@skillbridge.pk', password: 'worker123' },
    { name: 'Nadia Rashid', profession: 'IT Technician', email: 'nadia.rashid@skillbridge.pk', password: 'worker123' },
    { name: 'Kamran Siddiqui', profession: 'Painter', email: 'kamran.siddiqui@skillbridge.pk', password: 'worker123' },
  ],
};

/** All worker accounts share this password */
export const WORKER_PASSWORD = 'worker123';
