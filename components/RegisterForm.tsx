// components/forms/RegisterForm.tsx
"use client";
import { useState } from "react";

type FormState = {
  email: string;
  password: string;
  confirm: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country: string;
  captcha?: string;
  agreed: boolean;
};

const COUNTRIES = [
  "United States","Canada","United Kingdom","France","Haiti","Dominican Republic",
  "Brazil","Mexico","Germany","Spain","Italy","India","China","Japan","Australia","Other"
];

export default function RegisterForm() {
  const [form, setForm] = useState<FormState>({
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
    country: "United States",
    captcha: "",
    agreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm((f) => ({ ...f, [name]: target.checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!form.agreed) {
      setError("Please accept the Terms & Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();
      setSuccess(data?.message || "Account created successfully. You can now log in.");
      // Reset minimal sensitive fields
      setForm((f) => ({ ...f, password: "", confirm: "", captcha: "" }));
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold">Create your account</h2>

      {error && <div className="mb-3 rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">{error}</div>}
      {success && <div className="mb-3 rounded-md border border-green-200 bg-green-50 p-2 text-sm text-green-700">{success}</div>}

      <div className="grid gap-4">
        {/* Account */}
        <div>
          <label className="mb-1 block text-sm font-medium">E‑mail address *</label>
          <input name="email" type="email" value={form.email} onChange={onChange}
                 className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" placeholder="you@example.com" required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Password *</label>
            <input name="password" type="password" value={form.password} onChange={onChange}
                   className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" placeholder="••••••••" required minLength={6} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Repeat password *</label>
            <input name="confirm" type="password" value={form.confirm} onChange={onChange}
                   className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" placeholder="••••••••" required minLength={6} />
          </div>
        </div>

        {/* Billing */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">First Name *</label>
            <input name="firstName" value={form.firstName} onChange={onChange}
                   className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Last Name *</label>
            <input name="lastName" value={form.lastName} onChange={onChange}
                   className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" required />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Company Name</label>
          <input name="company" value={form.company} onChange={onChange}
                 className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Phone Number</label>
          <input name="phone" value={form.phone} onChange={onChange}
                 className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Address</label>
          <input name="address" value={form.address} onChange={onChange}
                 className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <input name="city" value={form.city} onChange={onChange}
                   className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">State/Province</label>
            <input name="state" value={form.state} onChange={onChange}
                   className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Zip Code</label>
            <input name="zip" value={form.zip} onChange={onChange}
                   className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Country</label>
          <select name="country" value={form.country} onChange={onChange}
                  className="w-full rounded-md border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600">
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Captcha placeholder */}
        <div className="grid gap-2 sm:grid-cols-[120px_1fr] items-center">
          <div className="rounded-md bg-green-50 p-3 text-center text-gray-700 border">5461</div>
          <input name="captcha" value={form.captcha} onChange={onChange}
                 className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                 placeholder="Enter the characters you see" />
        </div>

        <label className="mt-2 inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="agreed" checked={form.agreed} onChange={onChange} className="h-4 w-4" />
          I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </label>

        <button type="submit" disabled={loading}
                className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60">
          {loading ? "Creating..." : "Create account"}
        </button>
      </div>
    </form>
  );
}
