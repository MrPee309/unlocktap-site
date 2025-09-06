import type { NextApiRequest, NextApiResponse } from "next";
import { dhruOrderStatus } from "../../../lib/dhru";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = (req.query.id as string) || (req.body && req.body.id);
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = await dhruOrderStatus(id);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Server error" });
  }
}
