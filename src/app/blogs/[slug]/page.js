import React from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import dynamic from 'next/dynamic';
import SocialButtons from '@/components/SocialButtons';
import Modal from '@/components/Modal';
import MobileTabs from '@/components/MobileTabs';
import BlogPostClient from '@/components/BlogPostClient';
import BlogClientShell from '@/components/BlogClientShell';
import { headers } from 'next/headers';

export default async function BlogPost(props) {
  const { params } = props;
  let blog = null;
  let error = null;
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const res = await fetch(`${protocol}://${host}/api/blog`, { cache: 'no-store' });
    const data = await res.json();
    if (!data.success) throw new Error('Failed to fetch blog');
    blog = data.posts.find(post => post.slug === params.slug);
    if (!blog) throw new Error('Blog not found');
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <BlogClientShell blog={blog} error={error} />
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  // Add all your blog slugs here
  return [
    { slug: 'wrinkle-treatment-in-delhi' },
    // { slug: 'another-blog-slug' },
    // { slug: 'yet-another-blog' },
  ];
}

function AccordionItem({ question, answer }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="accordion-item" style={{ marginBottom: 8 }}>
      <button
        className="accordion-btn"
        style={{
          width: '100%',
          textAlign: 'left',
          background: '#c49a5a',
          color: '#fff',
          border: 'none',
          padding: '18px 24px',
          fontSize: 18,
          fontWeight: 500,
          cursor: 'pointer',
          outline: 'none',
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span style={{ fontSize: 28, fontWeight: 400 }}>{open ? '-' : '+'}</span>
      </button>

      <div
        className="panel"
        style={{
          maxHeight: open ? 500 : 0,
          overflow: 'hidden',
          background: '#fff',
          color: '#222',
          transition: 'max-height 0.3s ease',
          padding: open ? '18px 24px' : '0 24px',
          border: open ? '1px solid #c49a5a' : 'none',
          borderTop: 'none',
        }}
      >
        <p style={{ margin: 0 }}>{answer}</p>
      </div>
    </div>
  );
} 