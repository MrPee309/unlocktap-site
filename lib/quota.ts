// lib/quota.ts
const userQuotaMap: Record<string, number> = {} // memory store pou teste

export async function getUserQuota(userId: string) {
  if (!userQuotaMap[userId]) userQuotaMap[userId] = 3 // default free checks
  return userQuotaMap[userId]
}

export async function decrementUserQuota(userId: string) {
  if (!userQuotaMap[userId]) userQuotaMap[userId] = 3
  userQuotaMap[userId] = Math.max(userQuotaMap[userId] - 1, 0)
  return userQuotaMap[userId]
}