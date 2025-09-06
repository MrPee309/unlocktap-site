export type DhruParams = Record<string, any>;
export type DhruResponse = any;

function ensureEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function dhruCall(action: string, params: DhruParams = {}): Promise<DhruResponse> {
  const url = ensureEnv("DHRU_API_URL");
  const username = ensureEnv("DHRU_USERNAME");
  const apiaccesskey = ensureEnv("DHRU_API_KEY");
  const payload = { username, apiaccesskey, action, responsetype: "json", ...params };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { throw new Error("DHRU returned non-JSON. Configure panel to JSON."); }
}

export async function dhruServiceList() { return dhruCall("listservices"); }
export async function dhruPlaceOrder(params: DhruParams) { return dhruCall("placeorder", params); }
export async function dhruOrderStatus(orderId: string | number) { return dhruCall("orderstatus", { orderid: orderId }); }
