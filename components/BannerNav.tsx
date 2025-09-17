import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

/**
 * BannerNav
 * A slim breadcrumb + auth bar to sit just under your top promo banner.
 * - Left: "Home / Account"
 * - Right: "Welcome, Guest! | Sign In | Register"
 * Clicking Sign In / Register opens modals without navigating.
 */
const BannerNav: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <nav className="bar" aria-label="Secondary">
        <div className="inner">
          <div className="left">
            <span className="homeIcon" aria-hidden>🏠</span>
            <a href="/" className="crumb">Home</a>
            <span className="sep">/</span>
            <a href="/account" className="crumb">Account</a>
          </div>

          <div className="right">
            <span className="welcome">Welcome, Guest!</span>
            <span className="pipe">|</span>
            {/* prevent navigation; open modal instead */}
            <a href="#login" onClick={(e) => { e.preventDefault(); setShowLogin(true); }}>Sign In</a>
            <span className="pipe">|</span>
            <a href="#register" onClick={(e) => { e.preventDefault(); setShowRegister(true); }}>Register</a>
          </div>
        </div>
      </nav>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />

      <style jsx>{`
        .bar {
          width: 100%;
          background: #f7f9fc;
          border-bottom: 1px solid #e6ebf1;
          font-size: 14px;
        }
        .inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .left, .right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .homeIcon {
          font-size: 16px;
          line-height: 1;
          margin-right: 2px;
        }
        .crumb {
          color: #0a3d91;
          text-decoration: none;
          font-weight: 600;
        }
        .crumb:hover { text-decoration: underline; }
        .sep { color: #95a0ad; }
        .welcome { color: #1f2937; }
        .pipe { color: #95a0ad; }
        .right a {
          color: #0a3d91;
          font-weight: 600;
          text-decoration: none;
        }
        .right a:hover { text-decoration: underline; }
      `}</style>
    </>
  );
};

export default BannerNav;
