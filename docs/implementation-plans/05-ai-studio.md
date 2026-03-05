# AI Studio Implementation Plan

## Module: AI Studio
**Owner Agent:** Agent 5  
**Branch:** `feat/ai-studio`  
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

Deliver the AI Studio page (`/studio`) — a project-based development workspace where users can train agents, build and save prompt templates, and track training metrics. The UI must follow the navy blue design system and support the full feature set described in requirements STU-01 through STU-06.

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority |
|---|---|---|
| STU-01 | Project-based workspace — each project corresponds to an agent under development | Must Have |
| STU-02 | Training Ground: select scenario, run it, view pass/fail per step | Must Have |
| STU-03 | Prompt Library: save, label, search prompt templates; load into agent system prompt | Must Have |
| STU-04 | Training Metrics: benchmark improvement chart over successive sessions | Should Have |
| STU-05 | Recent activity feed within the Studio | Should Have |
| STU-06 | Aggregate KPIs: active projects, training sessions run, saved prompts | Should Have |

---

## 3. Component Breakdown

```
StudioPage  (app/studio/page.tsx)
└── StudioDashboard
    ├── StudioHeader
    │   ├── Heading "AI Studio"
    │   └── KpiRow
    │       ├── KpiCard — Active Projects
    │       ├── KpiCard — Training Sessions Run
    │       └── KpiCard — Saved Prompts
    └── Tabs
        ├── Tab: Overview
        │   ├── StudioActivityChart         (line chart — sessions over time)
        │   └── RecentStudioActivity        (activity feed)
        ├── Tab: Workspace
        │   └── StudioWorkspace
        │       ├── ProjectSidebar          (list of projects)
        │       │   ├── ProjectItem ×N      (name, agent, status)
        │       │   └── NewProjectButton
        │       └── ProjectEditor           (active project details)
        │           ├── ProjectHeader       (name, agent, last edited)
        │           ├── SystemPromptEditor  (textarea)
        │           └── ProjectActions      (Save, Run Training, Promote)
        ├── Tab: Training Ground
        │   └── TrainingGround
        │       ├── ScenarioSelector        (<Select>)
        │       ├── RunButton
        │       ├── TrainingResults         (step-by-step pass/fail list)
        │       └── TrainingMetricsChart    (bar chart — score per session)
        └── Tab: Prompt Library
            └── PromptLibrary
                ├── PromptToolbar
                │   ├── SearchInput
                │   └── NewPromptButton → NewPromptDialog
                └── PromptGrid
                    └── PromptCard ×N
                        ├── Name + tags
                        ├── Prompt preview (truncated)
                        └── Actions: Copy, Load, Delete
```

---

## 4. Data Contracts

### 4.1 Studio Project

```typescript
export interface StudioProject {
  id: string;
  name: string;
  agentId: string;
  agentName: string;
  systemPrompt: string;
  status: "active" | "draft" | "archived";
  lastEditedAt: string;
  createdAt: string;
  createdBy: string;
}
```

### 4.2 Training Session

```typescript
export interface TrainingSession {
  id: string;
  projectId: string;
  agentId: string;
  scenario: string;
  score: number;            // 0–100
  steps: TrainingStep[];
  completedAt: string;
}

export interface TrainingStep {
  id: string;
  description: string;
  result: "pass" | "fail" | "skip";
  score: number;
  details?: string;
}
```

### 4.3 Prompt Template

```typescript
export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  tags: string[];
  createdAt: string;
  createdBy: string;
}
```

### 4.4 Training Scenario Options

```typescript
export const TRAINING_SCENARIOS = [
  { id: "customer-service-basic", label: "Customer Service — Basic Queries" },
  { id: "customer-service-escalation", label: "Customer Service — Escalation Handling" },
  { id: "data-analysis", label: "Data Analysis & Summarisation" },
  { id: "code-review", label: "Code Review & Suggestions" },
  { id: "document-qa", label: "Document Q&A" },
  { id: "creative-writing", label: "Creative Writing" },
] as const;
```

### 4.5 Mock Data

Define in `lib/mock-data/studio.ts`:
- 4–5 `StudioProject` items.
- 6–8 `TrainingSession` records across 2 projects.
- 8–10 `PromptTemplate` records with diverse tags.

---

## 5. Implementation Tasks

### Task STU-T01 — StudioHeader with KPIs
- **File:** `components/studio/studio-header.tsx`
- **KPIs:** Calculated from mock data: active project count, total training sessions, saved prompt count.
- **Icons:** `FolderOpen` (projects), `FlaskConical` (sessions), `Library` (prompts).
- Use shared `KpiCard` component.

### Task STU-T02 — StudioActivityChart
- **File:** `components/studio/studio-activity-chart.tsx`
- **Chart type:** Recharts `LineChart`.
- **Data:** Training sessions grouped by date (last 14 days).
- **X-axis:** date labels; **Y-axis:** session count.
- **Line colour:** `hsl(var(--primary))` navy.

### Task STU-T03 — RecentStudioActivity Feed
- **File:** `components/studio/recent-studio-activity.tsx`
- **Events:** "Training session completed", "Prompt saved", "Project created", "Agent promoted".
- Same design pattern as Dashboard `RecentActivity` component.

### Task STU-T04 — ProjectSidebar
- **File:** `components/studio/project-sidebar.tsx`
- **Design:**
  - Left panel (approx. 260px wide, hidden on mobile).
  - List of projects; active project highlighted with navy left border.
  - Status badge: `success` (active), `secondary` (draft), `muted` (archived).
  - "+ New Project" button at the top.
- **State:** `activeProjectId` managed in `StudioWorkspace`.

### Task STU-T05 — ProjectEditor
- **File:** `components/studio/project-editor.tsx`
- **Design:**
  - Displays selected project's name, linked agent name, and last-edited timestamp.
  - Large `<Textarea>` for editing the system prompt.
  - Three action buttons:
    - "Save Changes" (primary) — updates project's `systemPrompt` in state.
    - "Run Training" (secondary) — navigates to Training Ground tab with project pre-selected.
    - "Promote to Production" (outline) — shows confirmation dialog.

### Task STU-T06 — ScenarioSelector + RunButton (Training Ground)
- **File:** `components/studio/training-ground.tsx`
- **Design:**
  - `<Select>` for scenario selection.
  - "Run Training" `<Button>` (primary).
  - On click: show loading spinner for 2s (simulate API call), then populate `TrainingResults`.

### Task STU-T07 — TrainingResults
- **File:** `components/studio/training-results.tsx`
- **Design:**
  - List of `TrainingStep` rows.
  - Each row: step number, description, result icon (`CheckCircle` green / `XCircle` red / `MinusCircle` grey), score chip.
  - Summary row at bottom: total score, pass/fail counts.
  - Animate in rows sequentially (200ms stagger using CSS transitions).

### Task STU-T08 — TrainingMetricsChart
- **File:** `components/studio/training-metrics-chart.tsx`
- **Chart type:** Recharts `BarChart`.
- **X-axis:** Session date/label; **Y-axis:** score 0–100.
- **Bar colour:** Gradient navy to sky-blue.
- **Reference line:** at y=80 (target threshold) in dashed amber.

### Task STU-T09 — PromptLibrary
- **File:** `components/studio/prompt-library.tsx`
- **Search:** Client-side filter by name or content.
- **PromptCard:**
  - Name (bold), tags as `<Badge variant="secondary">`.
  - Truncated content preview (max 120 chars + "…").
  - Three action icons: `Clipboard` (copy), `Upload` (load into editor), `Trash2` (delete).

### Task STU-T10 — NewPromptDialog
- **File:** `components/studio/new-prompt-dialog.tsx`
- **Fields:**
  - Name: `<Input>`, required.
  - Content: `<Textarea>` rows=6, required.
  - Tags: comma-separated `<Input>` parsed into array on save.
- shadcn `Dialog` with Save / Cancel buttons.

---

## 6. File Change Map

| File | Action |
|---|---|
| `app/studio/page.tsx` | Refactor to new component tree |
| `components/studio/studio-header.tsx` | Create header with KPI cards |
| `components/studio/studio-activity-chart.tsx` | Create line chart |
| `components/studio/recent-studio-activity.tsx` | Create activity feed |
| `components/studio/project-sidebar.tsx` | Create project sidebar |
| `components/studio/project-editor.tsx` | Create project editor panel |
| `components/studio/training-ground.tsx` | Create scenario selector + runner |
| `components/studio/training-results.tsx` | Create animated step results list |
| `components/studio/training-metrics-chart.tsx` | Create bar chart |
| `components/studio/prompt-library.tsx` | Create prompt grid + search |
| `components/studio/new-prompt-dialog.tsx` | Create new prompt dialog |
| `lib/mock-data/studio.ts` | Create mock data |

---

## 7. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| Overview tab shows KPI cards and activity chart | Visual inspection of `/studio` |
| Workspace tab shows project list with active project editor | Click different projects |
| Training Ground: selecting scenario + Run shows animated step results | Run a scenario |
| Training Metrics chart shows bar chart with session history | Visual inspection |
| Prompt Library shows saved prompts with search filtering | Type in search box |
| New Prompt dialog saves prompt and adds it to list | Create a prompt |
| Copy action copies prompt content to clipboard | Click copy, paste elsewhere |
| Delete prompt removes it from list | Click delete |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
