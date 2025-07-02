// Event model for storing event images and metadata
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  // URL to the event image
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required.'],
  },
  // Date the event image was uploaded
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Optional caption for the event image
  caption: {
    type: String,
    trim: true,
    maxlength: 300,
    required: false,
  },
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema); 