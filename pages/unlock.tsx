import { useState, useEffect } from 'react';

type Service = { id: string|number, name: string };

export default function Unlock() {
  const [imei, setImei] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState<string>('');
  const [note, setNote] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [placing, setPlacing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/unlock/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data?.services || []);
        }
      } catch {}
    })();
  }, []);

  const submit = async (e:any) => {
    e.preventDefault();
    setError(''); setResult(null);
    if (!/^\d{14,16}$/.test(imei)) { setError('IMEI dwe 14–16 chif.'); return; }
    if (!serviceId) { setError('Chwazi yon sèvis.'); return; }
    setPlacing(true);
    try {
      const res = await fetch('/api/unlock/order', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ imei, email, serviceId, note })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Echèk');
      setResult(data);
    } catch (err:any) {
      setError(err?.message || 'Error');
    } finally { setPlacing(false); }
  }

  return (
    <div className="container">
      <h2>Order Unlock</h2>
      <form onSubmit={submit} className="card">
        <label>Service</label>
        <select className="input" value={serviceId} onChange={e=>setServiceId(e.target.value)}>
          <option value="">— select —</option>
          {services.map(s => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
        </select>
        <div style={{height:8}}/>
        <label>IMEI</label>
        <input className="input" value={imei} onChange={e=>setImei(e.target.value)} placeholder="15 digits" />
        <div style={{height:8}}/>
        <label>Notify Email (optional)</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        <div style={{height:8}}/>
        <label>Note (optional)</label>
        <input className="input" value={note} onChange={e=>setNote(e.target.value)} placeholder="Model, carrier, etc." />
        <div style={{height:8}}/>
        <button className="button" disabled={placing}>Place Order</button>
      </form>

      {error && <div className="card"><b>Error:</b> {error}</div>}
      {result && <div className="card"><h3>Order Created</h3><pre>{JSON.stringify(result, null, 2)}</pre></div>}
    </div>
  );
}
