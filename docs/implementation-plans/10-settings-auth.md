# Settings & Authentication Implementation Plan

## Module: Settings & Authentication
**Owner Agent:** Agent 10  
**Branch:** `feat/settings-auth`  
**Phase:** 1 — Core Modules  
**Depends on:** Agent 1 (`feat/design-system` merged)

---

## Table of Contents

1. [Objective](#1-objective)
2. [Requirements Mapping](#2-requirements-mapping)
3. [Component Breakdown](#3-component-breakdown)
4. [Data Contracts](#4-data-contracts)
5. [Implementation Tasks](#5-implementation-tasks)
6. [Authentication Architecture](#6-authentication-architecture)
7. [RBAC Matrix](#7-rbac-matrix)
8. [File Change Map](#8-file-change-map)
9. [Acceptance Criteria](#9-acceptance-criteria)

---

## 1. Objective

Deliver the Settings page (`/settings`) and a complete Authentication system covering login, session management, and role-based access control (RBAC). For v1, the authentication will be implemented using **Auth.js (NextAuth v5)** with credential-based login (email + password) and the UI scaffolded for OAuth providers (Google, Microsoft) as a future enhancement.

> **⚠ Open Question Q2:** The auth provider choice (Auth.js vs Clerk vs Auth0) must be confirmed by the repository owner before this agent begins implementation. This plan defaults to **Auth.js v5 (NextAuth)** — the most flexible and cost-free option for a Next.js App Router project.

---

## 2. Requirements Mapping

| Req ID | Requirement | Priority |
|---|---|---|
| SET-01 | Profile Settings: display name, email, avatar, timezone | Must Have |
| SET-02 | Team Settings: invite, assign roles, remove members | Must Have |
| SET-03 | Notification Settings: toggle events/channels | Should Have |
| SET-04 | API Settings: view, generate, revoke API keys | Must Have |
| AUTH-01 | Users must authenticate before accessing any feature | Must Have |
| AUTH-02 | RBAC: Owner/Admin create/delete; Member edit; Viewer read-only | Must Have |
| AUTH-03 | Session tokens expire after inactivity | Must Have |
| AUTH-04 | API keys scoped to permissions (read, write, admin) | Should Have |

---

## 3. Component Breakdown

```
LoginPage  (app/login/page.tsx)
└── LoginForm
    ├── Logo + "Sign in to AI Agent Platform"
    ├── EmailInput
    ├── PasswordInput
    ├── RememberMeCheckbox
    ├── ForgotPasswordLink
    ├── SignInButton (primary)
    └── [Placeholder] "Continue with Google" / "Continue with Microsoft" (disabled in v1)

SettingsPage  (app/settings/page.tsx)
└── SettingsDashboard
    ├── SettingsSidebar         (nav: Profile / Team / Notifications / API Keys)
    └── SettingsContent
        ├── ProfileSettingsPanel
        │   ├── AvatarUpload
        │   ├── DisplayNameInput
        │   ├── EmailInput
        │   ├── TimezoneSelect
        │   └── SaveChangesButton
        ├── TeamSettingsPanel
        │   ├── InviteMemberForm
        │   │   ├── EmailInput
        │   │   ├── RoleSelect
        │   │   └── SendInviteButton
        │   └── TeamMembersList
        │       └── TeamMemberRow ×N
        │           ├── Avatar + name + email
        │           ├── RoleBadge
        │           ├── RoleChangeSelect (owner-only)
        │           └── RemoveMemberButton
        ├── NotificationSettingsPanel
        │   └── NotificationToggleList
        │       └── NotificationRow ×4
        │           ├── Event label + description
        │           └── EmailToggle + InAppToggle
        └── ApiKeysPanel
            ├── GenerateApiKeyButton
            ├── NewKeyReveal      (one-time plaintext reveal dialog)
            └── ApiKeysList
                └── ApiKeyRow ×N
                    ├── Label + permissions badge
                    ├── Created date + last used
                    ├── Masked key (••••••••abcd)
                    └── RevokeButton → ConfirmDialog
```

---

## 4. Data Contracts

### 4.1 User (from `lib/types/index.ts`)

```typescript
// Import from shared types — do not redefine
import type { User, UserRole } from "@/lib/types";
```

### 4.2 Team Member

```typescript
export interface TeamMember {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  joinedAt: string;
  isCurrentUser: boolean;
}
```

### 4.3 Notification Preferences

```typescript
export interface NotificationPreferences {
  lifecycleTransitions: { email: boolean; inApp: boolean };
  agentErrors:          { email: boolean; inApp: boolean };
  marketplaceUpdates:   { email: boolean; inApp: boolean };
  teamActivity:         { email: boolean; inApp: boolean };
}
```

### 4.4 API Key

```typescript
export interface ApiKey {
  id: string;
  label: string;
  maskedKey: string;       // e.g. "sk_••••••••••••abcd"
  permissions: ApiKeyPermission[];
  createdAt: string;
  lastUsedAt?: string;
  revokedAt?: string;
}

export type ApiKeyPermission = "read" | "write" | "admin";
```

### 4.5 Mock Data

Define in `lib/mock-data/settings.ts`:
- 1 current `User` object.
- 5–6 `TeamMember` records (one marked `isCurrentUser: true`).
- Default `NotificationPreferences` (all enabled).
- 3–4 `ApiKey` records (one revoked).

---

## 5. Implementation Tasks

### Task SET-T01 — Profile Settings Panel
- **File:** `components/settings/profile-settings-panel.tsx`
- **Avatar Upload:** `<Avatar>` from shadcn + overlay button. For v1: clicking the button opens a file chooser; preview is shown locally using `URL.createObjectURL()`. Upload to server is deferred to backend integration.
- **Timezone Select:** List of IANA timezone strings grouped by region.
- **Save Changes:** Updates mock user state + shows success toast "Profile updated".

### Task SET-T02 — Team Settings Panel
- **File:** `components/settings/team-settings-panel.tsx`
- **InviteMemberForm:**
  - Email `<Input>` + `<Select>` for role (Member/Viewer/Admin, not Owner).
  - "Send Invite" button → adds pending entry to mock team list with "Invited" badge.
- **TeamMembersList:**
  - Cannot remove or change role of current user.
  - Cannot remove the Owner if there is only one Owner.
  - `<AlertDialog>` for confirm removal.
- **Role Change:** Dropdown to change role (Owner-only feature) — if current user is not Owner, `<Select>` is disabled.

### Task SET-T03 — Notification Settings Panel
- **File:** `components/settings/notification-settings-panel.tsx`
- **Design:** `<Switch>` components for email and in-app toggles per event type.
- State managed in `useState<NotificationPreferences>`.
- "Save Preferences" button → success toast.

### Task SET-T04 — API Keys Panel
- **File:** `components/settings/api-keys-panel.tsx`
- **GenerateApiKeyButton:**
  - Opens `<Dialog>` with form: Label `<Input>` + Permissions `<CheckboxGroup>` (read / write / admin).
  - On submit: generates a mock key `"sk_" + randomHex(32)`, shows it once in a reveal dialog.
  - Reveals with a `<Input readOnly>` + "Copy" button.
  - After dismissal: key is masked in the list.
- **ApiKeysList:**
  - Masked display: `"sk_" + "•".repeat(28) + key.slice(-4)`.
  - "Revoke" button → `<AlertDialog>` → marks key as revoked (strikethrough in list).
  - Revoked keys shown in muted style with "Revoked" badge.

### Task SET-T05 — SettingsSidebar Navigation
- **File:** `components/settings/settings-sidebar.tsx`
- **Design:**
  - Vertical nav on desktop (250px wide), tab bar on mobile.
  - Active section: navy left border + bold text.
  - Sections: Profile, Team, Notifications, API Keys.
  - On desktop: clicking a section scrolls to the corresponding panel using `scrollIntoView`.
  - On mobile: use `<Tabs>` pattern.

### Task AUTH-T01 — Login Page
- **File:** `app/login/page.tsx`
- **Design:**
  - Centred card layout (max-width 400px).
  - Platform logo/name at top in navy.
  - Form fields: Email, Password (with show/hide toggle).
  - "Remember me" checkbox.
  - "Forgot password?" link (navigates to `/forgot-password` — placeholder page for v1).
  - Primary "Sign In" button (full width, navy).
  - Disabled OAuth buttons with "Coming soon" tooltip.
- **Validation:** Email format + required. Password required.
- **Error state:** Show `<Alert variant="destructive">` below form on auth failure.

### Task AUTH-T02 — Auth.js Configuration (v1 Stub)
- **File:** `app/api/auth/[...nextauth]/route.ts` + `auth.config.ts`
- **For v1 (mock/demo mode):** Implement a `CredentialsProvider` that accepts a hardcoded demo account:
  - Email: `demo@example.com`
  - Password: `demo1234`
- This allows the full auth flow (login → session → logout) to be tested without a real database.
- **Session strategy:** `jwt` (default for credentials provider).
- **Session max age:** 8 hours (satisfies AUTH-03 inactivity expiry).

### Task AUTH-T03 — Middleware (Route Protection)
- **File:** `middleware.ts`
- **Action:** Using Auth.js `auth()` middleware:
  - Public routes: `/login`, `/forgot-password`, `/api/auth/**`.
  - All other routes require an authenticated session.
  - Unauthenticated requests → redirect to `/login?callbackUrl={original-path}`.

### Task AUTH-T04 — UserNav Component
- **File:** `components/user-nav.tsx` (or update existing)
- **Design:**
  - `<Avatar>` with initials fallback in navy circle.
  - Dropdown: "Profile & Settings" → `/settings`, "Sign out" → calls `signOut()`.
  - Shows current user's display name and email in dropdown header.

### Task AUTH-T05 — RBAC Guard Hook
- **File:** `lib/hooks/use-permission.ts`
- **Export:** `usePermission(action: Action): boolean`
- **Actions:** `"create-agent"`, `"delete-agent"`, `"edit-agent"`, `"promote-to-production"`, `"manage-team"`, `"manage-api-keys"`.
- **Logic:** Reads role from session. Returns `true` if current user's role permits the action.
- Used by all feature agents to gate UI elements.

---

## 6. Authentication Architecture

```
Browser
  │
  ├── /login page
  │     └── CredentialsProvider.authorize()
  │           └── (v1) hardcoded demo check
  │               (v2) POST /api/auth/verify → database hash compare
  │
  ├── Auth.js session (JWT in HttpOnly cookie)
  │     └── Expires after 8h inactivity
  │
  ├── middleware.ts
  │     └── Runs on every request
  │           └── Checks session → redirect to /login if absent
  │
  └── useSession() hook in components
        └── Reads session data: { user: { id, name, email, role } }
```

---

## 7. RBAC Matrix

| Action | Owner | Admin | Member | Viewer |
|---|---|---|---|---|
| View all pages | ✅ | ✅ | ✅ | ✅ |
| Create agent | ✅ | ✅ | ✅ | ❌ |
| Edit agent | ✅ | ✅ | ✅ | ❌ |
| Delete agent | ✅ | ✅ | ❌ | ❌ |
| Promote agent to Production | ✅ | ✅ | ❌ | ❌ |
| Retire agent | ✅ | ✅ | ❌ | ❌ |
| Manage team members | ✅ | ✅ | ❌ | ❌ |
| Change member roles | ✅ | ❌ | ❌ | ❌ |
| Manage API keys | ✅ | ✅ | ❌ | ❌ |
| Publish to marketplace | ✅ | ✅ | ✅ | ❌ |
| Install from marketplace | ✅ | ✅ | ✅ | ❌ |

> Implementation note: Buttons/forms for disallowed actions must be visually disabled and show a tooltip explaining why. Never rely solely on client-side RBAC — the backend API must enforce these rules too (covered in Plan 11).

---

## 8. File Change Map

| File | Action |
|---|---|
| `app/login/page.tsx` | Create login page |
| `app/forgot-password/page.tsx` | Create placeholder "forgot password" page |
| `app/api/auth/[...nextauth]/route.ts` | Create Auth.js route handler |
| `auth.config.ts` | Create Auth.js config with CredentialsProvider |
| `middleware.ts` | Create route protection middleware |
| `app/settings/page.tsx` | Refactor to new component tree |
| `components/settings/settings-sidebar.tsx` | Create sidebar nav |
| `components/settings/profile-settings-panel.tsx` | Create profile form |
| `components/settings/team-settings-panel.tsx` | Create team management |
| `components/settings/notification-settings-panel.tsx` | Create notification toggles |
| `components/settings/api-keys-panel.tsx` | Create API key management |
| `components/user-nav.tsx` | Update to use Auth.js session |
| `lib/hooks/use-permission.ts` | Create RBAC guard hook |
| `lib/mock-data/settings.ts` | Create mock data |

---

## 9. Acceptance Criteria

| Criterion | How to Verify |
|---|---|
| Unauthenticated `/agents` redirects to `/login` | Open in incognito window |
| `demo@example.com` / `demo1234` logs in successfully | Sign in with demo credentials |
| Wrong credentials shows error alert | Try wrong password |
| Session persists across page reloads | Log in, reload page |
| Sign out clears session and redirects to `/login` | Click Sign Out |
| Profile settings form saves changes + toast | Edit name, save |
| Team invite adds pending member to list | Send invite |
| Cannot remove own account from team | Try remove self |
| Notification toggles persist in-session | Toggle notifications, switch tab, return |
| Generate API key shows one-time reveal dialog | Generate a key |
| Revoke key shows strikethrough + Revoked badge | Revoke a key |
| Member role cannot delete agent (button disabled) | Verify RBAC hook behaviour |
| No TypeScript errors | `npx tsc --noEmit` exits 0 |
| No ESLint errors | `npm run lint` exits 0 |
