import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError, apiPaginated, apiValidationError } from "@/lib/api/response"
import { sanitizeObject } from "@/lib/api/sanitize"
import { createAgentSchema } from "@/lib/schemas/agent-schema"
import { mockAgents } from "@/lib/mock-data/agents"
import type { Agent } from "@/lib/types"

// In production this would be a database. Each route file has its own in-memory copy.
let agents: Agent[] = [...mockAgents]

export const GET = withAuth(async (req) => {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") ?? "1")
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20")
  const start = (page - 1) * pageSize
  return apiPaginated(agents.slice(start, start + pageSize), agents.length, page, pageSize)
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
  agents.push(newAgent)
  return apiSuccess(newAgent, 201)
}, "member")
