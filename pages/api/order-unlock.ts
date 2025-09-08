// pages/api/order-unlock.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { dhruPlaceOrder } from "../../lib/dhru";
import { db } from "../../lib/firebaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { imei, serviceId, userId } = body;

    if (!imei || typeof imei !== "string") return res.status(400).json({ success: false, error: "Missing IMEI" });
    if (!serviceId || typeof serviceId !== "string") return res.status(400).json({ success: false, error: "Missing serviceId" });

    const placed = await dhruPlaceOrder(imei, serviceId);

    await db.collection("orders").add({
      userId: userId || null, imei, serviceId, provider: "DHRU",
      providerOrder: placed, status: "placed", createdAt: new Date().toISOString(),
    });

    return res.status(200).json({ success: true, data: placed });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" });
  }
}
