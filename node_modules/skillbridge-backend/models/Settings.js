import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    siteName: { type: String, default: 'SkillBridge' },
    supportEmail: { type: String, default: 'support@skillbridge.pk' },
    supportPhone: { type: String, default: '+92 300 1234567' },
    address: {
      type: String,
      default: 'Arfa Software Technology Park, Ferozepur Road, Lahore, Pakistan',
    },
    supportHours: {
      type: String,
      default: 'Monday - Saturday: 9:00 AM - 7:00 PM',
    },
    platformStats: {
      verifiedWorkers: { type: Number, default: 2500 },
      jobsCompleted: { type: Number, default: 15000 },
      averageRating: { type: Number, default: 4.8 },
      serviceCategories: { type: Number, default: 12 },
      activeWorkers: { type: Number, default: 1500 },
    },
    socialLoginEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
