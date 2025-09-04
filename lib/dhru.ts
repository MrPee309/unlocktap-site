// Minimal, dependency-optional DHRU client
export type DhruResponse = any;

function isForm() {
  return (process.env.DHRU_FORMAT || 'json').toLowerCase() === 'form';
}

async function tryParseXml(text: string): Promise<any> {
  try {
    // Try to parse XML only if xml2js is installed. This avoids build-time failures.
    const mod: any = await import('xml2js').catch(() => null);
    if (!mod) return { raw: text };
    const parser = new mod.Parser({ explicitArray: false, explicitRoot: false });
    const obj = await parser.parseStringPromise(text);
    return obj;
  } catch {
    return { raw: text };
  }
}

export async function dhruCall(action: string, params: Record<string, any> = {}): Promise<DhruResponse> {
  const url = process.env.DHRU_API_URL as string;
  const username = process.env.DHRU_USERNAME as string;
  const apiaccesskey = process.env.DHRU_API_KEY as string;
  if (!url || !username || !apiaccesskey) {
    throw new Error('DHRU env missing');
  }

  const payload = { username, apiaccesskey, action, ...params };

  const headers: Record<string, string> = {};
  let body = '';

  if (isForm()) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    body = new URLSearchParams(Object.entries(payload) as [string, string][]).toString();
  } else {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(payload);
  }

  const r = await fetch(url, { method: 'POST', headers, body });
  const text = await r.text();

  // Prefer JSON. If not JSON, try XML (optional). Fallback to raw text.
  try {
    const json = JSON.parse(text);
    if (json.ERROR) {
      const msg =
        json.ERROR?.[0]?.FULL_DESCRIPTION ||
        json.ERROR?.[0]?.MESSAGE ||
        'Provider error';
      throw new Error(msg);
    }
    return json;
  } catch {
    return await tryParseXml(text);
  }
}
