# IMEI + Unlock Starter (Next.js on Vercel)

A minimal starter to:
- Check IMEI via **ImeiDB** (header token, JSON output).
- Place and track unlock orders via **DHRU‑compatible** provider (also works with many UnlockBase setups).

## Quick Start

```bash
pnpm i   # or npm i / yarn
cp .env.example .env.local
pnpm dev
```

Set these ENV variables:

```
IMEIDB_TOKEN=...

UNLOCK_PROVIDER=DHRU
DHRU_API_URL=https://your-dhru-provider.com/api/v2
DHRU_USERNAME=your_user
DHRU_API_KEY=your_key
DHRU_FORMAT=json   # or form (some providers require x-www-form-urlencoded)

# Optional: if your provider doesn't expose service list,
# inject a manual list (id + name)
# SERVICES_OVERRIDES=[{"id":123,"name":"Factory Unlock - iPhone Clean"},{"id":456,"name":"Samsung Codes - USA"}]

# Optional Firebase (for logging orders)
FIREBASE_SERVICE_ACCOUNT_JSON={"project_id":"...","client_email":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"}
```

## Endpoints

- `GET /api/imei/check?imei=351234567890123` → proxies to ImeiDB using `X-Api-Key`.
- `GET /api/unlock/services` → lists services from DHRU (`imeiservicelist`) or `SERVICES_OVERRIDES`.
- `POST /api/unlock/order` with `{ imei, email?, serviceId, note? }` → DHRU `placeimeiorder`.
- `GET /api/unlock/status?id=PROVIDER_ORDER_ID` → DHRU `getimeiorder`.

## Deploy to Vercel

1. Create a new Vercel project and import this folder.
2. Add the environment variables in **Settings → Environment Variables**.
3. Deploy. Add your domain in **Settings → Domains**.
4. Test the UI pages: `/check`, `/unlock`, `/status`.

## Notes

- ImeiDB API format and fields are described here: https://imeidb.xyz/api (token via `X-Api-Key` header, `json` format).
- DHRU actions vary slightly across providers; common actions are `accountinfo`, `imeiservicelist`, `placeimeiorder`, `getimeiorder`.
- If your provider requires **XML** instead of JSON, you can adapt the call in `lib/dhru.ts` to send XML and parse the XML response.
```diff
- options.headers['Content-Type'] = 'application/json'
- options.body = JSON.stringify(payload)
+ options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
+ options.body = new URLSearchParams(Object.entries(payload)).toString()
```
