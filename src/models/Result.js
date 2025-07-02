// Result model for storing result images and metadata
import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  // URL to the result image
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required.'],
  },
  // Date the result image was uploaded
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Optional caption for the result image
  caption: {
    type: String,
    trim: true,
    maxlength: 300,
    required: false,
  },
});

export default mongoose.models.Result || mongoose.model('Result', ResultSchema); 