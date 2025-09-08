// pages/api/unlock/services.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { dhruServiceList } from "../../../lib/dhruServiceList";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    const data = await dhruServiceList();
    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" });
  }
}
