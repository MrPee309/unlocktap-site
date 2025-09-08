// lib/imei.ts
// ✅ Adapter file to stop 'has no exported member' errors.
// Use this path in API routes: import { checkImei } from "../../lib/imei"
// It forwards to lib/imeidb.ts and provides all forms of export.

export { imeidbCheck as checkImei } from "./imeidb";
export { imeidbCheck as default } from "./imeidb";
export * from "./imeidb";
