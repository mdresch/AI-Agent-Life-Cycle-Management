# Marketplace Implementation Plan

## Module: Marketplace
**Owner Agent:** Agent 8  
**Branch:** `feat/marketplace`  
**Phase:** 3 — Marketplace & Backend  
**Depends on:** Agent 1 (`feat/design-system` merged), Agent 3 (agent inventory data shape)

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

Deliver the Marketplace page (`/marketplace`) — a searchable, filterable catalogue where users can browse, install, uninstall, and publish AI agents. The page must be styled in the navy blue design system and support the full feature set described in requirements MKT-01 through MKT-06 (MKT-07 ratings/reviews is "Could Have" and can be deferred).

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority |
|---|---|---|
| MKT-01 | Browse tab: searchable + filterable catalogue (category, rating, downloads) | Must Have |
| MKT-02 | Marketplace KPIs: total agents, downloads, avg rating, new this week | Should Have |
| MKT-03 | Featured Agents section: curated cards (image/icon, title, category, rating, download count) | Should Have |
| MKT-04 | Install / Uninstall agents directly into agent inventory | Must Have |
| MKT-05 | Subscriptions tab: manage installed agents (unsubscribe, update) | Must Have |
| MKT-06 | Publish tab: form to submit an agent to marketplace | Must Have |
| MKT-07 | Ratings and reviews on each listing | Could Have — Defer to v2 |

---

## 3. Component Breakdown

```
MarketplacePage  (app/marketplace/page.tsx)
└── MarketplaceDashboard
    ├── MarketplaceHeader
    │   ├── Heading "Marketplace"
    │   ├── SearchInput
    │   ├── CategoryFilter (<Select>)
    │   ├── SortFilter (<Select>: Most Downloads / Highest Rated / Newest)
    │   └── PublishButton → navigates to Publish tab
    ├── KpiRow
    │   ├── KpiCard — Total Available Agents
    │   ├── KpiCard — Total Downloads
    │   ├── KpiCard — Average Rating
    │   └── KpiCard — New This Week
    ├── FeaturedAgentsSection
    │   └── FeaturedAgentCarousel
    │       └── FeaturedAgentCard ×N
    │           ├── Icon (category-based)
    │           ├── Title + category badge
    │           ├── Rating stars + download count
    │           └── Install / Installed button
    └── Tabs
        ├── Tab: Browse
        │   └── AgentCatalogueGrid
        │       └── MarketplaceAgentCard ×N
        │           ├── Agent icon + title + category
        │           ├── Author
        │           ├── Rating (stars) + review count
        │           ├── Download count
        │           └── Install / Installed / Uninstall button
        ├── Tab: Subscriptions
        │   └── SubscriptionsList
        │       └── SubscriptionRow ×N
        │           ├── Agent name + category badge
        │           ├── Installed version + latest version
        │           ├── Update button (if newer version available)
        │           └── Unsubscribe button → ConfirmDialog
        └── Tab: Publish
            └── PublishAgentForm
                ├── AgentSelect      (from user's agent inventory)
                ├── TitleInput
                ├── DescriptionTextarea
                ├── CategorySelect
                ├── VersionInput
                └── SubmitForReviewButton
```

---

## 4. Data Contracts

### 4.1 Marketplace Listing

```typescript
export interface MarketplaceListing {
  id: string;
  agentId: string;
  title: string;
  description: string;
  category: AgentType;
  authorName: string;
  authorId: string;
  rating: number;           // 0–5, one decimal
  reviewCount: number;
  downloadCount: number;
  version: string;
  publishedAt: string;      // ISO 8601
  updatedAt: string;
  isFeatured: boolean;
  isInstalled: boolean;
  installedVersion?: string;
  iconName?: string;        // Lucide icon name
}
```

### 4.2 Marketplace KPIs

```typescript
export interface MarketplaceKpis {
  totalListings: number;
  totalDownloads: number;
  averageRating: number;
  newThisWeek: number;
}
```

### 4.3 Subscription

```typescript
export interface MarketplaceSubscription {
  id: string;
  listingId: string;
  title: string;
  category: AgentType;
  installedVersion: string;
  latestVersion: string;
  hasUpdate: boolean;
  installedAt: string;
}
```

### 4.4 Publish Payload

```typescript
export interface PublishAgentPayload {
  agentId: string;
  title: string;
  description: string;       // min 50 chars
  category: AgentType;
  version: string;           // semver: "1.0.0"
}
```

### 4.5 Mock Data

Define in `lib/mock-data/marketplace.ts`:
- 20–25 `MarketplaceListing` items (5–6 featured, various categories and ratings).
- 1 `MarketplaceKpis` object.
- 4–6 `MarketplaceSubscription` records (some with updates available).
- Mock user's `ownAgents: Agent[]` imported from `lib/mock-data/agents.ts`.

---

## 5. Implementation Tasks

### Task MKT-T01 — MarketplaceHeader with Search & Filters
- **File:** `components/marketplace/marketplace-header.tsx`
- **State:** `searchQuery`, `selectedCategory`, `sortBy`.
- **Sort options:** `most-downloads`, `highest-rated`, `newest`.
- Filtering is passed down to `AgentCatalogueGrid` via callbacks.

### Task MKT-T02 — Marketplace KPI Row
- **File:** `components/marketplace/marketplace-kpis.tsx`
- Use shared `KpiCard` component.
- **Icons:** `Package` (total), `Download` (downloads), `Star` (rating), `Sparkles` (new this week).

### Task MKT-T03 — FeaturedAgentCarousel
- **File:** `components/marketplace/featured-agents-carousel.tsx`
- **Carousel library:** Embla Carousel (already in project dependencies).
- Show 3 cards at once on desktop, 2 on tablet, 1 on mobile.
- `FeaturedAgentCard`:
  - Large icon in navy circle background.
  - Title (H4) + category badge.
  - Star rating row (filled `★` stars, empty `☆` for remainder).
  - Download count: `<Download>` icon + formatted count.
  - Install button: `variant="default"` if not installed, `variant="secondary"` + "Installed ✓" if installed.

### Task MKT-T04 — AgentCatalogueGrid with Install/Uninstall
- **File:** `components/marketplace/agent-catalogue-grid.tsx`
- **Filter logic:** `useMemo` filtering `listings` array by `searchQuery`, `category`, and `sortBy`.
- `MarketplaceAgentCard`:
  - Same layout as FeaturedAgentCard but more compact.
  - Rating: half-star precision (render using a filled/half/empty star pattern or `★★★½☆` text).
  - Install action: `installAgent(listingId)` → updates `isInstalled: true` in state → shows toast "Agent installed".
  - Uninstall action: `uninstallAgent(listingId)` → confirmation dialog → removes.

### Task MKT-T05 — SubscriptionsList
- **File:** `components/marketplace/subscriptions-list.tsx`
- **Design:**
  - Table-style rows.
  - "Update Available" badge in amber on rows where `hasUpdate: true`.
  - "Update" button: calls `updateAgent(id)` → simulates 1s delay → toast "Updated to v{latestVersion}".
  - "Unsubscribe": opens `AlertDialog` → confirm → removes row.

### Task MKT-T06 — PublishAgentForm
- **File:** `components/marketplace/publish-agent-form.tsx`
- **Schema (Zod):** title (required, min 5), description (required, min 50), category (required), version (semver regex `/^\d+\.\d+\.\d+$/`), agentId (required).
- **Agent Select:** Dropdown populated from user's agent inventory mock data.
- **Submit:** Shows spinner → 2s delay → toast "Your agent has been submitted for review" → resets form.

### Task MKT-T07 — Star Rating Display Component
- **File:** `components/marketplace/star-rating.tsx`
- **Props:** `rating: number` (0–5), `size?: "sm" | "md"`.
- **Renders:** Filled, half-filled (≥ 0.5 fraction), and empty stars using Lucide `Star` icon with CSS clip for half.
- Reused in both FeaturedAgentCard and MarketplaceAgentCard.

---

## 6. File Change Map

| File | Action |
|---|---|
| `app/marketplace/page.tsx` | Refactor to new component tree |
| `components/marketplace/marketplace-header.tsx` | Create search + filter header |
| `components/marketplace/marketplace-kpis.tsx` | Create KPI row |
| `components/marketplace/featured-agents-carousel.tsx` | Create Embla carousel |
| `components/marketplace/agent-catalogue-grid.tsx` | Create filtered grid |
| `components/marketplace/subscriptions-list.tsx` | Create subscriptions table |
| `components/marketplace/publish-agent-form.tsx` | Create publish form |
| `components/marketplace/star-rating.tsx` | Create star rating component |
| `lib/mock-data/marketplace.ts` | Create mock data |

---

## 7. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| KPI row shows 4 marketplace stats | Visual inspection of `/marketplace` |
| Featured carousel shows 3 featured agents (scrollable) | Visual inspection + scroll |
| Search filters catalogue in real time | Type in search box |
| Category filter narrows results | Select a category |
| Sort by downloads/rating/newest reorders list | Change sort dropdown |
| Install button changes to "Installed ✓" state | Click Install |
| Uninstall dialog appears before removal | Click Uninstall |
| Subscriptions tab shows installed agents | Switch to Subscriptions tab |
| Update button updates version and shows toast | Click Update |
| Publish form validates all fields | Submit empty form |
| Publish form requires semver version | Enter "abc" for version |
| Successful publish shows toast | Complete and submit form |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
