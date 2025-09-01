import type { NextApiRequest, NextApiResponse } from 'next';
import { ImeiDB } from '../../../lib/providers/imeidb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const imei = (req.query.imei || req.body?.imei || '').toString().trim();
    if (!imei || !/^\d{14,17}$/.test(imei)) {
      return res.status(400).json({ ok: false, error: 'Invalid IMEI' });
    }
    const client = new ImeiDB();
    const [carrier, fmi] = await Promise.all([
      client.checkCarrier(imei),
      client.checkFMI(imei),
    ]);

    return res.status(200).json({
      ok: true,
      imei,
      provider: 'ImeiDB',
      carrier: carrier.success ? carrier.data : { error: carrier.error },
      fmi: fmi.success ? fmi.data : { error: fmi.error },
    });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Server error' });
  }
}
