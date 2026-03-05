# Testing & QA Implementation Plan

## Module: Testing & QA
**Owner Agent:** Agent 12  
**Branch:** `feat/testing`  
**Phase:** 4 — Quality Gates  
**Depends on:** All feature agents (code must be merged before full test suite runs)

---

## Table of Contents

1. [Objective](#1-objective)
2. [Testing Strategy](#2-testing-strategy)
3. [Test Infrastructure Setup](#3-test-infrastructure-setup)
4. [Unit Tests](#4-unit-tests)
5. [Integration Tests](#5-integration-tests)
6. [End-to-End Tests](#6-end-to-end-tests)
7. [Performance Tests](#7-performance-tests)
8. [Accessibility Tests](#8-accessibility-tests)
9. [Implementation Tasks](#9-implementation-tasks)
10. [File Change Map](#10-file-change-map)
11. [Acceptance Criteria](#11-acceptance-criteria)

---

## 1. Objective

Establish a comprehensive testing framework that validates all functional and non-functional requirements from `docs/requirements.md`. Tests are designed so that individual agents can write module-specific tests in their feature branches, while this agent (Agent 12) sets up the shared infrastructure, integration tests, E2E tests, and the CI/CD quality gate pipeline.

---

## 2. Testing Strategy

### 2.1 Testing Pyramid

```
         ╔═══════════════╗
         ║   E2E Tests   ║   ~20 critical user flows (Playwright)
         ╠═══════════════╣
         ║  Integration  ║   ~40 API route tests (Vitest + MSW)
         ╠═══════════════╣
         ║  Unit Tests   ║   ~100+ component + utility tests (Vitest + RTL)
         ╚═══════════════╝
```

### 2.2 Tooling

| Tool | Purpose |
|---|---|
| **Vitest** | Fast unit + integration test runner (replaces Jest for Vite-based projects; works with Next.js) |
| **React Testing Library (RTL)** | Component rendering and interaction tests |
| **MSW (Mock Service Worker)** | API mocking for integration tests |
| **Playwright** | End-to-end browser automation |
| **axe-core / `@axe-core/playwright`** | Automated accessibility testing |
| **Lighthouse CI** | Performance + accessibility scoring in CI |

### 2.3 Coverage Targets

| Layer | Target Coverage |
|---|---|
| Utilities (`lib/**`) | 90%+ line coverage |
| API routes (`app/api/**`) | 80%+ route coverage |
| Components | 70%+ component coverage (key interaction paths) |
| E2E flows | 100% of "Must Have" user stories covered |

---

## 3. Test Infrastructure Setup

### 3.1 Vitest Configuration

**File:** `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: ['node_modules', '.next', 'tests/e2e/**'],
    },
  },
});
```

### 3.2 Test Setup File

**File:** `tests/setup.ts`

> **TypeScript setup required:** Use the Vitest-specific jest-dom entrypoint (`@testing-library/jest-dom/vitest`) — **not** the default `@testing-library/jest-dom` entrypoint, which targets Jest globals and will cause type errors under Vitest. Also add `"@testing-library/jest-dom"` to `compilerOptions.types` in `tsconfig.json` and set `globals: true` in `vitest.config.ts` so `describe`/`it`/`expect` are globally available without explicit imports.

```typescript
// Use the Vitest-specific entrypoint to avoid TypeScript errors with Vitest globals
import '@testing-library/jest-dom/vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

**`tsconfig.json` — add to `compilerOptions`:**

```json
{
  "compilerOptions": {
    "types": ["@testing-library/jest-dom"]
  }
}
```

**`vitest.config.ts` — ensure `globals: true`:**

```typescript
test: {
  globals: true,
  setupFiles: ['./tests/setup.ts'],
  environment: 'jsdom',
}
```

### 3.3 MSW Server

**File:** `tests/mocks/server.ts`

```typescript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
export const server = setupServer(...handlers);
```

**File:** `tests/mocks/handlers.ts` — define handlers for all API routes returning mock data from `lib/mock-data/**`.

### 3.4 Playwright Configuration

**File:** `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 4. Unit Tests

### 4.1 Utility Functions

**`tests/unit/csv-export.test.ts`**
- Correctly serialises array of objects to CSV string.
- Handles special characters (commas, quotes, newlines) in field values.
- Generates correct filename with `.csv` extension.

**`tests/unit/use-permission.test.ts`**
- Owner returns `true` for all actions.
- Viewer returns `false` for create/edit/delete actions.
- Member returns `false` for delete and promote-to-production.
- Admin returns `false` for role changes (only Owner can change roles).

**`tests/unit/agent-schema.test.ts`**
- Valid `CreateAgentPayload` passes all schema validations.
- Name under 3 chars fails with correct error message.
- Temperature above 1.0 fails.
- MaxTokens below 100 fails.
- Empty tools array is valid (tools are optional).

### 4.2 Component Tests

**`tests/unit/kpi-card.test.tsx`**
- Renders label and value correctly.
- Shows upward-arrow icon when `trend="up"`.
- Shows downward-arrow icon when `trend="down"`.
- Shows neutral icon when `trend="neutral"`.
- `trendValue` text is visible.

**`tests/unit/agent-card.test.tsx`**
- Active agent shows "Active" badge.
- Inactive agent shows "Inactive" badge.
- Actions menu contains Edit, Pause/Activate, Duplicate, Analytics, Delete.
- Delete shows confirmation dialog.
- Cancel in confirmation dialog does not call `onDelete`.
- Confirm in dialog calls `onDelete` with agent ID.

**`tests/unit/agent-creation-form.test.tsx`**
- Tab 1 "Next" is blocked when name is empty.
- Tab 1 "Next" is blocked when description is too short.
- Tab 1 advances when all required fields are filled.
- Tab 2 "Next" blocked when system prompt is empty.
- Temperature slider updates displayed value.
- MaxTokens slider range enforced.
- Form submits successfully on Tab 3.

**`tests/unit/star-rating.test.tsx`**
- Rating 4.5 renders 4 filled stars and 1 half star.
- Rating 0 renders 5 empty stars.
- Rating 5 renders 5 filled stars.

**`tests/unit/delete-confirm-dialog.test.tsx`**
- Dialog shows agent name in body text.
- Cancel button does not call `onConfirm`.
- Confirm button calls `onConfirm`.

---

## 5. Integration Tests

### 5.1 API Route Tests

All API route integration tests use MSW to intercept HTTP calls and Vitest for assertions.

**`tests/integration/api/agents.test.ts`**

```typescript
describe("GET /api/agents", () => {
  it("returns list of agents for authenticated user", ...)
  it("returns 401 for unauthenticated request", ...)
})

describe("POST /api/agents", () => {
  it("creates agent with valid payload", ...)
  it("returns 422 for invalid payload (missing name)", ...)
  it("returns 422 for temperature out of range", ...)
  it("returns 403 for Viewer role", ...)
})

describe("DELETE /api/agents/:id", () => {
  it("deletes agent as Admin", ...)
  it("returns 403 for Member role", ...)
  it("returns 404 for non-existent agent", ...)
})
```

**`tests/integration/api/lifecycle.test.ts`**

```typescript
describe("POST /api/lifecycle/transitions", () => {
  it("creates transition as Admin", ...)
  it("returns 403 for Member promoting to Production", ...)
  it("returns 400 for transition to same stage", ...)
  it("returns 400 for transitioning a RETIRED agent", ...)
})
```

**`tests/integration/api/api-keys.test.ts`**

```typescript
describe("POST /api/api-keys", () => {
  it("returns plaintext key on creation (once)", ...)
  it("stored key in DB is hashed", ...)
})

describe("DELETE /api/api-keys/:id", () => {
  it("marks key as revoked", ...)
  it("revoked key returns 401 on use", ...)
})
```

---

## 6. End-to-End Tests

All E2E tests use Playwright. They run against the development server with demo credentials (`demo@example.com` / `demo1234`).

### 6.1 Authentication Flow

**`tests/e2e/auth.spec.ts`**

```
FLOW: User Login
  GIVEN an unauthenticated user navigates to /agents
  WHEN they are redirected to /login
  AND they enter demo@example.com + demo1234
  THEN they are redirected to /agents
  AND the top nav shows the user avatar

FLOW: Session Persistence  
  GIVEN a logged-in user
  WHEN they reload the page
  THEN they remain logged in

FLOW: Sign Out
  GIVEN a logged-in user
  WHEN they click Sign Out
  THEN they are redirected to /login
  AND /agents is no longer accessible
```

### 6.2 Dashboard

**`tests/e2e/dashboard.spec.ts`**

```
FLOW: Dashboard Loads
  GIVEN a logged-in user navigates to /
  THEN 4 KPI cards are visible
  AND the agent status chart is visible
  AND the top agents list is visible
  AND the recent activity feed is visible

FLOW: Quick Action - New Agent
  GIVEN a logged-in user on the dashboard
  WHEN they click "New Agent"
  THEN they are navigated to /agents/new
```

### 6.3 Agent Management

**`tests/e2e/agents.spec.ts`**

```
FLOW: Create Agent (Happy Path)
  GIVEN a logged-in user navigates to /agents/new
  WHEN they complete all 3 tabs with valid data
  AND click "Create Agent"
  THEN they are redirected to /agents
  AND the new agent appears in the list

FLOW: Validation Blocks Next
  GIVEN a user on Tab 1 of agent creation
  WHEN they click Next with empty Name
  THEN an error message is shown
  AND they remain on Tab 1

FLOW: Search Agents
  GIVEN a user on /agents
  WHEN they type in the search box
  THEN the agent list filters in real time

FLOW: Delete Agent
  GIVEN a user on /agents
  WHEN they open the actions menu and click Delete
  THEN a confirmation dialog appears
  AND after confirming, the agent is removed from the list

FLOW: Pause and Activate Agent
  GIVEN an active agent in the list
  WHEN the user clicks Pause
  THEN the status badge changes to Inactive
  WHEN the user clicks Activate
  THEN the status badge changes back to Active
```

### 6.4 Lifecycle Management

**`tests/e2e/lifecycle.spec.ts`**

```
FLOW: View Lifecycle Overview
  GIVEN a user navigates to /lifecycle
  THEN a donut chart with 4 stage segments is visible
  AND each stage shows a count and percentage

FLOW: Retire Agent
  GIVEN a user on the Retirement tab
  WHEN they click "Retire Agent" on a candidate
  THEN Step 1 confirmation dialog appears
  WHEN they confirm intent
  THEN Step 2 end-date picker appears
  WHEN they set a date and continue
  THEN Step 3 archive confirmation appears
  WHEN they click "Archive & Retire"
  THEN the success state is shown
```

### 6.5 Settings

**`tests/e2e/settings.spec.ts`**

```
FLOW: Update Profile
  GIVEN a user navigates to /settings
  WHEN they update their display name and click Save
  THEN a success toast appears
  AND the name is updated in the header

FLOW: Generate API Key
  GIVEN a user on the API Keys section
  WHEN they click Generate Key and fill in the form
  THEN a one-time reveal dialog shows the full key
  WHEN they dismiss the dialog
  THEN the key appears masked in the list

FLOW: Revoke API Key
  GIVEN an API key in the list
  WHEN the user clicks Revoke and confirms
  THEN the key shows as revoked (strikethrough)
```

### 6.6 Accessibility E2E

**`tests/e2e/accessibility.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from "@axe-core/playwright";

const pagesToTest = ["/", "/agents", "/lifecycle", "/analytics", 
                     "/marketplace", "/studio", "/trends", 
                     "/business-agents", "/settings"];

for (const page of pagesToTest) {
  test(`${page} has no critical accessibility violations`, async ({ page: p }) => {
    await p.goto(page);
    const results = await new AxeBuilder({ page: p }).analyze();
    expect(results.violations.filter(v => v.impact === "critical")).toHaveLength(0);
  });
}
```

---

## 7. Performance Tests

### 7.1 Lighthouse CI

**File:** `.lighthouserc.json`

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/agents",
        "http://localhost:3000/analytics"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.8 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }]
      }
    }
  }
}
```

### 7.2 NFR Validation

| Req | Test | How Measured |
|---|---|---|
| NFR-P-01: Dashboard TTI < 2s | Lighthouse CI on `/` | `interactive` metric < 2000ms |
| NFR-P-02: 100 agents without lag | Inject 100 mock agents → measure render time | React Profiler or Playwright `performance.measure` |
| NFR-P-03: Charts update < 500ms | Playwright: measure time from toggle click to chart repaint | `page.waitForFunction` with timing |
| NFR-U-01: Responsive (1280/1024/768) | Playwright viewport tests | Playwright `setViewportSize` |

---

## 8. Accessibility Tests

### 8.1 Automated (axe-core via Playwright)

Run on all pages in both light mode and dark mode. Criteria:
- Zero critical violations.
- Zero serious violations (best effort — document any accepted exceptions).

### 8.2 Manual Checklist

- [ ] All form inputs have associated `<label>` elements.
- [ ] All icon-only buttons have `aria-label`.
- [ ] All charts have `role="img"` and `aria-label` describing the chart.
- [ ] Keyboard navigation: all interactive elements reachable via Tab.
- [ ] Focus ring visible on all interactive elements in both themes.
- [ ] All status badges have text content (not icon-only for colour-blind users).
- [ ] `aria-current="page"` applied to active nav link.

---

## 9. Implementation Tasks

### Task QA-T01 — Install Testing Dependencies
```bash
npm install -D vitest @vitejs/plugin-react vite-tsconfig-paths \
             @testing-library/react @testing-library/jest-dom \
             @testing-library/user-event \
             msw \
             @playwright/test @axe-core/playwright
npx playwright install
```

### Task QA-T02 — Create Vitest Config
- Create `vitest.config.ts` per §3.1.

### Task QA-T03 — Create Test Setup File
- Create `tests/setup.ts` per §3.2.

### Task QA-T04 — Create MSW Mock Server and Handlers
- Create `tests/mocks/server.ts` and `tests/mocks/handlers.ts`.
- Handlers mirror all routes from Plan 11 §4 using mock data from `lib/mock-data/**`.

### Task QA-T05 — Create Playwright Config
- Create `playwright.config.ts` per §3.4.

### Task QA-T06 — Add NPM Scripts
Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:a11y": "playwright test tests/e2e/accessibility.spec.ts"
  }
}
```

### Task QA-T07 — Write All Unit Tests (§4)
- Implement all unit tests listed in §4.1 and §4.2.

### Task QA-T08 — Write All Integration Tests (§5)
- Implement all integration tests listed in §5.1.

### Task QA-T09 — Write All E2E Tests (§6)
- Implement all E2E test flows listed in §6.

### Task QA-T10 — Lighthouse CI Setup
- Create `.lighthouserc.json` per §7.1.
- Install: `npm install -D @lhci/cli`.

### Task QA-T11 — GitHub Actions CI Workflow
- Create `.github/workflows/ci.yml`:
  - Triggers: push to any branch, PR to main.
  - Steps: install → type-check → lint → unit tests → integration tests → build → E2E tests → Lighthouse CI.
  - Upload test coverage as artifact.
  - Upload Playwright report as artifact on failure.

---

## 10. File Change Map

| File | Action |
|---|---|
| `vitest.config.ts` | Create Vitest configuration |
| `playwright.config.ts` | Create Playwright configuration |
| `tests/setup.ts` | Create test setup file |
| `tests/mocks/server.ts` | Create MSW server |
| `tests/mocks/handlers.ts` | Create API mock handlers |
| `tests/unit/csv-export.test.ts` | Create utility tests |
| `tests/unit/use-permission.test.ts` | Create RBAC hook tests |
| `tests/unit/agent-schema.test.ts` | Create schema validation tests |
| `tests/unit/kpi-card.test.tsx` | Create component test |
| `tests/unit/agent-card.test.tsx` | Create component test |
| `tests/unit/agent-creation-form.test.tsx` | Create form test |
| `tests/unit/star-rating.test.tsx` | Create star rating test |
| `tests/integration/api/agents.test.ts` | Create agents API tests |
| `tests/integration/api/lifecycle.test.ts` | Create lifecycle API tests |
| `tests/integration/api/api-keys.test.ts` | Create API key tests |
| `tests/e2e/auth.spec.ts` | Create auth E2E tests |
| `tests/e2e/dashboard.spec.ts` | Create dashboard E2E tests |
| `tests/e2e/agents.spec.ts` | Create agents E2E tests |
| `tests/e2e/lifecycle.spec.ts` | Create lifecycle E2E tests |
| `tests/e2e/settings.spec.ts` | Create settings E2E tests |
| `tests/e2e/accessibility.spec.ts` | Create accessibility E2E tests |
| `.lighthouserc.json` | Create Lighthouse CI config |
| `.github/workflows/ci.yml` | Create CI/CD pipeline |
| `package.json` | Add test scripts |

---

## 11. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| `npm test` runs all unit tests and passes | `npm test` exits 0 |
| Unit test coverage ≥ 70% | `npm run test:coverage` coverage report |
| Integration tests all pass | `npm test` includes integration tests |
| `npm run test:e2e` runs all E2E flows and passes | `npx playwright test` exits 0 |
| No critical axe violations on any page | Accessibility E2E suite passes |
| Lighthouse performance score ≥ 80 on dashboard | Lighthouse CI report |
| Lighthouse accessibility score ≥ 90 on all pages | Lighthouse CI report |
| CI GitHub Actions workflow passes on PR to main | GitHub Actions check passes |
| Playwright report artifacts uploaded on failure | Check GitHub Actions artifacts |
