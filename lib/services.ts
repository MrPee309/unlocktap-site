import { getIMEIData } from "./imeiService";

/**
 * Central service handler (router)
 * Sa ap pèmèt ou ajoute plis sèvis fasil pita
 */
export async function serverServiceCheck(service: string, params: any) {
  try {
    switch (service) {
      case "imei":
        if (!params?.imei) {
          return {
            success: false,
            error: "IMEI is required",
          };
        }

        return await getIMEIData(params.imei);

      // 👉 Ou ka ajoute lòt services pita

      // case "blacklist":
      //   return await checkBlacklist(params.imei);

      // case "unlock":
      //   return await unlockDevice(params.imei);

      default:
        return {
          success: false,
          error: `Unknown service: ${service}`,
        };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Service execution failed",
    };
  }
}
