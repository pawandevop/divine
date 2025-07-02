'use client';
import { useState, useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ContactSection from '@/components/ContactSection';
import Modal from '@/components/Modal';
import SocialButtons from '@/components/SocialButtons';
import MobileTabs from '@/components/MobileTabs';

export default function Blogs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (data.success) {
          // Only show published blogs
          setBlogs(data.posts.filter(post => post.status === 'published'));
        } else {
          setError('Failed to fetch blogs.');
        }
      } catch (err) {
        setError('Failed to fetch blogs.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Pagination logic
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const paginatedBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <Header openModal={openModal} />

      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Blogs' }
      ]} />

      <section className="banner_section service">
        <div className="common_banner_content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="banner_heading">Blogs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="blogs-main">
        <section className="container" style={{ padding: '40px 0' }}>
          <div className="row">
            <div className="col-12">
              <h1 className="common_heading">Latest Blog Posts</h1>
              <p className="sub_para" style={{ textAlign: 'center' }}>Stay updated with the latest in skin, hair, and wellness treatments from Divine Elite Wellness. Explore expert tips, treatment options, and more.</p>
            </div>
          </div>
          <div className="row">
            {isLoading ? (
              <div className="col-12" style={{ textAlign: 'center', padding: '2rem' }}>Loading blogs...</div>
            ) : error ? (
              <div className="col-12" style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>{error}</div>
            ) : paginatedBlogs.length === 0 ? (
              <div className="col-12" style={{ textAlign: 'center', padding: '2rem' }}>No blog posts found.</div>
            ) : (
              paginatedBlogs.map((blog, idx) => (
                <div className="col-lg-6 col-md-6 col-12" key={blog._id}>
                  <div className="card h-100" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                    <img src={blog.images && blog.images.length > 0 ? blog.images[0] : '/img/Anti Aging.jpg'} alt={blog.title} className="card-img-top" style={{ height: 220, objectFit: 'cover' }} />
                    <div className="card-body d-flex flex-column">
                      <h2 className="card-title" style={{ fontSize: 22 }}>{blog.title}</h2>
                      <p className="card-text" style={{ flex: 1 }}>{blog.body?.replace(/<[^>]+>/g, '').slice(0, 120)}...</p>
                      <a href={`/blogs/${blog.slug}`} className="btn btn-primary mt-auto" style={{ background: '#ef9b0f', border: 'none', fontSize: 14, padding: '6px 24px', alignSelf: 'center', display: 'block', width: 'auto', marginTop: 16 }}>Read More</a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="row">
              <div className="col-12 d-flex justify-content-center mt-4">
                <nav aria-label="Blog pagination">
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item${currentPage === i + 1 ? ' active' : ''}`}>
                        <button className="page-link" style={{ border: 'none', background: 'none', color: currentPage === i + 1 ? '#ef9b0f' : '#333', fontWeight: 600, fontSize: 18 }} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </section>
      </main>

      <ContactSection hidemap={false} />
      <Footer />
      <Modal open={modalOpen} onClose={closeModal} />
      <SocialButtons />
      <MobileTabs openModal={openModal} />
    </>
  );
} 