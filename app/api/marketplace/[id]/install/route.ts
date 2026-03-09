import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
import { listingStore } from "@/lib/api/stores"

type RouteContext = { params: Promise<{ id: string }> }

export const POST = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const idx = listingStore.findIndex((l) => l.id === id)
    if (idx === -1) return apiError("Listing not found", 404)
    listingStore[idx] = { ...listingStore[idx], isInstalled: true, installedVersion: listingStore[idx].version }
    return apiSuccess(listingStore[idx])
  })(req)

export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const idx = listingStore.findIndex((l) => l.id === id)
    if (idx === -1) return apiError("Listing not found", 404)
    listingStore[idx] = { ...listingStore[idx], isInstalled: false, installedVersion: undefined }
    return apiSuccess(listingStore[idx])
  })(req)
