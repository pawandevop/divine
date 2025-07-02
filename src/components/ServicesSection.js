import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    img: '/img/img51.jpg',
    title: 'Slimming and Fat Reduction',
    href: '/elite-wellness/slimming-and-fat-reduction',
    desc: 'Our slimming treatments combine advanced non-invasive technology and traditional therapies to support healthy fat loss, body contouring, and metabolic wellness. From targeted G-series toning to 3D body sculpting, each session is tailored to redefine your silhouette while improving circulation, reducing cellulite, and boosting confidence. Detox therapies and Ayurvedic massages enhance the internal balance essential for long-term wellness.'
  },
  {
    img: '/img/img96.jpg',
    title: 'Hair and Face',
    href: '/elite-wellness/hair-and-face',
    desc: 'Revitalize your skin and hair from within using cutting-edge regenerative treatments like PRP, GFC, microneedling, and mesotherapy. These therapies stimulate natural collagen, improve texture and tone, and address issues like hair fall, pigmentation, and signs of aging. Infusions like IV Glutathione and boosters further enhance internal glow and cellular health for radiant, youthful skin.'
  },
  {
    img: '/img/img131.jpg',
    title: 'Chemical Peels',
    href: '/elite-wellness/chemical-peels',
    desc: 'Our curated range of medical-grade chemical peels is designed to rejuvenate, heal, and deeply refresh the skin from within. Each peel—whether for the face, underarms, or full body—is tailored to specific skin concerns like acne, pigmentation, dullness, or uneven texture. By gently exfoliating dead skin layers and stimulating new cell growth, these treatments promote clarity, balance oil production, and enhance skin radiance. Beyond cosmetic renewal, chemical peels offer emotional benefits—instilling confidence and supporting your journey toward holistic self-care and skin wellness.'
  },
  {
    img: '/img/img82.jpg',
    title: 'Beauty Treatments',
    href: '/elite-wellness/beauty-treatments',
    desc: 'Our curated range of medical-grade chemical peels is designed to rejuvenate, heal, and deeply refresh the skin from within. Each peel—whether for the face, underarms, or full body—is tailored to specific skin concerns like acne, pigmentation, dullness, or uneven texture. By gently exfoliating dead skin layers and stimulating new cell growth, these treatments promote clarity, balance oil production, and enhance skin radiance. Beyond cosmetic renewal, chemical peels offer emotional benefits—instilling confidence and supporting your journey toward holistic self-care and skin wellness.'
  },
  {
    img: '/img/img67.jpg',
    title: 'Laser Treatment',
    href: '/elite-wellness/laser-treatments',
    desc: 'Experience freedom and clarity with our state-of-the-art laser treatments for hair removal, pigmentation, and tattoo removal. These precision-focused sessions not only improve skin appearance but also support hygiene, comfort, and confidence—contributing to your overall sense of wellness and self-care.'
  },
];

export default function ServicesSection() {
  return (
    <section className="service_section">
      <div className="container">
        <h1 className="common_heading">Elite Wellness Services</h1>

        <div className="row pt-3 g-3">
          {services.map((service, idx) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={service.title + idx}>
              <div className="service_cat_cards h-100 d-flex flex-column">
                <div className="service_img">
                  <Image
                    src={service.img}
                    alt={service.title}
                    className="img-fluid w-100"
                    width={650}
                    height={525}
                    style={{ objectFit: 'cover', height: 260, width: '100%' }}
                  />
                </div>

                <div className="service_cat_content flex-grow-1 d-flex flex-column">
                  <Link href={service.href} className="service_name" style={{ textDecoration: 'none' }}>
                    {service.title}
                  </Link>

                  <p style={{ flexGrow: 1 }}>{service.desc}</p>

                  <div className="common_btn mt-auto">
                    <Link href={service.href} className="read_more">Read More</Link>
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