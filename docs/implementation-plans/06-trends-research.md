# Trends & Research Implementation Plan

## Module: Trends & Research
**Owner Agent:** Agent 6  
**Branch:** `feat/trends`  
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

Deliver the Trends & Research page (`/trends`) that surfaces curated AI news, research highlights, technology radar, and trending topics. The page must support category filtering, manual refresh, and an optional bookmark/share action, all styled in the navy blue design system.

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority |
|---|---|---|
| TRD-01 | Breakthrough Alert card — most significant recent AI development | Must Have |
| TRD-02 | Trending Topics tab — popular AI topics with momentum indicators, filterable by category | Must Have |
| TRD-03 | News & Articles tab — curated AI news list (title, source, date, tags) | Must Have |
| TRD-04 | Research Highlights tab — academic paper & industry research summaries | Should Have |
| TRD-05 | Technology Radar tab — emerging techs by adoption stage (Adopt/Trial/Assess/Hold) | Should Have |
| TRD-06 | Manual refresh with last-updated timestamp | Should Have |
| TRD-07 | Bookmark / Share individual trend items | Could Have |

---

## 3. Component Breakdown

```
TrendsPage  (app/trends/page.tsx)
└── TrendsDashboard
    ├── TrendsHeader
    │   ├── Heading "Trends & Research"
    │   ├── CategorySelect           (<Select> — filter by category)
    │   ├── RefreshButton            (manual refresh)
    │   └── LastUpdatedBadge         (e.g. "Updated 5 min ago")
    ├── BreakthroughAlertCard        (full-width highlight card)
    │   ├── "🚀 Breakthrough Alert" label
    │   ├── Title + summary
    │   ├── Source + date
    │   └── BookmarkButton + ShareButton
    └── Tabs
        ├── Tab: Trending Topics
        │   └── TrendingTopicsList
        │       └── TrendingTopicCard ×N
        │           ├── Topic name + category badge
        │           ├── Momentum indicator (rising/stable/declining)
        │           └── Article count
        ├── Tab: News & Articles
        │   └── NewsArticleList
        │       └── NewsArticleCard ×N
        │           ├── Title (linked)
        │           ├── Source + date
        │           ├── Tags as Badges
        │           └── Bookmark + Share icons
        ├── Tab: Research Highlights
        │   └── ResearchHighlightsList
        │       └── ResearchCard ×N
        │           ├── Paper/report title
        │           ├── Authors + publication
        │           ├── Abstract summary (2–3 sentences)
        │           └── Category badge
        └── Tab: Technology Radar
            └── TechnologyRadar
                ├── RadarLegend       (Adopt / Trial / Assess / Hold chips)
                └── RadarQuadrantGrid (2×2 grid — one quadrant per stage)
                    └── RadarItem ×N per quadrant
```

---

## 4. Data Contracts

### 4.1 Category Options

```typescript
export type TrendCategory =
  | "all"
  | "large-language-models"
  | "computer-vision"
  | "multimodal-ai"
  | "ai-agents"
  | "ai-tools-frameworks";

export const TREND_CATEGORY_LABELS: Record<TrendCategory, string> = {
  "all": "All Categories",
  "large-language-models": "Large Language Models",
  "computer-vision": "Computer Vision",
  "multimodal-ai": "Multimodal AI",
  "ai-agents": "AI Agents",
  "ai-tools-frameworks": "AI Tools & Frameworks",
};
```

### 4.2 Breakthrough Alert

```typescript
export interface BreakthroughAlert {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;  // ISO 8601
  category: TrendCategory;
  isBookmarked: boolean;
}
```

### 4.3 Trending Topic

```typescript
export interface TrendingTopic {
  id: string;
  name: string;
  category: TrendCategory;
  momentum: "rising" | "stable" | "declining";
  articleCount: number;
  weeklyChangePercent: number;  // positive = rising
}
```

### 4.4 News Article

```typescript
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: TrendCategory;
  tags: string[];
  isBookmarked: boolean;
}
```

### 4.5 Research Highlight

```typescript
export interface ResearchHighlight {
  id: string;
  title: string;
  authors: string[];
  publication: string;  // journal/conference/company
  publishedAt: string;
  abstract: string;     // 2–3 sentence summary
  category: TrendCategory;
  paperUrl?: string;
}
```

### 4.6 Technology Radar Entry

```typescript
export type RadarStage = "adopt" | "trial" | "assess" | "hold";

export interface RadarEntry {
  id: string;
  name: string;
  stage: RadarStage;
  description: string;
  category: TrendCategory;
  isNew: boolean;       // entered radar this quarter
}
```

### 4.7 Mock Data

Define in `lib/mock-data/trends.ts`:
- 1 `BreakthroughAlert`
- 12–15 `TrendingTopic` items across all categories
- 15–20 `NewsArticle` items
- 8–10 `ResearchHighlight` items
- 12–16 `RadarEntry` items (3–4 per stage)

---

## 5. Implementation Tasks

### Task TRD-T01 — TrendsHeader with Category Filter & Refresh
- **File:** `components/trends/trends-header.tsx`
- **State:** `selectedCategory`, `lastUpdated` (Date), `isRefreshing`.
- **Refresh action:** `setIsRefreshing(true)` → 1.5s timeout → `setLastUpdated(new Date())` → `setIsRefreshing(false)`.
- **LastUpdatedBadge:** Shows "Updated just now" / "Updated {N} min ago" relative time.
- **RefreshButton:** Shows spinning `<Loader2>` icon during refresh.

### Task TRD-T02 — BreakthroughAlertCard
- **File:** `components/trends/breakthrough-alert-card.tsx`
- **Design:**
  - Full-width card with a **navy-to-sky-blue gradient left border** (`border-l-4` + gradient via `border-image` or a `::before` pseudo-element).
  - Background: very light blue tint `hsl(var(--muted))`.
  - "🚀 Breakthrough Alert" label: `text-xs font-bold uppercase tracking-widest text-primary`.
  - Title: H3, bold, foreground colour.
  - Summary paragraph: `text-muted-foreground`.
  - Footer: source link + date + bookmark/share buttons.

### Task TRD-T03 — TrendingTopicCard
- **File:** `components/trends/trending-topic-card.tsx`
- **Design:**
  - Card with topic name (H4) + category badge.
  - Momentum indicator:
    - Rising: `<TrendingUp>` icon + green text.
    - Declining: `<TrendingDown>` icon + red text.
    - Stable: `<Minus>` icon + grey text.
  - Weekly change: "+ X% this week" or "- X% this week".
  - Article count: small `text-muted-foreground`.

### Task TRD-T04 — Category Filtering Logic
- **File:** `app/trends/page.tsx` or `components/trends/trends-dashboard.tsx`
- **Action:** `useMemo` to filter all content arrays by `selectedCategory`.
- Filter applies to: `TrendingTopic[]`, `NewsArticle[]`, `ResearchHighlight[]`, `RadarEntry[]`.
- **"All Categories"** shows everything.

### Task TRD-T05 — NewsArticleCard
- **File:** `components/trends/news-article-card.tsx`
- **Design:**
  - Title as a bold link (opens in new tab).
  - Source name + `·` + formatted date.
  - Tags as `<Badge variant="secondary">` (max 3 visible, "+N more" if overflow).
  - Bookmark toggle: `<Bookmark>` / `<BookmarkCheck>` icon button.
  - Share: `<Share2>` icon button → copies URL to clipboard + toast "Link copied".

### Task TRD-T06 — ResearchHighlightsCard
- **File:** `components/trends/research-highlight-card.tsx`
- **Design:**
  - Paper title (H4) as a link if `paperUrl` is set.
  - Authors + publication in `text-muted-foreground`.
  - Abstract in regular body text.
  - Category badge.

### Task TRD-T07 — TechnologyRadar
- **File:** `components/trends/technology-radar.tsx`
- **Design:**
  - 2×2 grid, each quadrant is a card for one stage.
  - Stage colours:
    - Adopt: `hsl(152 60% 35%)` green (success).
    - Trial: `hsl(var(--primary))` navy.
    - Assess: `hsl(var(--secondary))` steel blue.
    - Hold: `hsl(var(--muted-foreground))` grey.
  - Each quadrant: stage heading chip + list of `RadarEntry` items.
  - Each entry: name (bold), `isNew` badge ("New" in amber), description.

### Task TRD-T08 — Bookmark State Management
- **State:** `bookmarkedIds: Set<string>` — managed in `useState`.
- **Toggle:** `toggleBookmark(id)` flips the set.
- Affect both `BreakthroughAlertCard` and `NewsArticleCard`.
- **Note:** Bookmark state is ephemeral (page refresh resets it). Backend persistence is out of scope for v1 (see OUT-OF-SCOPE).

---

## 6. File Change Map

| File | Action |
|---|---|
| `app/trends/page.tsx` | Refactor to new component tree; add category filter state |
| `components/trends/trends-header.tsx` | Create header with filter, refresh, last-updated |
| `components/trends/breakthrough-alert-card.tsx` | Create highlight card |
| `components/trends/trending-topic-card.tsx` | Create topic card with momentum |
| `components/trends/news-article-card.tsx` | Create news card with bookmark/share |
| `components/trends/research-highlight-card.tsx` | Create research card |
| `components/trends/technology-radar.tsx` | Create 2×2 radar grid |
| `lib/mock-data/trends.ts` | Create mock data file |

---

## 7. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| Breakthrough Alert card visible at top of page | Visual inspection of `/trends` |
| Category filter "LLMs" shows only LLM-related items in all tabs | Select LLMs filter and check each tab |
| Refresh button shows spinner and updates "last updated" badge | Click refresh |
| Trending topics show momentum icons (up/down/neutral) | Visual inspection |
| News articles show bookmark toggle | Click bookmark icon |
| Share button copies link and shows toast | Click share |
| Technology Radar 2×2 grid shows all 4 stages | Visual inspection |
| New entries in radar show "New" badge | Check mock data includes `isNew: true` entries |
| Responsive at 768px, 1024px, 1280px | Browser resize |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
