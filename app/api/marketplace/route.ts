import { NextRequest } from "next/server"
import * as z from "zod"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError, apiPaginated, apiValidationError } from "@/lib/api/response"
import { sanitizeObject } from "@/lib/api/sanitize"
import { mockMarketplaceListings } from "@/lib/mock-data/marketplace"
import type { MarketplaceListing } from "@/lib/types"
import { agentTypes } from "@/lib/schemas/agent-schema"

// In production this would be a database. Each route file has its own in-memory copy.
let listings: MarketplaceListing[] = [...mockMarketplaceListings]

const createListingSchema = z.object({
  agentId: z.string().min(1),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.enum(agentTypes),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must be semver (e.g. 1.0.0)"),
})

// Public endpoint — no auth required
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20")
  const start = (page - 1) * pageSize
  return apiPaginated(listings.slice(start, start + pageSize), listings.length, page, pageSize)
}

export const POST = withAuth(async (req, session) => {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError("Invalid JSON body", 400)
  }

  const parsed = createListingSchema.safeParse(body)
  if (!parsed.success) {
    return apiValidationError(parsed.error)
  }

  const sanitized = sanitizeObject(parsed.data as Record<string, unknown>)
  const newListing: MarketplaceListing = {
    id: `listing-${Date.now()}`,
    agentId: sanitized.agentId as string,
    title: sanitized.title as string,
    description: sanitized.description as string,
    category: sanitized.category as MarketplaceListing["category"],
    version: sanitized.version as string,
    authorName: session.email,
    authorId: session.userId,
    rating: 0,
    reviewCount: 0,
    downloadCount: 0,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFeatured: false,
    isInstalled: false,
  }
  listings.push(newListing)
  return apiSuccess(newListing, 201)
}, "member")
