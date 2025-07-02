"use client";
import { useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ContactSection from '@/components/ContactSection';
import Modal from '@/components/Modal';
import MobileTabs from '@/components/MobileTabs';
import SocialButtons from '@/components/SocialButtons';
import Image from 'next/image';
import '@/styles/director-profile.css';

export default function Director1Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Header openModal={openModal} />

      {/* Main Content */}
      <main className="director-main">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Meet Bhanavi Shivaya' }
        ]} />

        {/* Director Profile */}
        <section className="doc-section last">
          <div className="container">
            <h1 className="common_heading doc-heading">Meet Bhanavi Shivaya</h1>
            <div className="doc-card">
              <div className="docContainer">
                <div className="docImage">
                  <Image
                    src="/img/Bhanavi_img.jpg"
                    alt="Bhanavi Shivaya"
                    width={420}
                    height={420}
                    className="doc-img"
                    priority
                  />
                </div>

                <div className="docContent">
                  <span className="doc-name">Bhanavi Shivaya</span>

                  <div className="doc-para">
                    <b>About</b>
                    <p>Bhanvi Shivaya, a spiritual teacher and life coach, began in hotel management at 17 and later directed 9 wellness centers. Recognizing the impact of mental coaching, she became a Reiki Grand Master, healing over 1500 globally. A licensed HRA practitioner, she founded a holistic Healing center with husband Vijay Gulati. Dedicated to charity, she aims to heal and help others worldwide.</p>

                    <p><b>Reiki Grand Master:</b> Bhanvi is a highly skilled and knowledgeable practitioner in the art of Reiki. With extensive expertise, Bhanvi not only provides healing sessions but also teaches and attunes others to Reiki, fostering spiritual growth and well-being in those under their guidance.<br />
                      Bhanvi is an <b>angel therapy master</b> who specializes in channeling angelic energies to facilitate emotional and spiritual healing, offering targeted guidance for individuals seeking a transformative and uplifting experience.<br />
                      <b>Spiritual Ritualist:</b> As a spiritual ritualist, Bhanvi brings profound expertise to crafting and conducting rituals that enhance spiritual connections and promote a sense of purpose and harmony.<br />
                      <b>Spiritual Teacher:</b> Bhanvi is an adept spiritual teacher who imparts profound wisdom and guidance, cultivating a transformative learning experience.<br />
                      <b>Crystal healing</b> is a form of alternative therapy that involves using crystals or gemstones to promote physical, emotional, and spiritual healing.<br />
                      <b>Health healing</b> combines holistic practices (like energy work, nutrition, or mindfulness) to support physical well-being. It focuses on balancing the body, mind, and spirit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
      <Modal open={modalOpen} onClose={closeModal} />
      <SocialButtons />
      <MobileTabs openModal={openModal} />
    </>
  );
} 