export default function CallButton() {
  return (
    <a href="tel:+919211586677"
      className="mobilenum desktop-display"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        marginTop: 10,
        textDecoration: 'none',
        background: '#000',
        padding: '12px 20px 10px 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        color: '#fff',
        fontWeight: 700,
        fontSize: 16,
        minWidth: 120,
        width: 'auto',
      }}
    >
      <img src="/icons/mob-icon.webp"
        alt="Mobile Icon"
        width={25}
        height={25}
        loading="lazy"
        style={{ marginBottom: 2, color: '#f3b805', filter: 'brightness(0) saturate(100%) invert(77%) sepia(81%) saturate(1200%) hue-rotate(1deg) brightness(101%) contrast(101%)' }}
      />

      <span
        style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.1, marginTop: 2, paddingLeft: 10 }}
      >
        +91-9211586677
      </span>
    </a>
  );
} 