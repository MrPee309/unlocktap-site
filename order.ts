import type { NextApiRequest, NextApiResponse } from "next";
import { dhruPlaceOrder } from "../../../lib/dhru";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const payload = req.body || {};
    const data = await dhruPlaceOrder(payload);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Server error" });
  }
}
