// lib/imeiService.ts

/**
 * Fetch IMEI information from imeidb API
 */
export async function getIMEIData(imei: string) {
  try {
    // Validate IMEI
    if (!imei || imei.length < 10) {
      throw new Error("IMEI invalid");
    }

    const API_URL = `https://api.imeidb.xyz/imei/${imei}`;
    const API_KEY = process.env.IMEI_API_KEY;

    if (!API_KEY) {
      throw new Error("API key missing in environment variables");
    }

    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    return {
      success: true,
      data,
    };

  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
}
