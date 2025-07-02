'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/event.css';
import ContactSection from '@/components/ContactSection';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import SocialButtons from '@/components/SocialButtons';
import MobileTabs from '@/components/MobileTabs';
import { useState, useEffect } from 'react';

export default function Results() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ show: false, index: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/event');
        const data = await response.json();
        if (data.success) {
          setImages(data.data
            .filter(item => item.imageUrl && item.imageUrl.startsWith('https://storage.googleapis.com/'))
          );
        } else {
          setImages([]);
        }
      } catch (error) {
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, []);

  const openLightbox = (idx) => setLightbox({ show: true, index: idx });
  const closeLightbox = () => setLightbox({ show: false, index: 0 });
  const prevImage = () => setLightbox(l => ({ show: true, index: (l.index - 1 + images.length) % images.length }));
  const nextImage = () => setLightbox(l => ({ show: true, index: (l.index + 1) % images.length }));

  return (
    <>
      {/* Header */}
      <Header openModal={openModal} />

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Events' }
      ]} />

      {/* Events */}
      <main className="events-main">
        <section className="image_gallery container py-5">
          <h1 className="common_heading" style={{ textAlign: 'center' }}>Events</h1>
          <div className="row">
            {isLoading ? (
              <p>Loading images...</p>
            ) : images.length > 0 ? (
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
            ) : (
              <p>No event images have been uploaded yet.</p>
            )}
          </div>
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