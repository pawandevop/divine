"use client";
import { useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ContactSection from '@/components/ContactSection';
import Modal from '@/components/Modal';
import MobileTabs from '@/components/MobileTabs';
import SocialButtons from '@/components/SocialButtons';
import DivineWellnessServicesSection from '@/components/DivineWellnessServicesSection';
import '@/styles/services.css';

export default function DivineWellnessPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header openModal={() => setModalOpen(true)} />

      <main className="divine-main">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Divine Wellness' }
        ]} />
        <DivineWellnessServicesSection openModal={() => setModalOpen(true)} />
        <ContactSection />
      </main>

      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      <SocialButtons />
      <MobileTabs openModal={() => setModalOpen(true)} />
    </>
  );
} 