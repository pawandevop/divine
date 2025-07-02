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
  { img: '/img/Yellow Peel.jpg', title: 'Yellow Peel Face', desc: 'A medium-depth peel that targets pigmentation, acne, and fine lines, promoting brighter and clearer skin with minimal downtime.' },
  { img: '/img/Underarm Peel.jpg', title: 'Underarm Peel', desc: 'Lightens dark underarms by exfoliating dead skin and reducing melanin buildup with gentle chemical agents.' },
  { img: '/img/Salycylic Peel.jpg', title: 'Salycylic Peel', desc: 'A beta hydroxy acid peel ideal for oily and acne-prone skin. It deeply cleans pores, controls breakouts, and reduces inflammation.' },
  { img: '/img/Lactic Glow Peel.jpg', title: 'Lactic Glow Peel', desc: 'A gentle alpha hydroxy acid (AHA) peel that hydrates while exfoliating, enhancing glow and improving skin texture.' },
  { img: '/img/TCA Peel.jpg', title: 'TCA Peel', desc: 'A medium to deep peel for treating pigmentation, scars, fine lines, and sun damage. Promotes skin regeneration and even tone.' },
  { img: '/img/Pigmentation Peel.jpg', title: 'Pigmentation Peel', desc: 'Specially formulated to target melasma, dark spots, and uneven skin tone, encouraging smoother, more radiant skin.' },
  { img: '/img/Body Peel.jpg', title: 'Body Peel Full', desc: 'A comprehensive peel for the entire body, improving texture, tone, and pigmentation issues while enhancing skin softness.' },
  { img: '/img/Glycolic Peel.jpg', title: 'Glycolic Peel', desc: 'An AHA peel that penetrates the skin to reduce fine lines, fade dark spots, and improve overall brightness and texture.' },
];

export default function ChemicalPeelsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header openModal={() => setModalOpen(true)} />

      {/* Chemical Peels Banner */}
      <main className="elite-wellness-main">
        <section className="banner_section">
          <div className="banner_img">
            <Image src="/img/Banner.jpg" width={1440} height={400} alt="Banner" className="img-fluid w-100" />
          </div>

          <div className="common_banner_content ">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="banner_heading">Chemical Peels</div>
                  <Breadcrumb items={[
                    { label: 'Home', href: '/' },
                    { label: 'Elite Wellness', href: '/elite-wellness' },
                    { label: 'Chemical Peels' }
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="service_section">
          <div className="container">
            <h1 className="common_heading">Chemical Peels</h1>
            <div className="row pt-3 g-3">
              {services.map((service, idx) => (
                <div className="col-lg-4 col-sm-12 col-md-4" key={service.title + idx}>
                  <div className="service_cat_cards h-100 d-flex flex-column">
                    <div className="service_img">
                      <Image src={service.img} alt={service.title} className="img-fluid w-100" width={650} height={525} style={{ objectFit: 'cover', height: 260, width: '100%' }} />
                    </div>

                    <div className="service_cat_content flex-grow-1 d-flex flex-column">
                      <div className="service_name">{service.title}</div>
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