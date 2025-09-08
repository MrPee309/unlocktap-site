// pages/api/check-imei.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { imeidbCheck } from "../../../lib/imeidb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imei } = req.body;
    if (!imei) {
      return res.status(400).json({ error: "IMEI is required" });
    }

    const data = await imeidbCheck(imei);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Server error" });
  }
}
