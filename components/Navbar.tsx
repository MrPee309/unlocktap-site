import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',background:'#fff',borderBottom:'1px solid #eee'}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <img src="/unlocktap-icon.svg" alt="UnlockTap" width={28} height={28} />
        <strong>UnlockTap</strong>
        <span style={{marginLeft:8,fontSize:12,color:'#6b7280'}}>PAGES-NAV</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <Link href="/">Home</Link>
        <Link href="/check">Check IMEI</Link>
        <Link href="/unlock">Order Unlock</Link>
        <Link href="/status">Order Status</Link>
        <div style={{position:'relative'}}>
          <button onClick={()=>setOpen(v=>!v)} style={{padding:'6px 10px',border:'1px solid #e5e7eb',borderRadius:6,background:'#f9fafb'}}>Account ▾</button>
          {open && (
            <div style={{position:'absolute',right:0,top:'100%',background:'#fff',border:'1px solid #e5e7eb',borderRadius:8,boxShadow:'0 8px 24px rgba(0,0,0,0.12)',minWidth:180,zIndex:50}}>
              <a href="/auth/login" style={{display:'block',padding:'10px 14px',textDecoration:'none',color:'#111827'}}>🔑 Login</a>
              <a href="/auth/register" style={{display:'block',padding:'10px 14px',textDecoration:'none',color:'#111827'}}>📝 Register</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
