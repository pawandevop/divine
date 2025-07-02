"use client";
import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/common.css';

export default function NotFound() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Header openModal={() => setModalOpen(true)} />
      <div className="error_page">
        <div className="error_content">
          <div className="error_heading">
            404 <span role="img" aria-label="Not Found">🔍</span>
          </div>
          <div className="error_desc">
            Oops! The page you are looking for does not exist or has been moved.
          </div>
          <Link href="/" className="go_back_btn">
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
} 