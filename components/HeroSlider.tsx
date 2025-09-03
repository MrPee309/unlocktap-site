import { useEffect, useState } from 'react';

/**
 * Lightweight hero slider (no external libs). Falls back to a gradient
 * if images are missing. Put files in /public: slider-1.jpg, slider-2.jpg, slider-3.jpg
 */
const IMAGES = ['/slider-1.jpg', '/slider-2.jpg', '/slider-3.jpg'];

export default function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  const w: React.CSSProperties = {
    width: '100%',
    background: 'linear-gradient(135deg,#f8fafc,#e2e8f0)',
    borderBottom: '1px solid #eef0f3',
  };
  const inner: React.CSSProperties = {
    maxWidth: 1120, margin: '0 auto', padding: '16px',
  };
  const box: React.CSSProperties = {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
    boxShadow: '0 10px 30px rgba(0,0,0,.05)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${IMAGES[i]})`,
  };

  return (
    <section style={w}>
      <div style={inner}>
        <div style={box} />
      </div>
    </section>
  );
}