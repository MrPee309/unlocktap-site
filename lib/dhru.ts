// lib/dhru.ts
type Dict = Record<string, any>;

function getEnv(name: string, req?: NextApiRequest) {
  // server-side env
  // @ts-ignore
  return process.env[name];
}

function asForm(obj: Dict) {
  return new URLSearchParams(Object.entries(obj).map(([k,v])=>[k, String(v ?? '')])).toString();
}

function wantsForm() {
  return (process.env.DHRU_FORMAT || 'json').toLowerCase() === 'form';
}

export async function dhruCall(action: string, params: Dict = {}) {
  const url = process.env.DHRU_API_URL as string;
  const username = process.env.DHRU_USERNAME as string;
  const apiaccesskey = process.env.DHRU_API_KEY as string;

  if (!url || !username || !apiaccesskey) {
    throw new Error('Missing DHRU_API_URL / DHRU_USERNAME / DHRU_API_KEY');
  }

  const payload: Dict = { username, apiaccesskey, action, responsetype: 'json', ...params };

  const headers: Record<string,string> = {};
  let body: any;
  if (wantsForm()) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    body = asForm(payload);
  } else {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(payload);
  }

  const res = await fetch(url, { method: 'POST', headers, body });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    // If panel still sends XML, surface that clearly:
    throw new Error('DHRU returned non-JSON. Please enable JSON (responsetype=json) on the panel.');
  }
}

export class DhruClient {
  private url: string;
  private username: string;
  private apiKey: string;

  constructor() {
    this.url = process.env.DHRU_API_URL as string;
    this.username = process.env.DHRU_USERNAME as string;
    this.apiKey = process.env.DHRU_API_KEY as string;
    if (!this.url || !this.username || !this.apiKey) {
      throw new Error('Missing DHRU envs');
    }
  }

  private async call(action: string, params: Dict = {}) {
    return dhruCall(action, params);
  }

  async serviceList() {
    return this.call('imeiservicelist', {});
  }

  async placeOrder(serviceId: string|number, imei: string, fields: Dict = {}) {
    return this.call('placeimeiorder', { service: serviceId, imei, ...fields });
  }

  async orderStatus(referenceId: string|number) {
    return this.call('getimeiorder', { id: referenceId });
  }
}
