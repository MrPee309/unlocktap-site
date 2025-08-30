import Image from 'next/image';
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
      if (!menuRef.current.contains(t) && !btnRef.current.contains(t)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const initial = (user?.displayName || user?.email || 'U')[0]?.toUpperCase?.() || 'U';

  return (
    <nav className="nav">
      <div className="brand">
        <Image src="/unlocktap-icon.svg" alt="UnlockTap" width={32} height={32} />
        <span className="brand-name">UnlockTap</span>
      </div>

      <div className="nav-links" style={{ marginLeft: 'auto', marginRight: 8 }}>
        <a href="/">Home</a>
        <a href="/check">Check IMEI</a>
        <a href="/unlock">Order Unlock</a>
      </div>

      <div className="menu-wrapper" style={{ position: 'relative' }}>
        <button
          ref={btnRef}
          className="button ghost"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          style={{ padding: '6px 12px' }}
        >
          {user ? initial : '☰ Menu'}
        </button>

        {open && (
          <div
            ref={menuRef}
            className="dropdown"
            style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              minWidth: 200,
              zIndex: 30,
              overflow: 'hidden',
            }}
          >
            {!user && (
              <>
                <a className="dropdown-item" href="/auth/login">🔑 Login</a>
                <a className="dropdown-item" href="/auth/register">📝 Register</a>
                <hr style={{ margin: 0, border: 0, borderTop: '1px solid #eee' }} />
              </>
            )}
            <a className="dropdown-item" href="/status">📊 Order Status</a>
            <a className="dropdown-item" href="/pricing">💳 Pricing</a>
            {user && (
              <>
                <hr style={{ margin: 0, border: 0, borderTop: '1px solid #eee' }} />
                <button
                  className="dropdown-item"
                  onClick={async () => { await signOut(auth); setOpen(false); }}
                  style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  🚪 Sign out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
