// lib/imeidb.ts

export interface ImeidbOk {
  success: true;
  data: unknown;
}
export interface ImeidbErr {
  success: false;
  error: string;
}
export type ImeidbResult = ImeidbOk | ImeidbErr;

/**
 * IMEIDB checker via env vars:
 *  - IMEIDB_API_BASE (eg. https://sickw.com)
 *  - IMEIDB_API_KEY  (eg. OD7-LTD-...-XAO)
 */
export async function imeidbCheck(imei: string): Promise<ImeidbResult> {
  const base = process.env.IMEIDB_API_BASE;
  const key  = process.env.IMEIDB_API_KEY;

  if (!base || !key) {
    return { success: false, error: "Missing IMEIDB_API_BASE or IMEIDB_API_KEY" };
  }
  if (!imei || imei.length < 10) {
    return { success: false, error: "Invalid IMEI" };
  }

  const url = `${base.replace(/\/+$/, '')}/api.php?format=json&key=${encodeURIComponent(key)}&imei=${encodeURIComponent(imei)}&service=CHECK`;

  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return { success: false, error: `IMEIDB HTTP ${res.status}: ${txt}` };
    }

    const json = await res.json().catch(() => null);
    if (!json) {
      return { success: false, error: "IMEIDB: invalid JSON" };
    }

    return { success: true, data: json };
  } catch (err: any) {
    return { success: false, error: `IMEIDB fetch failed: ${err?.message || err}` };
  }
}

// ---- exports to satisfy all imports elsewhere ----
export { imeidbCheck as checkImei };
export default imeidbCheck;
