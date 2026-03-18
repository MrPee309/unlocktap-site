import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { incrementUserBalance } from "../../lib/quota"; // Ou ka itilize menm lib quota a pou balans

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ success: false, error: "You must login first" });

  if (req.method !== "POST")
    return res.status(405).json({ success: false, error: "Method Not Allowed" });

  const { service, amount } = req.body;
  if (!service || !amount || typeof amount !== "number")
    return res.status(400).json({ success: false, error: "Missing or invalid parameters" });

  try {
    const userId = session.user?.id || session.user?.email || "unknown";

    // Ajoute balans itilizatè a
    await incrementUserBalance(userId, amount);

    // Ou ka log tou top-up la ak service nan yon Firestore / DB
    return res.status(200).json({ success: true, message: `Top-up successful for ${service}` });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || "Server error" });
  }
}