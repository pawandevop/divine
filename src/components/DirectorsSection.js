export default function DirectorsSection() {
  return (
    <section className="our_doctor">
      <div className="container">
        <div className="row g-3">
          <div className="col-lg-6 col-md-6 col-12 director-card d-flex flex-column">
            <div className="doc-img flex-grow-1 d-flex align-items-stretch">
              <img src="/img/Bhanavi_img.jpg" alt="Ms. Bhanavi Shivaya" width={389} height={387} loading="lazy" className="w-100 h-100 object-fit-cover" />
            </div>

            <div className="content flex-grow-1 d-flex flex-column justify-content-between py-3 px-5">
              <span className="service_name">Bhanavi Shivaya</span>
              <span>
                Bhanvi Shivaya, a spiritual teacher and life coach, began in hotel management at 17 and later directed 9 wellness centers. Recognizing the impact of mental coaching, she became a Reiki Grand Master, healing over 1500 globally. A licensed HRA practitioner, she founded a holistic Healing center with husband Vijay Gulati. Dedicated to charity, she aims to heal and help others worldwide.
              </span>
              <div className="know-more-button mt-3"><a href="/director-1">Know More</a></div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-12 director-card d-flex flex-column">
            <div className="doc-img flex-grow-1 d-flex align-items-stretch">
              <img src="/img/Rani_Jha_2.jpg" alt="Ms. Rani Jha" width={389} height={387} loading="lazy" className="w-100 h-100 object-fit-cover" />
            </div>

            <div className="content flex-grow-1 d-flex flex-column justify-content-between py-3 px-5">
              <span className="service_name">Rani Jha</span>
              <span className="pb-4">
                Rani Jha is the Managing Director and lead Cosmetologist at a premier destination for holistic beauty and wellness in Gurugram. With a profound commitment to enhancing natural beauty through advanced skincare and wellness treatments, she has cultivated a clinic that blends scientific expertise with personalized care.
              </span>
              <div className="know-more-button mt-3"><a href="/director-2">Know More</a></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 