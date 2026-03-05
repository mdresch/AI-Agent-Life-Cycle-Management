# Analytics Implementation Plan

## Module: Analytics
**Owner Agent:** Agent 9  
**Branch:** `feat/analytics`  
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

Deliver the Analytics page (`/analytics`) with deep operational insight into agent performance, usage, and errors. The page must support a time-window selector (24h / 7d / 30d / 90d), responsive charts styled in the navy blue palette, and a CSV export capability. All data is initially mock but designed for trivial API replacement.

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority |
|---|---|---|
| ANL-01 | Performance tab: avg response time, success rate, throughput, availability | Must Have |
| ANL-02 | Response Time chart: per-agent average response times (bar or line) | Must Have |
| ANL-03 | Performance Trends chart: success rate over time (line chart) | Must Have |
| ANL-04 | Usage tab: token consumption, request volume, active users over time window | Must Have |
| ANL-05 | Errors tab: error rate breakdown by agent type (chart) | Must Have |
| ANL-06 | Time window selector: 24h, 7d, 30d, 90d | Must Have |
| ANL-07 | Charts responsive at 1280px, 1024px, 768px | Must Have |
| ANL-08 | CSV export of analytics data | Could Have |

---

## 3. Component Breakdown

```
AnalyticsPage  (app/analytics/page.tsx)
└── AnalyticsDashboard
    ├── AnalyticsHeader
    │   ├── Heading "Analytics"
    │   └── TimeWindowSelector    (<ToggleGroup> or <Select>: 24h / 7d / 30d / 90d)
    └── Tabs
        ├── Tab: Performance
        │   ├── PerformanceKpiRow
        │   │   ├── KpiCard — Avg Response Time (ms)
        │   │   ├── KpiCard — Success Rate (%)
        │   │   ├── KpiCard — Throughput (req/min)
        │   │   └── KpiCard — Availability (%)
        │   ├── ResponseTimeChart   (bar chart — per agent)
        │   └── PerformanceTrendsChart  (line chart — success rate over time)
        ├── Tab: Usage
        │   ├── UsageKpiRow
        │   │   ├── KpiCard — Token Consumption
        │   │   ├── KpiCard — Total Requests
        │   │   └── KpiCard — Active Users
        │   └── UsageChart          (multi-line or stacked area chart)
        └── Tab: Errors
            ├── ErrorKpiRow
            │   ├── KpiCard — Overall Error Rate
            │   └── KpiCard — Agents with Errors
            ├── ErrorRateChart      (bar chart — error % by agent type)
            └── ErrorsTable         (recent error events)
```

---

## 4. Data Contracts

### 4.1 Time Window

```typescript
export type TimeWindow = "24h" | "7d" | "30d" | "90d";

export const TIME_WINDOW_LABELS: Record<TimeWindow, string> = {
  "24h": "Last 24 Hours",
  "7d":  "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
};
```

### 4.2 Performance KPIs

```typescript
export interface PerformanceKpis {
  avgResponseTimeMs: number;
  successRate: number;        // 0–100
  throughputPerMin: number;
  availabilityPercent: number;
  // Trend vs previous period:
  responseTimeTrend: "up" | "down" | "neutral";
  successRateTrend: "up" | "down" | "neutral";
  throughputTrend: "up" | "down" | "neutral";
  availabilityTrend: "up" | "down" | "neutral";
}
```

### 4.3 Response Time Data (per agent)

```typescript
export interface AgentResponseTime {
  agentName: string;
  avgMs: number;
  p95Ms: number;
  p99Ms: number;
}
```

### 4.4 Performance Trend Point

```typescript
export interface PerformanceTrendPoint {
  date: string;              // "YYYY-MM-DD" or "HH:00" for 24h
  successRate: number;       // 0–100
  avgResponseMs: number;
}
```

### 4.5 Usage Data

```typescript
export interface UsageKpis {
  totalTokens: number;
  totalRequests: number;
  activeUsers: number;
}

export interface UsageDataPoint {
  date: string;
  tokens: number;
  requests: number;
  users: number;
}
```

### 4.6 Error Data

```typescript
export interface ErrorKpis {
  overallErrorRate: number;   // 0–100
  agentsWithErrors: number;
}

export interface ErrorRateByType {
  agentType: string;          // human-readable label
  errorRate: number;          // 0–100
  errorCount: number;
}

export interface ErrorEvent {
  id: string;
  agentId: string;
  agentName: string;
  agentType: string;
  errorType: string;
  errorMessage: string;
  occurredAt: string;
}
```

### 4.7 Mock Data Strategy

Define in `lib/mock-data/analytics.ts` a function that accepts `TimeWindow` and returns a full dataset:

```typescript
export function getMockAnalyticsData(window: TimeWindow): {
  performanceKpis: PerformanceKpis;
  responseTimeSeries: AgentResponseTime[];
  performanceTrend: PerformanceTrendPoint[];
  usageKpis: UsageKpis;
  usageSeries: UsageDataPoint[];
  errorKpis: ErrorKpis;
  errorRates: ErrorRateByType[];
  errorEvents: ErrorEvent[];
}
```

The number of data points in time series should vary by window:
- 24h → 24 hourly points
- 7d → 7 daily points
- 30d → 30 daily points
- 90d → 13 weekly points

---

## 5. Implementation Tasks

### Task ANL-T01 — TimeWindowSelector
- **File:** `components/analytics/time-window-selector.tsx`
- **Design:** shadcn `ToggleGroup` with four options.
- **Styling:** Selected state: navy fill + white text. Unselected: outline + navy text.
- **Props:** `value: TimeWindow`, `onChange: (w: TimeWindow) => void`.

### Task ANL-T02 — Performance KPI Row
- **File:** `components/analytics/performance-kpis.tsx`
- Use shared `KpiCard`.
- **Icons:** `Clock` (response time), `CheckCircle2` (success rate), `Zap` (throughput), `Activity` (availability).
- **Trend:** Note that "up" for response time is NEGATIVE (slower = bad), so invert trend colour logic for response time.

### Task ANL-T03 — ResponseTimeChart (Bar Chart)
- **File:** `components/analytics/response-time-chart.tsx`
- **Chart:** Recharts `BarChart` (vertical bars).
- **X-axis:** Agent names (abbreviated if needed).
- **Y-axis:** milliseconds.
- **Bars:** `hsl(var(--chart-1))` navy fill.
- **Tooltip:** Shows agent name, avg, p95, p99 values.
- **Responsive:** `ResponsiveContainer width="100%" height={280}`.

### Task ANL-T04 — PerformanceTrendsChart (Line Chart)
- **File:** `components/analytics/performance-trends-chart.tsx`
- **Chart:** Recharts `LineChart` with `CartesianGrid` and `Tooltip`.
- **Lines:** Success Rate (primary navy line) + Avg Response Time (secondary sky-blue line).
- **Dual Y-axis:** left for %, right for ms.
- **Tooltip:** Custom tooltip showing both values for hovered date point.

### Task ANL-T05 — Usage KPI Row + UsageChart
- **File:** `components/analytics/usage-metrics.tsx`
- **KPIs:** Token count (formatted: "1.2M"), request count, active users.
- **UsageChart:** Recharts `AreaChart` with three area series (tokens, requests, users).
  - Area fills use `hsl(var(--chart-1))`, `hsl(var(--chart-2))`, `hsl(var(--chart-3))` with 20% opacity fill.
  - Toggle visibility via legend clicks.

### Task ANL-T06 — ErrorRateChart (Bar Chart by Type)
- **File:** `components/analytics/error-rate-chart.tsx`
- **Chart:** Recharts `BarChart` (horizontal bars, sorted by error rate descending).
- **Bar colour:** Gradient from `hsl(var(--destructive))` to `hsl(var(--chart-2))`.
- **X-axis:** Error rate %; **Y-axis:** Agent type labels.

### Task ANL-T07 — ErrorsTable
- **File:** `components/analytics/errors-table.tsx`
- **Design:** shadcn `Table` with columns: Agent, Type, Error, Time.
- Max 10 rows (most recent first).
- Error type shown as a `<Badge variant="destructive">` chip.

### Task ANL-T08 — CSV Export
- **File:** `components/analytics/export-button.tsx`
- **Trigger:** `<Button variant="outline">` with `<Download>` icon, labelled "Export CSV".
- **Action:** Serialises the current tab's data (performance / usage / errors) to CSV string and triggers browser download.
- **Utility function:** `lib/utils/csv-export.ts` — `exportToCsv(data: Record<string,unknown>[], filename: string): void`.

### Task ANL-T09 — Time Window Data Refresh
- **File:** `app/analytics/page.tsx`
- **Action:** `useEffect` on `timeWindow` state change → calls `getMockAnalyticsData(timeWindow)` and updates all data state values.
- **Loading state:** `isLoading` flag → show `<Skeleton>` placeholders for charts for 300ms.
- **Constraint (NFR-P-03):** Charts must update within 500ms of time-window change. Mock data switch is instant; the 300ms skeleton satisfies visual feedback.

---

## 6. File Change Map

| File | Action |
|---|---|
| `app/analytics/page.tsx` | Refactor to new component tree; add time window state |
| `components/analytics/time-window-selector.tsx` | Create toggle group selector |
| `components/analytics/performance-kpis.tsx` | Create 4-card KPI row |
| `components/analytics/response-time-chart.tsx` | Create bar chart |
| `components/analytics/performance-trends-chart.tsx` | Create line chart |
| `components/analytics/usage-metrics.tsx` | Create usage KPIs + area chart |
| `components/analytics/error-rate-chart.tsx` | Create horizontal bar chart |
| `components/analytics/errors-table.tsx` | Create errors table |
| `components/analytics/export-button.tsx` | Create CSV export button |
| `lib/mock-data/analytics.ts` | Create time-window-aware mock data function |
| `lib/utils/csv-export.ts` | Create CSV export utility |

---

## 7. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| Performance tab shows 4 KPI cards | Visual inspection of `/analytics` |
| Response Time bar chart renders for all agents | Visual inspection |
| Performance Trends line chart renders with navy line | Visual inspection |
| Time window toggle changes chart data | Switch between 24h / 7d / 30d / 90d |
| Loading skeleton appears during window switch | Observe brief skeleton before chart |
| Usage tab shows token/request/user area chart | Switch to Usage tab |
| Errors tab shows horizontal bar chart sorted by error rate | Switch to Errors tab |
| Errors table shows recent error events | Visual inspection |
| Export CSV button downloads a .csv file | Click Export CSV |
| All charts responsive at 768px, 1024px, 1280px | Browser resize |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
