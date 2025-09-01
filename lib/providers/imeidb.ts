// lib/providers/imeidb.ts
export async function checkIMEI(imei: string) {
  const apiKey = process.env.IMEIDB_API_KEY;
  const baseUrl = process.env.IMEIDB_BASE_URL || "https://api.imeidb.xyz/v1";
  if (!apiKey) return { ok:false, error: "IMEIDB_API_KEY is missing" };
  try {
    const res = await fetch(`${baseUrl}/checkimei?imei=${encodeURIComponent(imei)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "X-API-Key": apiKey,
        "x-api-key": apiKey
      }
    });
    const text = await res.text();
    let data = null;
    try { data = JSON.parse(text); } catch { data = { raw:text }; }
    if (!res.ok) return { ok:false, error: data?.error || text || `HTTP ${res.status}` };
    return { ok:true, data };
  } catch (e:any) {
    return { ok:false, error: e?.message || "Network error" };
  }
}
