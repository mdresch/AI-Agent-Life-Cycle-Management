import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
import { mockApiKeys } from "@/lib/mock-data/settings"
import type { ApiKey } from "@/lib/types"

interface StoredApiKey extends ApiKey {
  keyHash: string
}

// In production this would be a database. Each route file has its own in-memory copy.
let apiKeys: StoredApiKey[] = mockApiKeys.map((k) => ({ ...k, keyHash: "" }))

type RouteContext = { params: Promise<{ id: string }> }

export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const idx = apiKeys.findIndex((k) => k.id === id)
    if (idx === -1) return apiError("API key not found", 404)
    if (apiKeys[idx].revokedAt) return apiError("API key already revoked", 409)
    apiKeys[idx] = { ...apiKeys[idx], revokedAt: new Date().toISOString() }
    return apiSuccess({ revoked: true })
  }, "admin")(req)
