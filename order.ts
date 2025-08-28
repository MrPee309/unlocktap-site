import type { NextApiRequest, NextApiResponse } from 'next'
import { dhruCall } from '../../../lib/dhru'
import { getDb } from '../../../lib/firebase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { imei, email, serviceId, note } = req.body || {};
    const cleanImei = String(imei || '').replace(/\D/g, '');
    if (!/^\d{14,16}$/.test(cleanImei)) return res.status(400).json({ error: 'IMEI invalid' });
    if (!serviceId) return res.status(400).json({ error: 'serviceId missing' });

    const resp = await dhruCall('placeimeiorder', { imei: cleanImei, service: serviceId, comment: note || '' });

    const orderId = resp?.ID || resp?.OrderID || resp?.order_id || resp?.id || null;

    // optional log to Firestore
    try {
      const db = getDb();
      if (db) {
        await db.collection('unlock_orders').add({
          createdAt: Date.now(),
          imei: cleanImei,
          email: email || null,
          serviceId: String(serviceId),
          providerResponse: resp,
          orderId
        });
      }
    } catch {}

    res.status(200).json({ ok: true, orderId, provider: resp });
  } catch (e:any) {
    res.status(500).json({ error: e?.message || 'Provider error' });
  }
}
