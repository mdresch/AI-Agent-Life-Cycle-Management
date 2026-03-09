import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError, apiPaginated, apiValidationError } from "@/lib/api/response"
import { sanitizeObject } from "@/lib/api/sanitize"
import { createAgentSchema } from "@/lib/schemas/agent-schema"
import { agentStore } from "@/lib/api/stores"
import type { Agent } from "@/lib/types"

export const GET = withAuth(async (req) => {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") ?? "1", 10)
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20", 10)

  if (!Number.isFinite(page) || page < 1) return apiError("Query param 'page' must be a positive integer", 400)
  if (!Number.isFinite(pageSize) || pageSize < 1) return apiError("Query param 'pageSize' must be a positive integer", 400)

  const start = (page - 1) * pageSize
  return apiPaginated(agentStore.slice(start, start + pageSize), agentStore.length, page, pageSize)
})

export const POST = withAuth(async (req) => {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return apiError("Invalid JSON body", 400)
  }

  const parsed = createAgentSchema.safeParse(body)
  if (!parsed.success) {
    return apiValidationError(parsed.error)
  }

  const { autoActivate, tools, ...rest } = parsed.data
  const sanitized = sanitizeObject(rest as Record<string, unknown>)
  const newAgent: Agent = {
    id: `agent-${Date.now()}`,
    ...(sanitized as Omit<Agent, "id" | "status" | "lifecycleStage" | "version" | "createdAt" | "updatedAt" | "createdBy" | "tools">),
    tools: tools as Agent["tools"],
    status: autoActivate ? "active" : "inactive",
    lifecycleStage: "development",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "user-001",
  }
  agentStore.push(newAgent)
  return apiSuccess(newAgent, 201)
}, "member")
