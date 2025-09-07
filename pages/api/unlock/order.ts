// pages/api/unlock/order.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { dhruPlaceOrder } from "../../../lib/dhru";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imei, serviceId } = req.body;
    if (!imei || !serviceId) {
      return res.status(400).json({ error: "IMEI and serviceId are required" });
    }

    const data = await dhruPlaceOrder(imei, serviceId);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
