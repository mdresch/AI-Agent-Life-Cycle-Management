import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
import { mockMarketplaceListings } from "@/lib/mock-data/marketplace"
import type { MarketplaceListing } from "@/lib/types"

// In production this would be a database. Each route file has its own in-memory copy.
let listings: MarketplaceListing[] = [...mockMarketplaceListings]

type RouteContext = { params: Promise<{ id: string }> }

export const GET = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const listing = listings.find((l) => l.id === id)
    if (!listing) return apiError("Listing not found", 404)
    return apiSuccess(listing)
  })(req)
