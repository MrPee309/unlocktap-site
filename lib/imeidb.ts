// lib/imeidb.ts
/**
 * Adapter pou IMEI DB (e.g. sickw.com PHP API).
 * Li li IMEIDB_API_BASE ak IMEIDB_API_KEY nan env.
 * N ap ekspòte fonksyon `imeidbCheck` + alias `checkImei`
 * pou konpatib ak tout import ki deja egziste.
 */
export async function imeidbCheck(imei: string) {
  const base = process.env.IMEIDB_API_BASE;
  const key = process.env.IMEIDB_API_KEY;
  if (!base || !key) throw new Error('IMEIDB env missing');

  // asire pa gen double slash epi tout query encode
  const normBase = base.replace(/\/+$/, '');
  const url = `${normBase}/api.php?format=json&key=${encodeURIComponent(key)}&imei=${encodeURIComponent(imei)}&service=CHECK`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`IMEIDB error ${res.status}: ${txt}`);
  }
  return res.json();
}

// Alias ak default pou enpò ki itilize { checkImei } oswa default
export { imeidbCheck as checkImei };
export default imeidbCheck;
