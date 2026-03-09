import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
import { sanitizeObject } from "@/lib/api/sanitize"
import { mockAgents } from "@/lib/mock-data/agents"
import type { Agent } from "@/lib/types"

// In production this would be a database. Each route file has its own in-memory copy.
let agents: Agent[] = [...mockAgents]

type RouteContext = { params: Promise<{ id: string }> }

export const GET = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const agent = agents.find((a) => a.id === id)
    if (!agent) return apiError("Agent not found", 404)
    return apiSuccess(agent)
  })(req)

export const PATCH = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async (req) => {
    const { id } = await ctx.params
    const idx = agents.findIndex((a) => a.id === id)
    if (idx === -1) return apiError("Agent not found", 404)

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return apiError("Invalid JSON body", 400)
    }

    const sanitized = sanitizeObject(body as Record<string, unknown>)
    agents[idx] = { ...agents[idx], ...sanitized, updatedAt: new Date().toISOString() }
    return apiSuccess(agents[idx])
  })(req)

export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const idx = agents.findIndex((a) => a.id === id)
    if (idx === -1) return apiError("Agent not found", 404)
    agents.splice(idx, 1)
    return apiSuccess({ deleted: true })
  }, "admin")(req)
