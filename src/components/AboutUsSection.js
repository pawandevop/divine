export default function AboutUsSection() {
  return (
    <section className="about-doctor" style={{ background: '#fff', padding: '40px 0' }}>
      <div className="container">
        <h1 className="common_heading" style={{ textAlign: 'center' }}>
          WELCOME TO <span style={{ color: '#ef9b0f' }}>DIVINE ELITE WELLNESS</span>
        </h1>

        <div className="row g-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="col-lg-6" style={{ textAlign: 'center' }}>
            <img
              className="about-img"
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Divine Elite Wellness Clinic"
              width="570"
              height="400"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          </div>

          <div className="col-lg-6 about-text">
            <p>
              Wellness is the complete integration of body, mind, and spirit&mdash;the realization that everything we do, think, feel, and believe has an effect on our state of well-being.&quot;&mdash; <b>Greg Anderson</b>
            </p>
            <p>
              At The Divine Elite Wellness Clinic, we believe in a holistic approach to health that honors the unique journey of every individual. Our mission is to provide a sanctuary where modern science meets timeless healing practices, offering personalized wellness solutions that nurture the body, elevate the mind, and uplift the spirit.
            </p>
            <p>
              Whether you&apos;re seeking restorative therapies, preventive care, or transformative treatments, our dedicated team is here to guide you toward a healthier, more empowered life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 