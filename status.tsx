import { useState } from 'react';

export default function Status() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const submit = async (e:any) => {
    e.preventDefault();
    setError(''); setData(null);
    if (!orderId) { setError('Antre Order ID.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/unlock/status?id=' + encodeURIComponent(orderId));
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Echèk');
      setData(json);
    } catch (err:any) {
      setError(err?.message || 'Error');
    } finally { setLoading(false); }
  }

  return (
    <div className="container">
      <h2>Order Status</h2>
      <form onSubmit={submit} className="card">
        <label>Order ID</label>
        <input className="input" value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="Provider Order ID" />
        <div style={{height:8}}/>
        <button className="button" disabled={loading}>Check</button>
      </form>

      {error && <div className="card"><b>Error:</b> {error}</div>}
      {data && <div className="card"><h3>Result</h3><pre>{JSON.stringify(data, null, 2)}</pre></div>}
    </div>
  );
}
