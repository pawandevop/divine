import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="footer_widget widget_1">
              <div className="footer_logo">
                <Link href="/">
                  <img src="/img/logo-with-black-text.png" alt="Logo" width={173} height={130} className="img-fluid" loading="lazy" />
                </Link>
              </div>

              <ul className="footer_social_icon" style={{ display: 'flex', gap: '10px', padding: 0, margin: '20px 0' }}>
                <li className="facebookLink">
                  <a href="#" aria-label="Facebook" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: '#1877f2', color: '#fff', fontSize: 22 }}>
                    <FaFacebookF />
                  </a>
                </li>

                <li className="instagramLink">
                  <a href="https://www.instagram.com/divineelitewellnesclinic?igsh=MWhkOGdhaTRjaWYwZw==" aria-label="Instagram" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', color: '#fff', fontSize: 22 }}>
                    <FaInstagram />
                  </a>
                </li>

                <li className="youtubeLink">
                  <a href="#" aria-label="YouTube" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: '#ff0000', color: '#fff', fontSize: 22 }}>
                    <FaYoutube />
                  </a>
                </li>

                <li className="XLink">
                  <a href="#" aria-label="X" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: '#000', color: '#fff', fontSize: 22 }}>
                    <FaXTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-3 col-sm-12">
            <div className="footer_widget widget_2">
              <div className="widget_heading">Links</div>
              <ul className="widget_list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/divine-wellness">Divine Wellness</Link></li>
                <li><Link href="/elite-wellness">Elite Wellness</Link></li>
                <li><Link href="/results">Results</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="footer_widget">
              <div className="footer_contact_mail">
                <div className="widget_heading">E-mail</div>
                <ul>
                  <li>
                    <a href="mailto:info@divineelitewellness.com">info@divineelitewellness.com</a>
                  </li>
                </ul>
              </div>

              <div className="footer_contact_phone">
                <div className="widget_heading">Call Us Now</div>
                <ul>
                  <li><a href="tel:+919211586677">+91-9211586677</a></li>
                </ul>
              </div>

              <div className="footer_contact_phone time">
                <div className="widget_heading">Timings</div>
                <ul>
                  <li><a>All Day Open - 10:30AM-08:00PM</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="footer_widget f_description">
              <div className="widget_heading">Disclaimer:</div>
              <p className="footer_disc"> Results may vary depending on the individual &amp; multiple factors including age, gender, skin type, condition, other products used, health history, environment and lifestyle. All images used on the website are for illustrative purposes only.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 