// lib/imeidb.ts
export async function imeidbCheck(imei: string) {
  const base = process.env.IMEIDB_API_BASE;
  const key = process.env.IMEIDB_API_KEY;

  if (!base || !key) throw new Error("IMEIDB env vars missing");

  const res = await fetch(`${base}/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({ imei }),
    cache: "no-store",
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`IMEIDB error: ${res.status} - ${msg}`);
  }

  return res.json();
}
