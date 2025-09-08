import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { app } from '../lib/firebaseAppClient' // if you don't have this, replace with your existing firebase client export

export default function OrderStatusTest() {
  const [orderId, setOrderId] = useState('PASTE_ORDER_ID_FROM_PREVIOUS_STEP')
  const [out, setOut] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function run(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const auth = auth
      const tok = await auth.currentUser?.getIdToken()
      if (!tok) { setOut({ ok:false, error:'Please login first (Google in menu)' }); setLoading(false); return }
      const r = await fetch('/api/order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+tok },
        body: JSON.stringify({ orderId }),
      })
      setOut(await r.json())
    } catch (e) {
      setOut({ ok: false, error: String(e) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{maxWidth:720, margin:'24px auto', padding:'0 16px', fontFamily:'system-ui'}}>
      <h1>Order Status – Test Page</h1>
      <p>Login with Google from the menu first.</p>
      <form onSubmit={run} style={{display:'grid', gap:8}}>
        <input value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="Order ID"
               style={{padding:'10px 12px', border:'1px solid #ddd', borderRadius:8}} />
        <button disabled={loading} style={{padding:'10px 16px', borderRadius:8}}>
          {loading ? 'Checking…' : 'Check status'}
        </button>
      </form>
      <pre style={{whiteSpace:'pre-wrap', background:'#f7f7f7', padding:12, borderRadius:8, marginTop:16}}>
        {out ? JSON.stringify(out, null, 2) : 'Response will appear here'}
      </pre>
    </main>
  )
}
