// lib/dhruServiceList.ts
/**
 * Fetch DHRU/Sickw services list.
 * Requires env vars:
 *  - SICKW_API_BASE   (e.g. https://sickw.com)
 *  - SICKW_API_KEY    (your API key)
 *  - SICKW_API_FORMAT (optional, default "json")
 */
export async function dhruServiceList(): Promise<any> {
  const base = process.env.SICKW_API_BASE;
  const key  = process.env.SICKW_API_KEY;
  const format = process.env.SICKW_API_FORMAT || "json";

  if (!base || !key) {
    throw new Error("Missing SICKW_API_BASE or SICKW_API_KEY");
  }

  const url = `${base.replace(/\/+$/, '')}/api.php?format=${encodeURIComponent(format)}&key=${encodeURIComponent(key)}&action=services`;

  const res = await fetch(url, { method: "GET", cache: "no-store" });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Sickw API error ${res.status}: ${txt}`);
  }
  return res.json();
}
