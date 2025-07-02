'use client';
import DashboardNavbar from '@/components/DashboardNavbar';
import { useState } from 'react';
import Toast from '@/components/Toast';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import '@/styles/blog-create.css';
import '@/styles/backend-auth.css';

// Create Blog Post Page
export default function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [slug, setSlug] = useState('');
  const router = useRouter();

  // Handle image change
  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const validFiles = files.filter(f => allowedTypes.includes(f.type));

    if (validFiles.length !== files.length) {
      setToast({ message: 'Only PNG, JPG, and GIF images are allowed.', type: 'error' });
    }

    setImages(validFiles);
    setPreviews(validFiles.map(f => URL.createObjectURL(f)));
  }

  function slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  // Update slug as title changes
  function handleTitleChange(e) {
    setTitle(e.target.value);
    setSlug(slugify(e.target.value));
  }

  // Handle form submission
  async function handleSubmit(e, publish = false) {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    // Client-side validation
    if (!title.trim() || !body.trim() || !category.trim()) {
      setToast({ message: 'Title, body, and category are required.', type: 'error' });
      setLoading(false);
      return;
    }

    // Check if images are valid
    if (images.some(img => !['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(img.type))) {
      setToast({ message: 'Only PNG, JPG, and GIF images are allowed.', type: 'error' });
      setLoading(false);
      return;
    }

    // Create blog post
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('category', category);
      formData.append('status', publish ? 'published' : 'draft');
      images.forEach(img => formData.append('images', img));
      const res = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setToast({ message: publish ? 'Blog published!' : 'Draft saved!', type: 'success' });
        setTimeout(() => router.push('/dashboard/blog'), 1200);
      } else {
        setToast({ message: data.error || 'Failed to create blog post.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DashboardNavbar />

      <div className="blog-create-bg">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        <div className="blog-create-card">
          <div className="blog-create-heading">
            <button onClick={() => router.push('/dashboard/blog')} className="blog-create-back" title="Back to Blog Dashboard">
              <FiArrowLeft />
            </button>
            Create New Blog Post
          </div>

          <form className="blog-create-form" onSubmit={e => handleSubmit(e, false)} autoComplete="off">
            <label className="blog-create-label">Title</label>
            <input
              type="text"
              className="blog-create-input"
              placeholder="Enter blog title"
              value={title}
              onChange={handleTitleChange}
              required
              disabled={loading}
            />
            {title && (
              <div style={{ color: '#b97a3a', fontSize: 14, marginBottom: 8 }}>
                <b>Slug:</b> {slug}
              </div>
            )}
            <label className="blog-create-label">Body</label>
            <RichTextEditor
              value={body}
              onChange={setBody}
            />
            <label className="blog-create-label">Category</label>
            <input
              type="text"
              className="blog-create-input"
              placeholder="Enter category (e.g. wellness, skincare)"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              disabled={loading}
            />
            <label className="blog-create-label">Featured Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={loading}
            />

            {previews.length > 0 && (
              <div className="blog-create-image-previews">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt="preview" />
                ))}
              </div>
            )}

            <div className="blog-create-actions">
              <button
                type="submit"
                className="blog-create-btn"
                disabled={loading}
              >
                Save as Draft
              </button>
              <button
                type="button"
                className="blog-create-btn publish"
                disabled={loading}
                onClick={e => handleSubmit(e, true)}
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
} 