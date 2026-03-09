// ── Agent entity ───────────────────────────────────────────────────────────
export interface Agent {
  id: string
  name: string
  description: string
  type: AgentType
  model: ModelProvider
  systemPrompt: string
  maxTokens: number
  temperature: number
  tools: AgentTool[]
  status: AgentStatus
  lifecycleStage: LifecycleStage
  version: string
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
  createdBy: string // userId
}

export type AgentType =
  | "customer-support"
  | "analytics"
  | "creative"
  | "productivity"
  | "research"
  | "communication"
  | "custom"

export type ModelProvider =
  | "gpt-4o"
  | "gpt-4"
  | "gpt-3.5-turbo"
  | "claude-3-opus"
  | "claude-3-sonnet"
  | "llama-3-70b"

export type AgentTool =
  | "web-search"
  | "database-query"
  | "file-access"
  | "email-sending"
  | "calendar-access"
  | "code-execution"

export type AgentStatus = "active" | "inactive" | "error"

export type LifecycleStage = "development" | "production" | "maintenance" | "retirement"

// ── User / Auth ────────────────────────────────────────────────────────────
export interface User {
  id: string
  displayName: string
  email: string
  avatarUrl?: string
  role: UserRole
  timezone: string
  createdAt: string
}

export type UserRole = "owner" | "admin" | "member" | "viewer"

// ── Lifecycle ──────────────────────────────────────────────────────────────
export interface LifecycleStageSummary {
  stage: LifecycleStage
  label: string
  count: number
  percentage: number
  colour: string
  icon: string
  description: string
}

export interface LifecycleTransition {
  id: string
  agentId: string
  agentName: string
  fromStage: LifecycleStage
  toStage: LifecycleStage
  transitionedAt: string // ISO 8601
  transitionedBy: string
  reason?: string
}

export interface AgentVersion {
  id: string
  agentId: string
  agentName: string
  versionNumber: string
  changelog: string
  createdAt: string
  createdBy: string
  stage: LifecycleStage
}

export interface AgentTemplate {
  id: string
  name: string
  description: string
  type: AgentType
  model: ModelProvider
  systemPrompt: string
  maxTokens: number
  temperature: number
  tools: AgentTool[]
  category: string
  isOfficial: boolean
}

// ── Settings ───────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string
  userId: string
  displayName: string
  email: string
  avatarUrl?: string
  role: UserRole
  joinedAt: string
  isCurrentUser: boolean
}

export interface NotificationPreferences {
  lifecycleTransitions: { email: boolean; inApp: boolean }
  agentErrors: { email: boolean; inApp: boolean }
  marketplaceUpdates: { email: boolean; inApp: boolean }
  teamActivity: { email: boolean; inApp: boolean }
}

export interface ApiKey {
  id: string
  label: string
  maskedKey: string
  permissions: ApiKeyPermission[]
  createdAt: string
  lastUsedAt?: string
  revokedAt?: string
}

export type ApiKeyPermission = "read" | "write" | "admin"

// ── Dashboard ──────────────────────────────────────────────────────────────
export interface KpiMetric {
  label: string
  value: string | number
  unit?: string
  trend: "up" | "down" | "neutral"
  trendValue: string
}

export interface TopAgent {
  id: string
  name: string
  type: string
  successRate: number
  requestsPerDay: number
  trend: "up" | "down" | "neutral"
}

export interface ActivityEvent {
  id: string
  type:
    | "agent_created"
    | "lifecycle_transition"
    | "training_completed"
    | "agent_error"
    | "marketplace_install"
    | "settings_change"
  message: string
  actor: string
  timestamp: string
  agentId?: string
  agentName?: string
}

// ── API ────────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  error?: string
  meta?: { total: number; page: number; pageSize: number }
}

export interface CreateAgentPayload {
  name: string
  description: string
  type: AgentType
  model: ModelProvider
  systemPrompt: string
  maxTokens: number
  temperature: number
  tools: AgentTool[]
  autoActivate: boolean
}

// ── Marketplace ────────────────────────────────────────────────────────────
export interface MarketplaceListing {
  id: string
  agentId: string
  title: string
  description: string
  category: AgentType
  authorName: string
  authorId: string
  rating: number
  reviewCount: number
  downloadCount: number
  version: string
  publishedAt: string
  updatedAt: string
  isFeatured: boolean
  isInstalled: boolean
  installedVersion?: string
  iconName?: string
}

export interface MarketplaceKpis {
  totalListings: number
  totalDownloads: number
  averageRating: number
  newThisWeek: number
}

export interface MarketplaceSubscription {
  id: string
  listingId: string
  title: string
  category: AgentType
  installedVersion: string
  latestVersion: string
  hasUpdate: boolean
  installedAt: string
}

export interface PublishAgentPayload {
  agentId: string
  title: string
  description: string
  category: AgentType
  version: string
}
