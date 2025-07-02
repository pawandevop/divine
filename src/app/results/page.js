'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/event.css';
import Breadcrumb from '@/components/Breadcrumb';
import ContactSection from '@/components/ContactSection';
import Modal from '@/components/Modal';
import SocialButtons from '@/components/SocialButtons';
import MobileTabs from '@/components/MobileTabs';
import { useState, useEffect } from 'react';

export default function Results() {
  const [lightbox, setLightbox] = useState({ show: false, index: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      try {
        const res = await fetch(`/api/results?page=${page}&limit=${limit}`);
        const data = await res.json();
        if (data.success) {
          const gcsImages = data.data
            .filter(img => img.imageUrl && img.imageUrl.startsWith('https://storage.googleapis.com/'));
          setImages(gcsImages);
          setTotalPages(data.totalPages || 1);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [page]);

  const openLightbox = (idx) => setLightbox({ show: true, index: idx });
  const closeLightbox = () => setLightbox({ show: false, index: 0 });
  const prevImage = () => setLightbox(l => ({ show: true, index: (l.index - 1 + images.length) % images.length }));
  const nextImage = () => setLightbox(l => ({ show: true, index: (l.index + 1) % images.length }));
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Header openModal={openModal} />
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Results' }
      ]} />

      {/* Results */}
      <main className="results-main">
        <section className="image_gallery container py-5">
          <h1 className="common_heading" style={{ textAlign: 'center' }}>Results</h1>

          <div className="row">
            {loading ? (
              <div style={{ textAlign: 'center', width: '100%' }}>Loading...</div>
            ) : images.length === 0 ? (
              <div style={{ textAlign: 'center', width: '100%' }}>No results uploaded yet.</div>
            ) : (
              images.map((img, idx) => (
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={img.imageUrl}>
                  <div className="lightbox" onClick={() => openLightbox(idx)}>
                    <img src={img.imageUrl} alt={`Gallery ${idx + 1}`} loading="lazy" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                  </div>
                  {img.caption && (
                    <div style={{ color: '#fff', background: '#b97a3a', fontSize: 13, padding: '4px 8px', borderRadius: 6, marginTop: 6, textAlign: 'center' }}>
                      {img.caption}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
              <button
                className="page-link"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ marginRight: 8 }}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`page-link${page === idx + 1 ? ' active' : ''}`}
                  onClick={() => setPage(idx + 1)}
                  style={{ marginRight: 8 }}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="page-link"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </section>

        {/* Lightbox */}
        {lightbox.show && (
          <div id="lightbox" className="show" onClick={closeLightbox}>
            <span id="close-icon" onClick={closeLightbox}>&#10006;</span>
            <span id="prev-arrow" onClick={e => { e.stopPropagation(); prevImage(); }}>&#10094;</span>
            <img src={images[lightbox.index].imageUrl} alt="Large" />
            <span id="next-arrow" onClick={e => { e.stopPropagation(); nextImage(); }}>&#10095;</span>
          </div>
        )}
      </main>

      <ContactSection hidemap={false} />
      <Footer />
      <Modal open={modalOpen} onClose={closeModal} />
      <SocialButtons />
      <MobileTabs openModal={openModal} />
    </>
  );
} 