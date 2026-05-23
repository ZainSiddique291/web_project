import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ['customer', 'worker', 'admin'],
      default: 'customer',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
    // Worker specific fields
    workerProfile: {
      profession: String,
      category: {
        type: String,
        enum: [
          'electrical',
          'plumbing',
          'tutoring',
          'technical',
          'painting',
          'carpentry',
          'cleaning',
        ],
      },
      experience: Number,
      rating: { type: Number, default: 0 },
      jobsDone: { type: Number, default: 0 },
      completionRate: { type: Number, default: 98 },
      monthlyEarnings: { type: Number, default: 0 },
      skills: [String],
      about: String,
      availability: String,
      earningsHistory: [
        {
          month: String,
          earnings: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.firstName && this.lastName) {
    this.name = `${this.firstName} ${this.lastName}`;
  }

  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
