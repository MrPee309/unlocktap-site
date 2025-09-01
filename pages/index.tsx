import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="container">
      <Navbar />
      <section style={{marginTop:20}}>
        <h1 className="hero-title">Check IMEI & Unlock your device</h1>
        <p className="hero-sub">Landing verified with Pages Router.</p>
        <div className="row">
          <a className="button" href="/check">Start IMEI Check</a>
          <a className="button ghost" href="/unlock">Order Unlock</a>
        </div>
      </section>
    </main>
  );
}
