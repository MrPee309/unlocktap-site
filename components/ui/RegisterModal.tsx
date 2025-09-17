import React, { useState } from "react";

type Props = { open: boolean; onClose: () => void };

const RegisterModal: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  if (!open) return null;

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    // TODO: hook to your API endpoint
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(form) });
    onClose();
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="regTitle">
      <div className="modal">
        <div className="header">
          <h3 id="regTitle">Create Account</h3>
          <button className="x" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form onSubmit={submit} className="body">
          <div className="grid2">
            <div>
              <label className="label">E-mail address:</label>
              <input name="email" type="email" required className="input" value={form.email} onChange={change} />
            </div>
            <div>
              <label className="label">Phone Number:</label>
              <input name="phone" type="tel" className="input" value={form.phone} onChange={change} />
            </div>
            <div>
              <label className="label">Password:</label>
              <input name="password" type="password" required className="input" value={form.password} onChange={change} />
            </div>
            <div>
              <label className="label">Repeat password:</label>
              <input name="confirm" type="password" required className="input" value={form.confirm} onChange={change} />
            </div>
          </div>

          <h4 className="sub">Billing Information</h4>
          <div className="grid2">
            <div>
              <label className="label">First Name:</label>
              <input name="firstName" className="input" value={form.firstName} onChange={change} />
            </div>
            <div>
              <label className="label">Last Name:</label>
              <input name="lastName" className="input" value={form.lastName} onChange={change} />
            </div>
            <div>
              <label className="label">Company Name:</label>
              <input name="company" className="input" value={form.company} onChange={change} />
            </div>
            <div>
              <label className="label">Address:</label>
              <input name="address" className="input" value={form.address} onChange={change} />
            </div>
            <div>
              <label className="label">City:</label>
              <input name="city" className="input" value={form.city} onChange={change} />
            </div>
            <div>
              <label className="label">State/Province:</label>
              <input name="state" className="input" value={form.state} onChange={change} />
            </div>
            <div>
              <label className="label">Zip Code:</label>
              <input name="zip" className="input" value={form.zip} onChange={change} />
            </div>
            <div>
              <label className="label">Country:</label>
              <select name="country" className="input" value={form.country} onChange={change}>
                <option value="">Select…</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="FR">France</option>
                <option value="HT">Haiti</option>
                <option value="BR">Brazil</option>
                <option value="NG">Nigeria</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn">CONTINUE</button>
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
          width: min(900px, 96vw);
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
        .x { background: transparent; border: 0; color: #fff; font-size: 26px; cursor: pointer; }
        .body { padding: 18px; display: grid; gap: 12px; }
        .label { font-weight: 600; }
        .input {
          width: 100%;
          border: 1px solid #cdd7e1;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 15px;
          background: #fff;
        }
        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .sub { margin: 10px 0 0 0; }
        .btn {
          margin-top: 6px;
          background: linear-gradient(#4a5568, #1f2937);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          font-weight: 800;
          letter-spacing: 0.6px;
          cursor: pointer;
          width: max-content;
        }
        @media (max-width: 640px) {
          .grid2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default RegisterModal;
