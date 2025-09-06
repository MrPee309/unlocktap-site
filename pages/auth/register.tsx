"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
    } catch (e: any) {
      setErr(e?.message || "Register failed");
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p style={{ color: "crimson" }}>{err}</p>}
        <button type="submit">Create account</button>
      </form>
    </main>
  );
}
