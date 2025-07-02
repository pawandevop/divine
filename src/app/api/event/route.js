// Event API route: handles listing and deactivating event images
import { NextResponse } from 'next/server';
import { handleCors } from '@/utils/cors';
import { connectDB } from '@/utils/db';
import Event from '@/models/Event';
import { deleteFromGCS } from '@/utils/gcs';

// List all event images (sorted by newest first)
export async function GET(request) {
  try {
    await connectDB();
    const images = await Event.find({}).sort({ createdAt: -1 });
    const response = NextResponse.json({
      success: true,
      data: images,
    });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
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

// Delete an event image by ID
export async function PATCH(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing image ID.' }, { status: 400 });
    }
    // Hard delete the document
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return NextResponse.json({ success: false, error: 'Image not found.' }, { status: 404 });
    }
    // Delete from GCS if imageUrl is a GCS URL
    if (event.imageUrl && event.imageUrl.includes('storage.googleapis.com')) {
      // Extract the object path after the bucket name
      const match = event.imageUrl.match(/https:\/\/storage.googleapis.com\/[^/]+\/(.+)/);
      if (match && match[1]) {
        await deleteFromGCS(match[1]);
      }
    }
    const response = NextResponse.json({ success: true, message: 'Image deleted.' });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  } catch (error) {
    console.error('Error deleting image:', error);
    const response = NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    const corsHeaders = handleCors(request);
    for (const key in corsHeaders) {
      response.headers.set(key, corsHeaders[key]);
    }
    return response;
  }
} 