import { NextRequest } from "next/server"
import { createHash, randomBytes } from "crypto"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
import { sanitizeObject } from "@/lib/api/sanitize"
import { mockApiKeys } from "@/lib/mock-data/settings"
import type { ApiKey, ApiKeyPermission } from "@/lib/types"
import * as z from "zod"

interface StoredApiKey extends ApiKey {
  keyHash: string
}

// In production this would be a database. Each route file has its own in-memory copy.
let apiKeys: StoredApiKey[] = mockApiKeys.map((k) => ({ ...k, keyHash: "" }))

const createKeySchema = z.object({
  label: z.string().min(1, "Label is required").max(100),
  permissions: z.array(z.enum(["read", "write", "admin"])).min(1, "At least one permission required"),
})

export const GET = withAuth(async () => {
  // Return metadata only, no key hash
  const safeKeys = apiKeys.map(({ keyHash: _keyHash, ...rest }) => rest)
  return apiSuccess(safeKeys)
})

export const POST = withAuth(async (req) => {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError("Invalid JSON body", 400)
  }

  const parsed = createKeySchema.safeParse(body)
  if (!parsed.success) {
    return apiError(parsed.error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join("; "), 422)
  }

  const sanitized = sanitizeObject(parsed.data as Record<string, unknown>)
  const plainKey = randomBytes(16).toString("hex") // 32 hex chars
  const keyHash = createHash("sha256").update(plainKey).digest("hex")
  const maskedKey = `${plainKey.slice(0, 8)}${"*".repeat(16)}${plainKey.slice(-8)}`

  const newKey: StoredApiKey = {
    id: `key-${Date.now()}`,
    label: sanitized.label as string,
    maskedKey,
    permissions: sanitized.permissions as ApiKeyPermission[],
    createdAt: new Date().toISOString(),
    keyHash,
  }
  apiKeys.push(newKey)

  const { keyHash: _keyHash, ...meta } = newKey
  return apiSuccess({ ...meta, plainKey }, 201)
}, "admin")
