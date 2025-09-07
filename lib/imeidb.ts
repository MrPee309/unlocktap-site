
// lib/imeidb.ts
export async function checkImei(imei: string) {
  const base = process.env.IMEIDB_API_BASE;
  const key  = process.env.IMEIDB_API_KEY;
  if (!base || !key) throw new Error("IMEIDB env missing");

  const url = `${base}/check`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({ imei }),
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`IMEIDB error: ${res.status} ${txt}`);
  }
  return res.json();
}

// (Opsyonèl) kenbe ansyen non an pou tout eventualite:
export { checkImei as imeidbCheck };
