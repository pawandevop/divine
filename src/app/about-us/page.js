'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import AboutUsSection from '@/components/AboutUsSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import SocialButtons from '@/components/SocialButtons';
import MobileTabs from '@/components/MobileTabs';
import '@/styles/about.css';

export default function AboutUsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header openModal={() => setModalOpen(true)} />
      <main className="about-main">
        <Breadcrumb />
        <AboutUsSection />
        <WhyChooseSection backgroundColor="#fdf1e3" textColor="#000" />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      <SocialButtons />
      <MobileTabs openModal={() => setModalOpen(true)} />
    </>
  );
} 