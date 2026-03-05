# System Architecture — AI Agent Life Cycle Management

This document describes the high-level architecture of the platform, the key component hierarchy, and the data flow between layers.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Layers](#2-technology-layers)
3. [Application Structure](#3-application-structure)
4. [Page & Component Hierarchy](#4-page--component-hierarchy)
5. [Data Flow](#5-data-flow)
6. [Routing](#6-routing)
7. [Theming & Styling](#7-theming--styling)
8. [State Management](#8-state-management)
9. [Future Backend Considerations](#9-future-backend-considerations)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │             Next.js 15 (App Router)               │  │
│  │                                                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │  │
│  │  │  Layout  │  │  Pages   │  │  Components  │   │  │
│  │  │(header,  │  │(app/**/  │  │(UI + feature │   │  │
│  │  │ footer,  │  │page.tsx) │  │ components)  │   │  │
│  │  │ theme)   │  └──────────┘  └──────────────┘   │  │
│  │  └──────────┘                                    │  │
│  │                                                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │  │
│  │  │   Hooks  │  │   Lib    │  │  shadcn/ui   │   │  │
│  │  │(toast,   │  │(utils)   │  │  Primitives  │   │  │
│  │  │ mobile)  │  └──────────┘  └──────────────┘   │  │
│  │  └──────────┘                                    │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          │
                          │ (future: REST / GraphQL API)
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Backend Services                     │
│  (Not yet implemented — see §9 for guidance)            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Auth    │  │  Agent   │  │Analytics │              │
│  │ Service  │  │  Service │  │ Service  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │Marketplace│ │Lifecycle │  │ Trends   │              │
│  │ Service  │  │ Service  │  │  Feed    │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
   ┌──────────┐    ┌──────────┐    ┌──────────┐
   │ OpenAI   │    │Anthropic │    │  Llama   │
   │   API    │    │   API    │    │  (Groq)  │
   └──────────┘    └──────────┘    └──────────┘
```

---

## 2. Technology Layers

| Layer | Technology | Responsibility |
|---|---|---|
| Routing & Rendering | Next.js 15 App Router | File-based routing, Server Components, layouts |
| Language | TypeScript 5 | Type safety across all components and utilities |
| UI Primitives | Radix UI + shadcn/ui | Accessible, unstyled base components |
| Styling | Tailwind CSS 3 | Utility-first CSS; design tokens via CSS variables |
| Charts | Recharts | Responsive SVG-based data visualisation |
| Forms | React Hook Form + Zod | Schema-driven form validation |
| Icons | Lucide React | Consistent icon set |
| Theming | next-themes | System-aware light/dark mode |
| Toast | Sonner | Non-blocking notification toasts |
| Carousel | Embla Carousel | Accessible card/image carousels |

---

## 3. Application Structure

```
app/
├── layout.tsx              ← Root layout: ThemeProvider, SiteHeader, SiteFooter
├── globals.css             ← CSS custom properties (design tokens)
├── page.tsx                ← Dashboard (/)
├── agents/
│   ├── page.tsx            ← Agent list (/agents)
│   └── new/
│       └── page.tsx        ← New agent form (/agents/new)
├── analytics/
│   └── page.tsx            ← Analytics dashboard (/analytics)
├── business-agents/
│   └── page.tsx            ← Business agents (/business-agents)
├── lifecycle/
│   └── page.tsx            ← Lifecycle management (/lifecycle)
├── marketplace/
│   └── page.tsx            ← Marketplace (/marketplace)
├── settings/
│   └── page.tsx            ← Settings (/settings)
├── studio/
│   └── page.tsx            ← AI Studio (/studio)
└── trends/
    └── page.tsx            ← Trends & research (/trends)
```

---

## 4. Page & Component Hierarchy

### Root Layout

```
RootLayout (app/layout.tsx)
└── ThemeProvider
    ├── SiteHeader
    │   ├── MainNav          (links: Dashboard, Agents, Business Agents, Studio, Trends, Lifecycle, Marketplace)
    │   ├── ThemeToggle
    │   └── UserNav
    ├── <Page Content />     (children slot)
    └── SiteFooter
```

### Dashboard Page

```
DashboardPage
└── DashboardShell
    ├── DashboardHeader      (heading + New Agent / Settings buttons)
    ├── AgentStats ×4        (Total, Active, Avg. Response Time, Success Rate)
    ├── AgentStatusOverview  (status chart + status breakdown)
    ├── TopAgents            (leaderboard card)
    └── RecentActivity       (activity feed)
```

### Agents Pages

```
AgentsPage
└── AgentsList               (search input + card grid)
    └── AgentCard ×N         (name, type, status badge, actions dropdown)

NewAgentPage
└── AgentCreationForm
    └── Tabs
        ├── BasicInformation (name, description, type, auto-activate)
        ├── ModelConfiguration (model select, system prompt, maxTokens, temperature)
        └── Tools & Capabilities (tool checkbox grid)
```

### Lifecycle Page

```
LifecyclePage
└── LifecycleDashboard
    └── Tabs
        ├── LifecycleOverview
        │   ├── LifecycleStageChart (donut chart)
        │   ├── Stage list with badges
        │   └── RecentTransitions list
        ├── VersionHistory
        ├── AgentTemplates
        └── AgentRetirement
```

### AI Studio Page

```
StudioPage
└── StudioDashboard
    └── Tabs
        ├── StudioOverview       (KPIs + StudioActivityChart + recent activity)
        ├── StudioWorkspace      (active project workspace)
        ├── TrainingGround       (scenario runner + TrainingScenario + TrainingMetrics)
        └── PromptLibrary        (searchable saved prompts)
```

### Trends Page

```
TrendsPage
└── TrendsDashboard
    ├── Filters (category select, refresh button, last-updated badge)
    ├── BreakthroughAlert card
    └── Tabs
        ├── TrendingTopics
        ├── NewsArticles
        ├── ResearchHighlights
        └── TechnologyRadar
```

### Marketplace Page

```
MarketplacePage
└── MarketplaceDashboard
    ├── Search + filter controls
    ├── Marketplace KPI cards ×4
    ├── Featured Agents section
    └── Tabs
        ├── MarketplaceAgents   (browse/discover)
        ├── MarketplaceSubscriptions
        └── MarketplacePublish
```

### Analytics Page

```
AnalyticsPage
└── AnalyticsDashboard
    └── Tabs (+ time-window selector)
        ├── Performance
        │   ├── KPI cards ×4
        │   ├── ResponseTimeChart
        │   └── PerformanceChart
        ├── Usage
        │   └── UsageMetrics
        └── Errors
            └── ErrorRateChart
```

### Business Agents Page

```
BusinessAgentsPage
└── BusinessAgentsDashboard
    └── Tabs
        ├── BusinessAgentsOverview (chart + KPIs + knowledge domains)
        ├── DivisionView
        ├── DepartmentView
        └── ExpertiseView
```

---

## 5. Data Flow

The current implementation uses **static/mock data** defined inline within components. The architecture is designed so that this data layer can be replaced with real API calls with minimal changes:

```
Component
  │
  ├── (current) Inline mock data (hardcoded arrays/objects)
  │
  └── (future)  async Server Component or React Query hook
                  └── fetch() → REST API → Database
```

For example, `AgentsList` currently holds the agent array in a `useState` initialiser. To connect to a real API, replace that with a `useSWR` / `useQuery` hook or move the fetch to a Server Component and pass data as props.

### Form Submissions

```
AgentCreationForm
  │
  ├── React Hook Form (client-side validation via Zod)
  │
  └── onSubmit()
        │
        ├── (current) setTimeout simulation + console.log + router.push("/agents")
        │
        └── (future)  fetch("POST /api/agents", body) → redirect on success
```

---

## 6. Routing

All routes use the Next.js 15 App Router. Pages are Server Components by default; components that need browser APIs or React state are marked `"use client"`.

| Route | Page Component | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Dashboard |
| `/agents` | `app/agents/page.tsx` | Agent list |
| `/agents/new` | `app/agents/new/page.tsx` | Agent creation |
| `/analytics` | `app/analytics/page.tsx` | Analytics |
| `/business-agents` | `app/business-agents/page.tsx` | Business agents |
| `/lifecycle` | `app/lifecycle/page.tsx` | Lifecycle management |
| `/marketplace` | `app/marketplace/page.tsx` | Marketplace |
| `/settings` | `app/settings/page.tsx` | Settings |
| `/studio` | `app/studio/page.tsx` | AI Studio |
| `/trends` | `app/trends/page.tsx` | Trends & research |

---

## 7. Theming & Styling

### CSS Custom Properties

Design tokens are defined in `app/globals.css` using CSS custom properties (HSL colour values). Tailwind consumes these via `tailwind.config.ts` semantic colour names (e.g., `bg-background`, `text-foreground`, `border-border`).

### Dark Mode

`next-themes` wraps the app with a `ThemeProvider` that listens to the system preference and allows manual override via the `ThemeToggle` component. The `darkMode: ["class"]` Tailwind strategy applies styles when the `dark` class is present on `<html>`.

### Component Styling

All components use Tailwind utility classes. `class-variance-authority` (CVA) is used within shadcn/ui primitives (e.g., `Button`, `Badge`) to express variant and size modifiers in a type-safe way. `tailwind-merge` ensures conflicting utilities are deduplicated when consumers pass additional class names.

---

## 8. State Management

The platform uses **local React state** (`useState`, `useReducer`) for UI state such as search queries, active tabs, and form values. No global state library is currently required. When a backend is integrated, the recommended approach is:

- **Server state** (data from APIs): [SWR](https://swr.vercel.app/) or [TanStack Query](https://tanstack.com/query)
- **Client UI state** (modals, toasts, selections): React Context or [Zustand](https://zustand-demo.pmnd.rs/)

---

## 9. Future Backend Considerations

The current codebase is a fully functional frontend prototype. To reach a production deployment the following backend work is required:

1. **API Layer** — Build a REST or GraphQL API (e.g., Next.js Route Handlers, or a separate service in Node.js / Go) exposing endpoints for each entity in the Data Requirements.
2. **Database** — A relational database (PostgreSQL) is recommended for agents, users, and lifecycle data. A time-series store (InfluxDB, TimescaleDB) suits analytics metrics.
3. **Authentication** — Integrate an auth provider (Auth.js / NextAuth, Clerk, or Auth0) to handle sessions, JWTs, and OAuth flows.
4. **LLM Gateway** — A thin proxy service that normalises requests to OpenAI, Anthropic, and other providers, handles rate limiting, and redacts secrets from logs.
5. **Background Jobs** — A job queue (BullMQ, Inngest) for training session execution, marketplace indexing, and trends feed refreshes.
6. **File Storage** — Object storage (S3-compatible) for agent configuration exports and training data uploads.
