// components/AuthForm.tsx
"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseClient";

type Props = { mode?: "login" | "register"; after?: string; };

export default function AuthForm({ mode = "login", after = "/" }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      if (after) window.location.href = after;
    } catch (err: any) {
      setError(err?.message || "Auth error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "1rem auto" }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />
      {error && <div style={{ color: "crimson", marginBottom: 8, fontSize: 12 }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
        {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
