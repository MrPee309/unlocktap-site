import type { NextApiRequest, NextApiResponse } from 'next'
import { dhruCall } from '../../../lib/dhru'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await dhruCall('imeiservicelist', {});
    const services = (data?.SERVICES || data?.services || []).map((s:any)=>({ id: s.ID || s.id, name: s.SERVICE || s.name }));
    res.json({ services });
  } catch (e:any) {
    // Fallback: allow manual service list via env JSON SERVICES_OVERRIDES
    try {
      const fallback = process.env.SERVICES_OVERRIDES ? JSON.parse(process.env.SERVICES_OVERRIDES) : [];
      res.json({ services: fallback });
    } catch {
      res.status(500).json({ error: e?.message || 'Provider error' });
    }
  }
}
