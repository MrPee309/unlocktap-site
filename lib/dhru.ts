// lib/dhru.ts
/**
 * Minimal Dhru client that's SAFE for Vercel builds.
 * - No xml2js
 * - Simple JSON POSTs
 * - One-argument helpers so pages/api/* can call without TS errors
 */

type Dict = Record<string, any>;

// --- Env helpers ------------------------------------------------------------
function getenv(name: string): string {
  return (process.env as Record<string, string | undefined>)[name] ?? "";
}

function assertEnv(...names: string[]) {
  const missing = names.filter((n) => !getenv(n));
  if (missing.length) {
    throw new Error("Missing required env var(s): " + missing.join(", "));
  }
}

// Prefer server-only envs, fall back to NEXT_PUBLIC_* if present
const API_URL =
  getenv("DHRU_API_URL") || getenv("NEXT_PUBLIC_DHRU_API_URL") || "";
const API_USERNAME = getenv("DHRU_USERNAME");
const API_KEY = getenv("DHRU_API_KEY") || getenv("DHRU_API_ACCESS_KEY");

// --- Core request -----------------------------------------------------------
async function dhruRequest(path: string, data: Dict): Promise<any> {
  assertEnv("DHRU_API_URL", "DHRU_USERNAME", "DHRU_API_KEY");

  const url = (API_URL || "").replace(/\/+$/, "") + path;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-USER": API_USERNAME,
      "X-API-KEY": API_KEY as string,
    },
    body: JSON.stringify(data ?? {}),
    // Ensure no caching of API calls
    cache: "no-store",
  } as RequestInit);

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Dhru API ${res.status}: ${txt}`);
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

// --- Public helpers (single-argument, build-safe) ---------------------------
export type DhruOrderPayload = Dict;

/**
 * Place an order. Accepts a single payload object.
 * Usage: await dhruPlaceOrder({ service_id, imei, customer_id })
 */
export async function dhruPlaceOrder(payload: DhruOrderPayload) {
  return dhruRequest("/orders", payload);
}

/**
 * List / get services.
 * Usage: await dhruServices({ group_id })  // optional filter object
 */
export async function dhruServices(params: Dict = {}) {
  return dhruRequest("/services", params);
}

// Optional default export
export default { dhruPlaceOrder, dhruServices };
