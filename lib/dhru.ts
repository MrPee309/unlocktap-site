// lib/dhru.ts
export async function dhruPlaceOrder(imei: string, serviceId: string) {
  const base = process.env.SICKW_API_BASE;
  const key = process.env.SICKW_API_KEY;
  const format = process.env.SICKW_API_FORMAT || "json";

  const url = `${base}/api.php?format=${format}&key=${key}&imei=${imei}&service=${serviceId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sickw API error: ${res.status}`);
  return res.json();
}

export async function dhruOrderStatus(orderId: string) {
  const base = process.env.SICKW_API_BASE;
  const key = process.env.SICKW_API_KEY;
  const format = process.env.SICKW_API_FORMAT || "json";

  const url = `${base}/api.php?format=${format}&key=${key}&action=status&order_id=${orderId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sickw API error: ${res.status}`);
  return res.json();
}
