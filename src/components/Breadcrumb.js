import Link from 'next/link';
import React from 'react';

export default function Breadcrumb({ items }) {
  // Default breadcrumb if none provided
  const defaultItems = [
    { label: 'Home', href: '/' },
    { label: 'About Divine Elite Clinic' }
  ];
  const crumbs = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="banner_section" style={{ background: '#ef9b0f' }}>
      <div className="common_banner_content" style={{ background: '#ef9b0f' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', maxWidth: '1140px', margin: '0 auto' }}>
          <ul className="banner_bread_cum" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: '10px 0', fontSize: 15, fontWeight: 400, background: 'none' }}>
            {crumbs.map((item, idx) => (
              <React.Fragment key={item.label + idx}>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  {item.href ? (
                    <Link href={item.href} style={{ color: idx === crumbs.length - 1 ? '#000' : '#fff', textDecoration: 'none', fontWeight: 400 }}>{item.label}</Link>
                  ) : (
                    <span style={{ color: '#000', fontWeight: 400 }}>{item.label}</span>
                  )}
                </li>
                {idx < crumbs.length - 1 && (
                  <li aria-hidden="true" style={{ color: '#fff', margin: '0 6px', fontWeight: 400, fontSize: 15, display: 'flex', alignItems: 'center' }}>&raquo;</li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}