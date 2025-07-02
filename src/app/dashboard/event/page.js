"use client";
import '@/styles/backend-auth.css';
import '@/styles/dashboard-results.css';
// import '@/styles/dashboard-event.css';
import DashboardNavbar from '@/components/DashboardNavbar';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Toast from '@/components/Toast';
import { FiImage, FiExternalLink, FiTrash } from 'react-icons/fi';
import ImageUpload from '@/components/ImageUpload';

// Gallery Dashboard
export default function EventDashboard() {
  const router = useRouter();
  const [toast, setToast] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/event');
        const data = await response.json();
        if (data.success) {
          setUploadedImages(data.data);
        } else {
          showToast('Failed to load event images.', 'error');
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
        showToast('An error occurred while fetching images.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, []);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Handle logout
  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    showToast('Logged out successfully!', 'success');
    setTimeout(() => router.push('/login'), 1200);
  }

  // Handle image upload
  function handleUpload(fileUrls) {
    fetch('/api/event')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUploadedImages(data.data);
          // If no new images, try again after 1 second
          if (data.data.length === 0) {
            setTimeout(() => {
              fetch('/api/event')
                .then(res2 => res2.json())
                .then(data2 => {
                  if (data2.success) {
                    setUploadedImages(data2.data);
                  }
                });
            }, 1000);
          }
        }
        showToast(`${fileUrls.length} image(s) uploaded successfully!`, 'success');
      })
      .catch(() => showToast('Failed to refresh event images.', 'error'));
  }

  function handleDeleteConfirm(id) {
    setToast({
      message: (
        <span>
          Are you sure you want to delete this image?<br />
          <div className="toast-confirm-actions">
            <button className="toast-confirm-btn" onClick={() => confirmDelete(id)}>Yes, Delete</button>
            <button className="toast-cancel-btn" onClick={() => setToast(null)} style={{ marginLeft: 0 }}>Cancel</button>
          </div>
        </span>
      ),
      type: 'error',
    });
  }

  async function confirmDelete(id) {
    setToast(null);
    try {
      const res = await fetch(`/api/event?id=${id}`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) {
        setUploadedImages(images => images.filter(img => img._id !== id));
        showToast('Image deactivated.', 'success');
      } else {
        showToast(data.error || 'Failed to deactivate image.', 'error');
      }
    } catch {
      showToast('An error occurred while deactivating image.', 'error');
    }
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <DashboardNavbar onLogout={handleLogout} />

      <div className="results-bg">
        <div className="results-card results-dashboard-card">
          <div className="results-heading">
            <FiImage size={32} style={{ color: '#b97a3a', marginBottom: -4 }} />
            Event Upload
            <span className="divider" />
          </div>

          <div className="results-desc">
            Upload and manage your event images here.
          </div>

          <div className="results-widgets">
            <h3>Upload New Event Images</h3>
            <ImageUpload onUpload={handleUpload} apiEndpoint="/api/event/upload" />
          </div>

          <div className="results-widgets uploaded-section">
            <h3>Uploaded Event Images</h3>
            <div style={{ color: '#b97a3a', marginBottom: 12, fontSize: 15 }}>
              If you don&apos;t see your latest upload, please refresh the page.
            </div>
            {isLoading ? (
              <p>Loading images...</p>
            ) : uploadedImages.length > 0 ? (
              <div className="uploaded-results-grid">
                {uploadedImages
                  .filter(img => img.imageUrl && img.imageUrl.startsWith('https://storage.googleapis.com/'))
                  .map(img => (
                    <div key={img._id || img.imageUrl} className="uploaded-result-card">
                      <img src={img.imageUrl} alt="Uploaded event" />
                      {img.caption && (
                        <div style={{ color: '#fff', background: '#b97a3a', fontSize: 13, padding: '4px 8px', borderRadius: 6, marginTop: 6, textAlign: 'center' }}>
                          {img.caption}
                        </div>
                      )}
                      <a href={img.imageUrl} target="_blank" rel="noopener noreferrer" className="view-link">
                        <FiExternalLink /> View Full Size
                      </a>
                      <button
                        className="delete-icon-btn"
                        onClick={() => handleDeleteConfirm(img._id)}
                        title="Delete"
                        style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', padding: 6, cursor: 'pointer', zIndex: 2 }}
                      >
                        <FiTrash size={18} color="#fff" />
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <div
                className="uploaded-results-grid"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '180px',
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <div style={{ color: '#b97a3a', textAlign: 'center', width: '100%' }}>
                  No event images available.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      `}</style>
    </>
  );
} 