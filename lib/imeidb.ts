// lib/imeidb.ts
export type CheckResult = { ok: boolean; data?: any; error?: string };

export async function checkIMEI(imei: string): Promise<CheckResult> {
  const apiKey = process.env.IMEIDB_API_KEY;
  const base = process.env.IMEIDB_BASE_URL || 'https://api.imeidb.xyz/v1/check';
  if (!apiKey) {
    return { ok: false, error: 'Missing IMEIDB_API_KEY' };
  }
  const url = base.includes('http') ? base : `https://${base}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ imei })
  });
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return { ok: res.ok, data: json, error: !res.ok ? (json?.error || `HTTP ${res.status}`) : undefined };
  } catch {
    return { ok: res.ok, data: text, error: !res.ok ? `HTTP ${res.status}` : undefined };
  }
}
