import Image from 'next/image';
import Link from 'next/link';

const services = [
  { img: '/img/Reiki.jpg', name: 'Reiki', desc: 'Bhanvi, a Reiki Grand Master, provides healing sessions and teaches Reiki, fostering spiritual growth and well-being.' },
  { img: '/img/Angel Therapy.jpg', name: 'Angel Therapy', desc: 'Master in angel therapy, Bhanvi channels angelic energies for emotional and spiritual healing and transformative guidance.' },
  { img: '/img/Spiritual Rituals.jpg', name: 'Spiritual Rituals', desc: 'As a spiritual ritualist, Bhanvi crafts rituals that enhance spiritual connections and promote purpose and harmony.' },
  { img: '/img/Spiritual Rituals.png', name: 'Spiritual Teaching', desc: 'A nurturing spiritual teacher, Bhanvi empowers individuals with wisdom and guidance for personal and spiritual growth.' },
  { img: '/img/HRA Trainer.png', name: 'Licensed Hypnotherapy HRA Training', desc: 'Licensed Hypnotherapist and HRA trainer, Bhanvi unlocks potential and guides transformative self-discovery.' },
  { img: '/img/Mental Coaching.png', name: 'Mental & Emotional Coaching', desc: 'As a mental and emotional life coach, Bhanvi uses mindfulness and energy work for holistic well-being and transformation.' },
  { img: '/img/Tarot card reading.jpg', name: 'Tarot Card Reading', desc: 'Tarot card reading offers insight, clarity, and guidance on life situations through intuitive interpretation.' },
  { img: '/img/Aura reading.jpg', name: 'Aura Reading', desc: 'Aura healing cleanses and balances your energy field, restoring harmony and vitality.' },
  { img: '/img/Money healing.jpg', name: 'Money Healing', desc: 'Money healing removes energetic blocks and limiting beliefs to attract abundance and financial flow.' },
  { img: '/img/Health healing.jpg', name: 'Health Healing', desc: 'Health healing blends energy work, nutrition, and mindfulness to balance body, mind, and spirit.' },
  { img: '/img/dna healing.jpg', name: 'DNA Healing', desc: 'DNA healing releases ancestral patterns and unlocks higher consciousness for spiritual growth.' },
  { img: '/img/Reiki healing.jpg', name: 'Reiki Healing', desc: 'Reiki channels universal energy to promote relaxation, reduce stress, and support healing.' },
  { img: '/img/Angel card reading.jpg', name: 'Angle Card Reading', desc: 'Angel card healing offers intuitive messages and emotional support from angelic realms.' },
  { img: '/img/Crystal healing.jpg', name: 'Crystals Healing', desc: 'Crystal healing uses gemstones to promote physical, emotional, and spiritual well-being.' },
];

export default function DivineWellnessServicesSection({ openModal }) {
  return (
    <section className="service_section pb-5">
      <div className="container">
        <h1 className="common_heading pt-5">Divine Wellness Services</h1>

        <div className="row pt-3 g-3">
          {services.map((service, idx) => (
            <div className="col-lg-4 col-sm-12 col-md-4" key={service.name + idx}>
              <div className="service_cat_cards">
                <div className="service_img">
                  <Image
                    src={service.img}
                    alt={service.name}
                    className="img-fluid w-100"
                    width={650}
                    height={525}
                    loading="lazy"
                    style={{ width: '100%', height: '370px', objectFit: 'cover', display: 'block' }}
                  />
                  <span className="img-overlay"></span>
                </div>

                <div className="service_cat_content pt-4">
                  <Link href="/divine-wellness" className="service_name">
                    {service.name}
                  </Link>
                  <p style={{ margin: '10px 0 0 0', fontSize: '1.05rem', color: '#444', fontWeight: 400 }}>
                    {service.desc}
                  </p>

                  <div className="common_btn py-3">
                    <button type="button" className="read_more" onClick={openModal}>
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
  );
} 