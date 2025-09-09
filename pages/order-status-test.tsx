// pages/order-status-test.tsx
// Patched: import from '../lib/firebaseClient' instead of '../lib/firebase'

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../lib/firebaseClient';

export default function OrderStatusTest() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);

  async function checkStatus() {
    try {
      setLoading(true);
      const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;

      const res = await fetch('/api/order-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResult(`Error: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{maxWidth: 640, margin: '32px auto', padding: 16}}>
      <h1>Order Status Test</h1>
      <label style={{display: 'block', marginBottom: 8}}>
        Order ID
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="enter order id"
          style={{display:'block', width:'100%', padding:8, marginTop:4}}
        />
      </label>
      <button onClick={checkStatus} disabled={loading || !orderId}>
        {loading ? 'Checking...' : 'Check Status'}
      </button>
      {result && (
        <pre style={{whiteSpace:'pre-wrap', background:'#111', color:'#0f0', padding:12, marginTop:16, borderRadius:6}}>
          {result}
        </pre>
      )}
    </main>
  );
}
