import admin from 'firebase-admin'

let app: admin.app.App | null = null;

export function getDb() {
  if (app) return admin.firestore();
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json) return null;
  try {
    const creds = JSON.parse(json);
    app = admin.initializeApp({ credential: admin.credential.cert(creds as any) });
    return admin.firestore();
  } catch (e) {
    console.error('Firebase init error', e);
    return null;
  }
}
