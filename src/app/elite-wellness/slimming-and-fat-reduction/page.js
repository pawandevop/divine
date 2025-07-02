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
import '@/styles/elite-wellness.css';


const services = [
  { img: '/img/G-15.jpg', title: 'G-5 15 min Target Area', desc: 'Vibration for firm and tone with Grea breaks down fat, vanishes the fat.' },
  { img: '/img/G-10.jpg', title: 'G-10', desc: 'Deep waves break down fat and sculpting curves, gives you the ideal shape.' },
  { img: '/img/NMS.jpg', title: 'NMS 45 min', desc: 'Tightens large muscles groups. Burning fat while giving you a toned look.' },
  { img: '/img/FDS.jpg', title: 'FDS 45min', desc: 'Powerful shocks that shrink the size. Melt the bulge before your eyes.' },
  { img: '/img/3D Tummy Trim.jpg', title: '3D Tummy Trim', desc: 'Shape your waist and see the full firm and flat, not hard, just right flat look!' },
  { img: '/img/3d Arms trim.jpg', title: '3D Arms Trim', desc: 'Wave goodbye to jiggly arms. Sculpted limbs with every touch.' },
  { img: '/img/3d Hips Trim.jpg', title: '3D Hips Trim', desc: 'Smooth hips help with guided grace. Tone and tighten every space.' },
  { img: '/img/3d Thighs Trim.jpg', title: '3D Thighs Trim', desc: 'Melt the bulge that hides behind. A sleeker back you\'re sure to find.' },
  { img: '/img/3d Side Trim.jpg', title: '3D Side Trim', desc: 'Love handles take a gentle hit. Sides are tamed and curves a hit.' },
  { img: '/img/3d Body Therapy.jpg', title: '3D Body Therapy', desc: 'A full body sculpt in 3D. Slices you down and brings you back to life.' },
  { img: '/img/Detox Therapy.jpg', title: 'Detox Therapy', desc: 'Flush the toxins, feel renewed. Energy and health surround you.' },
  { img: '/img/Ayurveda Full Body.jpg', title: 'Ayurveda Full Body Massage', desc: 'Ancient oils stretching hands. Balance brought from stress to calm.' },
  { img: '/img/Relaxing Body.jpg', title: 'Relaxing Body Massage', desc: 'Gentle strokes to calm the soul. Tension fades, you\'re feeling whole.' },
  { img: '/img/Aroma Body.jpg', title: 'Aroma Body Massage', desc: 'Scents that soothe and relax the flow. Peaceful vibes begin to show.' },
  { img: '/img/Potli Massage.jpg', title: 'Potli Massage', desc: 'Heated herbs let it bundle tight. Soothe the aches and swing at night.' },
  { img: '/img/Janu Basti.jpg', title: 'Janu Basti', desc: 'Oil goes in the knees in healing grace. Soothes the pain in every place.' },
  { img: '/img/Kati Basti.jpg', title: 'Kati Basti', desc: 'Warm oil circles your lower back. Melts the pain and brings you back.' },
  { img: '/img/Griva Basti.jpg', title: 'Griva Basti', desc: 'A healing bath for necks so sore. Relief flows in to block out more.' },
  { img: '/img/Cryo Pen Applicator.jpg', title: 'Cryo Pen Applicator', desc: 'Freezing spots that shouldn\'t stay. They flake and vanish clean away.' },
  { img: '/img/Body Polishing.jpg', title: 'Body Polishing', desc: 'Sculpted and buffed to radiant gleam. Silky skin, a glowing dream.' },
  { img: '/img/Body D-Tan.jpg', title: 'Body D-Tan', desc: 'Tan and dullness fade. You\'re bright and back to the glowing parade.' },
];

export default function SlimmingAndFatReductionPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header openModal={() => setModalOpen(true)} />

      {/* Slimming and Fat Reduction Banner */}
      <main className="elite-wellness-main">
        <section className="banner_section">
          <div className="banner_img">
            <Image src="/img/Banner.jpg" width={1440} height={400} alt="Banner" className="img-fluid w-100" />
          </div>
          <div className="common_banner_content ">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="banner_heading">Slimming and Fat Reduction</div>
                  <Breadcrumb items={[
                    { label: 'Home', href: '/' },
                    { label: 'Elite Wellness', href: '/elite-wellness' },
                    { label: 'Slimming and Fat Reduction' }
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="service_section">
          <div className="container">
            <h1 className="common_heading">Slimming and Fat Reduction</h1>
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