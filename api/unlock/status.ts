import type { NextApiRequest, NextApiResponse } from 'next'
import { dhruCall } from '../../../lib/dhru'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const resp = await dhruCall('getimeiorder', { id });
    res.json(resp);
  } catch (e:any) {
    res.status(500).json({ error: e?.message || 'Provider error' });
  }
}
