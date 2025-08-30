export default function Home() {
  // INLINE NAVBAR (for diagnosis) — no imports needed
  return (
    <main className="container">
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,margin:'12px 0'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <img src="/unlocktap-icon.svg" alt="UnlockTap" width={28} height={28} />
          <strong>UnlockTap</strong>
          <span style={{marginLeft:10,fontSize:12,color:'#6b7280'}}>DEBUG-INLINE</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <a href="/">Home</a>
          <a href="/check">Check IMEI</a>
          <a href="/unlock">Order Unlock</a>
          <a href="/status">Order Status</a>
          <a href="/auth/login" style={{padding:'6px 10px',border:'1px solid #e5e7eb',borderRadius:6,background:'#f9fafb'}}>Login</a>
          <a href="/auth/register" style={{padding:'6px 10px',border:'1px solid #e5e7eb',borderRadius:6,background:'#f9fafb'}}>Register</a>
        </div>
      </nav>

      <section style={{marginTop:20}}>
        <h1 className="hero-title">Check IMEI & Unlock your device</h1>
        <p className="hero-sub">This index.tsx replaces old content to verify navbar rendering.</p>
        <div className="row">
          <a className="button" href="/check">Start IMEI Check</a>
          <a className="button ghost" href="/unlock">Order Unlock</a>
        </div>
      </section>
    </main>
  );
}
