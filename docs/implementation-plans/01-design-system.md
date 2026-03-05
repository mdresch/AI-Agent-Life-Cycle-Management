# Design System Implementation Plan

## Module: Design System & Visual Tokens
**Owner Agent:** Agent 1  
**Branch:** `feat/design-system`  
**Phase:** 0 — Foundation (must land before all other feature branches)

---

## Table of Contents

1. [Objective](#1-objective)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Component Tokens](#5-component-tokens)
6. [Implementation Tasks](#6-implementation-tasks)
7. [File Change Map](#7-file-change-map)
8. [Acceptance Criteria](#8-acceptance-criteria)

---

## 1. Objective

Replace the current neutral (grey-scale) design token set with a professional **navy blue** design system. The system must:

- Use **navy blue as the primary brand colour** with several blue shades as accent and highlight colours.
- Support both **light mode** (white/light-grey backgrounds, navy foreground) and **dark mode** (deep-navy backgrounds, light foreground).
- Remain **WCAG 2.1 AA** compliant — minimum 4.5:1 contrast ratio for normal text, 3:1 for large text.
- Be fully expressed through **CSS custom properties (HSL values)** consumed by Tailwind via `tailwind.config.ts` — no hardcoded colours in component files.
- Preserve all existing shadcn/ui component behaviour.

---

## 2. Color Palette

### 2.1 Full Palette Definition

| Token Name | Light Mode (HSL) | Hex Equivalent | Dark Mode (HSL) | Hex Equivalent |
|---|---|---|---|---|
| **Navy — Primary Brand** | 220 71% 22% | `#1A3566` | 220 71% 22% | `#1A3566` |
| **Navy Dark** | 220 71% 14% | `#102241` | 220 71% 14% | `#102241` |
| **Navy Medium** | 214 64% 30% | `#1A4073` | 214 64% 30% | `#1A4073` |
| **Steel Blue** | 210 55% 45% | `#2E6599` | 210 55% 55% | `#3B7DBF` |
| **Sky Blue** | 205 75% 55% | `#2A9BD6` | 205 75% 60% | `#33AAEC` |
| **Light Blue** | 205 80% 72% | `#6DC3E8` | 205 80% 72% | `#6DC3E8` |
| **Pale Blue** | 210 50% 88% | `#C2D7EE` | 220 30% 25% | `#2B3D5A` |
| **Background** | 210 30% 98% | `#F4F7FB` | 220 40% 8% | `#0D1422` |
| **Surface / Card** | 0 0% 100% | `#FFFFFF` | 220 35% 12% | `#152035` |
| **Foreground** | 220 71% 14% | `#102241` | 210 30% 95% | `#EDF2F9` |
| **Muted** | 210 30% 94% | `#E8F0F9` | 220 30% 18% | `#1F2E47` |
| **Muted Foreground** | 215 35% 45% | `#4D6A96` | 215 25% 60% | `#7E9DC0` |
| **Border** | 210 40% 88% | `#BFCFE8` | 220 30% 22% | `#253550` |
| **Input** | 210 40% 88% | `#BFCFE8` | 220 30% 22% | `#253550` |
| **Ring / Focus** | 210 75% 55% | `#2A8FD6` | 205 75% 60% | `#33AAEC` |
| **Destructive** | 0 84% 60% | `#F44343` | 0 63% 31% | `#7D1F1F` |

### 2.2 CSS Custom Properties — Full Specification

Replace the contents of the `:root` and `.dark` blocks in `app/globals.css` with:

```css
@layer base {
  :root {
    /* ── Backgrounds ──────────────────────────────────── */
    --background:        210 30% 98%;   /* near-white with blue tint */
    --foreground:        220 71% 14%;   /* navy dark text */

    /* ── Card / Surface ──────────────────────────────── */
    --card:              0 0% 100%;
    --card-foreground:   220 71% 14%;

    /* ── Popover ─────────────────────────────────────── */
    --popover:           0 0% 100%;
    --popover-foreground: 220 71% 14%;

    /* ── Primary (Navy Blue) ─────────────────────────── */
    --primary:           220 71% 22%;  /* #1A3566 */
    --primary-foreground: 0 0% 100%;

    /* ── Secondary (Steel Blue) ──────────────────────── */
    --secondary:         210 55% 45%;  /* #2E6599 */
    --secondary-foreground: 0 0% 100%;

    /* ── Muted ───────────────────────────────────────── */
    --muted:             210 30% 94%;  /* light blue-grey */
    --muted-foreground:  215 35% 45%;  /* mid-navy */

    /* ── Accent (Sky Blue) ───────────────────────────── */
    --accent:            205 75% 55%;  /* #2A9BD6 */
    --accent-foreground: 0 0% 100%;

    /* ── Destructive ─────────────────────────────────── */
    --destructive:       0 84% 60%;
    --destructive-foreground: 0 0% 98%;

    /* ── Borders & Inputs ────────────────────────────── */
    --border:            210 40% 88%;
    --input:             210 40% 88%;
    --ring:              210 75% 55%;   /* bright blue focus ring */

    /* ── Charts (blues & complementary) ─────────────── */
    --chart-1:           220 71% 35%;  /* navy */
    --chart-2:           205 75% 50%;  /* sky blue */
    --chart-3:           210 55% 62%;  /* steel blue mid */
    --chart-4:           195 80% 68%;  /* light cyan-blue */
    --chart-5:           230 55% 55%;  /* periwinkle blue */

    /* ── Border radius ───────────────────────────────── */
    --radius:            0.5rem;

    /* ── Sidebar ─────────────────────────────────────── */
    --sidebar-background:           220 71% 18%;  /* dark navy sidebar */
    --sidebar-foreground:           210 50% 90%;  /* light blue text */
    --sidebar-primary:              205 75% 55%;  /* sky blue active item */
    --sidebar-primary-foreground:   0 0% 100%;
    --sidebar-accent:               220 60% 26%;  /* slightly lighter navy */
    --sidebar-accent-foreground:    210 50% 90%;
    --sidebar-border:               220 55% 28%;
    --sidebar-ring:                 205 75% 55%;
  }

  .dark {
    /* ── Backgrounds ──────────────────────────────────── */
    --background:        220 40% 8%;   /* deep navy near-black */
    --foreground:        210 30% 95%;  /* near-white with blue tint */

    /* ── Card / Surface ──────────────────────────────── */
    --card:              220 35% 12%;
    --card-foreground:   210 30% 95%;

    /* ── Popover ─────────────────────────────────────── */
    --popover:           220 35% 12%;
    --popover-foreground: 210 30% 95%;

    /* ── Primary (Navy Blue — slightly lighter in dark) ─ */
    --primary:           210 80% 55%;  /* bright blue for dark bg */
    --primary-foreground: 220 40% 8%;

    /* ── Secondary ───────────────────────────────────── */
    --secondary:         220 35% 20%;
    --secondary-foreground: 210 30% 90%;

    /* ── Muted ───────────────────────────────────────── */
    --muted:             220 30% 18%;
    --muted-foreground:  215 25% 60%;

    /* ── Accent ──────────────────────────────────────── */
    --accent:            205 75% 60%;
    --accent-foreground: 220 40% 8%;

    /* ── Destructive ─────────────────────────────────── */
    --destructive:       0 63% 31%;
    --destructive-foreground: 0 0% 98%;

    /* ── Borders & Inputs ────────────────────────────── */
    --border:            220 30% 22%;
    --input:             220 30% 22%;
    --ring:              205 75% 60%;

    /* ── Charts ──────────────────────────────────────── */
    --chart-1:           210 80% 60%;  /* bright blue */
    --chart-2:           195 70% 55%;  /* teal-blue */
    --chart-3:           225 65% 65%;  /* periwinkle */
    --chart-4:           200 85% 70%;  /* light cyan */
    --chart-5:           240 55% 65%;  /* violet-blue */

    /* ── Sidebar ─────────────────────────────────────── */
    --sidebar-background:           220 45% 10%;
    --sidebar-foreground:           210 40% 85%;
    --sidebar-primary:              205 75% 60%;
    --sidebar-primary-foreground:   0 0% 100%;
    --sidebar-accent:               220 40% 15%;
    --sidebar-accent-foreground:    210 40% 85%;
    --sidebar-border:               220 35% 18%;
    --sidebar-ring:                 205 75% 60%;
  }
}
```

### 2.3 Named Blue Highlight Shades

These are **utility colour variables** available for use in charts, badges, and highlight elements. Add them inside `:root`:

```css
/* ── Blue highlight scale (light mode) ──────────────── */
--blue-50:  210 100% 97%;   /* #EDF6FF */
--blue-100: 210 90%  92%;   /* #CCE4FF */
--blue-200: 210 85%  82%;   /* #99CAFE */
--blue-300: 210 80%  68%;   /* #57A7F8 */
--blue-400: 210 75%  55%;   /* #2A8BD6 */
--blue-500: 220 71%  40%;   /* #1F5099 */
--blue-600: 220 71%  30%;   /* #173A73 */
--blue-700: 220 71%  22%;   /* #1A3566 — PRIMARY */
--blue-800: 220 71%  16%;   /* #122648 */
--blue-900: 220 71%  10%;   /* #0B172D */
```

---

## 3. Typography

### 3.1 Font Stack

Replace the `body` font declaration in `app/globals.css`:

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
               sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Add Inter from Google Fonts in `app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Apply variable to <html>: className={inter.variable}
```

### 3.2 Type Scale

| Role | Size | Weight | Line Height | Tailwind Class |
|---|---|---|---|---|
| Display | 2.25rem (36px) | 700 | 1.2 | `text-4xl font-bold` |
| H1 | 1.875rem (30px) | 700 | 1.25 | `text-3xl font-bold` |
| H2 | 1.5rem (24px) | 600 | 1.3 | `text-2xl font-semibold` |
| H3 | 1.25rem (20px) | 600 | 1.35 | `text-xl font-semibold` |
| H4 | 1.125rem (18px) | 500 | 1.4 | `text-lg font-medium` |
| Body | 1rem (16px) | 400 | 1.5 | `text-base` |
| Small | 0.875rem (14px) | 400 | 1.5 | `text-sm` |
| Caption | 0.75rem (12px) | 400 | 1.4 | `text-xs` |

---

## 4. Spacing & Layout

The system uses Tailwind's default 4px base spacing scale (no changes needed). Key layout constants:

| Token | Value | Usage |
|---|---|---|
| Page max-width | `max-w-7xl` (1280px) | Outer content wrapper |
| Page horizontal padding | `px-4 sm:px-6 lg:px-8` | Responsive horizontal gutter |
| Card padding | `p-6` | Standard card inner spacing |
| Section gap | `gap-6` | Grid/flex gaps between cards |
| Border radius (component) | `rounded-lg` (8px) | Cards, buttons, inputs |
| Border radius (full) | `rounded-full` | Badges, avatars |

---

## 5. Component Tokens

### 5.1 Button Variants

All button variants must map to the navy blue palette:

| Variant | Background | Text | Hover Background | Usage |
|---|---|---|---|---|
| `default` | `hsl(var(--primary))` = navy | white | 8% lighter navy | Primary CTA |
| `secondary` | `hsl(var(--secondary))` = steel blue | white | 8% lighter steel | Secondary actions |
| `outline` | transparent | navy | `hsl(var(--muted))` = pale blue | Tertiary actions |
| `ghost` | transparent | navy | `hsl(var(--muted))` = pale blue | Icon buttons |
| `destructive` | red | white | darker red | Delete/danger |
| `link` | transparent | sky blue | underline | Inline links |

### 5.2 Badge Variants

| Variant | Background | Text | Usage |
|---|---|---|---|
| `default` | navy | white | General labels |
| `secondary` | pale blue | navy | Neutral tags |
| `outline` | transparent + navy border | navy | Lightweight tags |
| `destructive` | red | white | Error / critical |
| `success` | `hsl(152 60% 35%)` | white | Active / healthy |
| `warning` | `hsl(38 90% 50%)` | white | Caution states |

> **Note:** Add `success` and `warning` variants to `components/ui/badge.tsx` using the CVA `variants` config.

### 5.3 Navigation Header

The site header must use:
- **Background:** `hsl(var(--primary))` = `#1A3566` navy
- **Logo / brand text:** white
- **Nav link (default):** `rgba(255,255,255,0.75)` — slightly muted white
- **Nav link (active/hover):** white + bottom border `hsl(var(--accent))` sky blue
- **ThemeToggle button:** ghost white icon
- **UserNav avatar:** ring `hsl(var(--accent))`

### 5.4 Card

Standard card:
- **Background:** `hsl(var(--card))`
- **Border:** `1px solid hsl(var(--border))`
- **Shadow (light mode):** `0 1px 3px hsla(220, 60%, 20%, 0.08)`
- **Shadow (dark mode):** `0 1px 4px hsla(0, 0%, 0%, 0.4)`

KPI metric card (special variant):
- **Left border accent:** `4px solid hsl(var(--accent))`
- **Icon background:** `hsl(var(--muted))` with icon colour `hsl(var(--primary))`

### 5.5 Chart Colors

All charts use this ordered palette (maps to `--chart-1` through `--chart-5`):

| Position | Light HSL | Dark HSL | Description |
|---|---|---|---|
| 1 | `220 71% 35%` | `210 80% 60%` | Navy / Bright Blue |
| 2 | `205 75% 50%` | `195 70% 55%` | Sky Blue / Teal-Blue |
| 3 | `210 55% 62%` | `225 65% 65%` | Steel Blue / Periwinkle |
| 4 | `195 80% 68%` | `200 85% 70%` | Light Cyan-Blue |
| 5 | `230 55% 55%` | `240 55% 65%` | Periwinkle / Violet-Blue |

---

## 6. Implementation Tasks

### Task DS-01 — Update CSS Custom Properties
- **File:** `app/globals.css`
- **Action:** Replace `:root` and `.dark` blocks with the values specified in §2.2 above.
- **Also add:** Blue highlight scale variables (§2.3).
- **Also update:** `body` font-family to Inter stack (§3.1).
- **Validation:** All pages continue to render without console errors; colours visually match the palette.

### Task DS-02 — Add Inter Font
- **File:** `app/layout.tsx`
- **Action:** Import `Inter` from `next/font/google`, create font instance, apply `inter.variable` to `<html>` element, add `font-sans` from `var(--font-inter)` in `tailwind.config.ts`.
- **Validation:** Browser DevTools shows body text rendered in Inter.

### Task DS-03 — Update Tailwind Config
- **File:** `tailwind.config.ts`
- **Action:** Extend `theme.extend.fontFamily` with `sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans]`.
- **No other changes required** — colour tokens are already wired through CSS variables.

### Task DS-04 — Add Badge Variants
- **File:** `components/ui/badge.tsx`
- **Action:** Add `success` and `warning` CVA variants using the colour values in §5.2.
- **Export:** Update the `BadgeProps` variant type to include the new options.
- **Validation:** Storybook or visual inspection — green badge and amber badge render correctly.

### Task DS-05 — Update Site Header
- **File:** `components/site-header.tsx` (or equivalent navigation component)
- **Action:** Apply navy background, white text, sky-blue active state per §5.3.
- **Ensure:** `aria-current="page"` on the active nav link for accessibility.
- **Validation:** Header is visually navy; active link is clearly distinguishable.

### Task DS-06 — Update KPI Card Variant
- **Files:** `components/dashboard/agent-stats.tsx` (and any other metric card components)
- **Action:** Add left-border accent and icon background per §5.4 KPI variant.

### Task DS-07 — Verify Chart Palette
- **Files:** All chart components (e.g., `components/dashboard/agent-status-overview.tsx`, etc.)
- **Action:** Confirm each chart uses `hsl(var(--chart-1))` through `hsl(var(--chart-5))` rather than hardcoded colour strings. Replace any hardcoded colours.
- **Validation:** Charts display in the navy/blue palette in both light and dark mode.

### Task DS-08 — Accessibility Audit
- **Action:** Run axe or Lighthouse accessibility audit on all pages.
- **Fix:** Any contrast failures (minimum 4.5:1 for body text, 3:1 for large text/UI components).
- **Document:** Record contrast ratios for primary text/background combinations in this file.

### Task DS-09 — Dark Mode Smoke Test
- **Action:** Toggle dark mode on every page and confirm:
  - No white text on white background.
  - No navy text on navy background.
  - Charts remain legible.
  - All interactive element focus rings are visible.

---

## 7. File Change Map

| File | Type of Change |
|---|---|
| `app/globals.css` | Replace CSS custom property values; add blue scale variables; update font |
| `app/layout.tsx` | Add Inter font import and apply variable |
| `tailwind.config.ts` | Extend `fontFamily.sans` |
| `components/ui/badge.tsx` | Add `success` and `warning` CVA variants |
| `components/site-header.tsx` | Apply navy background and active-link styling |
| Chart components (`components/dashboard/*`, etc.) | Replace hardcoded chart colours with CSS variable references |

> **Agent 1 must NOT modify any file outside this list without coordinating with the repo owner.**

---

## 8. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| Primary colour is visually navy blue (`#1A3566` ±5% luminance) | Visual inspection + browser colour picker |
| Header background is navy, text is white | Screenshot comparison |
| Charts use blue-family palette (no default orange/red/green) | Visual inspection of all chart pages |
| WCAG AA contrast (4.5:1 body, 3:1 large) passes for both modes | Lighthouse / axe accessibility report |
| Dark mode background is deep navy, not black/grey | Visual inspection |
| No TypeScript errors introduced | `npx tsc --noEmit` exits 0 |
| No new ESLint errors introduced | `npm run lint` exits 0 |
| All pages load without console errors after token change | Browser console check on each page |
