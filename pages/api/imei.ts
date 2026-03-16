import type { NextApiRequest, NextApiResponse } from "next";
import { getIMEIData } from "../../lib/imeiService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { imei } = req.body;
  if (!imei) return res.status(400).json({ message: "IMEI is required" });

  try {
    const data = await getIMEIData(imei);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}