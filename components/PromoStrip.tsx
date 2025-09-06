'use client'

import Image from 'next/image'
import Link from 'next/link'

type Item = { src: string; alt?: string; href?: string }

/**
 * Slim, non-overlapping promo strip placed UNDER the nav.
 * It auto-scrolls horizontally; does not block page content.
 * You can pass up to ~10 images; it will loop them.
 */
export default function PromoStrip({ items = [] as Item[] }) {
  if (!items.length) return null

  // Duplicate items to create an infinite strip illusion
  const doubled = [...items, ...items]

  return (
    <div className="wrap" role="region" aria-label="Promotions">
      <div className="rail">
        {doubled.map((it, i) => {
          const img = (
            <Image
              src={it.src}
              alt={it.alt ?? 'Promotion'}
              width={320}
              height={80}
              className="img"
              priority={i < 2}
            />
          )
          return it.href ? (
            <Link key={i} href={it.href} className="card" target="_blank" rel="noopener noreferrer">
              {img}
            </Link>
          ) : (
            <div key={i} className="card">{img}</div>
          )
        })}
      </div>

      <style jsx>{`
        .wrap {
          position: relative;
          z-index: 10;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          overflow: hidden;
        }
        .rail {
          display: flex;
          gap: 16px;
          padding: 8px 12px;
          width: max-content;
          animation: slide 30s linear infinite;
          align-items: center;
        }
        .card {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          min-width: 320px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          background: #fafafa;
        }
        .img {
          height: 100%;
          width: auto;
          object-fit: cover;
        }

        @keyframes slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (min-width: 768px) {
          .card { height: 80px; min-width: 360px; }
        }
      `}</style>
    </div>
  )
}
