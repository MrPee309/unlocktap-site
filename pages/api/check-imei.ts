// pages/api/check-imei.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { imeidbCheck } from "../../lib/imeidb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    const { imei } = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    if (!imei || typeof imei !== "string") {
      return res.status(400).json({ success: false, error: "Missing or invalid IMEI" });
    }

    const result = await imeidbCheck(imei.trim());
    if (!result.success) {
      return res.status(502).json(result);
    }

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" });
  }
}
