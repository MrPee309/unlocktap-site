'use client';
import React, {useState} from 'react';

export default function ImeiForm(){
  const [imei, setImei] = useState('');
  const [result, setResult] = useState(null);
  async function submit(e){
    e.preventDefault();
    try{
      const res = await fetch('/api/check-imei', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({imei})
      });
      const data = await res.json();
      setResult(data);
    }catch(err){
      setResult({ok:false,error:err.message});
    }
  }
  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="flex gap-2">
        <input value={imei} onChange={e=>setImei(e.target.value)} placeholder="Enter IMEI" className="border rounded px-3 py-2 flex-1" />
        <button className="bg-black text-white px-4 py-2 rounded">Check</button>
      </form>
      {result && <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(result,null,2)}</pre>}
    </div>
  );
}
