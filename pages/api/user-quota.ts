// pages/api/user-quota.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { getUserQuota } from "../../lib/quota"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Dummy user pou teste rapid
  const userId = "test-user"

  try {
    const quota = await getUserQuota(userId)
    return res.status(200).json({ success: true, quota })
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" })
  }
}