import type { NextApiRequest, NextApiResponse } from "next";
import { dhruServiceList } from "../../../lib/dhru";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await dhruServiceList();
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Server error" });
  }
}
