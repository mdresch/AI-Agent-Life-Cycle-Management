import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
import { mockMarketplaceListings } from "@/lib/mock-data/marketplace"
import type { MarketplaceListing } from "@/lib/types"

// In production this would be a database. Each route file has its own in-memory copy.
let listings: MarketplaceListing[] = [...mockMarketplaceListings]

type RouteContext = { params: Promise<{ id: string }> }

export const POST = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const idx = listings.findIndex((l) => l.id === id)
    if (idx === -1) return apiError("Listing not found", 404)
    listings[idx] = { ...listings[idx], isInstalled: true, installedVersion: listings[idx].version }
    return apiSuccess(listings[idx])
  })(req)

export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const idx = listings.findIndex((l) => l.id === id)
    if (idx === -1) return apiError("Listing not found", 404)
    listings[idx] = { ...listings[idx], isInstalled: false, installedVersion: undefined }
    return apiSuccess(listings[idx])
  })(req)
