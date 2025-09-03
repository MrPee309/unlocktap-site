import Link from 'next/link';
import { useState } from 'react';

/**
 * Minimal, dependency-free navbar with a single dropdown on the right.
 * Works with plain CSS-in-JS (style props) so it can't clash with your globals.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const container: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: '#fff',
    borderBottom: '1px solid #eef0f3',
  };

  const inner: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto',
    padding: '12px 16px',
    maxWidth: 1120,
  };

  const brand: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center', textDecoration: 'none' };
  const brandText: React.CSSProperties = { fontWeight: 800, fontSize: 20, color: '#111' };

  const menuWrap: React.CSSProperties = { position: 'relative' };
  const btn: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    background: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  };

  const dropdown: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    marginTop: 8,
    width: 220,
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    boxShadow: '0 8px 30px rgba(0,0,0,.06)',
    overflow: 'hidden',
  };

  const item: React.CSSProperties = {
    display: 'block',
    padding: '10px 12px',
    textDecoration: 'none',
    color: '#0f172a',
    fontWeight: 600,
  };

  return (
    <header style={container}>
      <nav style={inner}>
        {/* Brand */}
        <Link href="/" style={brand}>
          <img src="/unlocktap-logo.svg" alt="UnlockTap" width={28} height={28} />
          <strong style={brandText}>UnlockTap</strong>
        </Link>

        {/* Single dropdown */}
        <div style={menuWrap}>
          <button
            onClick={() => setOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={open}
            style={btn}
          >
            Menu ▾
          </button>

          {open && (
            <div style={dropdown} onMouseLeave={() => setOpen(false)}>
              <Link href="/" style={item}>Home</Link>
              <Link href="/check" style={item}>Check IMEI</Link>
              <Link href="/unlock" style={item}>Order Unlock</Link>
              <Link href="/status" style={item}>Order Status</Link>
              <div style={{height:1, background:'#eef0f3'}} />
              <Link href="/auth/login" style={item}>Login</Link>
              <Link href="/auth/register" style={item}>Register</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}