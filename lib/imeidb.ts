// lib/imeidb.ts
export async function imeidbCheck(imei: string) {
  const API_KEY = process.env.IMEI_API_KEY
  const API_URL = process.env.IMEI_API_URL

  const res = await fetch(`${API_URL}?imei=${imei}`, {
    headers: { "Authorization": `Bearer ${API_KEY}` },
  })

  if (!res.ok) {
    return { success: false, error: "IMEI not found or API error" }
  }

  const data = await res.json()
  return { success: true, ...data }
}