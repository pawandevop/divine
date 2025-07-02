// Blog API route: handles creating and listing blog posts
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { handleCors } from '@/utils/cors';
import { connectDB } from '@/utils/db';
import Blog from '@/models/Blog';
import { uploadBufferToGCS } from '@/utils/gcs';
import fetch from 'node-fetch';

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

// Create a new blog post
export async function POST(request) {
  try {
    await connectDB();
    // Parse form data from the request
    const data = await request.formData();
    const title = data.get('title');
    const body = data.get('body');
    const category = data.get('category');
    const status = data.get('status') || 'draft';
    const files = data.getAll('images');

    // Validate required fields
    if (!title || !body || !category) {
      return NextResponse.json({ success: false, error: 'Title, body, and category are required.' }, { status: 400 });
    }

    // Generate slug and check for uniqueness
    const slug = slugify(title);
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return NextResponse.json({ success: false, error: 'A blog post with this title/slug already exists.' }, { status: 400 });
    }

    // Validate status
    if (!['draft', 'published'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status.' }, { status: 400 });
    }

    // Validate and save images
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
    }

    // Create and save the blog post
    const blog = new Blog({
      title,
      body,
      category,
      images: imageUrls,
      status,
      slug,
      // Optionally: author: userId
    });
    await blog.save();

    // Success response
    const response = NextResponse.json({ success: true, message: 'Blog post created', blog });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  } catch (error) {
    // Log and return error
    console.error('Blog Create Error:', error);
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

// List all blog posts (sorted by newest first)
export async function GET(request) {
  try {
    await connectDB();
    const posts = await Blog.find({}).sort({ createdAt: -1 });
    const response = NextResponse.json({ success: true, posts });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  } catch (error) {
    console.error('Blog Fetch Error:', error);
    const response = NextResponse.json({ success: false, error: 'Failed to fetch blog posts.' }, { status: 500 });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  }
} 