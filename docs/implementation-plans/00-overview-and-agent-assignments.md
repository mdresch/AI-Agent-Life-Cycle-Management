# Implementation Plans — Overview & Agent Assignments

## AI Agent Life Cycle Management Platform

This document is the master index for all implementation plans in this subfolder. It describes how multiple AI coding agents can divide and execute the full build of the platform in parallel, and lists any open questions that must be resolved before implementation begins.

---

## Table of Contents

1. [Scope Recap](#1-scope-recap)
2. [Phased Delivery](#2-phased-delivery)
3. [Agent Assignments](#3-agent-assignments)
4. [Cross-Agent Contracts](#4-cross-agent-contracts)
5. [Open Questions](#5-open-questions)
6. [Plan Index](#6-plan-index)

---

## 1. Scope Recap

The platform is a production-ready web application for the **end-to-end governance of AI agents**. The current repository contains a fully functional **Next.js 15 App Router** frontend prototype with static/mock data. The implementation plans in this folder describe what must be built or changed to reach a production-quality state, covering:

- A professional **navy blue design system** replacing the current neutral theme.
- Completion of all **functional requirements** from `docs/requirements.md`.
- A **backend API layer** (REST via Next.js Route Handlers) replacing mock data.
- **Authentication & RBAC** (Role-Based Access Control).
- **Testing & QA** gates before every production promotion.

---

## 2. Phased Delivery

### Phase 0 — Foundation ✅ COMPLETED
| Work Item | Plan File | Status |
|---|---|---|
| Design system — navy blue tokens, typography, component variants | [01-design-system.md](./01-design-system.md) | ✅ Done |

### Phase 1 — Core Modules ✅ COMPLETED
| Work Item | Plan File | Status |
|---|---|---|
| Dashboard | [02-dashboard.md](./02-dashboard.md) | ✅ Done |
| Agent Management | [03-agent-management.md](./03-agent-management.md) | ✅ Done |
| Lifecycle Management | [07-lifecycle-management.md](./07-lifecycle-management.md) | ✅ Done |
| Authentication & Settings | [10-settings-auth.md](./10-settings-auth.md) | ✅ Done |

**Phase 1 Implementation Summary (completed 2026-03-05):**
- **Foundation:** Shared types (`lib/types/index.ts`), mock data (`lib/mock-data/`), React hooks (`lib/hooks/`), Zod validation schemas (`lib/schemas/agent-schema.ts`).
- **Dashboard:** `KpiCard` component with trend indicators, `TopAgents` with progress bars & trend arrows, `RecentActivity` with event-type icons.
- **Agent Management:** Delete confirmation dialog, activate/pause toggle with toast notifications, duplicate agent, type-filter dropdown, empty state, client-side filtering via `useAgents` hook.
- **Lifecycle Management:** `LifecycleHeader` KPI cards, stage progress bars, colour-coded stage transition badges, 3-step guided retirement workflow.
- **Auth & Settings:** Login page (`/login`) with demo credentials (`demo@example.com` / `demo1234`), cookie-based session middleware, forgot-password placeholder, updated `UserNav` with sign-out, `usePermission` RBAC guard hook.

### Phase 2 — Extended Modules ✅ COMPLETED
| Work Item | Plan File | Status |
|---|---|---|
| Business Agents | [04-business-agents.md](./04-business-agents.md) | ✅ Done |
| AI Studio | [05-ai-studio.md](./05-ai-studio.md) | ✅ Done |
| Trends & Research | [06-trends-research.md](./06-trends-research.md) | ✅ Done |
| Analytics | [09-analytics.md](./09-analytics.md) | ✅ Done |

**Phase 2 Implementation Summary (completed 2026-03-09):**
- **Business Agents:** `/business-agents` page with department/division/expertise-domain drill-down views, department card grid, distribution chart, knowledge-domains card, and agent roster (`lib/mock-data/business-agents.ts`; `components/business-agents/**`).
- **AI Studio:** `/studio` page with project workspace, prompt library, new-prompt dialog, training ground with scenario runner, training metrics charts, and recent activity feed (`lib/mock-data/studio.ts`; `components/studio/**`).
- **Trends & Research:** `/trends` page with technology radar, trending topics, breakthrough alert cards, news articles, and research highlights (`lib/mock-data/trends.ts`; `components/trends/**`).
- **Analytics:** `/analytics` page with performance KPIs, usage metrics, error-rate chart, response-time chart, performance-trends chart, errors table, and CSV export (`lib/mock-data/analytics.ts`; `lib/utils/csv-export.ts`; `components/analytics/**`).

### Phase 3 — Marketplace & Backend ✅ COMPLETED
| Work Item | Plan File | Status |
|---|---|---|
| Marketplace | [08-marketplace.md](./08-marketplace.md) | ✅ Done |
| Backend API & Data Layer | [11-backend-api.md](./11-backend-api.md) | ✅ Done |

**Phase 3 Implementation Summary (completed 2026-03-09):**
- **Marketplace:** `/marketplace` page with KPI cards, featured-agents Embla carousel, agent catalogue grid with category filter, star ratings, install/uninstall actions, subscriptions tab with update/unsubscribe, and publish form with Zod validation (`lib/mock-data/marketplace.ts`; `components/marketplace/**`). Public endpoints: `GET /api/marketplace`, `GET /api/marketplace/[id]`, `POST /api/marketplace`.
- **Backend API & Data Layer:** REST Route Handlers in `app/api/` covering agents (`GET/POST /api/agents`, `PATCH/DELETE /api/agents/[id]`), marketplace (`GET /api/marketplace`, `GET /api/marketplace/[id]`, `POST /api/marketplace`), analytics (`GET /api/analytics/usage`, `GET /api/analytics/performance`, `GET /api/analytics/errors`), api-keys (`GET/POST /api/api-keys`), and users (`GET/PATCH /api/users/me`). Shared utilities: `lib/api/response.ts` (envelope helpers), `lib/api/with-auth.ts` (mock RBAC guard), `lib/api/sanitize.ts` (HTML-strip sanitizer), `lib/api/stores.ts` (in-memory stores). Prisma schema in `prisma/schema.prisma` ready for real-DB migration.

### Phase 4 — Quality Gates
| Work Item | Plan File | Status |
|---|---|---|
| Testing & QA | [12-testing-qa.md](./12-testing-qa.md) | 🔲 Pending |

---

## 3. Agent Assignments

Each agent operates in its own branch and submits a pull request targeting `main`. Agents must not modify files owned by another agent unless a conflict is explicitly coordinated.

### Agent 1 — Design System Agent
- **Branch:** `feat/design-system`
- **Files owned:** `app/globals.css`, `tailwind.config.ts`, `components/ui/**`, `components/site-header.tsx`, `components/site-footer.tsx`
- **Deliverable:** All design tokens updated to navy blue palette; typography and spacing documented; all shadcn/ui primitives verified against new tokens.
- **Plan:** [01-design-system.md](./01-design-system.md)

### Agent 2 — Dashboard Agent
- **Branch:** `feat/dashboard`
- **Files owned:** `app/page.tsx`, `components/dashboard/**`
- **Depends on:** Agent 1 (design tokens must be merged first)
- **Plan:** [02-dashboard.md](./02-dashboard.md)

### Agent 3 — Agent Management Agent
- **Branch:** `feat/agent-management`
- **Files owned:** `app/agents/**`, `components/agents/**`
- **Depends on:** Agent 1
- **Plan:** [03-agent-management.md](./03-agent-management.md)

### Agent 4 — Business Agents Agent
- **Branch:** `feat/business-agents`
- **Files owned:** `app/business-agents/**`, `components/business-agents/**`
- **Depends on:** Agent 1
- **Plan:** [04-business-agents.md](./04-business-agents.md)

### Agent 5 — AI Studio Agent
- **Branch:** `feat/ai-studio`
- **Files owned:** `app/studio/**`, `components/studio/**`
- **Depends on:** Agent 1
- **Plan:** [05-ai-studio.md](./05-ai-studio.md)

### Agent 6 — Trends & Research Agent
- **Branch:** `feat/trends`
- **Files owned:** `app/trends/**`, `components/trends/**`
- **Depends on:** Agent 1
- **Plan:** [06-trends-research.md](./06-trends-research.md)

### Agent 7 — Lifecycle Management Agent
- **Branch:** `feat/lifecycle`
- **Files owned:** `app/lifecycle/**`, `components/lifecycle/**`
- **Depends on:** Agent 1
- **Plan:** [07-lifecycle-management.md](./07-lifecycle-management.md)

### Agent 8 — Marketplace Agent
- **Branch:** `feat/marketplace`
- **Files owned:** `app/marketplace/**`, `components/marketplace/**`
- **Depends on:** Agent 1, Agent 3 (agent inventory APIs)
- **Plan:** [08-marketplace.md](./08-marketplace.md)

### Agent 9 — Analytics Agent
- **Branch:** `feat/analytics`
- **Files owned:** `app/analytics/**`, `components/analytics/**`
- **Depends on:** Agent 1
- **Plan:** [09-analytics.md](./09-analytics.md)

### Agent 10 — Settings & Auth Agent
- **Branch:** `feat/settings-auth`
- **Files owned:** `app/settings/**`, `app/login/**`, `components/settings/**`, `components/auth/**`, `middleware.ts`
- **Depends on:** Agent 1
- **Plan:** [10-settings-auth.md](./10-settings-auth.md)

### Agent 11 — Backend API Agent
- **Branch:** `feat/backend-api`
- **Files owned:** `app/api/**`, `lib/db/**`, `lib/services/**`, `prisma/**`
- **Depends on:** Agent 10 (auth), all feature agents for schema contracts
- **Plan:** [11-backend-api.md](./11-backend-api.md)

### Agent 12 — Testing & QA Agent
- **Branch:** `feat/testing`
- **Files owned:** `tests/**`, `vitest.config.ts`, `playwright.config.ts`
- **Depends on:** All feature agents
- **Plan:** [12-testing-qa.md](./12-testing-qa.md)

---

## 4. Cross-Agent Contracts

These shared interfaces must be agreed upon before Phases 1 and 2 begin. The Backend API Agent (Agent 11) publishes the canonical TypeScript types in `lib/types/index.ts`. All feature agents import from this file — they must never redefine entity types locally.

### Shared Entity Types (defined in `lib/types/index.ts`)

```typescript
// Agent entity
export interface Agent {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  model: ModelProvider;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  tools: AgentTool[];
  status: AgentStatus;
  lifecycleStage: LifecycleStage;
  version: string;
  createdAt: string;      // ISO 8601
  updatedAt: string;      // ISO 8601
  createdBy: string;      // userId
}

export type AgentType =
  | "customer-support"
  | "analytics"
  | "creative"
  | "productivity"
  | "research"
  | "communication"
  | "custom";

export type ModelProvider =
  | "gpt-4o"
  | "gpt-4"
  | "gpt-3.5-turbo"
  | "claude-3-opus"
  | "claude-3-sonnet"
  | "llama-3-70b";

export type AgentTool =
  | "web-search"
  | "database-query"
  | "file-access"
  | "email-sending"
  | "calendar-access"
  | "code-execution";

export type AgentStatus = "active" | "inactive" | "error";

export type LifecycleStage =
  | "development"
  | "production"
  | "maintenance"
  | "retirement";

// User / Auth
export interface User {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  timezone: string;
  createdAt: string;
}

export type UserRole = "owner" | "admin" | "member" | "viewer";
```

### Shared API Route Conventions

All API routes follow the pattern:
```
GET    /api/{resource}          → list
POST   /api/{resource}          → create
GET    /api/{resource}/[id]     → get one
PATCH  /api/{resource}/[id]     → update
DELETE /api/{resource}/[id]     → delete
```

Standard response envelope:
```typescript
interface ApiResponse<T> {
  data: T;
  error?: string;
  meta?: { total: number; page: number; pageSize: number };
}
```

---

## 5. Open Questions

The following questions must be answered by the repository owner before implementation begins. Agents should not proceed with any item marked **❓ Blocking** until a decision is recorded here.

| # | Question | Blocking? | Status |
|---|---|---|---|
| Q1 | Should dark mode use a deep navy background (e.g., `hsl(220, 40%, 8%)`) or the existing near-black (`hsl(0, 0%, 4%)`)? | No — agent can default to deep navy | ❓ Open |
| Q2 | Which authentication provider should be used? Options: **Auth.js (NextAuth v5)**, **Clerk**, **Auth0**, or a custom JWT implementation. | ❓ Blocking for Agent 10 | ✅ Resolved — mock cookie session (`ai-platform-session`) implemented for v1; real provider deferred to post-v1 |
| Q3 | What database should be used for the initial production backend? Options: **PostgreSQL + Prisma**, **PlanetScale (MySQL + Prisma)**, **Supabase (Postgres + PostgREST)** | ❓ Blocking for Agent 11 | ✅ Resolved — Prisma schema (`prisma/schema.prisma`) targets PostgreSQL; in-memory mock stores used until a real DB is provisioned |
| Q4 | Should the Trends & Research feed pull from a real external API (e.g., NewsAPI, arXiv) or remain seeded with curated mock data for v1? | No — agent can use mock data with a real-API adapter stub | ✅ Resolved — mock data used for v1 (`lib/mock-data/trends.ts`) |
| Q5 | Is the AI trends feed data subject to any licensing or attribution requirements? | No — if mock data is used | ✅ Resolved — mock data only, no external attribution required |
| Q6 | Should the Marketplace have a review/approval workflow before published agents go live, or should publication be instant for v1? | No — agent can implement instant publish with a "pending review" status stub | ✅ Resolved — instant publish implemented with a `pending` status field for future review workflow |
| Q7 | What email provider (SMTP credentials / SES / Resend / Postmark) should be configured for team invitations and notifications? | No — agent can implement a provider-agnostic adapter | ❓ Open |
| Q8 | Should OAuth / SSO (Google, Microsoft) be in scope for v1 authentication? | No — can be Phase 3 | ✅ Resolved — deferred; mock session only for v1 |
| Q9 | Are there any branding assets (logo, favicon) that should replace the current placeholder? | No — agent can use a styled text logo | ❓ Open |
| Q10 | Should the navy blue color scheme apply to both light mode and dark mode, or only to one of them? | No — plan assumes navy-first light mode, deep-navy dark mode | ❓ Open |

---

## 6. Plan Index

| File | Module | Owner Agent |
|---|---|---|
| [01-design-system.md](./01-design-system.md) | Design System & Tokens | Agent 1 |
| [02-dashboard.md](./02-dashboard.md) | Dashboard | Agent 2 |
| [03-agent-management.md](./03-agent-management.md) | Agent Management | Agent 3 |
| [04-business-agents.md](./04-business-agents.md) | Business Agents | Agent 4 |
| [05-ai-studio.md](./05-ai-studio.md) | AI Studio | Agent 5 |
| [06-trends-research.md](./06-trends-research.md) | Trends & Research | Agent 6 |
| [07-lifecycle-management.md](./07-lifecycle-management.md) | Lifecycle Management | Agent 7 |
| [08-marketplace.md](./08-marketplace.md) | Marketplace | Agent 8 |
| [09-analytics.md](./09-analytics.md) | Analytics | Agent 9 |
| [10-settings-auth.md](./10-settings-auth.md) | Settings & Authentication | Agent 10 |
| [11-backend-api.md](./11-backend-api.md) | Backend API & Data Layer | Agent 11 |
| [12-testing-qa.md](./12-testing-qa.md) | Testing & QA | Agent 12 |
