/**
 * A thin horizontal ticker bar for announcements (no CSS framework).
 */
export default function PromoTicker() {
  const bar: React.CSSProperties = {
    width: '100%',
    background: '#1e293b',
    color: '#e2e8f0',
    fontWeight: 700,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const inner: React.CSSProperties = {
    display: 'inline-block',
    padding: '8px 0',
    animation: 'scrollLeft 18s linear infinite',
  };

  const styleTag = (
    <style>{`
      @keyframes scrollLeft {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      @media (prefers-reduced-motion: reduce) {
        .no-motion { animation: none !important; }
      }
    `}</style>
  );

  return (
    <div style={bar}>
      {styleTag}
      <div className="no-motion" style={inner}>
        🔓 Fast IMEI checks • DHRU-compatible unlock orders • Optional Firebase logging • Launch promo: contact us for API onboarding
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        🔐 Secure & privacy-first • 24/7 endpoints • Built on Next.js + Vercel
      </div>
    </div>
  );
}