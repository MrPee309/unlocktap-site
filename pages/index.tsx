export default function Home() {
  return (
    <main className="container">
      <section style={{ marginTop: 20 }}>
        <h1 className="hero-title">Check IMEI & Unlock</h1>
        <p className="hero-sub">
          Fast, simple, professional. Verify devices and place unlock orders — all in one place.
        </p>
        <div className="row">
          <a className="button" href="/check">Start IMEI Check</a>
          <a className="button ghost" href="/unlock" style={{ marginLeft: 12 }}>Order Unlock</a>
          <a className="button ghost" href="/status" style={{ marginLeft: 12 }}>Order Status</a>
        </div>
      </section>
    </main>
  );
}
