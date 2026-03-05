# Lifecycle Management Implementation Plan

## Module: Lifecycle Management
**Owner Agent:** Agent 7  
**Branch:** `feat/lifecycle`  
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

Deliver the Lifecycle Management page (`/lifecycle`) that enables governance of agents through four defined stages: **Development**, **Production**, **Maintenance**, and **Retirement**. The page must display stage distribution charts, audit logs, version histories, pre-built templates, and a guided retirement workflow — all styled in the navy blue design system.

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority |
|---|---|---|
| LCY-01 | Four lifecycle stages: Development, Production, Maintenance, Retirement | Must Have |
| LCY-02 | Pie/donut chart showing agent distribution across stages | Must Have |
| LCY-03 | List of agents per stage with count and % of total | Must Have |
| LCY-04 | Audit log: agent name, from-stage, to-stage, date, acting user | Must Have |
| LCY-05 | Version History: version number, changelog, author, date | Must Have |
| LCY-06 | Agent Templates: pre-built templates to accelerate Development-stage creation | Should Have |
| LCY-07 | Retirement tab: guided workflow — confirm intent, set end date, archive config | Must Have |
| LCY-08 | Stage transitions gated: only authorised roles (Owner, Admin) can promote to Production | Must Have |

---

## 3. Component Breakdown

```
LifecyclePage  (app/lifecycle/page.tsx)
└── LifecycleDashboard
    ├── LifecycleHeader
    │   └── Heading + KPI row
    │       ├── KpiCard — Total Agents in Lifecycle
    │       ├── KpiCard — In Production
    │       └── KpiCard — Pending Promotion
    └── Tabs
        ├── Tab: Overview
        │   ├── LifecycleStageChart        (donut chart)
        │   ├── StageListCard              (4 stage rows: name, count, %)
        │   └── RecentTransitionsCard      (last 10 stage transitions)
        ├── Tab: Version History
        │   ├── AgentVersionFilter         (<Select> — filter by agent)
        │   └── VersionHistoryTable
        │       └── VersionRow ×N
        │           ├── Version badge
        │           ├── Changelog summary
        │           ├── Author + date
        │           └── Stage badge
        ├── Tab: Agent Templates
        │   └── TemplateGrid
        │       └── TemplateCard ×N
        │           ├── Template name + description
        │           ├── Type badge + model badge
        │           └── "Use Template" button → opens AgentCreationForm pre-filled
        └── Tab: Retirement
            └── RetirementDashboard
                ├── AgentRetirementList    (agents in Maintenance or eligible for retirement)
                │   └── RetirementCandidateRow ×N
                │       ├── Agent name + current stage badge
                │       ├── Days in current stage
                │       └── "Retire Agent" button
                └── RetirementWorkflow     (shown when an agent is selected)
                    ├── Step 1: ConfirmIntentCard
                    ├── Step 2: SetEndDateCard
                    └── Step 3: ArchiveConfirmCard
```

---

## 4. Data Contracts

### 4.1 Lifecycle Stage

```typescript
export type LifecycleStage = "development" | "production" | "maintenance" | "retirement";

export interface LifecycleStageSummary {
  stage: LifecycleStage;
  label: string;
  count: number;
  percentage: number;
  colour: string;   // CSS variable reference
  icon: string;     // Lucide icon name
  description: string;
}
```

### 4.2 Stage Colour Mapping

| Stage | Light Colour | Description |
|---|---|---|
| Development | `hsl(205 75% 55%)` — Sky Blue | Active development |
| Production | `hsl(152 60% 35%)` — Green | Live and healthy |
| Maintenance | `hsl(38 90% 50%)` — Amber | Temporarily offline |
| Retirement | `hsl(var(--muted-foreground))` — Grey | Being decommissioned |

### 4.3 Lifecycle Transition (Audit Log Entry)

```typescript
export interface LifecycleTransition {
  id: string;
  agentId: string;
  agentName: string;
  fromStage: LifecycleStage;
  toStage: LifecycleStage;
  transitionedAt: string;    // ISO 8601
  transitionedBy: string;    // user display name
  reason?: string;
}
```

### 4.4 Agent Version

```typescript
export interface AgentVersion {
  id: string;
  agentId: string;
  agentName: string;
  versionNumber: string;    // e.g. "1.2.0"
  changelog: string;
  createdAt: string;
  createdBy: string;
  stage: LifecycleStage;   // stage at time of this version
}
```

### 4.5 Agent Template

```typescript
export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  type: AgentType;
  model: ModelProvider;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  tools: AgentTool[];
  category: string;         // "Customer Service", "Analytics", etc.
  isOfficial: boolean;      // platform-provided vs community
}
```

### 4.6 Mock Data

Define in `lib/mock-data/lifecycle.ts`:
- `LifecycleStageSummary[]` — 4 entries (one per stage, covering 18 agents total).
- `LifecycleTransition[]` — 15–20 recent transitions.
- `AgentVersion[]` — 12–16 version records across 4 agents.
- `AgentTemplate[]` — 6–8 pre-built templates.

---

## 5. Implementation Tasks

### Task LCY-T01 — LifecycleHeader with KPIs
- **File:** `components/lifecycle/lifecycle-header.tsx`
- **KPIs:** Total agents, In Production count, Pending Promotion (agents in Dev/Maintenance awaiting action).
- Icons: `Layers` (total), `Rocket` (production), `ArrowUpCircle` (pending).

### Task LCY-T02 — LifecycleStageChart (Donut)
- **File:** `components/lifecycle/lifecycle-stage-chart.tsx`
- **Chart type:** Recharts `PieChart` with `innerRadius`.
- **Stage colours:** per §4.2.
- **Centre label:** total agent count + "Agents" text.
- **Legend:** colour dot + stage label + count.

### Task LCY-T03 — StageListCard
- **File:** `components/lifecycle/stage-list-card.tsx`
- **Design:**
  - 4 rows, one per stage.
  - Each row: stage colour dot, stage name, agent count (bold), percentage `text-muted-foreground`, progress bar.
  - Progress bar width proportional to percentage, filled with stage colour.

### Task LCY-T04 — RecentTransitionsCard
- **File:** `components/lifecycle/recent-transitions-card.tsx`
- **Design:**
  - Table-like list (max 10 rows).
  - Columns: Agent Name, From Stage → To Stage (with arrows), Date, Actor.
  - Stage badges use the four stage colours.
  - "→" arrow between stage badges in `text-muted-foreground`.

### Task LCY-T05 — VersionHistoryTable
- **File:** `components/lifecycle/version-history-table.tsx`
- **Design:**
  - Agent filter `<Select>` at top.
  - shadcn `Table` with columns: Version, Agent, Changelog, Author, Date, Stage.
  - Version badge: `secondary` variant.
  - Changelog truncated to 80 chars with tooltip for full text.

### Task LCY-T06 — TemplateGrid
- **File:** `components/lifecycle/template-grid.tsx`
- **Design:**
  - 3-col grid (desktop), 2-col (tablet), 1-col (mobile).
  - `TemplateCard`: official templates have a `⭐ Official` badge (navy).
  - "Use Template" button navigates to `/agents/new` with template data encoded as query params (or via session storage).

### Task LCY-T07 — RetirementWorkflow (3-Step)
- **File:** `components/lifecycle/retirement-workflow.tsx`
- **State:** `retirementStep: 1 | 2 | 3 | "complete"`, `selectedAgent`, `endDate`.

**Step 1 — Confirm Intent:**
- Card: "You are about to retire **{Agent Name}**."
- Warning: "Retired agents will no longer accept new requests."
- Buttons: "Cancel" / "Confirm Retirement"

**Step 2 — Set End Date:**
- Date picker input (`<Input type="date">`).
- "The agent will stop accepting requests from this date."
- Buttons: "Back" / "Set End Date"

**Step 3 — Archive & Confirm:**
- Summary: Agent name, end date.
- Confirmation: "Agent configuration will be archived and stored for audit purposes."
- Buttons: "Back" / "Archive & Retire" (primary, destructive-tinted).

**Completion:** Shows success state with `CheckCircle` icon + "Agent has been retired".

### Task LCY-T08 — Role-Gated Promotion
- **Design:**
  - "Promote to Production" button in `StageListCard` or agent action menus.
  - If current user role is `"member"` or `"viewer"`: button is disabled + tooltip "Only Owners and Admins can promote agents to Production".
  - Role is read from mock user context (e.g., `useMockUser()` hook returning `{ role: "member" }`).
  - **Note:** Real role enforcement happens in Agent 11 (backend). This task implements the UI gate only.

---

## 6. File Change Map

| File | Action |
|---|---|
| `app/lifecycle/page.tsx` | Refactor to new component tree |
| `components/lifecycle/lifecycle-header.tsx` | Create header with KPI cards |
| `components/lifecycle/lifecycle-stage-chart.tsx` | Create donut chart with stage colours |
| `components/lifecycle/stage-list-card.tsx` | Create stage breakdown list |
| `components/lifecycle/recent-transitions-card.tsx` | Create audit log list |
| `components/lifecycle/version-history-table.tsx` | Create version table with filter |
| `components/lifecycle/template-grid.tsx` | Create template cards grid |
| `components/lifecycle/retirement-workflow.tsx` | Create 3-step retirement flow |
| `lib/mock-data/lifecycle.ts` | Create mock data file |

---

## 7. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| Donut chart shows 4 coloured segments for lifecycle stages | Visual inspection of `/lifecycle` |
| Stage list shows correct agent count and percentage per stage | Verify against mock data |
| Recent transitions log shows 10 rows with stage badges | Visual inspection |
| Version history table filterable by agent | Select agent in filter dropdown |
| Template grid shows official and community templates | Visual inspection |
| "Use Template" navigates to creation form with pre-filled data | Click button and verify form |
| Retirement workflow progresses through all 3 steps | Complete full retirement flow |
| Promote to Production disabled for member/viewer role | Check button state with mock member user |
| Retirement completion shows success state | Complete step 3 |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
