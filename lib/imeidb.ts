// lib/imeidb.ts
export async function imeidbCheck(imei: string) {
  const base = process.env.IMEIDB_API_BASE;
  const key = process.env.IMEIDB_API_KEY;

  if (!base || !key) {
    throw new Error("IMEIDB API config is missing");
  }

  const url = `${base}/check?imei=${encodeURIComponent(imei)}&apikey=${encodeURIComponent(key)}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`IMEIDB error: ${res.status} - ${txt}`);
  }

  return res.json();
}
