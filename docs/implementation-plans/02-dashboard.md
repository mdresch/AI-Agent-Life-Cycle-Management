# Dashboard Implementation Plan

## Module: Dashboard
**Owner Agent:** Agent 2  
**Branch:** `feat/dashboard`  
**Phase:** 1 — Core Modules  
**Depends on:** Agent 1 (`feat/design-system` merged)

---

## Table of Contents

1. [Objective](#1-objective)
2. [Requirements Mapping](#2-requirements-mapping)
3. [Component Breakdown](#3-component-breakdown)
4. [Data Contracts](#4-data-contracts)
5. [Implementation Tasks](#5-implementation-tasks)
6. [File Change Map](#6-file-change-map)
7. [Acceptance Criteria](#7-acceptance-criteria)

---

## 1. Objective

Deliver a fully functional Dashboard page (`/`) that serves as the command centre for the platform. The page must display real-time (initially mock) KPI metrics, agent status charts, top-performing agents, and a recent activity feed, all styled in the navy blue design system.

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority | Status |
|---|---|---|---|
| DASH-01 | Aggregate KPIs: total agents, active agents, avg response time, success rate | Must Have | Partially implemented (mock data) |
| DASH-02 | Real-time agent status overview chart | Must Have | Partially implemented |
| DASH-03 | Top-performing agents ranked by success rate or usage | Should Have | Partially implemented |
| DASH-04 | Chronological feed of recent platform activity | Should Have | Partially implemented |
| DASH-05 | Quick-action buttons: New Agent, Settings | Must Have | Partially implemented |
| DASH-06 | KPI cards show trend indicator vs previous period | Should Have | Needs implementation |

---

## 3. Component Breakdown

```
DashboardPage  (app/page.tsx)
└── DashboardShell
    ├── DashboardHeader
    │   ├── Heading & subheading
    │   ├── <Button> New Agent → /agents/new
    │   └── <Button variant="outline"> Settings → /settings
    ├── KpiCardGrid  (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4)
    │   ├── KpiCard — Total Agents
    │   ├── KpiCard — Active Agents
    │   ├── KpiCard — Avg Response Time
    │   └── KpiCard — Success Rate
    ├── OverviewRow  (grid-cols-1 lg:grid-cols-5)
    │   ├── AgentStatusChart  (col-span-3) — donut/pie chart
    │   └── AgentStatusBreakdown  (col-span-2) — tabular status list
    ├── TopAgentsCard
    │   └── TopAgentsList  — ranked rows with name, type, score, trend
    └── RecentActivityCard
        └── RecentActivityFeed  — chronological event items
```

---

## 4. Data Contracts

### 4.1 KPI Data Shape

```typescript
interface KpiMetric {
  label: string;
  value: string | number;
  unit?: string;           // e.g. "ms", "%"
  trend: "up" | "down" | "neutral";
  trendValue: string;      // e.g. "+5%" or "-120ms"
  icon: LucideIcon;
}
```

### 4.2 Agent Status Data Shape

```typescript
interface AgentStatusCount {
  status: "active" | "inactive" | "error";
  count: number;
  percentage: number;
  color: string;           // CSS variable reference: "hsl(var(--chart-1))"
}
```

### 4.3 Top Agent Data Shape

```typescript
interface TopAgent {
  id: string;
  name: string;
  type: string;
  successRate: number;     // 0–100
  requestsPerDay: number;
  trend: "up" | "down" | "neutral";
}
```

### 4.4 Activity Event Data Shape

```typescript
interface ActivityEvent {
  id: string;
  type: "agent_created" | "lifecycle_transition" | "training_completed"
      | "agent_error" | "marketplace_install" | "settings_change";
  message: string;
  actor: string;           // display name
  timestamp: string;       // ISO 8601
  agentId?: string;
  agentName?: string;
}
```

---

## 5. Implementation Tasks

### Task DASH-T01 — Implement KpiCard Component
- **File:** `components/dashboard/kpi-card.tsx`
- **Props:** `KpiMetric` interface (see §4.1)
- **Design:**
  - White card with `4px solid hsl(var(--accent))` left border (navy blue design system §5.4)
  - Icon in top-right inside a `hsl(var(--muted))` rounded square
  - Value text: `text-3xl font-bold text-foreground`
  - Label text: `text-sm text-muted-foreground`
  - Trend indicator: green arrow + text for "up", red for "down", grey for "neutral"
  - Trend value shown as `+5%` style text

### Task DASH-T02 — Wire KPI Data
- **File:** `app/page.tsx` or `components/dashboard/agent-stats.tsx`
- **Action:** Define mock `KpiMetric[]` array. Include `trendValue` and `trend` for all four metrics.
- **Future hook:** `useDashboardKpis()` → fetches from `GET /api/dashboard/kpis`.

### Task DASH-T03 — Implement AgentStatusChart
- **File:** `components/dashboard/agent-status-overview.tsx`
- **Chart library:** Recharts `PieChart` or `RadialBarChart`
- **Colors:** Use `hsl(var(--chart-1))` for active, `hsl(var(--chart-3))` for inactive, `hsl(var(--destructive))` for error.
- **Legend:** Inline below or beside chart.
- **Responsive:** `ResponsiveContainer` with `width="100%" height={240}`.

### Task DASH-T04 — Implement TopAgents
- **File:** `components/dashboard/top-agents.tsx`
- **Design:**
  - Card with heading "Top Performing Agents"
  - Table-like row layout: rank number, agent name badge, type label, success rate progress bar, requests/day count, trend arrow.
  - Progress bar fills in `hsl(var(--primary))` navy.
  - Limit to 5 agents.

### Task DASH-T05 — Implement RecentActivity
- **File:** `components/dashboard/recent-activity.tsx`
- **Design:**
  - Card with heading "Recent Activity"
  - Scrollable list (max height `320px`, `overflow-y-auto`).
  - Each item: icon (coloured by event type), message, actor name, relative time (e.g., "2 min ago").
  - Event type icons: Bot (agent created), RefreshCw (lifecycle), Zap (training), AlertCircle (error), Download (install), Settings (settings).
  - Timestamp displayed as relative if within 24h, absolute date otherwise.

### Task DASH-T06 — DashboardHeader with Quick Actions
- **File:** `components/dashboard/dashboard-header.tsx`
- **Design:**
  - Left: heading "Dashboard" (H2), subheading with current date.
  - Right: `<Button>` "New Agent" (primary/navy), `<Button variant="outline">` Settings icon.
  - Responsive: buttons stack below heading on mobile.

### Task DASH-T07 — Assemble Dashboard Page
- **File:** `app/page.tsx`
- **Action:** Compose all components in DashboardShell layout. All data is passed as props from mock data defined at page level.
- **Loading state:** Add `<Skeleton>` placeholders for each card section (shown for 500ms via `useEffect` to simulate async fetch).

### Task DASH-T08 — Apply Design System Styling
- Verify all dashboard components use only design-token colours (no hardcoded hex/rgb values).
- KPI card icons: use Lucide icons — `Bot`, `Activity`, `Timer`, `CheckCircle`.
- All text must use semantic colour classes: `text-foreground`, `text-muted-foreground`, `text-primary`.

---

## 6. File Change Map

| File | Action |
|---|---|
| `app/page.tsx` | Refactor to use new component structure; add mock data; add loading skeleton |
| `components/dashboard/kpi-card.tsx` | Create / rewrite to match DS spec |
| `components/dashboard/agent-stats.tsx` | Refactor to use `KpiCard` |
| `components/dashboard/agent-status-overview.tsx` | Update chart colours to CSS variables |
| `components/dashboard/top-agents.tsx` | Add progress bars and trend arrows |
| `components/dashboard/recent-activity.tsx` | Add event type icons and relative timestamps |
| `components/dashboard/dashboard-header.tsx` | Add quick-action buttons |

---

## 7. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| All four KPI cards render with value, label, and trend indicator | Visual inspection of `/` |
| Trend indicators show correct up/down/neutral arrow colours | Check mock data matches display |
| Agent status chart renders in navy/blue colour palette | Visual inspection |
| Top agents list shows 5 agents with progress bars | Visual inspection |
| Recent activity feed shows 5+ events with correct icons | Visual inspection |
| "New Agent" button navigates to `/agents/new` | Click test |
| Settings button navigates to `/settings` | Click test |
| Page is responsive at 1280px, 1024px, and 768px | Browser resize test |
| Loading skeleton is displayed before data appears | Add 500ms artificial delay in useEffect |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
