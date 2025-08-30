import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="container">
      <Navbar />
      <section className="grid-2" style={{alignItems:"center", marginTop:"20px"}}>
        <div>
          <div className="badge"><span className="dot"></span> API‑powered unlocking</div>
          <h1 className="hero-title">Check IMEI & Unlock your device</h1>
          <p className="hero-sub">Fast, simple, professional. Verify devices with ImeiDB and order unlocks via DHRU‑compatible providers — all in one place.</p>
          <div className="row">
            <a className="button" href="/check">Start IMEI Check</a>
            <a className="button ghost" href="/unlock">Order Unlock</a>
          </div>
        </div>
        <aside className="card">
          <h3>Live demo (UI)</h3>
          <input className="input" placeholder="Enter IMEI (15 digits)" defaultValue="351234567890123" />
          <div style={{height:'12px'}} />
          <select className="select">
            <option>Select unlock service</option>
            <option>iPhone Factory Unlock</option>
            <option>Samsung Unlock</option>
          </select>
          <div style={{height:'12px'}} />
          <a className="button secondary" href="/unlock">Place Order</a>
        </aside>
      </section>

      <section style={{marginTop:'40px'}}>
        <div className="row">
          <div className="col card">
            <h3>Reliable IMEI checks</h3>
            <p className="muted">Accurate device details powered by ImeiDB APIs.</p>
          </div>
          <div className="col card">
            <h3>Easy unlock ordering</h3>
            <p className="muted">DHRU‑compatible providers with automated status tracking.</p>
          </div>
          <div className="col card">
            <h3>Clean, modern UI</h3>
            <p className="muted">Mobile‑first layout with clear forms and helpful feedback.</p>
          </div>
        </div>
      </section>

      <section style={{marginTop:'40px'}}>
        <h2>Pricing</h2>
        <div className="pricing">
          <div className="tier">
            <h3>Starter</h3>
            <div className="price">$0.99/check</div>
            <ul>
              <li>IMEI basic details</li>
              <li>Email receipt</li>
              <li>Support in 24h</li>
            </ul>
            <a className="button" href="/check">Get started</a>
          </div>
          <div className="tier featured">
            <h3>Pro</h3>
            <div className="price">$9.99/unlock</div>
            <ul>
              <li>Priority processing</li>
              <li>Live status updates</li>
              <li>Refund guarantee</li>
            </ul>
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
