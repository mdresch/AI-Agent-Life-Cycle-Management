# Agent Management Implementation Plan

## Module: Agent Management
**Owner Agent:** Agent 3  
**Branch:** `feat/agent-management`  
**Phase:** 1 — Core Modules  
**Depends on:** Agent 1 (`feat/design-system` merged)

---

## Table of Contents

1. [Objective](#1-objective)
2. [Requirements Mapping](#2-requirements-mapping)
3. [Component Breakdown](#3-component-breakdown)
4. [Data Contracts](#4-data-contracts)
5. [Implementation Tasks](#5-implementation-tasks)
6. [Form Validation Rules](#6-form-validation-rules)
7. [File Change Map](#7-file-change-map)
8. [Acceptance Criteria](#8-acceptance-criteria)

---

## 1. Objective

Deliver a complete Agent Management experience spanning two pages:
- **`/agents`** — searchable, filterable agent list with actions.
- **`/agents/new`** — multi-step agent creation form.

All data is initially mock/in-memory. Components are designed to be trivially swappable to real API calls (see §4 Data Contracts).

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority |
|---|---|---|
| AGT-01 | Multi-step creation form: name, description, type, model, system prompt, max tokens, temperature, tool selections | Must Have |
| AGT-02 | LLM providers: GPT-4o, GPT-4, GPT-3.5 Turbo, Claude 3 Opus, Claude 3 Sonnet, Llama 3 70B | Must Have |
| AGT-03 | Tools: web search, database query, file access, email sending, calendar access, code execution | Should Have |
| AGT-04 | List is searchable + filterable by name, description, type | Must Have |
| AGT-05 | Activate / Pause toggle from list view | Must Have |
| AGT-06 | Duplicate agent from list | Should Have |
| AGT-07 | Delete agent with confirmation prompt | Must Have |
| AGT-08 | Navigate to per-agent analytics from list | Should Have |
| AGT-09 | Form validation: required fields, param ranges | Must Have |
| AGT-10 | Auto-activate on creation option | Should Have |

---

## 3. Component Breakdown

```
AgentsPage  (app/agents/page.tsx)
└── AgentsPageShell
    ├── AgentsPageHeader          (heading + New Agent button)
    ├── AgentsToolbar
    │   ├── <Input> Search        (filter by name/desc/type)
    │   └── <Select> Type Filter  (all / by AgentType)
    ├── AgentsGrid                (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3)
    │   └── AgentCard ×N
    │       ├── StatusBadge       (Active / Inactive / Error)
    │       ├── TypeBadge
    │       ├── Agent name + description
    │       ├── Model label
    │       ├── Last updated timestamp
    │       └── ActionsDropdown
    │           ├── Edit
    │           ├── Pause / Activate
    │           ├── Duplicate
    │           ├── Analytics
    │           └── Delete (→ DeleteConfirmDialog)
    └── EmptyState                (shown when search returns 0 results)

NewAgentPage  (app/agents/new/page.tsx)
└── AgentCreationForm
    └── Tabs
        ├── Tab 1: BasicInformation
        │   ├── AgentNameInput
        │   ├── DescriptionTextarea
        │   ├── AgentTypeSelect
        │   └── AutoActivateCheckbox
        ├── Tab 2: ModelConfiguration
        │   ├── ModelSelect
        │   ├── SystemPromptTextarea
        │   ├── MaxTokensSlider  (100–4000)
        │   └── TemperatureSlider  (0.0–1.0, step 0.1)
        └── Tab 3: ToolsCapabilities
            └── ToolCheckboxGrid ×6
    ├── FormNavigation  (Back / Next / Create Agent buttons)
    └── ProgressIndicator  (step dots or numbered tabs)
```

---

## 4. Data Contracts

### 4.1 Agent Entity (from `lib/types/index.ts`)

```typescript
// Defined in lib/types/index.ts — Agent 3 must IMPORT, not redefine
import type { Agent, AgentType, ModelProvider, AgentTool, AgentStatus } from "@/lib/types";
```

### 4.2 CreateAgentPayload

```typescript
interface CreateAgentPayload {
  name: string;           // min 3 chars
  description: string;    // min 10 chars
  type: AgentType;
  model: ModelProvider;
  systemPrompt: string;   // min 20 chars
  maxTokens: number;      // 100–4000
  temperature: number;    // 0.0–1.0
  tools: AgentTool[];
  autoActivate: boolean;
}
```

### 4.3 Mock Data

Define initial agent array in `lib/mock-data/agents.ts`. This module exports:

```typescript
export const mockAgents: Agent[] = [...]; // 6–8 sample agents covering all types
```

### 4.4 Future API Hooks

These React hook stubs should be created in `lib/hooks/use-agents.ts` but can use mock data internally for now:

```typescript
export function useAgents(): { agents: Agent[]; isLoading: boolean; ... }
export function useCreateAgent(): { createAgent: (payload) => Promise<Agent>; isLoading: boolean; ... }
export function useUpdateAgent(): { updateAgent: (id, patch) => Promise<Agent>; ... }
export function useDeleteAgent(): { deleteAgent: (id) => Promise<void>; ... }
```

---

## 5. Implementation Tasks

### Task AGT-T01 — AgentCard Component
- **File:** `components/agents/agent-card.tsx`
- **Design:**
  - White/card background with navy border on left for active agents (`border-l-4 border-l-primary`).
  - Status badge using design-system variants: `success` (Active), `secondary` (Inactive), `destructive` (Error).
  - Type badge: `secondary` variant, shows human-readable type label.
  - Model shown as a small Lucide `Cpu` icon + provider name.
  - `⋯` actions button in top-right corner using shadcn `DropdownMenu`.

### Task AGT-T02 — AgentsToolbar (Search & Filter)
- **File:** `components/agents/agents-toolbar.tsx`
- **Design:**
  - Search `<Input>` with `SearchIcon` prefix, `placeholder="Search agents…"`.
  - `<Select>` for type filter: "All Types" + all `AgentType` values.
  - Filter changes invoke callback prop `onFilterChange(query, type)`.
  - Toolbar is sticky on desktop (`sticky top-16 z-10 bg-background/95 backdrop-blur`).

### Task AGT-T03 — AgentsGrid with Empty State
- **File:** `components/agents/agents-list.tsx`
- **Action:**
  - Filter the `agents` array client-side using `useMemo` based on `query` and `type`.
  - Show `EmptyState` card when filtered result is empty.
  - `EmptyState` shows Bot icon + "No agents found" + "Create your first agent" button.

### Task AGT-T04 — DeleteConfirmDialog
- **File:** `components/agents/delete-confirm-dialog.tsx`
- **Design:**
  - shadcn `AlertDialog` with destructive confirm button.
  - Body text: "Are you sure you want to permanently delete **{Agent Name}**? This action cannot be undone."
  - Confirm button: `variant="destructive"` → calls `onConfirm()`.

### Task AGT-T05 — Agent Creation Form — Tab 1 (Basic Information)
- **File:** `components/agents/form-tabs/basic-information.tsx`
- **Fields:**
  - `AgentName`: `<Input>` with label. Validation: required, min 3.
  - `Description`: `<Textarea>` with label. Validation: required, min 10.
  - `AgentType`: `<Select>`. Validation: required.
  - `AutoActivate`: `<Checkbox>` with descriptive label.

### Task AGT-T06 — Agent Creation Form — Tab 2 (Model Configuration)
- **File:** `components/agents/form-tabs/model-configuration.tsx`
- **Fields:**
  - `Model`: `<Select>` with model options grouped by provider.
  - `SystemPrompt`: `<Textarea>` with `rows={6}`. Validation: required, min 20.
  - `MaxTokens`: `<Slider>` min=100, max=4000, step=100. Shows live value label.
  - `Temperature`: `<Slider>` min=0, max=1, step=0.1. Shows live value label with description.
- **Temperature description:** Show contextual hint: 0 = "Deterministic", 0.5 = "Balanced", 1 = "Creative".

### Task AGT-T07 — Agent Creation Form — Tab 3 (Tools)
- **File:** `components/agents/form-tabs/tools-capabilities.tsx`
- **Design:**
  - 2-column checkbox grid on desktop, 1-column on mobile.
  - Each checkbox card: icon + tool name + one-line description.
  - Tool icons: `Search` (web), `Database`, `File`, `Mail`, `Calendar`, `Code2`.

### Task AGT-T08 — Form Navigation & Progress
- **File:** `components/agents/agent-creation-form.tsx`
- **Action:**
  - Tabs controlled by `activeTab` state (not URL-based).
  - "Next" advances only if current tab's fields pass Zod validation.
  - "Back" returns to previous tab without re-validation.
  - "Create Agent" on tab 3 submits the full form.
  - Progress indicator: 3 numbered circles, filled for completed tabs.
  - On submit: show spinner, simulate 1.5s delay (replace with API call later), then `router.push("/agents")` with success toast.

### Task AGT-T09 — Zod Validation Schema
- **File:** `lib/schemas/agent-schema.ts`
- **Action:** Define complete Zod schema for `CreateAgentPayload`. Export `basicInfoSchema`, `modelConfigSchema`, `toolsSchema`, and the combined `createAgentSchema`.

### Task AGT-T10 — Activate/Pause Toggle
- **File:** `components/agents/agents-list.tsx` + `components/agents/agent-card.tsx`
- **Action:**
  - "Pause" action calls `updateAgent(id, { status: "inactive" })`.
  - "Activate" calls `updateAgent(id, { status: "active" })`.
  - Card status badge updates optimistically.
  - Toast confirmation: "Agent **{name}** paused." / "Agent **{name}** activated."

### Task AGT-T11 — Duplicate Agent
- **Action:** "Duplicate" creates a deep copy of the agent object, appends " (Copy)" to the name, sets status to "inactive", adds to list.
- Toast: "Agent **{name}** duplicated."

### Task AGT-T12 — Apply Design Styling
- All agent-type badges should use the `secondary` variant with distinct text labels.
- Active agents: left border `border-l-4 border-l-primary` on card.
- Error agents: left border `border-l-4 border-l-destructive`.
- Inactive agents: no accent border, slightly muted card.

---

## 6. Form Validation Rules

| Field | Rule | Error Message |
|---|---|---|
| Agent Name | Required, min 3 chars, max 50 chars | "Name must be at least 3 characters" |
| Description | Required, min 10 chars, max 500 chars | "Description must be at least 10 characters" |
| Agent Type | Required | "Please select an agent type" |
| Model | Required | "Please select a model" |
| System Prompt | Required, min 20 chars | "System prompt must be at least 20 characters" |
| Max Tokens | 100–4000 (integer) | "Max tokens must be between 100 and 4000" |
| Temperature | 0.0–1.0 (step 0.1) | "Temperature must be between 0 and 1" |

---

## 7. File Change Map

| File | Action |
|---|---|
| `app/agents/page.tsx` | Refactor to use new components; add mock data via hook |
| `app/agents/new/page.tsx` | Refactor form to use new tabbed structure |
| `components/agents/agent-card.tsx` | Redesign with navy accents, status badges |
| `components/agents/agents-list.tsx` | Add client-side filtering with useMemo |
| `components/agents/agents-toolbar.tsx` | Create new search + filter toolbar |
| `components/agents/delete-confirm-dialog.tsx` | Create AlertDialog for delete confirmation |
| `components/agents/agent-creation-form.tsx` | Refactor multi-step form with progress |
| `components/agents/form-tabs/basic-information.tsx` | Create tab component |
| `components/agents/form-tabs/model-configuration.tsx` | Create tab component with sliders |
| `components/agents/form-tabs/tools-capabilities.tsx` | Create checkbox grid tab |
| `lib/schemas/agent-schema.ts` | Create Zod validation schemas |
| `lib/mock-data/agents.ts` | Create mock data file |
| `lib/hooks/use-agents.ts` | Create hook stubs |
| `lib/types/index.ts` | Create shared type definitions (coordinate with Agent 11) |

---

## 8. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| Agent list renders all mock agents with correct name, type, status | Visual inspection of `/agents` |
| Search filters agents by name in real time | Type in search box |
| Type dropdown filters to matching agent type | Select each type |
| Active agent card shows navy left border | Visual inspection |
| "Pause" toggles status badge to Inactive + shows toast | Click Pause on an active agent |
| Delete opens AlertDialog, confirm removes agent | Click Delete, confirm |
| Duplicate adds copy to list with "(Copy)" suffix | Click Duplicate |
| Creation form validates each tab before allowing Next | Submit empty fields |
| Max Tokens slider range enforced 100–4000 | Drag slider to extremes |
| Temperature slider range enforced 0–1 | Drag slider to extremes |
| Successful form submission redirects to `/agents` + toast | Complete form and submit |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
