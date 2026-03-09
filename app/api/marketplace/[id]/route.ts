import { NextRequest } from "next/server"
import { apiSuccess, apiError } from "@/lib/api/response"
import { listingStore } from "@/lib/api/stores"

type RouteContext = { params: Promise<{ id: string }> }

// Public endpoint — no auth required
export async function GET(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params
  const listing = listingStore.find((l) => l.id === id)
  if (!listing) return apiError("Listing not found", 404)
  return apiSuccess(listing)
}
