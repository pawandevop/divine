"use client";
import DashboardNavbar from '@/components/DashboardNavbar';
import { useEffect, useState } from 'react';
import Toast from '@/components/Toast';
import { useRouter, useParams } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import '@/styles/blog-create.css';
import '@/styles/backend-auth.css';
import { FiArrowLeft } from 'react-icons/fi';

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [slug, setSlug] = useState('');

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();
        if (data.success && data.blog) {
          setTitle(data.blog.title || '');
          setBody(typeof data.blog.body === 'string' ? data.blog.body : '');
          setCategory(data.blog.category || '');
          setStatus(data.blog.status || 'draft');
          setExistingImages(data.blog.images || []);
          setSlug(data.blog.slug || '');
        } else {
          setToast({ message: data.error || 'Blog post not found.', type: 'error' });
        }
      } catch (err) {
        setToast({ message: 'Failed to fetch blog post.', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBlog();
  }, [id]);

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

  function handleTitleChange(e) {
    setTitle(e.target.value);
    setSlug(slugify(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    if (!title.trim() || !body.trim() || !category.trim()) {
      setToast({ message: 'Title, body, and category are required.', type: 'error' });
      setLoading(false);
      return;
    }
    if (images.some(img => !['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(img.type))) {
      setToast({ message: 'Only PNG, JPG, and GIF images are allowed.', type: 'error' });
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('category', category);
      formData.append('status', status);
      images.forEach(img => formData.append('images', img));
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setToast({ message: 'Blog post updated!', type: 'success' });
        setTimeout(() => router.push('/dashboard/blog'), 1200);
      } else {
        setToast({ message: data.error || 'Failed to update blog post.', type: 'error' });
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
            Edit Blog Post
          </div>
          <form className="blog-create-form" onSubmit={handleSubmit} autoComplete="off">
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
              key={body}
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
            <label className="blog-create-label">Status</label>
            <select
              className="blog-create-input"
              value={status}
              onChange={e => setStatus(e.target.value)}
              disabled={loading}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <label className="blog-create-label">Featured Images</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif"
              multiple
              onChange={handleImageChange}
              disabled={loading}
            />
            <div style={{ color: '#b97a3a', marginBottom: 12, fontSize: 15 }}>
              If you don&apos;t see your latest image, please refresh the page.
            </div>
            {existingImages.length > 0 && (
              <div className="blog-create-image-previews">
                {(() => {
                  const img = existingImages.find(url => url && url.startsWith('https://storage.googleapis.com/'));
                  return img ? (
                    <img src={img} alt="existing" />
                  ) : (
                    <div style={{ padding: 24, textAlign: 'center', color: '#b97a3a' }}>
                      No images available.
                    </div>
                  );
                })()}
              </div>
            )}
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
                Update Blog Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
} 