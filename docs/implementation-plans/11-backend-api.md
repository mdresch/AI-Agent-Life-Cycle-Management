# Backend API & Data Layer Implementation Plan

## Module: Backend API & Data Layer
**Owner Agent:** Agent 11  
**Branch:** `feat/backend-api`  
**Phase:** 3 — Marketplace & Backend  
**Depends on:** Agent 10 (auth middleware), all feature agents (schema contracts)

---

## Table of Contents

1. [Objective](#1-objective)
2. [Technology Decisions](#2-technology-decisions)
3. [Database Schema](#3-database-schema)
4. [API Routes](#4-api-routes)
5. [Implementation Tasks](#5-implementation-tasks)
6. [Security Requirements](#6-security-requirements)
7. [File Change Map](#7-file-change-map)
8. [Acceptance Criteria](#8-acceptance-criteria)

---

## 1. Objective

Replace all mock/in-memory data in feature components with real, persisted API calls backed by a PostgreSQL database. Deliver:

1. **Prisma ORM** schema covering all entities from `docs/requirements.md §4`.
2. **Next.js Route Handlers** (`app/api/**`) implementing the full REST API.
3. **Shared TypeScript types** in `lib/types/index.ts` consumed by all feature agents.
4. **LLM Gateway stub** for agent execution requests (OpenAI + Anthropic).
5. **Security middleware** — auth enforcement, input sanitisation, rate limiting.

> **⚠ Open Question Q3:** Database provider must be confirmed. This plan defaults to **PostgreSQL + Prisma** (self-hosted or via Railway/Supabase). The schema is provider-agnostic; switching to PlanetScale (MySQL) requires only minor Prisma schema dialect changes.

---

## 2. Technology Decisions

| Layer | Choice | Reason |
|---|---|---|
| ORM | Prisma 5 | Type-safe, excellent Next.js App Router support, migration tooling |
| Database | PostgreSQL 15 | Relational + JSON columns for flexible agent config storage |
| Auth integration | Auth.js v5 + Prisma adapter | Shares session tables with feature data |
| Input validation | Zod (already in project) | Shared schemas between frontend and API layer |
| Rate limiting | Upstash Redis (`@upstash/ratelimit`) | Edge-compatible, serverless-friendly |
| File storage | Vercel Blob or S3-compatible | Avatar uploads, config exports |
| Background jobs | Inngest (optional for v1) | Training session execution, async notifications |

---

## 3. Database Schema

### 3.1 Prisma Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── Auth (Auth.js Prisma adapter tables) ──────────────────
model Account { ... }   // standard Auth.js table
model Session { ... }   // standard Auth.js table
model VerificationToken { ... }

// ── Users & Teams ─────────────────────────────────────────
model User {
  id          String   @id @default(cuid())
  displayName String
  email       String   @unique
  avatarUrl   String?
  timezone    String   @default("UTC")
  createdAt   DateTime @default(now())
  role        Role     @default(MEMBER)

  teamMemberships TeamMember[]
  agents          Agent[]       @relation("CreatedBy")
  apiKeys         ApiKey[]
}

enum Role {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

model Team {
  id        String       @id @default(cuid())
  name      String
  createdAt DateTime     @default(now())
  members   TeamMember[]
  agents    Agent[]
}

model TeamMember {
  id       String @id @default(cuid())
  teamId   String
  userId   String
  role     Role   @default(MEMBER)
  team     Team   @relation(fields: [teamId], references: [id])
  user     User   @relation(fields: [userId], references: [id])
  joinedAt DateTime @default(now())
  @@unique([teamId, userId])
}

// ── Agents ────────────────────────────────────────────────
model Agent {
  id             String         @id @default(cuid())
  name           String
  description    String
  type           AgentType
  model          ModelProvider
  systemPrompt   String
  maxTokens      Int
  temperature    Float
  tools          String[]       // AgentTool enum values stored as strings
  status         AgentStatus    @default(INACTIVE)
  lifecycleStage LifecycleStage @default(DEVELOPMENT)
  version        String         @default("1.0.0")
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
  createdById    String
  teamId         String

  createdBy   User                  @relation("CreatedBy", fields: [createdById], references: [id])
  team        Team                  @relation(fields: [teamId], references: [id])
  versions    AgentVersion[]
  transitions LifecycleTransition[]
  trainings   TrainingSession[]
  listing     MarketplaceListing?
}

enum AgentType {
  CUSTOMER_SUPPORT
  ANALYTICS
  CREATIVE
  PRODUCTIVITY
  RESEARCH
  COMMUNICATION
  CUSTOM
}

enum ModelProvider {
  GPT_4O          @map("gpt-4o")
  GPT_4           @map("gpt-4")
  GPT_3_5_TURBO   @map("gpt-3.5-turbo")
  CLAUDE_3_OPUS   @map("claude-3-opus")
  CLAUDE_3_SONNET @map("claude-3-sonnet")
  LLAMA_3_70B     @map("llama-3-70b")
}

enum AgentStatus {
  ACTIVE
  INACTIVE
  ERROR
}

enum LifecycleStage {
  DEVELOPMENT
  PRODUCTION
  MAINTENANCE
  RETIREMENT
}

// ── Lifecycle ─────────────────────────────────────────────
model AgentVersion {
  id            String   @id @default(cuid())
  agentId       String
  versionNumber String
  changelog     String
  createdAt     DateTime @default(now())
  createdById   String
  agent         Agent    @relation(fields: [agentId], references: [id])
}

model LifecycleTransition {
  id               String         @id @default(cuid())
  agentId          String
  fromStage        LifecycleStage
  toStage          LifecycleStage
  transitionedAt   DateTime       @default(now())
  transitionedById String
  reason           String?
  agent            Agent          @relation(fields: [agentId], references: [id])
}

// ── Studio ────────────────────────────────────────────────
model PromptTemplate {
  id          String   @id @default(cuid())
  name        String
  content     String
  tags        String[]
  createdAt   DateTime @default(now())
  createdById String
}

model TrainingSession {
  id          String   @id @default(cuid())
  agentId     String
  scenario    String
  score       Float
  steps       Json     // TrainingStep[] serialised to JSON
  completedAt DateTime @default(now())
  agent       Agent    @relation(fields: [agentId], references: [id])
}

// ── Marketplace ───────────────────────────────────────────
model MarketplaceListing {
  id            String    @id @default(cuid())
  agentId       String    @unique
  title         String
  description   String
  category      AgentType
  rating        Float     @default(0)
  reviewCount   Int       @default(0)
  downloadCount Int       @default(0)
  version       String
  publishedAt   DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  publishedById String
  isFeatured    Boolean   @default(false)
  agent         Agent     @relation(fields: [agentId], references: [id])
}

// ── API Keys ──────────────────────────────────────────────
model ApiKey {
  id          String    @id @default(cuid())
  label       String
  hashedKey   String    @unique
  permissions String[]  // "read" | "write" | "admin"
  createdAt   DateTime  @default(now())
  lastUsedAt  DateTime?
  revokedAt   DateTime?
  userId      String
  user        User      @relation(fields: [userId], references: [id])
}
```

---

## 4. API Routes

All routes are under `app/api/`. All routes require authentication via Auth.js session middleware unless marked `[public]`.

### 4.1 Agents

| Method | Route | Description | RBAC |
|---|---|---|---|
| GET | `/api/agents` | List all agents for team | All roles |
| POST | `/api/agents` | Create agent | Owner, Admin, Member |
| GET | `/api/agents/[id]` | Get agent by ID | All roles |
| PATCH | `/api/agents/[id]` | Update agent | Owner, Admin, Member |
| DELETE | `/api/agents/[id]` | Delete agent | Owner, Admin only |
| POST | `/api/agents/[id]/activate` | Activate agent | Owner, Admin, Member |
| POST | `/api/agents/[id]/pause` | Pause agent | Owner, Admin, Member |
| POST | `/api/agents/[id]/duplicate` | Duplicate agent | Owner, Admin, Member |

### 4.2 Lifecycle

| Method | Route | Description | RBAC |
|---|---|---|---|
| GET | `/api/lifecycle/transitions` | List all transitions | All roles |
| POST | `/api/lifecycle/transitions` | Create transition | Owner, Admin |
| GET | `/api/agents/[id]/versions` | List versions for agent | All roles |
| POST | `/api/agents/[id]/versions` | Create version snapshot | Owner, Admin, Member |

### 4.3 Studio

| Method | Route | Description | RBAC |
|---|---|---|---|
| GET | `/api/prompts` | List prompt templates | All roles |
| POST | `/api/prompts` | Create prompt | Owner, Admin, Member |
| DELETE | `/api/prompts/[id]` | Delete prompt | Owner only (or creator) |
| POST | `/api/training-sessions` | Start training session | Owner, Admin, Member |
| GET | `/api/training-sessions` | List sessions | All roles |

### 4.4 Marketplace

| Method | Route | Description | RBAC |
|---|---|---|---|
| GET | `/api/marketplace` | List all listings | All roles, `[public]` |
| GET | `/api/marketplace/[id]` | Get listing | All roles, `[public]` |
| POST | `/api/marketplace` | Publish listing | Owner, Admin, Member |
| POST | `/api/marketplace/[id]/install` | Install agent | Owner, Admin, Member |
| DELETE | `/api/marketplace/[id]/uninstall` | Uninstall | Owner, Admin, Member |

### 4.5 Analytics

| Method | Route | Description | RBAC |
|---|---|---|---|
| GET | `/api/analytics/performance?window={24h\|7d\|30d\|90d}` | Performance KPIs | All roles |
| GET | `/api/analytics/usage?window=...` | Usage metrics | All roles |
| GET | `/api/analytics/errors?window=...` | Error rates | All roles |
| GET | `/api/analytics/export?tab={performance\|usage\|errors}&window=...` | CSV export | Owner, Admin |

### 4.6 Settings & Auth

| Method | Route | Description | RBAC |
|---|---|---|---|
| GET | `/api/users/me` | Get current user profile | Authenticated |
| PATCH | `/api/users/me` | Update profile | Authenticated |
| GET | `/api/team/members` | List team members | Owner, Admin |
| POST | `/api/team/invites` | Invite member | Owner, Admin |
| DELETE | `/api/team/members/[id]` | Remove member | Owner, Admin |
| PATCH | `/api/team/members/[id]/role` | Change role | Owner only |
| GET | `/api/api-keys` | List API keys | Authenticated |
| POST | `/api/api-keys` | Create API key | Owner, Admin |
| DELETE | `/api/api-keys/[id]` | Revoke API key | Owner, Admin |

---

## 5. Implementation Tasks

### Task API-T01 — Prisma Setup
- Install: `npm install prisma @prisma/client`
- `npx prisma init --datasource-provider postgresql`
- Create `prisma/schema.prisma` with full schema from §3.1.
- `npx prisma migrate dev --name init`

### Task API-T02 — Shared Types (`lib/types/index.ts`)
- Generate TypeScript types from Prisma schema using `prisma-zod-generator` or manually.
- Export all entity interfaces and enum types.
- This file is the **single source of truth** for all feature agents.

### Task API-T03 — API Response Helpers (`lib/api/response.ts`)
```typescript
export function apiSuccess<T>(data: T, status = 200): NextResponse
export function apiError(message: string, status: number): NextResponse
export function apiPaginated<T>(data: T[], total: number, page: number, pageSize: number): NextResponse
```

### Task API-T04 — Auth Middleware Helper (`lib/api/with-auth.ts`)
```typescript
export function withAuth(
  handler: (req: NextRequest, session: Session) => Promise<NextResponse>,
  requiredRole?: UserRole
): (req: NextRequest) => Promise<NextResponse>
```
- Validates Auth.js session.
- Checks role if `requiredRole` specified.
- Returns 401 (unauthenticated) or 403 (insufficient role) as appropriate.

### Task API-T05 — Input Sanitisation (`lib/api/sanitize.ts`)
- Wrap all user-supplied string inputs through a sanitiser function before writing to DB.
- Use `DOMPurify` (server-safe) or strip HTML tags with a simple regex.
- All `String` Prisma fields must pass through this utility.

### Task API-T06 — Agents API Routes
- Implement all routes from §4.1.
- Use Zod schemas from `lib/schemas/agent-schema.ts` (created by Agent 3) for body validation.
- Return 422 with validation errors if Zod parse fails.

### Task API-T07 — Lifecycle API Routes
- Implement transition creation with stage-change validation:
  - Cannot transition to the same stage.
  - Cannot transition a RETIRED agent.
  - Only Owner/Admin can transition to PRODUCTION.
- Record `LifecycleTransition` on every `Agent.lifecycleStage` change.

### Task API-T08 — Studio API Routes
- `POST /api/training-sessions`: Runs a simulated training (random scores per step) — real LLM execution deferred to background job.

### Task API-T09 — Marketplace API Routes
- `POST /api/marketplace/[id]/install`: Copies the marketplace agent config into the team's agent inventory as a new `Agent` record.

### Task API-T10 — Analytics API Routes
- Aggregate real usage data from `TrainingSession`, `Agent`, and request logs.
- For v1: return computed aggregates from existing DB data.

### Task API-T11 — API Key Management
- On `POST /api/api-keys`: Generate a 32-byte random key, return it **once** as plaintext, store only its SHA-256 hash in the database.
- Validation of API keys (for programmatic access): check SHA-256 hash of `Authorization: Bearer {key}` against `ApiKey.hashedKey`.

### Task API-T12 — Rate Limiting
- Apply rate limiting to all `POST/PATCH/DELETE` endpoints.
- Limit: 100 requests per minute per user ID.
- Return `429 Too Many Requests` with `Retry-After` header.

### Task API-T13 — Environment Variables
Create `.env.example` documenting all required environment variables:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## 6. Security Requirements

| Req ID | Requirement | Implementation |
|---|---|---|
| NFR-SEC-01 | TLS 1.2+ in transit | Enforced by hosting platform (Vercel/Railway); `next.config.mjs` adds HSTS header |
| NFR-SEC-02 | API keys stored hashed | SHA-256 hash via Node.js `crypto` module; plaintext returned only once |
| NFR-SEC-03 | XSS/injection prevention | Input sanitisation in `lib/api/sanitize.ts`; Prisma parameterised queries prevent SQL injection |
| NFR-SEC-04 | Auth tokens in HttpOnly cookies | Auth.js default with `useSecureCookies: true` in production |
| AUTH-03 | Session expiry | `session.maxAge: 8 * 60 * 60` in Auth.js config |

---

## 7. File Change Map

| File | Action |
|---|---|
| `prisma/schema.prisma` | Create full database schema |
| `prisma/seed.ts` | Create database seeder with demo data |
| `lib/types/index.ts` | Create shared type definitions |
| `lib/api/response.ts` | Create API response helpers |
| `lib/api/with-auth.ts` | Create auth middleware wrapper |
| `lib/api/sanitize.ts` | Create input sanitisation utility |
| `app/api/agents/route.ts` | Create agents list + create endpoints |
| `app/api/agents/[id]/route.ts` | Create agent CRUD endpoints |
| `app/api/lifecycle/transitions/route.ts` | Create transitions endpoints |
| `app/api/prompts/route.ts` | Create prompts endpoints |
| `app/api/training-sessions/route.ts` | Create training endpoints |
| `app/api/marketplace/route.ts` | Create marketplace endpoints |
| `app/api/analytics/performance/route.ts` | Create performance endpoint |
| `app/api/analytics/usage/route.ts` | Create usage endpoint |
| `app/api/analytics/errors/route.ts` | Create errors endpoint |
| `app/api/api-keys/route.ts` | Create API key management endpoints |
| `app/api/users/me/route.ts` | Create user profile endpoints |
| `app/api/team/members/route.ts` | Create team management endpoints |
| `.env.example` | Create environment variable documentation |

---

## 8. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| `prisma migrate dev` runs without errors | Run migration |
| `prisma db seed` populates demo data | Run seed, query DB |
| `GET /api/agents` returns array of agents | `curl` or Postman |
| `POST /api/agents` with invalid body returns 422 | Send malformed payload |
| `DELETE /api/agents/:id` as Member returns 403 | Test with Member session |
| API key hash stored (not plaintext) in DB | Query `ApiKey` table directly |
| Revoked API key returns 401 on use | Try revoked key in `Authorization` header |
| Rate limit returns 429 after 100 requests/min | Send burst of requests |
| No SQL injection via agent name field | Test with `' OR 1=1 --` in agent name |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
