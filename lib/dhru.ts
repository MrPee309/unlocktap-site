// lib/dhru.ts
/**
 * Minimal DHRU API client template.
 * Many providers expose JSON or SOAP-like endpoints.
 * Adjust the payloads to your provider's docs.
 */
export async function dhruPlaceOrder(serviceId: string, imei: string, extra: Record<string, any> = {}) {
  const base = process.env.DHRU_BASE_URL
  const username = process.env.DHRU_USERNAME
  const apiKey = process.env.DHRU_API_KEY
  if (!base || !username || !apiKey) throw new Error('DHRU env vars missing')

  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'place_order',
      username,
      api_key: apiKey,
      service_id: serviceId,
      imei,
      ...extra,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`DHRU error: ${res.status} ${txt}`)
  }
  return res.json()
}

export async function dhruOrderStatus(orderId: string) {
  const base = process.env.DHRU_BASE_URL
  const username = process.env.DHRU_USERNAME
  const apiKey = process.env.DHRU_API_KEY
  if (!base || !username || !apiKey) throw new Error('DHRU env vars missing')

  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'order_status',
      username,
      api_key: apiKey,
      order_id: orderId,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`DHRU error: ${res.status} ${txt}`)
  }
  return res.json()
}
