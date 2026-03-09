import { NextRequest } from "next/server"
import * as z from "zod"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError, apiPaginated, apiValidationError } from "@/lib/api/response"
import { sanitizeObject } from "@/lib/api/sanitize"
import { listingStore } from "@/lib/api/stores"
import type { MarketplaceListing } from "@/lib/types"
import { agentTypes } from "@/lib/schemas/agent-schema"

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
  const page = parseInt(searchParams.get("page") ?? "1", 10)
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10)

  if (!Number.isFinite(page) || page < 1) return apiError("Query param 'page' must be a positive integer", 400)
  if (!Number.isFinite(pageSize) || pageSize < 1) return apiError("Query param 'pageSize' must be a positive integer", 400)

  const start = (page - 1) * pageSize
  return apiPaginated(listingStore.slice(start, start + pageSize), listingStore.length, page, pageSize)
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
  listingStore.push(newListing)
  return apiSuccess(newListing, 201)
}, "member")
