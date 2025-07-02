import { useEffect } from 'react';

const COLORS = {
  success: '#4caf50', // green
  error: '#d32f2f',   // red
  warning: '#ff9800', // bright orange
};

const ICONS = {
  success: '✔️',
  error: '❌',
  warning: '⚠️',
};

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: '#fff',
        color: COLORS[type] || COLORS.success,
        padding: '16px 48px 16px 20px',
        borderRadius: 12,
        fontWeight: 500,
        fontSize: 16,
        boxShadow: '0 4px 24px #0002',
        minWidth: 220,
        maxWidth: 350,
        textAlign: 'left',
        transition: 'opacity 0.3s',
        cursor: 'pointer',
        borderLeft: `6px solid ${COLORS[type] || COLORS.success}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        animation: 'toast-fadein 0.4s',
      }}
      onClick={onClose}
      role="alert"
      aria-live="assertive"
    >
      <span style={{ fontSize: 22, marginRight: 10 }}>{ICONS[type] || ''}</span>
      <span style={{ flex: 1, color: '#222', fontWeight: 500 }}>{message}</span>
      <button
        onClick={e => { e.stopPropagation(); onClose(); }}
        aria-label="Close notification"
        style={{
          background: 'none',
          border: 'none',
          color: '#888',
          fontSize: 22,
          fontWeight: 700,
          cursor: 'pointer',
          marginLeft: 8,
          lineHeight: 1,
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes toast-fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          div[role='alert'] {
            right: 8px !important;
            left: 8px !important;
            min-width: unset !important;
            max-width: 95vw !important;
          }
        }
      `}</style>
    </div>
  );
} 