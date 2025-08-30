import Image from 'next/image';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebaseClient';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const initial = (user?.displayName || user?.email || 'U')[0]?.toUpperCase?.() || 'U';

  return (
    <nav className="nav">
      <div className="brand">
        <Image src="/unlocktap-icon.svg" alt="UnlockTap" width={32} height={32} />
        <span className="brand-name">UnlockTap</span>
      </div>

      <div className="nav-links" style={{marginLeft:'auto', marginRight:8}}>
        <a href="/">Home</a>
        <a href="/check">Check IMEI</a>
        <a href="/unlock">Order Unlock</a>
      </div>

      <div className="menu-wrapper" style={{ position: 'relative' }}>
        <button
          className="button ghost"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          style={{ padding: '6px 12px' }}
        >
          {user ? initial : '☰'} {user ? '' : 'Menu'}
        </button>
        {open && (
          <div
            className="dropdown"
            style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              minWidth: 200,
              zIndex: 30,
              overflow: 'hidden'
            }}
            onMouseLeave={() => setOpen(false)}
          >
            {!user && (
              <>
                <a className="dropdown-item" href="/auth/login">🔑 Login</a>
                <a className="dropdown-item" href="/auth/register">📝 Register</a>
              </>
            )}
            <a className="dropdown-item" href="/status">📊 Order Status</a>
            <a className="dropdown-item" href="/pricing">💳 Pricing</a>
            {user && (
              <button
                className="dropdown-item"
                onClick={async () => { await signOut(auth); setOpen(false); }}
                style={{ width:'100%', textAlign:'left', background:'transparent', border:'none', cursor:'pointer' }}
              >
                🚪 Sign out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
