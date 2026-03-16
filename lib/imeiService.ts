// lib/imeiService.ts
export async function getIMEIData(imei: string) {
  const API_URL = `https://api.imeidb.xyz/imei/${imei}`;
  const API_KEY = process.env.IMEI_API_KEY; // mete kle nan .env.local

  const res = await fetch(API_URL, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  const data = await res.json();
  return data;
}