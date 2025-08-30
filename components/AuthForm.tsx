import { useState } from 'react';

type Props = {
  mode: 'login' | 'register';
  action: string;
};

export default function AuthForm({ mode, action }: Props) {
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
      const body: any = { email, password };
      if (mode === 'register') body.name = name;
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setMsg(data?.message || 'Success!');
    } catch (err:any) {
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
