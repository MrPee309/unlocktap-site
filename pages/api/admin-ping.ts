import type { NextApiRequest, NextApiResponse } from "next";
import { adminApp } from "@/lib/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = getFirestore(adminApp);
    const serverTime = new Date().toISOString();
    res.status(200).json({ ok: true, serverTime });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || "unknown error" });
  }
}
