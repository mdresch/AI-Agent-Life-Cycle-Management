import { NextRequest } from "next/server"
import * as z from "zod"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError, apiValidationError } from "@/lib/api/response"
import { sanitizeObject } from "@/lib/api/sanitize"

const mockCurrentUser = {
  id: "user-001",
  displayName: "Demo User",
  email: "demo@example.com",
  avatarUrl: undefined as string | undefined,
  role: "owner" as const,
  timezone: "UTC",
  createdAt: "2024-01-01T00:00:00Z",
}

let currentUser = { ...mockCurrentUser }

// All fields are optional (partial update), but if provided they must be non-empty and valid.
const updateUserSchema = z.object({
  displayName: z.string().min(1, "Display name cannot be empty").max(100, "Display name must be at most 100 characters").optional(),
  avatarUrl: z.string().url("Avatar URL must be a valid URL").optional(),
  // Use a generous max length to accommodate long IANA timezone identifiers.
  timezone: z.string().min(1, "Timezone cannot be empty").max(100, "Timezone must be at most 100 characters").optional(),
}).strict()

export const GET = withAuth(async () => {
  return apiSuccess(currentUser)
})

export const PATCH = withAuth(async (req) => {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError("Invalid JSON body", 400)
  }

  const parsed = updateUserSchema.safeParse(body)
  if (!parsed.success) {
    return apiValidationError(parsed.error)
  }

  const sanitized = sanitizeObject(parsed.data as Record<string, unknown>)
  const { displayName, avatarUrl, timezone } = sanitized as z.infer<typeof updateUserSchema>
  if (displayName !== undefined) currentUser.displayName = displayName
  if (avatarUrl !== undefined) currentUser.avatarUrl = avatarUrl
  if (timezone !== undefined) currentUser.timezone = timezone
  return apiSuccess(currentUser)
})
