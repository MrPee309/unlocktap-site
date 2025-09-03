import Link from 'next/link';
import { useState } from 'react';

/**
 * Navbar with:
 * - Brand (logo + name)
 * - Single dropdown menu (Home, Check IMEI, Order Unlock, Order Status, Login, Register)
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{position:'sticky', top:0, zIndex:50, background:'#fff', borderBottom:'1px solid #eee'}}>
      <nav style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', maxWidth:1100, margin:'0 auto'}}>
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
            style={{padding:'8px 12px', border:'1px solid #ddd', borderRadius:8, background:'#fff'}}
          >
            Menu ▾
          </button>

          {open && (
            <div
              onClick={() => setOpen(false)}
              style={{position:'fixed', inset:0}}
            />
          )}

          {open && (
            <div
              role="menu"
              style={{
                position:'absolute', right:0, marginTop:8, width:220,
                background:'#fff', border:'1px solid #eee', borderRadius:10,
                boxShadow:'0 10px 30px rgba(0,0,0,0.08)', overflow:'hidden', zIndex:100
              }}
            >
              <MenuItem href="/">Home</MenuItem>
              <MenuItem href="/check">Check IMEI</MenuItem>
              <MenuItem href="/unlock">Order Unlock</MenuItem>
              <MenuItem href="/status">Order Status</MenuItem>
              <div style={{borderTop:'1px solid #f3f3f3'}} />
              <MenuItem href="/auth/login">Login</MenuItem>
              <MenuItem href="/auth/register">Register</MenuItem>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function MenuItem(props: {href: string; children: React.ReactNode}) {
  return (
    <Link
      href={props.href}
      style={{
        display:'block',
        padding:'10px 12px',
        textDecoration:'none',
        color:'#111',
      }}
    >
      {props.children}
    </Link>
  );
}