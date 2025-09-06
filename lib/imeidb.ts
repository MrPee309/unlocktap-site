export interface ImeidbResult { success: boolean; [k: string]: any; }
export async function checkImei(imei: string): Promise<ImeidbResult> {
  const apiKey = process.env.IMEIDB_API_KEY;
  const base = process.env.IMEIDB_BASE_URL || "https://api.imeidb.xyz/v1/check";
  if (!apiKey) throw new Error("Missing env IMEIDB_API_KEY");
  const res = await fetch(`${base}?imei=${encodeURIComponent(imei)}`, {
    headers: { "Authorization": `Bearer ${apiKey}` }
  });
  if (!res.ok) return { success: false, status: res.status, message: await res.text() } as any;
  return await res.json();
}
