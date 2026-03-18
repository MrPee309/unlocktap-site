// lib/quota.ts
// ---------- Memory quota store pou teste ----------
const userQuotaMap: Record<string, number> = {} // memory store pou free checks

export async function getUserQuota(userId: string) {
  if (!userQuotaMap[userId]) userQuotaMap[userId] = 3 // default free checks
  return userQuotaMap[userId]
}

export async function decrementUserQuota(userId: string) {
  if (!userQuotaMap[userId]) userQuotaMap[userId] = 3
  userQuotaMap[userId] = Math.max(userQuotaMap[userId] - 1, 0)
  return userQuotaMap[userId]
}

// ---------- User balance store pou top-up ----------
const userBalanceMap: Record<string, number> = {} // memory store pou test top-up

export async function getUserBalance(userId: string) {
  if (!userBalanceMap[userId]) userBalanceMap[userId] = 0
  return userBalanceMap[userId]
}

export async function incrementUserBalance(userId: string, amount: number) {
  if (!userBalanceMap[userId]) userBalanceMap[userId] = 0
  userBalanceMap[userId] += amount
  return userBalanceMap[userId]
}