// lib/firebase.ts (SERVER - Admin SDK)
import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!raw) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_JSON (or FIREBASE_SERVICE_ACCOUNT_KEY)");
}
const serviceAccount = JSON.parse(raw);

const app = getApps().length ? getApp() : initializeApp({ credential: cert(serviceAccount) });

export const db = getFirestore(app);
export { app };
