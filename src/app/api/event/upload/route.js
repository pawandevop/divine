// Event image upload API route: handles uploading event images
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { handleCors } from '@/utils/cors';
import { connectDB } from '@/utils/db';
import Event from '@/models/Event';
import { uploadBufferToGCS } from '@/utils/gcs';
import fetch from 'node-fetch';

// Allowed MIME types and file extensions for image uploads
const ALLOWED_MIME = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
const ALLOWED_EXT = ['.png', '.jpg', '.jpeg', '.gif'];

// Upload event images
export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();
    // Parse form data
    const data = await request.formData();
    const files = data.getAll('files');
    const captions = data.getAll('captions'); // Array of captions, may be empty or shorter than files

    // No files uploaded
    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files uploaded.' }, { status: 400 });
    }

    // Validate all files before saving
    for (const file of files) {
      const ext = path.extname(file.name).toLowerCase();
      // Check both MIME type and extension
      if (!ALLOWED_MIME.includes(file.type) || !ALLOWED_EXT.includes(ext)) {
        return NextResponse.json({ success: false, error: 'Only PNG, JPG, and GIF images are allowed.' }, { status: 400 });
      }
    }

    const uploadedFilePaths = [];

    // Save each file to GCS and database
    for (const [i, file] of files.entries()) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Sanitize and uniquify filename
      const filename = path.basename(file.name).replace(/\\/g, '/');
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const newFilename = `${uniqueSuffix}-${filename}`;
      // Upload to GCS
      const gcsUrl = await uploadBufferToGCS(buffer, `event/${newFilename}`, file.type);
      if (!gcsUrl) {
        return NextResponse.json({ success: false, error: 'Failed to upload to cloud storage.' }, { status: 500 });
      }
      uploadedFilePaths.push(gcsUrl);
      // Save file URL and caption to database
      const caption = captions && captions[i] ? captions[i] : '';
      const newEventItem = new Event({ imageUrl: gcsUrl, caption });
      await newEventItem.save();
    }

    // Success response
    const response = NextResponse.json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadedFilePaths,
    });
    // Add CORS headers
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;

  } catch (error) {
    // Log and return error
    console.error('Upload Error:', error);
    const response = NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  }
}

// Handle preflight OPTIONS request for CORS
export async function OPTIONS(request) {
  const corsHeaders = handleCors(request);
  return new Response(null, { status: 204, headers: corsHeaders });
} 