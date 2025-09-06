// pages/api/order-unlock.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { dhruPlaceOrder } from '../../lib/dhru'
import { adminAuth, db } from '../../lib/firebaseAdmin'
import type { ApiResponse, OrderUnlockInput, OrderUnlockResult } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<OrderUnlockResult>>
) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

    // Verify auth (ID token from client)
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined
    if (!token) return res.status(401).json({ ok: false, error: 'Missing auth token' })
    const decoded = await adminAuth.verifyIdToken(token)

    const { imei, serviceId, notes } =
      (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as OrderUnlockInput
    if (!imei || !serviceId) return res.status(400).json({ ok: false, error: 'Missing imei/serviceId' })

    // Place order with supplier
    const placed = await dhruPlaceOrder(serviceId, imei, { notes })

    // Save to Firestore
    const doc = await db.collection('orders').add({
      uid: decoded.uid,
      imei,
      serviceId,
      supplier: 'DHRU',
      supplierResponse: placed,
      status: 'pending',
      createdAt: new Date(),
    })

    const result: OrderUnlockResult = { orderId: doc.id, eta: placed?.eta }
    return res.status(200).json({ ok: true, data: result })
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? 'Unknown error' })
  }
}
