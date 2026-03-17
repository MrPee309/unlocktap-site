// pages/api/check-imei.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"
import { getUserQuota, decrementUserQuota } from "../../lib/quota"
import { imeidbCheck } from "../../lib/imeidb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ success: false, error: "You must login first" })
  }

  const userId = session.user?.id || session.user?.email || "unknown"
  const userQuota = await getUserQuota(userId)

  if (userQuota <= 0) {
    return res.status(403).json({ success: false, error: "You have used all your free checks" })
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" })
  }

  const { imei } = req.body
  if (!imei || typeof imei !== "string") {
    return res.status(400).json({ success: false, error: "Missing or invalid IMEI" })
  }

  try {
    const result = await imeidbCheck(imei.trim())
    if (result.success) await decrementUserQuota(userId)
    return res.status(result.success ? 200 : 502).json(result)
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" })
  }
}