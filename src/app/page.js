"use client";
import { useState } from "react";
import { Rouge_Script } from 'next/font/google';
import Header from '@/components/Header';
import VideoBanner from '@/components/VideoBanner';
import WelcomeSection from '@/components/WelcomeSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import DirectorsSection from '@/components/DirectorsSection';
import ResultsSection from '@/components/ResultsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AppointmentSection from '@/components/AppointmentSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import MobileTabs from '@/components/MobileTabs';
import SocialButtons from '@/components/SocialButtons';

// Load Rouge Script font using next/font/google
const rougeScript = Rouge_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rouge-script',
});

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* Add the font variable to the root div */}
      <div className={`homepage-root ${rougeScript.variable}`}>
        <Header openModal={openModal} />
        <VideoBanner />
        <WelcomeSection />
        <ServicesSection />
        <WhyChooseSection />
        <DirectorsSection />
        <ResultsSection />
        <TestimonialsSection />
        <AppointmentSection openModal={openModal} />
        <ContactSection />
        <Footer />
        <Modal open={modalOpen} onClose={closeModal} />
        <MobileTabs openModal={openModal} />
        <SocialButtons />
      </div>
    </>
  );
}
