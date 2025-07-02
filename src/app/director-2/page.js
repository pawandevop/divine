"use client";
import { useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ContactSection from '@/components/ContactSection';
import Modal from '@/components/Modal';
import MobileTabs from '@/components/MobileTabs';
import SocialButtons from '@/components/SocialButtons';
import Image from 'next/image';
import '@/styles/director.css';

export default function Director2Page() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header openModal={() => setModalOpen(true)} />
      <main className="director-page-main">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Meet Rani Jha' }
        ]} />

        <section className="director-section last">
          <div className="container">
            <h1 className="common_heading director-section-heading">Meet Rani Jha</h1>
            <div className="director-card">
              <div className="director-container">
                <div className="director-image-wrapper">
                  <Image
                    src="/img/Rani_Jha_2.jpg"
                    alt="Rani Jha"
                    width={420}
                    height={420}
                    priority
                  />
                </div>

                <div className="director-content">
                  <span className="director-name">Rani Jha</span>
                  <span className="director-title">Managing Director & Cosmetologist</span>

                  <div className="director-para">
                    <b>About</b>
                    <p>
                      Rani Jha is the Managing Director and lead Cosmetologist at <b>Divine Elite Wellness Clinic, 06/07, Ground Floor, Cricket Box, Urbana Mall, Sector 67 Gurugram, Haryana</b>, a premier destination for holistic beauty and wellness in Gurugram. With a profound commitment to enhancing natural beauty through advanced skincare and wellness treatments, she has cultivated a clinic that blends scientific expertise with personalized care.
                    </p>

                    <p>
                      <b>Leadership:</b> As a dynamic leader, Rani fosters a culture of continuous learning and innovation at Divine Elite Wellness. She is passionate about educating clients on self-care, healthy living, and the importance of mental and physical well-being.</p>

                    <p>
                      <b>Commitment:</b> Rani&apos;s commitment to excellence and her warm, approachable nature have made her a trusted name in the wellness community. She believes in building lasting relationships with clients, guiding them on their journey to optimal health and beauty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ContactSection />
      </main>

      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      <SocialButtons />
      <MobileTabs openModal={() => setModalOpen(true)} />
    </>
  );
} 