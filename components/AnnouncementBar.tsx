'use client'

// Non-dismissible top announcement bar with smooth horizontal scrolling (marquee-style).
export default function AnnouncementBar() {
  const MESSAGE = 'Verify your iPhone, MacBook, and all Apple devices on our site — get reliable, direct information.'

  return (
    <div className="bar" role="region" aria-label="Site announcement">
      <div className="mask">
        <div className="track" aria-hidden="false">
          <span>{MESSAGE}</span>
          <span> • {MESSAGE}</span>
          <span> • {MESSAGE}</span>
          <span> • {MESSAGE}</span>
          <span> • {MESSAGE}</span>
          <span> • {MESSAGE}</span>
        </div>
      </div>
      <style jsx>{`
        .bar {
          position: sticky;
          top: 0;
          z-index: 60;
          background: linear-gradient(90deg, #0f172a, #0f766e);
          color: #fff;
          height: 34px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .mask {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
          padding: 0 12px;
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .track {
          display: inline-block;
          white-space: nowrap;
          animation: scroll 22s linear infinite;
          font-size: 14px;
        }
        .track span { padding-right: 28px; }
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
