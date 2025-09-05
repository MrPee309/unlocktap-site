import type { NextApiRequest, NextApiResponse } from 'next';
import { DhruClient } from '../../../lib/dhru';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  try {
    const { serviceId, imei, fields } = req.body || {};
    if (!serviceId || !imei) return res.status(400).json({ ok: false, error: 'Missing serviceId or imei' });
    const dhru = new DhruClient();
    const out = await dhru.placeOrder(serviceId, imei, fields || {});
    return res.status(200).json({ ok: true, result: out });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' });
  }
}
