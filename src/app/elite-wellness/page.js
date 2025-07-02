"use client";
import { useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ContactSection from '@/components/ContactSection';
import Modal from '@/components/Modal';
import MobileTabs from '@/components/MobileTabs';
import SocialButtons from '@/components/SocialButtons';
import ServicesSection from '@/components/ServicesSection';
import '@/styles/services.css';

export default function EliteWellnessPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header openModal={() => setModalOpen(true)} />
      <main className="elite-wellness-main">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Elite Wellness' }
        ]} />
        {/* Services Section */}
        <ServicesSection />
        {/* Contact/Appointment Section */}
        <ContactSection />
      </main>
      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      <SocialButtons />
      <MobileTabs openModal={() => setModalOpen(true)} />
    </>
  );
} 