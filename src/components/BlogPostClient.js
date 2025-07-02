'use client';
import React, { useState } from "react";
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import MobileTabs from '@/components/MobileTabs';
import SocialButtons from '@/components/SocialButtons';
import '@/styles/blog-post.css';

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button
        className="accordion-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="accordion-icon">{open ? '-' : '+'}</span>
      </button>
      <div
        className={`panel ${open ? 'open' : ''}`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function BlogPostClient({ blog, error }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (error) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>{error}</div>;
  }
  if (!blog) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading blog...</div>;
  }

  return (
    <>
      <Header openModal={openModal} />
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Blogs', href: '/blogs' },
        { label: blog.title }
      ]} />
      <section id="hero" className="blog-hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center hero-image-container">
              <img src={blog.images && blog.images.length > 0 ? blog.images[0] : "/img/img99.jpg"} alt={blog.title} className="hero-image" />
            </div>
            <div className="col-12 hero-content" style={{ marginTop: 24 }}>
              <h1 className="common_heading" style={{ textAlign: 'center' }}>{blog.title}</h1>
              <div style={{ textAlign: 'center', color: '#b97a3a', fontSize: 16, margin: '12px 0 24px 0' }}>
                <span>By <b>Divine Elite Wellness</b></span>
                {blog.createdAt && (
                  <span style={{ marginLeft: 16 }}>
                    | Published on {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                )}
              </div>
              <div className="second_sec_content hero-text">
                <div dangerouslySetInnerHTML={{ __html: blog.body }} />
              </div>
            </div>
            <div className="decorative-accent" />
          </div>
        </div>
      </section>

      <Modal open={modalOpen} onClose={closeModal} />
      <SocialButtons />
      <MobileTabs openModal={openModal} />
    </>
  );
} 