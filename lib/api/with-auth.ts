import { NextRequest, NextResponse } from "next/server"
import { apiError } from "./response"

export interface SessionPayload {
  userId: string
  email: string
  role: "owner" | "admin" | "member" | "viewer"
}

export function withAuth(
  handler: (req: NextRequest, session: SessionPayload) => Promise<NextResponse>,
  requiredRole?: "owner" | "admin" | "member" | "viewer"
): (req: NextRequest) => Promise<NextResponse> {
  return async (req: NextRequest) => {
    const sessionCookie = req.cookies.get("ai-platform-session")
    if (!sessionCookie) {
      return apiError("Unauthorized", 401)
    }

    const session: SessionPayload = {
      userId: "user-001",
      email: "demo@example.com",
      role: "owner",
    }

    if (requiredRole) {
      const roleHierarchy = { owner: 4, admin: 3, member: 2, viewer: 1 }
      if (roleHierarchy[session.role] < roleHierarchy[requiredRole]) {
        return apiError("Forbidden", 403)
      }
    }

    return handler(req, session)
  }
}
