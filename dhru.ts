export type DhruResponse = any;

function isForm() {
  return (process.env.DHRU_FORMAT || 'json').toLowerCase() === 'form';
}

export async function dhruCall(action: string, params: Record<string, any> = {}): Promise<DhruResponse> {
  const url = process.env.DHRU_API_URL as string;
  const username = process.env.DHRU_USERNAME as string;
  const apiaccesskey = process.env.DHRU_API_KEY as string;
  if (!url || !username || !apiaccesskey) throw new Error('DHRU env missing');

  const payload = { username, apiaccesskey, action, ...params };

  const options: any = { method: 'POST', headers: {} as any, body: '' };

  if (isForm()) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    options.body = new URLSearchParams(Object.entries(payload) as any).toString();
  } else {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  const r = await fetch(url, options);
  const text = await r.text();
  // Try JSON first, then XML-ish -> JSON fallback
  try {
    const json = JSON.parse(text);
    if (json.ERROR) {
      const msg = json.ERROR?.[0]?.FULL_DESCRIPTION || json.ERROR?.[0]?.MESSAGE || 'Provider error';
      throw new Error(msg);
    }
    return json;
  } catch {
    // Very naive XML to text passthrough
    return { raw: text };
  }
}
