import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../lib/firebaseClient';

type Props = {
  mode: 'login' | 'register';
  after?: string; // where to redirect after success
};

export default function AuthForm({ mode, after = '/' }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push(after);
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 16 }}>{mode === 'register' ? 'Create account' : 'Sign in'}</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        <label>
          <div style={{ fontSize: 14, marginBottom: 4 }}>Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d0d5dd' }}
          />
        </label>
        <label>
          <div style={{ fontSize: 14, marginBottom: 4 }}>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d0d5dd' }}
          />
        </label>

        {error && (
          <div style={{ color: '#b42318', background: '#fee4e2', border: '1px solid #fda29b', padding: 10, borderRadius: 8 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #1d4ed8', background: '#2563eb', color: '#fff', fontWeight: 600 }}
        >
          {loading ? 'Please wait…' : (mode === 'register' ? 'Register' : 'Login')}
        </button>
      </div>
    </form>
  );
}
