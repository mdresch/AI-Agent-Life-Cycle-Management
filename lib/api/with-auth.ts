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

    // ⚠ MOCK SESSION — for demo/development only.
    // The session payload is hardcoded: role is always "owner", which means
    // role-based access checks below can never deny access for any valid cookie.
    // Before any staging or production deployment this MUST be replaced with real
    // session decoding (e.g. Auth.js getServerSession or JWT verification) so that
    // each user receives their actual role from the session store.
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
