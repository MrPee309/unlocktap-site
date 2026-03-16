import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { getUserQuota, decrementUserQuota } from "../../lib/quota"
import { imeidbCheck } from "../../lib/imeidb" // fonksyon pou rele IMEICheck.com

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1️⃣ Verifye session itilizatè
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ success: false, error: "You must login first" })
  }

  const userId = session.user.id
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
    // 2️⃣ Rele IMEICheck.com API reyèl
    const result = await imeidbCheck(imei.trim())

    // 3️⃣ Diminye quota itilizatè a sèlman si IMEI verifye reyèlman
    if (result.success) {
      await decrementUserQuota(userId)
    }

    return res.status(result.success ? 200 : 502).json(result)
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" })
  }
}