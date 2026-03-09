import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
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
  const sanitized = sanitizeObject(body as Record<string, unknown>)
  // Only allow updating safe fields
  const { displayName, avatarUrl, timezone } = sanitized as {
    displayName?: string
    avatarUrl?: string
    timezone?: string
  }
  if (displayName !== undefined) currentUser.displayName = displayName
  if (avatarUrl !== undefined) currentUser.avatarUrl = avatarUrl
  if (timezone !== undefined) currentUser.timezone = timezone
  return apiSuccess(currentUser)
})
