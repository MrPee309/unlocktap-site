import { useState } from 'react'

export default function CheckImeiTest() {
  const [imei, setImei] = useState('356938035643809')
  const [out, setOut] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function run(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const r = await fetch('/api/check-imei', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imei }),
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
      <h1>Check IMEI – Test Page</h1>
      <form onSubmit={run} style={{display:'flex', gap:8}}>
        <input value={imei} onChange={e=>setImei(e.target.value)} placeholder="Enter IMEI"
               style={{flex:1, padding:'10px 12px', border:'1px solid #ddd', borderRadius:8}} />
        <button disabled={loading} style={{padding:'10px 16px', borderRadius:8}}>
          {loading ? 'Checking…' : 'Check'}
        </button>
      </form>
      <pre style={{whiteSpace:'pre-wrap', background:'#f7f7f7', padding:12, borderRadius:8, marginTop:16}}>
        {out ? JSON.stringify(out, null, 2) : 'Response will appear here'}
      </pre>
    </main>
  )
}
