// lib/firebase.ts
// Server-side Firebase (Admin SDK). Use ONLY in API routes or server components.

import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!raw) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_JSON env var");
}

const serviceAccount = JSON.parse(raw);

const app = !getApps().length
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApp();

export default app;
