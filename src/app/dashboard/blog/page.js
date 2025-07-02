"use client";
import '@/styles/backend-auth.css';
import '@/styles/blog-dashboard.css';
import DashboardNavbar from '@/components/DashboardNavbar';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Toast from '@/components/Toast';
import { FiEdit3, FiTrash2, FiPlus } from 'react-icons/fi';

// Blog Dashboard Page
export default function BlogDashboard() {
  const router = useRouter();
  const [toast, setToast] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (data.success) {
          setBlogPosts(data.posts);
        } else {
          showToast(data.error || 'Failed to fetch blog posts.', 'error');
        }
      } catch (err) {
        showToast('An error occurred while fetching blog posts.', 'error');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Toast function
  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Logout function
  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    showToast('Logged out successfully!', 'success');
    setTimeout(() => router.push('/login'), 1200);
  }

  // Edit handler
  function handleEdit(postId) {
    router.push(`/dashboard/blog/edit/${postId}`);
  }

  // Delete handler
  function handleDelete(postId) {
    setToast({
      message: (
        <span>
          Are you sure you want to delete this blog post?
          <br />
          <button className="toast-confirm-btn" onClick={() => confirmDelete(postId)}>Yes, Delete</button>
          <button className="toast-cancel-btn" onClick={() => setToast(null)} style={{ marginLeft: 8 }}>Cancel</button>
        </span>
      ),
      type: 'error',
    });
  }

  async function confirmDelete(postId) {
    setToast(null);
    try {
      const res = await fetch(`/api/blog/${postId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBlogPosts(posts => posts.filter(p => p._id !== postId));
        showToast('Blog post deleted!', 'success');
      } else {
        showToast(data.error || 'Failed to delete blog post.', 'error');
      }
    } catch (err) {
      showToast('An error occurred while deleting.', 'error');
    }
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <DashboardNavbar onLogout={handleLogout} />

      <div className="blog-dashboard-bg">
        <div className="blog-dashboard-card">
          <div className="blog-dashboard-heading">
            <FiEdit3 size={32} className="blog-dashboard-heading-icon" />
            Blog Management
            <span className="divider" />
          </div>

          <div className="blog-dashboard-desc">
            Create, edit, and manage your blog posts here.
          </div>

          <div className="blog-dashboard-widgets">
            <div className="blog-dashboard-header">
              <h3>Posts</h3>

              <button onClick={() => router.push('/dashboard/blog/create')} className='create-new-btn'>
                <FiPlus size={18} /> Create New
              </button>
            </div>

            <div className="blog-dashboard-table-container">
              <div style={{ color: '#b97a3a', marginBottom: 12, fontSize: 15 }}>
                If you don&apos;t see your latest post, please refresh the page.
              </div>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
              ) : (
                <table className="blog-dashboard-table">
                  <thead>
                    <tr>
                      <th>S.no.</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {blogPosts.filter(p => Array.isArray(p.images) && p.images.some(url => url && url.startsWith('https://storage.googleapis.com/')))
                      .map((post, idx) => (
                        <tr key={post._id}>
                          <td className="sno-cell">{idx + 1}</td>
                          <td className="title-cell">{post.title}</td>
                          <td className="category-cell">{post.category}</td>
                          <td className="published-cell">
                            {post.status === 'published' ? (
                              <span className="yes">Yes</span>
                            ) : (
                              <span className="no">No</span>
                            )}
                          </td>
                          <td className="blog-dashboard-actions">
                            <button className="edit-btn" onClick={() => handleEdit(post._id)}><FiEdit3 /> Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(post._id)}><FiTrash2 /> Delete</button>
                          </td>
                        </tr>
                      ))}
                    {blogPosts.filter(p => Array.isArray(p.images) && p.images.some(url => url && url.startsWith('https://storage.googleapis.com/'))).length === 0 && (
                      <tr><td colSpan={5} style={{ textAlign: 'center' }}>No blog posts found.</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}