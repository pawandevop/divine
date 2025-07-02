'use client';
import BlogPostClient from './BlogPostClient';
import dynamic from 'next/dynamic';

const ContactSection = dynamic(() => import('./ContactSection'), { ssr: false });

export default function BlogClientShell({ blog, error }) {
  return (
    <>
      <BlogPostClient blog={blog} error={error} />
      <ContactSection />
    </>
  );
} 