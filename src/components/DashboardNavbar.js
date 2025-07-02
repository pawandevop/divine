"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export default function DashboardNavbar({ onLogout }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="backend-navbar dashboard-navbar">
      {/* Logo and dashboard title on the left */}
      <a href="/dashboard" className="backend-navbar-logo" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Image
          src="/img/logo-backend.png"
          alt="Dashboard Logo"
          width={40}
          height={40}
          style={{ borderRadius: '50%', objectFit: 'cover', background: 'transparent' }}
          priority
        />
        <span className="backend-navbar-title">Dashboard</span>
      </a>

      {/* Hamburger for mobile */}
      <button
        className="dashboard-navbar-hamburger"
        aria-label="Open navigation menu"
        onClick={() => setMobileNavOpen((v) => !v)}
      >
        <FaBars size={22} />
      </button>

      {/* Dashboard nav links */}
      <div
        className={`dashboard-navbar-links${mobileNavOpen ? ' open' : ''}`}
        style={{ display: mobileNavOpen ? 'flex' : '', gap: 20, marginLeft: 32 }}
      >
        <a href="/dashboard/blog" className="dashboard-nav-link">Blog</a>
        <a href="/dashboard/event" className="dashboard-nav-link">Event Upload</a>
        <a href="/dashboard/results" className="dashboard-nav-link">Result Upload</a>
        <button
          className="backend-navbar-btn dashboard-navbar-mobile-logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      {/* Logout button on the right (desktop only) */}
      <button
        className="backend-navbar-btn dashboard-navbar-desktop-logout"
        onMouseOver={e => (e.target.style.background = '#b97a3a')}
        onMouseOut={e => (e.target.style.background = 'var(--brown)')}
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  );
} 