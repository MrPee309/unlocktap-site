import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="container">
      <Navbar />
      <section className="grid-2" style={{alignItems:"center", marginTop:"10px"}}>
        <div>
          <div className="badge"><span className="dot"></span> API‑powered unlocking</div>
          <h1 className="hero-title">Check IMEI & Unlock your device</h1>
          <p className="hero-sub">Fast, simple, professional. Verify devices with ImeiDB and order unlocks via DHRU‑compatible providers — all in one place.</p>
          <div className="row">
            <a className="button" href="/check">Start IMEI Check</a>
            <a className="button ghost" href="/unlock">Order Unlock</a>
          </div>
          <div className="row" style={{marginTop:"20px"}}>
            <div className="stat"><b>5k+</b><span className="muted">checks</span></div>
            <div className="stat"><b>98%</b><span className="muted">success</span></div>
            <div className="stat"><b>24/7</b><span className="muted">support</span></div>
          </div>
        </div>
        <aside className="card">
          <h3>Live demo (UI)</h3>
          <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
            <input className="input" placeholder="Enter IMEI (15 digits)" defaultValue="351234567890123" />
            <a className="button" href="/check">Verify</a>
          </div>
          <div style={{height:'16px'}}></div>
          <select className="select">
            <option>Select unlock service</option>
            <option>iPhone Factory Unlock (Clean)</option>
            <option>Samsung Code – USA</option>
          </select>
          <div style={{height:'10px'}}></div>
          <a className="button secondary" href="/unlock">Place Order</a>
        </aside>
      </section>

      <section style={{marginTop:'40px'}}>
        <div className="row">
          <div className="col card">
            <div className="feature">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="2" width="16" height="20" rx="4" stroke="white" strokeWidth="2"/>
                  <path d="M7 11h10v6H7z" stroke="white" strokeWidth="2"/>
                  <path d="M9 11V8a3 3 0 0 1 6 0v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3>Reliable IMEI checks</h3>
                <p className="muted">Accurate device details powered by ImeiDB APIs.</p>
              </div>
            </div>
          </div>
          <div className="col card">
            <div className="feature">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h16M12 4l8 8-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3>Easy unlock ordering</h3>
                <p className="muted">DHRU‑compatible providers with automated status tracking.</p>
              </div>
            </div>
          </div>
          <div className="col card">
            <div className="feature">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M2 12h20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3>Clean, modern UI</h3>
                <p className="muted">Mobile‑first layout with clear forms and helpful feedback.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{marginTop:'40px'}}>
        <h2>Pricing</h2>
        <div className="pricing" style={{marginTop:'14px'}}>
          <div className="tier">
            <h3>Starter</h3>
            <div className="price">$0.99/check</div>
            <ul>
              <li>IMEI basic details</li>
              <li>Email receipt</li>
              <li>Support in 24h</li>
            </ul>
            <div style={{height:'10px'}} />
            <a className="button" href="/check">Get started</a>
          </div>
          <div className="tier" style={{borderColor:'var(--ut-primary)',boxShadow:'var(--ut-shadow-md)'}}>
            <h3>Pro</h3>
            <div className="price">$9.99/unlock</div>
            <ul>
              <li>Priority processing</li>
              <li>Live status updates</li>
              <li>Refund guarantee</li>
            </ul>
            <div style={{height:'10px'}} />
            <a className="button" href="/unlock">Choose Pro</a>
          </div>
          <div className="tier">
            <h3>Enterprise</h3>
            <div className="price">Custom</div>
            <ul>
              <li>Bulk checks & orders</li>
              <li>API access</li>
              <li>Dedicated support</li>
            </ul>
            <div style={{height:'10px'}} />
            <a className="button secondary" href="/contact">Contact sales</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        © UnlockTap — modern IMEI & unlock platform
      </footer>
    </main>
  );
}
