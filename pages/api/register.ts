// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }
  // TODO: Create user in your DB / Firebase. This is a stub success:
  return res.status(200).json({ ok: true, message: "Registered" });
}
