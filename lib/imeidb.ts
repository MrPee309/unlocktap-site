// lib/imeidb.ts
// Drop-in replacement that provides a **named** export `checkImei`
// so `import { checkImei } from "@/lib/imeidb"` works everywhere.

export async function checkImei(imei: string) {
  const base = process.env.IMEIDB_API_BASE;
  const key = process.env.IMEIDB_API_KEY;

  if (!base || !key) {
    throw new Error("IMEIDB env vars missing");
  }

  const url = `${base}/check`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({ imei }),
    cache: "no-store"
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`IMEIDB error: ${res.status} - ${txt}`);
  }

  return res.json();
}
