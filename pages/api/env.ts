// pages/api/debug/env.ts
import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    IMEIDB_API_KEY_present: !!process.env.IMEIDB_API_KEY,
    IMEIDB_BASE_URL: process.env.IMEIDB_BASE_URL || null
  });
}
