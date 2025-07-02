// MongoDB connection using Mongoose
import mongoose from 'mongoose';

// Load environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Check if the environment variable is defined
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global is used here to maintain a cached connection across hot reloads in development
let cached = global.mongoose;

// Check if the cached connection is not established
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Connect to MongoDB & reuse connection if already established
export async function connectDB() {
  // Check if connection is already established
  if (cached.conn) return cached.conn;

  // Check if the promise is not established
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  // Wait for promise to be resolved
  cached.conn = await cached.promise;

  // Return cached connection
  return cached.conn;
} 