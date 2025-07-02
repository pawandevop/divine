// User model for authentication and user data
import mongoose from 'mongoose';

// Define the User schema
const UserSchema = new mongoose.Schema({
  // User's email address (must be unique)
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  // Hashed password
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ]
  },
  // User's role (admin, editor, etc.)
  role: {
    type: String,
    enum: ['pawan', 'user'],
    default: 'user',
    required: [true, 'Role is required']
  },
  // Whether the user is active
  active: {
    type: Boolean,
    default: true,
  },
  // Date the user was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Password reset token and expiry
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  // Track when password was last changed (for session invalidation)
  passwordChangedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Export the User model, or reuse existing if already defined
export default mongoose.models.User || mongoose.model('User', UserSchema); 