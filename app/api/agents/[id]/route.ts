import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
import { sanitizeObject } from "@/lib/api/sanitize"
import { agentStore } from "@/lib/api/stores"
import type { Agent } from "@/lib/types"

/** Fields that callers are allowed to update via PATCH /api/agents/[id]. */
const UPDATABLE_FIELDS: ReadonlyArray<keyof Agent> = [
  "name",
  "description",
  "type",
  "model",
  "systemPrompt",
  "maxTokens",
  "temperature",
  "tools",
  "status",
]

type RouteContext = { params: Promise<{ id: string }> }

export const GET = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const agent = agentStore.find((a) => a.id === id)
    if (!agent) return apiError("Agent not found", 404)
    return apiSuccess(agent)
  })(req)

export const PATCH = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async (req) => {
    const { id } = await ctx.params
    const idx = agentStore.findIndex((a) => a.id === id)
    if (idx === -1) return apiError("Agent not found", 404)

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return apiError("Invalid JSON body", 400)
    }

    // Only pick known-safe updatable fields to prevent clients from overwriting
    // immutable fields such as id, createdAt, createdBy, lifecycleStage, or version.
    const raw = body as Record<string, unknown>
    const allowedUpdates: Partial<Record<keyof Agent, unknown>> = {}
    for (const field of UPDATABLE_FIELDS) {
      if (field in raw) {
        allowedUpdates[field] = raw[field]
      }
    }

    const sanitized = sanitizeObject(allowedUpdates as Record<string, unknown>)
    agentStore[idx] = { ...agentStore[idx], ...sanitized, updatedAt: new Date().toISOString() } as Agent
    return apiSuccess(agentStore[idx])
  })(req)

export const DELETE = (req: NextRequest, ctx: RouteContext) =>
  withAuth(async () => {
    const { id } = await ctx.params
    const idx = agentStore.findIndex((a) => a.id === id)
    if (idx === -1) return apiError("Agent not found", 404)
    agentStore.splice(idx, 1)
    return apiSuccess({ deleted: true })
  }, "admin")(req)
