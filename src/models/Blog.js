// Blog model for storing blog posts in MongoDB
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  // Blog post title
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  // Main content (HTML or text)
  body: {
    type: String,
    required: true,
  },
  // Category for filtering/search
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  // Array of image URLs for the blog post
  images: [{
    type: String, // URL to uploaded image
  }],
  // Published or draft status
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  // URL-friendly unique identifier for the blog post
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  // Optional reference to the author (User)
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Set to true if you want to enforce author
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema); 