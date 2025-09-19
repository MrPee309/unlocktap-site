import React from "react";
import "./hero.css";

export default function AccountArea() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="account-area">
      <div className="breadcrumb">
        <span className="home-icon" aria-hidden>🏠</span>&nbsp;
        <a href="/">Home</a> / <strong>Account</strong>
        <span className="spacer" />
        <button className="link-btn" onClick={()=>setOpen(!open)}>
          {open ? "Close" : "Sign In"}
        </button>
      </div>

      {open && (
        <div className="login-card">
          <h3>Returning Customer / Secure Login</h3>
          <label>Email Address:</label>
          <input type="email" placeholder="name@email.com" />
          <label>Password:</label>
          <input type="password" placeholder="••••••••" />
          <button className="login-btn">LOGIN</button>
          <a className="forgot" href="/forgot">Password forgotten? Click here.</a>
        </div>
      )}
    </div>
  );
}
