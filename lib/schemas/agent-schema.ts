import * as z from "zod"

export const agentTypes = [
  "customer-support",
  "analytics",
  "creative",
  "productivity",
  "research",
  "communication",
  "custom",
] as const

export const modelProviders = [
  "gpt-4o",
  "gpt-4",
  "gpt-3.5-turbo",
  "claude-3-opus",
  "claude-3-sonnet",
  "llama-3-70b",
] as const

export const agentTools = [
  "web-search",
  "database-query",
  "file-access",
  "email-sending",
  "calendar-access",
  "code-execution",
] as const

export const basicInfoSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  type: z.enum(agentTypes, { required_error: "Please select an agent type" }),
  autoActivate: z.boolean().default(true),
})

export const modelConfigSchema = z.object({
  model: z.enum(modelProviders, { required_error: "Please select a model" }),
  systemPrompt: z
    .string()
    .min(20, "System prompt must be at least 20 characters"),
  maxTokens: z
    .number()
    .min(100, "Max tokens must be between 100 and 4000")
    .max(4000, "Max tokens must be between 100 and 4000"),
  temperature: z
    .number()
    .min(0, "Temperature must be between 0 and 1")
    .max(1, "Temperature must be between 0 and 1"),
})

export const toolsSchema = z.object({
  tools: z.array(z.enum(agentTools)).default([]),
})

export const createAgentSchema = basicInfoSchema.merge(modelConfigSchema).merge(toolsSchema)

export type BasicInfoValues = z.infer<typeof basicInfoSchema>
export type ModelConfigValues = z.infer<typeof modelConfigSchema>
export type ToolsValues = z.infer<typeof toolsSchema>
export type CreateAgentValues = z.infer<typeof createAgentSchema>
