import React from "react";
import "./hero.css"; // keep this relative if you place both in the same folder

export default function HeroPlain() {
  return (
    <section className="hero-wrap">
      <div className="hero-inner">
        <div className="hero-left">
          <h1>Check IMEI &amp; Unlock your device</h1>
          <p>Fast IMEI validation and unlocking — enter IMEI below to check status.</p>
          <form className="imei-form" onSubmit={(e)=>e.preventDefault()}>
            <input placeholder="Enter IMEI number" aria-label="IMEI" />
            <button>Check</button>
          </form>
          <a className="order-link" href="/order-unlock">Order Unlock →</a>
          <div className="hero-features">
            <div>IMEI Check</div><div>Unlock Orders</div><div>Pricing</div><div>Login / Register</div>
          </div>
        </div>
        <div className="hero-right">
          <div className="device-card">
            <img src="/images/device-mockup.png" alt="Device" />
          </div>
        </div>
      </div>
    </section>
  )
}
