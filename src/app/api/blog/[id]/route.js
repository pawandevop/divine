// Blog single API route: handles updating, deleting, and fetching a single blog post
import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Blog from '@/models/Blog';
import { handleCors } from '@/utils/cors';
import path from 'path';
import { writeFile } from 'fs/promises';
import { uploadBufferToGCS } from '@/utils/gcs';

// Allowed image types for blog uploads
const ALLOWED_MIME = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
const ALLOWED_EXT = ['.png', '.jpg', '.jpeg', '.gif'];

// Utility to generate a URL-friendly slug from a string
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Update a blog post by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.formData();
    const update = {};
    if (data.has('title')) {
      update.title = data.get('title');
      // Regenerate slug if title changes
      const slug = slugify(update.title);
      // Check for uniqueness (exclude current blog)
      const existing = await Blog.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json({ success: false, error: 'A blog post with this title/slug already exists.' }, { status: 400 });
      }
      update.slug = slug;
    }
    if (data.has('body')) update.body = data.get('body');
    if (data.has('category')) update.category = data.get('category');
    if (data.has('status')) update.status = data.get('status');
    // Handle images
    const files = data.getAll('images');
    let imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const ext = path.extname(file.name).toLowerCase();
        if (!ALLOWED_MIME.includes(file.type) || !ALLOWED_EXT.includes(ext)) {
          return NextResponse.json({ success: false, error: 'Only PNG, JPG, and GIF images are allowed.' }, { status: 400 });
        }
      }
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = path.basename(file.name).replace(/\\/g, '/');
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const newFilename = `${uniqueSuffix}-${filename}`;
        // Upload to GCS
        const gcsUrl = await uploadBufferToGCS(buffer, `blog/${newFilename}`, file.type);
        if (!gcsUrl) {
          return NextResponse.json({ success: false, error: 'Failed to upload to cloud storage.' }, { status: 500 });
        }
        imageUrls.push(gcsUrl);
      }
      update.images = imageUrls;
    }
    // Update the blog post
    const blog = await Blog.findByIdAndUpdate(id, update, { new: true });
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog post not found.' }, { status: 404 });
    }
    const response = NextResponse.json({ success: true, message: 'Blog post updated', blog });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  } catch (error) {
    console.error('Blog Update Error:', error);
    const response = NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  }
}

// Delete a blog post by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog post not found.' }, { status: 404 });
    }
    const response = NextResponse.json({ success: true, message: 'Blog post deleted' });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  } catch (error) {
    console.error('Blog Delete Error:', error);
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

// Get a single blog post by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog post not found.' }, { status: 404 });
    }
    const response = NextResponse.json({ success: true, blog });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  } catch (error) {
    console.error('Blog Fetch Error:', error);
    const response = NextResponse.json({ success: false, error: 'Failed to fetch blog post.' }, { status: 500 });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  }
} 