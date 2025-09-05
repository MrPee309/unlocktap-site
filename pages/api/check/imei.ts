// pages/api/check/imei.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { checkIMEI } from "../../../lib/imeidb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const imei = (req.query.imei || req.body?.imei || "").toString().trim();
  if (!/^\d{14,17}$/.test(imei)) return res.status(400).json({ ok:false, error:"Invalid IMEI" });
  const out = await checkIMEI(imei);
  if (!out.ok) return res.status(500).json(out);
  return res.status(200).json({ ok:true, imei, provider:"IMEIDB", result: out.data });
}
