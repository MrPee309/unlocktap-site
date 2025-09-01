// Lightweight ImeiDB client (example). Replace endpoints/paths with your actual plan docs.
export type ImeiDbResult = {
  success: boolean;
  data?: any;
  error?: string;
};

export class ImeiDB {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey = process.env.IMEIDB_API_KEY as string, baseUrl = process.env.IMEIDB_BASE_URL || 'https://api.imeidb.xyz/v1') {
    if (!apiKey) throw new Error('IMEIDB_API_KEY not set');
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async call(path: string, body: any): Promise<ImeiDbResult> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const t = await res.text();
      return { success: false, error: `HTTP ${res.status}: ${t}` };
    }
    const json = await res.json();
    return { success: true, data: json };
  }

  // Example: Full device info (carrier/clean/blacklist…)
  async checkCarrier(imei: string) {
    return this.call('/apple/carrier-check', { imei });
  }

  // Example: FMI (Find My iPhone) status
  async checkFMI(imei: string) {
    return this.call('/apple/fmi-status', { imei });
  }
}
