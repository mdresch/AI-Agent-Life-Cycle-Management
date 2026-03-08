import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/login", "/forgot-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths and Next.js internals
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Check for session cookie
  const session = request.cookies.get("ai-platform-session")
  if (!session) {
    const loginUrl = new URL("/login", request.url)
    const callbackPath = pathname + request.nextUrl.search
    loginUrl.searchParams.set("callbackUrl", callbackPath)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
