import React, { useState } from "react";

type Props = { open: boolean; onClose: () => void };

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: plug into your real API endpoint
    // await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
    onClose();
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
      <div className="modal">
        <div className="header">
          <h3 id="loginTitle">Returning Customer / Secure Login</h3>
          <button className="x" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={submit} className="body">
          <label className="label" htmlFor="login-email">Email Address:</label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="you@example.com"
          />

          <label className="label" htmlFor="login-pass">Password:</label>
          <input
            id="login-pass"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
          />

          <div className="row">
            <a className="link" href="/forgot">Password forgotten? Click here.</a>
          </div>

          <button type="submit" className="btn">LOGIN</button>
        </form>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: grid;
          place-items: center;
          z-index: 1000;
        }
        .modal {
          width: min(720px, 94vw);
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          overflow: hidden;
        }
        .header {
          background: #175fe6;
          color: #fff;
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header h3 { margin: 0; font-size: 18px; }
        .x {
          background: transparent; border: 0; color: #fff; font-size: 26px; cursor: pointer;
        }
        .body {
          padding: 18px;
          display: grid;
          gap: 10px;
        }
        .label { font-weight: 600; }
        .input {
          width: 100%;
          border: 1px solid #cdd7e1;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 16px;
        }
        .row { margin-top: 6px; }
        .link { color: #175fe6; text-decoration: none; }
        .link:hover { text-decoration: underline; }
        .btn {
          margin-top: 12px;
          background: linear-gradient(#4a5568, #1f2937);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          font-weight: 800;
          letter-spacing: 1px;
          cursor: pointer;
        }
        .btn:hover { filter: brightness(1.05); }
      `}</style>
    </div>
  );
};

export default LoginModal;
