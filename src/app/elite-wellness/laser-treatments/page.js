"use client";
import { useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import Modal from '@/components/Modal';
import MobileTabs from '@/components/MobileTabs';
import SocialButtons from '@/components/SocialButtons';
import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import '@/styles/services.css';

const services = [
  { img: '/img/Full Body Laser.jpg', title: 'Full Body Laser Female (5 Sessions)', desc: 'Comprehensive laser hair removal for the entire body, tailored to female skin types, in a 5-session package for long-lasting smoothness.' },
  { img: '/img/Full Body Laser male.jpg', title: 'Full Body Laser Male', desc: 'Full-body laser treatment for men targeting coarse hair on all major body areas for permanent hair reduction.' },
  { img: '/img/Full Arms Laser.jpg', title: 'Full Arms Laser (Half)', desc: 'Laser treatment for the lower or upper arms to reduce unwanted hair permanently with minimal discomfort.' },
  { img: '/img/Full Legs Laser.jpg', title: 'Full Legs Laser (Half)', desc: 'Laser hair removal for either the upper or lower legs, effective on dense and coarse hair.' },
  { img: '/img/Underarm Laser.jpg', title: 'Underarm Laser', desc: 'Quick and effective hair removal for the underarm area, reducing pigmentation and ingrown hairs.' },
  { img: '/img/Back Laser.jpg', title: 'Back Laser', desc: 'Targets unwanted back hair, leaving the skin smooth and free of razor bumps or irritation.' },
  { img: '/img/Tummy+Front Laser.jpg', title: 'Tummy + Front Laser', desc: 'Laser hair removal focused on the abdominal and chest area for a clean and hair-free appearance.' },
  { img: '/img/Face Full Laser.jpg', title: 'Face Full Laser', desc: 'Safe and precise hair removal from the full face, including upper lip, chin, cheeks, and jawline.' },
  { img: '/img/Bikini Laser.jpg', title: 'Bikini Laser', desc: 'Removes hair from the bikini line area, offering a cleaner and more hygienic finish with lasting results.' },
  { img: '/img/Tattoo Removal.jpg', title: 'Tattoo Removal', desc: 'Laser-based treatment that breaks down tattoo ink particles, allowing them to be naturally eliminated by the body over multiple sessions.' },
];

export default function LaserTreatmentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Header openModal={() => setModalOpen(true)} />
      <main className="elite-wellness-main">
        <section className="banner_section">
          <div className="banner_img">
            <Image src="/img/Banner.jpg" width={1440} height={400} alt="Banner" className="img-fluid w-100" />
          </div>
          <div className="common_banner_content ">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="banner_heading">Laser Treatments</div>
                  <Breadcrumb items={[
                    { label: 'Home', href: '/' },
                    { label: 'Elite Wellness', href: '/elite-wellness' },
                    { label: 'Laser Treatments' }
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="service_section">
          <div className="container">
            <h1 className="common_heading">Laser Treatments</h1>
            <div className="row pt-3 g-3">
              {services.map((service, idx) => (
                <div className="col-lg-4 col-sm-12 col-md-4" key={service.title + idx}>
                  <div className="service_cat_cards h-100 d-flex flex-column">
                    <div className="service_img">
                      <Image src={service.img} alt={service.title} className="img-fluid w-100" width={650} height={525} style={{ objectFit: 'cover', height: 260, width: '100%' }} />
                    </div>
                    <div className="service_cat_content flex-grow-1 d-flex flex-column">
                      <div className="service_name py-1" style={{ textTransform: 'capitalize' }}>{service.title}</div>
                      <p style={{ flexGrow: 1 }}>{service.desc}</p>

                      <div className="common_btn mt-auto">
                        <button type="button" className="read_more" onClick={() => setModalOpen(true)}>
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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