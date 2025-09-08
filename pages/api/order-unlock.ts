// pages/api/order-unlock.ts
import type { NextApiRequest, NextApiResponse } from "next";
import * as dhru from "../../lib/dhru";
import { db } from "../../lib/firebase"; // if you use Firestore; remove if not

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { imei, serviceId, userId } = body;

    if (!imei || typeof imei !== "string") {
      return res.status(400).json({ success: false, error: "Missing IMEI" });
    }
    if (!serviceId || typeof serviceId !== "string") {
      return res.status(400).json({ success: false, error: "Missing serviceId" });
    }

    // Place order with supplier (expects 2 args: serviceId, imei)
    const placed = await dhru.placeOrder(serviceId, imei);

    // Optional: save to Firestore if your project uses it
    try {
      if (db) {
        await db.collection("orders").add({
          userId: userId || null,
          imei,
          serviceId,
          provider: "DHRU",
          providerOrder: placed,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (_) {
      // ignore storing error to not block response
    }

    return res.status(200).json({ success: true, data: placed });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" });
  }
}
