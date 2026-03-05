# Business Agents Implementation Plan

## Module: Business Agents
**Owner Agent:** Agent 4  
**Branch:** `feat/business-agents`  
**Phase:** 2 — Extended Modules  
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

Deliver the Business Agents page (`/business-agents`) — a department-level organisational view of all AI agents deployed across a company. The page must support drilling down from department → division → expertise-domain views, with charts and KPI summaries styled in the navy blue design system.

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority |
|---|---|---|
| BIZ-01 | Department-level view across: HR, Marketing, Sales, Customer Service, IT, Finance, Operations, Legal | Must Have |
| BIZ-02 | Chart showing agent count distribution per department | Should Have |
| BIZ-03 | Drill-down from department → division → expertise-domain | Should Have |
| BIZ-04 | KPIs: total business agents, most-active dept, specialised vs. cross-functional ratio | Should Have |
| BIZ-05 | Top knowledge domains with agent count | Could Have |

---

## 3. Component Breakdown

```
BusinessAgentsPage  (app/business-agents/page.tsx)
└── BusinessAgentsDashboard
    ├── BusinessAgentsHeader
    │   └── Heading + KPI summary row
    │       ├── KpiCard — Total Business Agents
    │       ├── KpiCard — Most Active Department
    │       └── KpiCard — Specialised vs. Cross-functional Ratio
    └── Tabs
        ├── Tab: Overview
        │   ├── DepartmentDistributionChart   (bar chart — horiz.)
        │   ├── DepartmentCardGrid            (8 department cards)
        │   │   └── DepartmentCard ×8
        │   │       ├── Department icon + name
        │   │       ├── Agent count badge
        │   │       └── Progress bar (share of total)
        │   └── KnowledgeDomainsCard
        │       └── KnowledgeDomainRow ×N    (domain name + agent count)
        ├── Tab: Divisions
        │   └── DivisionView
        │       ├── Division selector <Select>
        │       └── DivisionAgentList
        ├── Tab: Departments
        │   └── DepartmentView
        │       ├── Department selector <Select>
        │       └── DepartmentAgentTable
        └── Tab: Expertise
            └── ExpertiseView
                ├── Domain selector <Select>
                └── ExpertiseAgentGrid
```

---

## 4. Data Contracts

### 4.1 Department Data Shape

```typescript
export type Department =
  | "HR"
  | "Marketing"
  | "Sales"
  | "Customer Service"
  | "IT"
  | "Finance"
  | "Operations"
  | "Legal";

export interface DepartmentSummary {
  department: Department;
  agentCount: number;
  percentage: number;       // share of all business agents
  activeCount: number;
  icon: string;             // Lucide icon name
  colour: string;           // CSS variable e.g. "hsl(var(--chart-1))"
}
```

### 4.2 Business Agent Data Shape

```typescript
export interface BusinessAgent {
  id: string;
  name: string;
  department: Department;
  division: string;
  expertiseDomain: string;
  isSpecialised: boolean;   // specialised to one domain vs cross-functional
  status: "active" | "inactive";
  model: string;
}
```

### 4.3 Knowledge Domain Shape

```typescript
export interface KnowledgeDomain {
  domain: string;
  agentCount: number;
  topDepartments: Department[];
}
```

### 4.4 Mock Data

Define in `lib/mock-data/business-agents.ts`:
- 8 `DepartmentSummary` entries (one per department, varying counts).
- 20–30 `BusinessAgent` records spread across departments.
- 8–10 `KnowledgeDomain` entries.

---

## 5. Implementation Tasks

### Task BIZ-T01 — BusinessAgentsHeader with KPIs
- **File:** `components/business-agents/business-agents-header.tsx`
- **KPIs to calculate from mock data:**
  - Total Business Agents: sum of all department counts.
  - Most Active Department: department with highest `activeCount`.
  - Specialised Ratio: `(specialised / total * 100).toFixed(0) + "%"`.
- Use `KpiCard` from design system (import from `components/dashboard/kpi-card.tsx`).

### Task BIZ-T02 — DepartmentDistributionChart
- **File:** `components/business-agents/department-distribution-chart.tsx`
- **Chart type:** Horizontal `BarChart` from Recharts.
- **X-axis:** agent count; **Y-axis:** department names.
- **Bar colour:** Gradient from `hsl(var(--chart-1))` to `hsl(var(--chart-2))`.
- **Tooltip:** Shows department, agent count, active count.
- **Responsive:** `ResponsiveContainer width="100%" height={320}`.

### Task BIZ-T03 — DepartmentCardGrid
- **File:** `components/business-agents/department-card-grid.tsx`
- **Design:** 2×4 grid (4 cols on desktop, 2 on tablet, 1 on mobile).
- **DepartmentCard:**
  - Navy accent icon circle + department name (H4).
  - Agent count in large bold text.
  - Progress bar showing percentage of total.
  - "View agents →" link text.

**Department Icons (Lucide):**

| Department | Icon |
|---|---|
| HR | `Users` |
| Marketing | `Megaphone` |
| Sales | `TrendingUp` |
| Customer Service | `HeadphonesIcon` |
| IT | `Monitor` |
| Finance | `DollarSign` |
| Operations | `Settings2` |
| Legal | `Scale` |

### Task BIZ-T04 — KnowledgeDomainsCard
- **File:** `components/business-agents/knowledge-domains-card.tsx`
- **Design:** Card listing top 8 domains.
- Each row: domain name, agent count badge, horizontal mini-bar.
- Sort by agent count descending.

### Task BIZ-T05 — DivisionView Tab
- **File:** `components/business-agents/division-view.tsx`
- **Design:**
  - `<Select>` to choose a division.
  - Below: filtered list of `BusinessAgent` cards in that division.
  - Each card: agent name, department badge, expertise domain, status badge.

### Task BIZ-T06 — DepartmentView Tab
- **File:** `components/business-agents/department-view.tsx`
- **Design:**
  - `<Select>` to choose a department.
  - Table view: columns Agent Name, Model, Expertise Domain, Status.
  - shadcn `Table` component.

### Task BIZ-T07 — ExpertiseView Tab
- **File:** `components/business-agents/expertise-view.tsx`
- **Design:**
  - `<Select>` to choose expertise domain.
  - Grid of agent cards in that domain.

### Task BIZ-T08 — Design Styling
- All department colours derive from the navy blue chart palette.
- Use `hsl(var(--chart-1))` through `hsl(var(--chart-5))` cycling for department highlights.
- Progress bars: navy/blue fill, muted background.

---

## 6. File Change Map

| File | Action |
|---|---|
| `app/business-agents/page.tsx` | Refactor to use new component tree |
| `components/business-agents/business-agents-header.tsx` | Create header with KPI cards |
| `components/business-agents/department-distribution-chart.tsx` | Create horizontal bar chart |
| `components/business-agents/department-card-grid.tsx` | Create 8-card department grid |
| `components/business-agents/knowledge-domains-card.tsx` | Create knowledge domain list card |
| `components/business-agents/division-view.tsx` | Create division drill-down tab |
| `components/business-agents/department-view.tsx` | Create department table tab |
| `components/business-agents/expertise-view.tsx` | Create expertise domain tab |
| `lib/mock-data/business-agents.ts` | Create mock data file |

---

## 7. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| All 8 departments shown in chart and card grid | Visual inspection of Overview tab |
| Horizontal bar chart renders with navy/blue bars | Visual inspection |
| KPI: Total Business Agents matches sum of cards | Verify numbers |
| Most Active Department KPI shows correct department | Verify against mock data |
| Department card progress bars proportional to counts | Visual inspection |
| Drill-down via Divisions tab filters correctly | Select each division option |
| Departments tab shows agent table | Select tab and verify table |
| Expertise tab filters by domain | Select each domain option |
| Knowledge domains list sorted by count desc | Verify order |
| Responsive layout at 768px, 1024px, 1280px | Browser resize |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
