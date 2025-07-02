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
  { img: '/img/Face PRP.jpg', title: 'Face PRP', desc: 'A rejuvenation treatment that uses the patient\'s own blood plasma rich in growth factors to stimulate collagen production, reduce fine lines, and improve skin texture and tone.' },
  { img: '/img/IV Glutathione.jpg', title: 'IV Glutathione', desc: 'An intravenous antioxidant treatment aimed at detoxifying the body, improving skin brightness, and promoting an even skin tone. Glutathione is often used for its skin-lightening properties.' },
  { img: '/img/Hair PRP.jpg', title: 'Hair PRP', desc: 'Platelet-rich plasma is injected into the scalp to stimulate hair follicles, promote hair regrowth, and reduce hair thinning and hair fall.' },
  { img: '/img/Mole Removal.jpg', title: 'Mole Removal', desc: 'A dermatological procedure to safely remove moles using laser, radiofrequency, or surgical excision for aesthetic or health reasons.' },
  { img: '/img/Face GFC.jpg', title: 'Face GFC', desc: 'An advanced skin treatment using growth factors extracted from the patient\'s blood to enhance collagen, repair damaged skin, and improve skin tone and texture.' },
  { img: '/img/Hair Fall Treatment.jpg', title: 'Hair Fall Treatment(Ozone Treatment)', desc: 'Ozone gas is used to stimulate hair follicles, increase oxygenation, and improve scalp health, helping to control hair fall and support hair growth.' },
  { img: '/img/Hair GFC.jpg', title: 'Hair GFC + Microneedling', desc: 'Combines growth factors with microneedling to deliver nutrients deeper into the scalp, improving blood circulation and enhancing hair regrowth results.' },
  { img: '/img/Face Meso.jpg', title: 'Face Meso', desc: 'A technique where vitamins, enzymes, and plant extracts are injected into the face to rejuvenate skin, improve hydration, and reduce signs of aging.' },
  { img: '/img/Face Bright Pro.jpg', title: 'Face Bright Pro', desc: 'A professional-grade brightening treatment designed to reduce pigmentation, dark spots, and dullness for a more luminous and even toned complexion.' },
  { img: '/img/Lip Tint.jpg', title: 'Lip Tint', desc: 'A semi-permanent cosmetic tattooing procedure to enhance the natural color, shape, and definition of the lips for a fuller, more youthful appearance.' },
  { img: '/img/Microblading Eyebrow.jpg', title: 'Microblading Eyebrow', desc: 'A semi-permanent eyebrow tattooing technique using fine strokes to mimic natural hair, creating fuller and well-defined eyebrows.' },
  { img: '/img/Lips Bright Pro.jpg', title: 'Lips Bright Pro', desc: 'A specialized treatment to lighten dark or pigmented lips, improve lip texture, and restore natural pink tones using topical or laser methods.' },
  { img: '/img/Chin Meso.jpg', title: 'Chin Meso', desc: 'Mesotherapy focused on the chin area to tighten skin, reduce double chin, or improve contour using a cocktail of active ingredients.' },
  { img: '/img/Neck Bright Pro.jpg', title: 'Neck Bright Pro | Botox Neck', desc: 'A combination of neck-brightening treatments to reduce pigmentation and improve texture, along with Botox injections to reduce neck lines and sagging.' },
  { img: '/img/Face Meso.jpg', title: 'Face + Neck Hydra | Botox Forehead', desc: 'A combined deep hydration facial (HydraFacial) for face and neck with Botox injections in the forehead to smooth wrinkles and fine lines.' },
  { img: '/img/Hair Fall Treatment.jpg', title: 'Hair Meso', desc: 'Mesotherapy for the scalp, delivering nutrients directly to hair follicles to promote healthier, thicker hair growth.' },
  { img: '/img/Face Bright Pro.jpg', title: 'Booster Dose', desc: 'A supplementary skin booster (often hyaluronic acid-based) injected into the skin for hydration, firmness, and radiance.' },
  { img: '/img/Fillers-Chin.jpg', title: 'Fillers - Chin + Neck + Face Tightness', desc: 'Dermal fillers are used to enhance chin projection, firm the neck, and lift sagging areas of the face for a sculpted, youthful appearance.' },
  { img: '/img/Threads Treatment.jpg', title: 'Threads Treatment per thread', desc: 'A minimally invasive procedure using dissolvable threads to lift and tighten sagging skin, stimulating collagen production.' },
  { img: '/img/Face PRP.jpg', title: 'Botox', desc: 'Botulinum toxin injections that relax facial muscles to reduce dynamic wrinkles (like frown lines, crow\'s feet, and forehead lines).' },
  { img: '/img/Korean Facial.jpg', title: 'Korean Facial', desc: 'A multi-step skincare treatment inspired by Korean beauty routines, focusing on deep hydration, gentle exfoliation, and achieving a dewy, glowing complexion.' },
];

export default function HairAndFacePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header openModal={() => setModalOpen(true)} />

      {/* Hair and Face Banner */}
      <main className="elite-wellness-main">
        <section className="banner_section">
          <div className="banner_img">
            <Image src="/img/Banner.jpg" width={1440} height={400} alt="Banner" className="img-fluid w-100" />
          </div>

          <div className="common_banner_content ">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="banner_heading">Hair and Face</div>
                  <Breadcrumb items={[
                    { label: 'Home', href: '/' },
                    { label: 'Elite Wellness', href: '/elite-wellness' },
                    { label: 'Hair and Face' }
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="service_section">
          <div className="container">
            <h1 className="common_heading">Hair and Face</h1>
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