// types/index.ts
export type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string }

export type CheckImeiInput = { imei: string }
export type CheckImeiResult = {
  brand?: string
  model?: string
  status?: string
  carrier?: string
  [k: string]: any
}

export type OrderUnlockInput = { imei: string; serviceId: string; notes?: string }
export type OrderUnlockResult = { orderId: string; eta?: string | number; [k: string]: any }

export type OrderStatusInput = { orderId: string }
export type OrderStatusResult = { status: string; code?: string; result?: any }
