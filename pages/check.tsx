import { useState } from 'react';

export default function Check() {
  const [imei, setImei] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const submit = async (e: any) => {
    e.preventDefault();
    setError(''); setResult(null);
    if (!/^\d{14,16}$/.test(imei)) { setError('IMEI dwe 14–16 chif.'); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/imei/check?imei=${encodeURIComponent(imei)}`);
      const data = await res.json();
      setResult(data);
    } catch (err:any) {
      setError(err?.message || 'Error');
    } finally { setLoading(false); }
  };

  return (
    <div className="container">
      <h2>Check IMEI</h2>
      <form onSubmit={submit} className="card">
        <label>IMEI</label>
        <input className="input" value={imei} onChange={e=>setImei(e.target.value)} placeholder="15 digits" />
        <div style={{height:8}}/>
        <button className="button" disabled={loading}>Verify</button>
      </form>

      {error && <div className="card"><b>Error:</b> {error}</div>}
      {result && (
        <div className="card">
          <h3>Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {result.device_image && <img src={result.device_image} alt="device" style={{maxWidth: '200px', borderRadius: 8}} />}
        </div>
      )}
    </div>
  );
}
