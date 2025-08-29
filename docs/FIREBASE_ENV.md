# Firebase env setup (simplified)

You no longer need to convert the entire service account JSON to one line.
Use **three** environment variables instead (works on mobile too):

- `FIREBASE_PROJECT_ID` → e.g. `unlocktap-imei`
- `FIREBASE_CLIENT_EMAIL` → e.g. `firebase-adminsdk-xxx@unlocktap-imei.iam.gserviceaccount.com`
- `FIREBASE_PRIVATE_KEY` → paste the whole private key block
  - It can include real line breaks *or* `\n`. Both are accepted.

Then redeploy. If you still want to use the single JSON env,
`FIREBASE_SERVICE_ACCOUNT_JSON` is also supported as a fallback.
