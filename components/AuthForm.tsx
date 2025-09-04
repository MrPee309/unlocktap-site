// components/AuthForm.tsx
"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebaseClient';

type Props = {
  mode?: 'login' | 'register';
  after?: string;
};

export default function AuthForm({ mode = 'login', after = '/' }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      window.location.href = after;
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{maxWidth: 400, margin: '0 auto'}}>
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{padding:10, borderRadius:8, border:'1px solid #ddd'}}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{padding:10, borderRadius:8, border:'1px solid #ddd'}}
        />
        <button
          type="submit"
          disabled={loading}
          style={{padding:'10px 14px', borderRadius:8, border:'none', background:'#2563eb', color:'#fff'}}
        >
          {loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Create Account')}
        </button>
        {error && <p style={{color:'crimson', fontSize:13}}>{error}</p>}
      </div>
    </form>
  );
}
