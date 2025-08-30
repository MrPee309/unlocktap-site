import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebaseClient';

type Props = {
  mode: 'login' | 'register';
  after?: string; // redirect path
};

export default function AuthForm({ mode, after = '/' }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (mode === 'register') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) { await updateProfile(cred.user, { displayName: name }); }
        setMsg('Account created!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMsg('Signed in!');
      }
      setTimeout(() => { window.location.href = after; }, 600);
    } catch (err: any) {
      setMsg(err?.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit} style={{maxWidth:520, margin:'0 auto'}}>
      <h2 style={{marginBottom:8}}>{mode === 'login' ? 'Sign in' : 'Create an account'}</h2>
      <p className="muted" style={{marginBottom:16}}>
        {mode === 'login' ? 'Welcome back — sign in to continue.' : 'It’s quick and easy.'}
      </p>

      {mode === 'register' && (
        <div style={{marginBottom:12}}>
          <label style={{display:'block',fontSize:14,marginBottom:6}}>Full name</label>
          <input className="input" placeholder="Jane Doe" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
      )}

      <div style={{marginBottom:12}}>
        <label style={{display:'block',fontSize:14,marginBottom:6}}>Email</label>
        <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
      </div>

      <div style={{marginBottom:16}}>
        <label style={{display:'block',fontSize:14,marginBottom:6}}>Password</label>
        <input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
      </div>

      <button className="button" disabled={loading} type="submit">
        {loading ? 'Please wait…' : (mode === 'login' ? 'Sign in' : 'Create account')}
      </button>
      <a href={mode === 'login' ? '/auth/register' : '/auth/login'} className="button ghost" style={{marginLeft:10}}>
        {mode === 'login' ? 'Create account' : 'Have an account? Sign in'}
      </a>

      {msg && <div style={{marginTop:12}} className="muted">{msg}</div>}
    </form>
  );
}
