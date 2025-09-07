// pages/api/order-status.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { dhruOrderStatus } from "../../lib/dhru";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }

    const data = await dhruOrderStatus(orderId);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
