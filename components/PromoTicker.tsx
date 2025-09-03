import React from 'react';

/**
 * Thin horizontal promo ticker that scrolls text left-to-right.
 * Place it under the Navbar in _app.tsx
 */
export default function PromoTicker() {
  const msg = "🔥 UnlockTap.pro — Fast IMEI checks • DHRU-compatible unlock orders • Real‑time status tracking.  ";

  return (
    <div style={{background:'#0b63f6', color:'#fff', overflow:'hidden', borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
      <div className="promo-track" style={trackStyle}>
        <div style={{whiteSpace:'nowrap', padding:'6px 0', fontSize:13, opacity:0.95}}>
          {msg.repeat(10)}
        </div>
      </div>
      <style>{`
        @keyframes promoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const trackStyle: React.CSSProperties = {
  display:'inline-block',
  minWidth:'200%',
  animation:'promoScroll 18s linear infinite',
};