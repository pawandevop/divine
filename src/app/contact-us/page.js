'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import MobileTabs from '@/components/MobileTabs';
import Breadcrumb from '@/components/Breadcrumb';
import SocialButtons from '@/components/SocialButtons';

export default function ContactUs() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' }
        ]} />

        <ContactSection hidemap={true} />

        <section className="map_container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4174.066531881949!2d77.06350075050864!3d28.390349065017098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d230016a523b5%3A0xe8faa2e895c1f2ce!2sElite%20Wellbeing!5e0!3m2!1sen!2sin!4v1746204208488!5m2!1sen!2sin"
            width="100%" height="450" style={{ border: '2px solid #BB8E23' }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
        <MobileTabs />
      </main>
      <Footer />
      <SocialButtons />
    </>
  );
} 