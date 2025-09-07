// Keep only third‑party modules that truly lack types.
// Firebase ships excellent types — do NOT declare these,
// otherwise TypeScript may treat them as namespaces and break.
declare module "xml2js";
