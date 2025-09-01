// Minimal DHRU-compatible client (XML API). Many providers (UnlockBase, etc.) use this.
import xml2js from 'xml2js';

export class DhruClient {
  private apiKey: string;
  private username: string;
  private baseUrl: string;

  constructor(opts?: { apiKey?: string; username?: string; baseUrl?: string; }) {
    this.apiKey = opts?.apiKey || (process.env.DHRU_API_KEY as string);
    this.username = opts?.username || (process.env.DHRU_USERNAME as string);
    this.baseUrl = (opts?.baseUrl || process.env.DHRU_BASE_URL || '').replace(/\/$/, '');
    if (!this.apiKey || !this.username || !this.baseUrl) {
      throw new Error('DHRU env missing (DHRU_API_KEY, DHRU_USERNAME, DHRU_BASE_URL)');
    }
  }

  private buildXml(method: string, params: Record<string, any>) {
    const builder = new xml2js.Builder({ headless: true });
    const obj = {
      DHRU: {
        API: {
          ACTION: method,
          PARAMS: {
            USERNAME: this.username,
            APIACCESSKEY: this.apiKey,
            ...params,
          },
        },
      },
    };
    return builder.buildObject(obj);
  }

  private async post(xml: string) {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xml,
    });
    const text = await res.text();
    const parsed = await xml2js.parseStringPromise(text, { explicitArray: false });
    return parsed;
  }

  async services() {
    const xml = this.buildXml('getservices', {});
    return this.post(xml);
  }

  async placeOrder(serviceId: string | number, imei: string, fields: Record<string, any> = {}) {
    const xml = this.buildXml('placeorder', {
      SERVICEID: String(serviceId),
      IMEI: imei,
      ...fields,
    });
    return this.post(xml);
  }

  async orderStatus(referenceId: string | number) {
    const xml = this.buildXml('getorder', { REFERENCEID: String(referenceId) });
    return this.post(xml);
  }
}
