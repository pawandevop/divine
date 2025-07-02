export default function WhyChooseSection({ backgroundColor, textColor }) {
  return (
    <section className="why_choose_section" style={{ background: backgroundColor || undefined }}>
      <div className="container">
        <h2 className="common_heading pb-5" style={{ color: textColor || undefined }}>
          Why Choose <span>Divine Elite Wellness?</span>
        </h2>

        <div className="row pt-3 g-3">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="clinic_img">
              <img
                src="./img/pexels-photo-5659012.jpeg"
                loading="lazy"
                alt="Best Skin Clinic in Delhi"
                width={270}
                height={250}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="clinic_content" style={{ color: textColor || undefined }}>
              <p>Many people opt for our services at Divine Elite Wellness because.</p>

              <ul className="list">
                <li>Personalized holistic health consultations for mind-body balance.</li>
                <li>Nutritional counseling and detox programs for optimal wellness.</li>
                <li>Therapeutic massages to relieve stress and restore vitality.</li>
                <li>Rejuvenating facials and natural aesthetic treatments.</li>
                <li>Guided meditation and mindfulness practices for mental clarity.</li>
                <li>Energy healing sessions including Reiki and chakra balancing.</li>
                <li>Yoga and movement therapies to enhance physical harmony.</li>
              </ul>

              <div className="read_more">
                <a href="/about-us">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 