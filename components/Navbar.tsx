import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebaseClient';

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (!menuRef.current || !btnRef.current) return;
      if (!menuRef.current.contains(t) && !btnRef.current.contains(t)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const initial = (user?.displayName || user?.email || 'U')[0]?.toUpperCase?.() || 'U';

  return (
    <nav className="nav" style={{display:'flex',alignItems:'center',gap:16,padding:'12px 16px',background:'#fff',borderBottom:'1px solid #eee',position:'sticky',top:0,zIndex:20}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <Image src="/unlocktap-icon.svg" alt="UnlockTap" width={28} height={28} />
        <span className="brand-name" style={{fontWeight:700}}>UnlockTap</span>
      </div>

      <div style={{marginLeft:'auto',display:'flex',gap:14}}>
        <Link href="/">Home</Link>
        <Link href="/check">Check IMEI</Link>
        <Link href="/unlock">Order Unlock</Link>
        <Link href="/status">Status</Link>
      </div>

      <div className="menu-wrapper" style={{position:'relative',marginLeft:8}}>
        <button ref={btnRef} className="button ghost" onClick={() => setOpen(v=>!v)} aria-expanded={open} style={{padding:'6px 10px'}}>
          {user ? initial : 'Account ▾'}
        </button>
        {open && (
          <div ref={menuRef} className="dropdown" style={{position:'absolute',right:0,top:'100%',background:'#fff',border:'1px solid #e5e7eb',borderRadius:8,boxShadow:'0 8px 24px rgba(0,0,0,0.12)',minWidth:200,overflow:'hidden'}}>
            {!user && (
              <>
                <Link className="dropdown-item" href="/auth/login">🔑 Login</Link>
                <Link className="dropdown-item" href="/auth/register">📝 Register</Link>
                <hr style={{margin:0,border:0,borderTop:'1px solid #eee'}} />
              </>
            )}
            <Link className="dropdown-item" href="/pricing">💳 Pricing</Link>
            {user && (
              <>
                <hr style={{margin:0,border:0,borderTop:'1px solid #eee'}} />
                <button className="dropdown-item" onClick={() => signOut(auth)} style={{width:'100%',textAlign:'left',background:'transparent',border:'none',cursor:'pointer'}}>🚪 Sign out</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
