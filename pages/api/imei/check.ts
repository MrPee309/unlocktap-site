import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { imei } = req.query;
    const str = String(imei || '').replace(/\D/g, '');
    if (!/^\d{14,16}$/.test(str)) return res.status(400).json({ error: 'IMEI invalid' });
    const token = process.env.IMEIDB_TOKEN;
    if (!token) return res.status(500).json({ error: 'IMEIDB token missing' });
    const url = `https://imeidb.xyz/api/imei/${str}?format=json`;
    const r = await fetch(url, { headers: { 'X-Api-Key': token } });
    const data = await r.json();
    res.status(r.ok ? 200 : 400).json(data);
  } catch (e:any) {
    res.status(500).json({ error: e?.message || 'server error' });
  }
}
