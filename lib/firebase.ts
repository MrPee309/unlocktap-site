import admin from 'firebase-admin'

let app: admin.app.App | null = null;

function fromTripleEnv() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) return null;

  // Support both literal \n and real newlines
  privateKey = privateKey.replace(/\\n/g, '\n');

  return {
    projectId,
    clientEmail,
    privateKey,
  };
}

export function getDb() {
  if (app) return admin.firestore();

  // 1) Preferred: 3 separate env vars
  const triple = fromTripleEnv();
  if (triple) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: triple.projectId,
        clientEmail: triple.clientEmail,
        privateKey: triple.privateKey,
      } as any),
    });
    return admin.firestore();
  }

  // 2) Backward compat: single JSON env
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      const creds = JSON.parse(json);
      // Ensure private key has proper newlines if provided with \n
      if (creds.private_key && typeof creds.private_key === 'string') {
        creds.private_key = creds.private_key.replace(/\\n/g, '\n');
      }
      app = admin.initializeApp({ credential: admin.credential.cert(creds as any) });
      return admin.firestore();
    } catch (e) {
      console.error('Firebase init error (JSON parse):', e);
      return null;
    }
  }

  return null;
}
