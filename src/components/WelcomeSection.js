export default function WelcomeSection() {
  return (
    <section className="second_section">
      <div className="container">
        <h1 className="common_heading welcome-cursive">Welcome to <span>Divine Elite Wellness</span></h1>

        <div className="common_heading"></div>
        <div className="second_sec_content">
          <p>At The Divine Elite Wellness Clinic, we believe in a holistic approach to health that honors the unique
            journey of every individual. Our mission is to provide a sanctuary where modern science meets timeless
            healing practices, offering personalized wellness solutions that nurture the body, elevate the mind, and
            uplift the spirit. Whether you&apos;re seeking restorative therapies, preventive care, or transformative
            treatments, our dedicated team is here to guide you toward a healthier, more empowered life.</p>
        </div>

        <div className="row g-3 for_scroll">
          <div className="col-lg-4 col-md-4 col-sm-12 w_75">
            <div className="card_img">
              <img src="/img/img201.jpg" alt="Card Image" width={216} height={200} loading="lazy" />
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 w_75">
            <div className="card_img">
              <img src="/img/img120.jpg" alt="Card Image" width={216} height={200} loading="lazy" />
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 w_75">
            <div className="card_img">
              <img src="/img/img200.jpg" alt="Card Image" width={216} height={200} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 