import Navbar from '../components/Navbar';
import PromoTicker from '../components/PromoTicker';
import HeroSlider from '../components/HeroSlider';

export default function Home() {
  return (
    <main className="container">
      {/* Navbar */}
      <Navbar />

      {/* Promo message ticker */}
      <PromoTicker />

      {/* Hero image slider */}
      <HeroSlider />

      {/* Section prensipal */}
      <section style={{ marginTop: 20 }}>
        <h1 className="hero-title">Check IMEI & Unlock your device</h1>
        <p className="hero-sub">Landing verified with API-powered unlocking</p>
        <div className="row">
          <a className="button" href="/check">Start IMEI Check</a>
          <a className="button ghost" href="/unlock">Order Unlock</a>
        </div>
      </section>
    </main>
  );
}
