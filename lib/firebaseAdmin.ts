// lib/firebaseAdmin.ts
import * as admin from 'firebase-admin'

let app: admin.app.App | undefined

if (!admin.apps.length) {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (!json) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not set')
  }
  const creds = JSON.parse(json)
  app = admin.initializeApp({
    credential: admin.credential.cert(creds as admin.ServiceAccount),
  })
} else {
  app = admin.app()
}

export const adminApp = app!
export const adminAuth = admin.auth(app)
export const db = admin.firestore(app)
