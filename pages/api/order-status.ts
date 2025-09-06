// pages/api/order-status.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { dhruOrderStatus } from '../../lib/dhru'
import { adminAuth, db } from '../../lib/firebaseAdmin'
import type { ApiResponse, OrderStatusInput, OrderStatusResult } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<OrderStatusResult>>
) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined
    if (!token) return res.status(401).json({ ok: false, error: 'Missing auth token' })
    const decoded = await adminAuth.verifyIdToken(token)

    const { orderId } = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as OrderStatusInput
    if (!orderId) return res.status(400).json({ ok: false, error: 'Missing orderId' })

    // Read order to find supplier ref
    const snap = await db.collection('orders').doc(orderId).get()
    if (!snap.exists) return res.status(404).json({ ok: false, error: 'Order not found' })
    const order = snap.data()!

    if (order.uid !== decoded.uid) return res.status(403).json({ ok: false, error: 'Forbidden' })

    // Query supplier
    const s = await dhruOrderStatus(order.supplierResponse?.order_id ?? orderId)
    const result: OrderStatusResult = { status: s?.status ?? 'unknown', code: s?.code, result: s }

    // Update local copy
    await db.collection('orders').doc(orderId).set(
      { status: result.status, lastSupplierStatus: s, updatedAt: new Date() },
      { merge: true }
    )

    return res.status(200).json({ ok: true, data: result })
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? 'Unknown error' })
  }
}
