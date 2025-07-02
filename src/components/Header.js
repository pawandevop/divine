'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header({ openModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('dont__scroll');
    } else {
      document.body.classList.remove('dont__scroll');
    }
  }, [mobileMenuOpen]);

  return (
    <header>
      <div className={mobileMenuOpen ? 'ovelays active' : 'ovelays'} onClick={() => setMobileMenuOpen(false)}></div>

      <div className="topbar">
        <div className="container">
          <div className="header_layout">
            <div className="left_logo">
              <div className="mn-logo">
                <Link href="/">
                  <Image src="/img/Logo.png" alt="Logo" width={87} height={65} className="img-fluid" />
                </Link>
              </div>
            </div>

            {/* Mobile Appointment Button */}
            <div className="mob_appointment bliker">
              <a href="#" className="appointment_button" onClick={e => { e.preventDefault(); openModal && openModal(); }}>Book an appointment</a>
            </div>

            {/* Desktop Appointment Button */}
            <div className="right_navs">
              <div className="mob-menu-icon" id="ham" onClick={() => setMobileMenuOpen(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="7" width="32" height="3" rx="1.5" fill="#fff" />
                  <rect y="14.5" width="32" height="3" rx="1.5" fill="#fff" />
                  <rect y="22" width="32" height="3" rx="1.5" fill="#fff" />
                </svg>
              </div>

              <nav className="navmenu">
                <div className="justify-center">
                  <ul className="meni">
                    <li className="dropdown-home">
                      <Link href="/">Home</Link>
                    </li>

                    <li className="dropdown">
                      <a href="#">About</a>
                      <ul className="submenu">
                        <li><Link href="/about-us">About Divine Wellness Clinic</Link></li>
                        <li><Link href="/director-1">Director - Bhanavi Shivaya</Link></li>
                        <li><Link href="/director-2">Director - Rani Jha</Link></li>
                      </ul>
                    </li>

                    <li className="dropdown-divine-wellness">
                      <Link href="/divine-wellness">Divine Wellness</Link>
                    </li>

                    <li className="dropdown-elite-wellness">
                      <Link href="/elite-wellness">Elite Wellness</Link>
                      <ul className="submenu"></ul>
                    </li>

                    <li className="dropdown">
                      <a href="#">Gallery</a>
                      <ul className="submenu">
                        <li><Link href="/blogs">Blogs</Link></li>
                        <li><Link href="/results">Results</Link></li>
                        <li><Link href="/events">Events</Link></li>
                      </ul>
                    </li>

                    <li><Link href="/contact-us">Contact</Link></li>

                    <li><a className="heasder_btn bliker" href="#" onClick={e => { e.preventDefault(); openModal && openModal(); }}>Make an Appointment</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className={mobileMenuOpen ? 'mob_overlay active' : 'mob_overlay'} onClick={() => setMobileMenuOpen(false)}></div>

      <nav className={mobileMenuOpen ? 'nav-drill active' : 'nav-drill'}>
        <div className="logo">
          <Link href="/">
            <Image src="/img/logo-with-black-text.png" alt="Logo" width={87} height={65} className="img-fluid" />
          </Link>
          <div className="close_ico" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/icons/cross.webp" alt="Close" width={20} height={20} className="img-fluid" id="ham_close" />
          </div>
        </div>
        <ul className="mobile-menu-list">
          <li>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <details>
              <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                About
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8 }}><path d="M9 6l6 6-6 6" stroke="#EF9B0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </summary>
              <ul>
                <li><Link href="/about-us" onClick={() => setMobileMenuOpen(false)}>About Divine Wellness Clinic</Link></li>
                <li><Link href="/director-1" onClick={() => setMobileMenuOpen(false)}>Director - Bhanavi Shivaya</Link></li>
                <li><Link href="/director-2" onClick={() => setMobileMenuOpen(false)}>Director - Rani Jha</Link></li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/divine-wellness" onClick={() => setMobileMenuOpen(false)}>Divine Wellness</Link>
          </li>
          <li>
            <Link href="/elite-wellness" onClick={() => setMobileMenuOpen(false)}>Elite Wellness</Link>
          </li>
          <li>
            <details>
              <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Gallery
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8 }}><path d="M9 6l6 6-6 6" stroke="#EF9B0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </summary>
              <ul>
                <li><Link href="/blogs" onClick={() => setMobileMenuOpen(false)}>Blogs</Link></li>
                <li><Link href="/results" onClick={() => setMobileMenuOpen(false)}>Results</Link></li>
                <li><Link href="/events" onClick={() => setMobileMenuOpen(false)}>Events</Link></li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
} 