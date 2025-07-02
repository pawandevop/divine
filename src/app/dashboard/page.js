'use client';
import '@/styles/backend-auth.css';
import '@/styles/dashboard.css';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import { useState, useEffect } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';

// Main dashboard page component
export default function Dashboard() {
  const router = useRouter();
  const [toast, setToast] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user info from server
    fetch('/api/me', { credentials: 'include' })
      .then(async res => {
        if (res.status === 200) {
          const data = await res.json();
          setUserEmail(data.email || '');
        } else if (res.status === 401) {
          router.replace('/login');
        }
      })
      .catch(() => {
        router.replace('/login');
      });
  }, []);

  // Show toast notification
  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Logout function
  async function handleLogout() {
    // Call API to clear JWT cookie server-side
    await fetch('/api/logout', { method: 'POST' });
    // Clear JWT cookie from client-side
    showToast('Logged out successfully!', 'success');
    // Redirect to login page after 1.2 seconds
    setTimeout(() => router.push('/login'), 1200);
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Dashboard-specific navbar at the top */}
      <DashboardNavbar onLogout={handleLogout} />

      {/* Main background container with gradient */}
      <div className="dashboard-bg">
        <div className="dashboard-card">
          <div className="dashboard-heading">
            Dashboard
            <span className="divider" />
          </div>

          <div className="dashboard-desc">
            Welcome <b>{userEmail ? `, ${userEmail}` : ''}!</b>
          </div>
        </div>
      </div>
    </>
  );
} 