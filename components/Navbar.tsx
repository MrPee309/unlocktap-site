import Link from 'next/link';
import { useState } from 'react';

/**
 * UnlockTap Navbar
 * - Single dropdown menu (Home, Check IMEI, Order Unlock, Order Status)
 * - Auth links (Login / Register)
 * - Mobile friendly (button toggles)
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{position:'sticky', top:0, zIndex:50, background:'#fff', borderBottom:'1px solid #eee'}}>
      <nav style={{display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:1000, margin:'0 auto', padding:'10px 16px', gap:12}}>
        {/* Brand */}
        <Link href="/" className="brand" style={{display:'flex', alignItems:'center', gap:10, textDecoration:'none'}}>
          <img src="/unlocktap-logo.svg" alt="UnlockTap" width={28} height={28} />
          <strong style={{color:'#111'}}>UnlockTap</strong>
        </Link>

        {/* Single dropdown menu */}
        <div style={{position:'relative'}}>
          <button
            onClick={() => setOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={open}
            style={{padding:'8px 12px', border:'1px solid #ccc', borderRadius:6, background:'#f8f9fb', cursor:'pointer'}}
          >
            Menu ▾
          </button>

          {open && (
            <div
              style={{
                position:'absolute',
                right:0,
                marginTop:8,
                background:'#fff',
                border:'1px solid #e5e7eb',
                borderRadius:8,
                boxShadow:'0 8px 30px rgba(0,0,0,.08)',
                minWidth:220,
                overflow:'hidden'
              }}
            >
              <div style={{padding:'8px 0'}}>
                <Link href="/" style={itemStyle} onClick={() => setOpen(false)}>Home</Link>
                <Link href="/check" style={itemStyle} onClick={() => setOpen(false)}>Check IMEI</Link>
                <Link href="/unlock" style={itemStyle} onClick={() => setOpen(false)}>Order Unlock</Link>
                <Link href="/status" style={itemStyle} onClick={() => setOpen(false)}>Order Status</Link>
                <div style={{height:1, background:'#eee', margin:'6px 0'}} />
                <Link href="/auth/login" style={itemStyle} onClick={() => setOpen(false)}>Login</Link>
                <Link href="/auth/register" style={itemStyle} onClick={() => setOpen(false)}>Register</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Promo ticker */}
      <div style={{background:'#0b5cff', color:'#fff', fontSize:14}}>
        <div style={{maxWidth:1000, margin:'0 auto', padding:'6px 16px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
          ⚡ Promo: Instant IMEI check + DHRU compatible unlock ordering. Track order status in real time.
        </div>
      </div>
    </header>
  );
}

const itemStyle: React.CSSProperties = {
  display:'block',
  padding:'10px 14px',
  textDecoration:'none',
  color:'#111'
};
