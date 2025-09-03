import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{position:'sticky',top:0,zIndex:40,background:'#fff',borderBottom:'1px solid #eee',backdropFilter:'blur(6px)'}}>
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',maxWidth:1080,margin:'0 auto'}}>
        {/* Brand */}
        <Link href="/" className="brand" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <img src="/unlocktap-logo.svg" alt="UnlockTap" width={28} height={28} />
          <strong style={{color:'#111'}}>UnlockTap</strong>
        </Link>

        {/* Single dropdown menu */}
        <div style={{position:'relative'}}>
          <button
            onClick={() => setOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={open}
            style={{padding:'8px 12px',border:'1px solid #e5e7eb',borderRadius:8,background:'#0b5cff',color:'#fff',fontWeight:600}}
          >
            Menu ▾
          </button>

          {open && (
            <div
              onMouseLeave={() => setOpen(false)}
              style={{position:'absolute',right:0,top:'calc(100% + 8px)',background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,boxShadow:'0 10px 24px rgba(0,0,0,0.12)',width:220,padding:8}}
            >
              <Link href="/" onClick={() => setOpen(false)} style={itemStyle}>Home</Link>
              <Link href="/check" onClick={() => setOpen(false)} style={itemStyle}>Check IMEI</Link>
              <Link href="/unlock" onClick={() => setOpen(false)} style={itemStyle}>Order Unlock</Link>
              <Link href="/status" onClick={() => setOpen(false)} style={itemStyle}>Order Status</Link>
              <hr style={{margin:'6px 0',border:0,borderTop:'1px solid #eee'}} />
              <Link href="/auth/login" onClick={() => setOpen(false)} style={itemStyle}>🔑 Login</Link>
              <Link href="/auth/register" onClick={() => setOpen(false)} style={itemStyle}>📝 Register</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

const itemStyle: React.CSSProperties = {
  display:'block',
  padding:'10px 12px',
  borderRadius:8,
  color:'#111',
  textDecoration:'none'
};
