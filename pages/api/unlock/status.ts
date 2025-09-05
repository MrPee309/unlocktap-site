import type { NextApiRequest, NextApiResponse } from 'next';
import { DhruClient } from '../../../lib/dhru';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const referenceId = (req.query.referenceId || req.body?.referenceId || '').toString().trim();
    if (!referenceId) return res.status(400).json({ ok: false, error: 'Missing referenceId' });
    const dhru = new DhruClient();
    const out = await dhru.orderStatus(referenceId);
    return res.status(200).json({ ok: true, result: out });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' });
  }
}
