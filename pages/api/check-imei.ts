// pages/api/check-imei.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { imeidbCheck } from '../../lib/imeidb'
import type { ApiResponse, CheckImeiInput, CheckImeiResult } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<CheckImeiResult>>
) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })
    const { imei } = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as CheckImeiInput
    if (!imei) return res.status(400).json({ ok: false, error: 'Missing imei' })

    const data = await imeidbCheck(imei)
    return res.status(200).json({ ok: true, data })
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? 'Unknown error' })
  }
}
