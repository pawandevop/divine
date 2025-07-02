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
  { img: '/img/Anti Aging.jpg', title: 'Anti Aging Facial', desc: 'Targets fine lines, wrinkles, and sagging with collagen-boosting ingredients to rejuvenate and firm mature skin.' },
  { img: '/img/Hydra Facial.jpg', title: 'Hydra Facial', desc: 'A multi-step treatment combining cleansing, exfoliation, hydration, and antioxidant infusion for fresh, dewy skin.' },
  { img: '/img/RF Facial.jpg', title: 'RF Facial', desc: 'Uses radiofrequency energy to stimulate collagen production, tighten skin, and reduce the appearance of wrinkles and sagging.' },
  { img: '/img/Q-Switch.jpg', title: 'Q Switch (Face/Hand/Legs/Back)', desc: 'A laser treatment that targets pigmentation, acne scars, and uneven tone. Suitable for multiple body areas for a brighter complexion.' },
  { img: '/img/Medi Facial.jpg', title: 'Medi Facial', desc: 'A dermatologist-designed facial that treats specific concerns like acne, dullness, or pigmentation using medical-grade products and techniques.' },
  { img: '/img/Anti Aging.jpg', title: 'Instant Glow Facial', desc: 'Quick skin-brightening facial using radiance-enhancing products to deliver a fresh, glowing look in one session.' },
  { img: '/img/Hollywood Facial.jpg', title: 'Hollywood Facial', desc: 'A high-end facial combining microdermabrasion, light therapy, and advanced serums for red carpet-ready skin.' },
  { img: '/img/Photo Facial.jpg', title: 'Photo Facial', desc: 'Uses light-based technology (IPL or LED) to treat sun damage, redness, pigmentation, and stimulate collagen for radiant skin.' },
  { img: '/img/D-Tan Facial.jpg', title: 'D-Tan Facial', desc: 'Removes tan and dead skin using brightening agents and exfoliation, revealing a more even-toned and fresh complexion.' },
  { img: '/img/Hydra facial Adv.jpg', title: 'Hydra Facial Adv with Peel', desc: 'An upgraded version of the Hydra Facial, including a gentle chemical peel for enhanced exfoliation and deeper glow.' },
  { img: '/img/Acne Facial.jpg', title: 'Acne Facial', desc: 'Targets acne breakouts with deep cleansing, anti-bacterial agents, and soothing masks to reduce inflammation and prevent new pimples.' },
  { img: '/img/Ozone Treatment.jpg', title: 'Ozone Treatment', desc: 'Uses ozone steam to detoxify the skin or scalp, improving oxygenation, reducing bacteria, and promoting healing.' },
];

export default function BeautyTreatmentsPage() {
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
                  <div className="banner_heading">Beauty Treatments</div>
                  <Breadcrumb items={[
                    { label: 'Home', href: '/' },
                    { label: 'Elite Wellness', href: '/elite-wellness' },
                    { label: 'Beauty Treatments' }
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="service_section">
          <div className="container">
            <h1 className="common_heading">Beauty Treatments</h1>
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