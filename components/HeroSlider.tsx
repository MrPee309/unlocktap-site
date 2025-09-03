import React, { useEffect, useState } from 'react';

/**
 * Lightweight slider under the promo bar.
 * Images should be in /public as slider-1.jpg, slider-2.jpg, slider-3.jpg (or svg/png).
 * If missing, we show pretty gradient cards as fallback.
 */
export default function HeroSlider() {
  const slides = [
    '/slider-1.jpg',
    '/slider-2.jpg',
    '/slider-3.jpg',
  ];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(v => (v + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, []);

  const src = slides[idx];

  return (
    <div style={{background:'#f7f9fc', borderBottom:'1px solid #eee'}}>
      <div style={{maxWidth:1100, margin:'0 auto', padding:'12px 16px'}}>
        <div style={{position:'relative', height:140, borderRadius:16, overflow:'hidden', background:'#eef3ff'}}>
          {/* Image if present */}
          <img
            src={src}
            alt="promo"
            onError={(e) => {
              // fallback to gradient block
              (e.target as HTMLImageElement).style.display = 'none';
              const fallback = document.getElementById('slider-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
            style={{width:'100%', height:'100%', objectFit:'cover'}}
          />
          {/* Fallback gradient */}
          <div id="slider-fallback" style={{
            display:'none',
            width:'100%', height:'100%',
            background:'linear-gradient(90deg,#0b63f6,#5ad7ff)'
          }} />
        </div>
      </div>
    </div>
  );
}