import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  // Optional extras (set if you have them):
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Basic validation to help at runtime
['apiKey','authDomain','projectId','appId'].forEach((k)=>{
  const key = 'NEXT_PUBLIC_FIREBASE_' + k.toUpperCase();
  if (!process.env[key]) {
    // eslint-disable-next-line no-console
    console.warn(`[firebase] Missing env: ${key}`);
  }
});

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
