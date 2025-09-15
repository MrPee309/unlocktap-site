// lib/firebaseAdmin.ts (SERVER ONLY)
import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";

let adminApp;
if (!getApps().length) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) { throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_JSON"); }
  const serviceAccount = JSON.parse(raw);
  adminApp = initializeApp({ credential: cert(serviceAccount) });
} else {
  adminApp = getApp();
}

export { adminApp };
