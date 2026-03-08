"use client"

import { useMemo } from "react"
import type { UserRole } from "@/lib/types"
import { mockCurrentUser } from "@/lib/mock-data/settings"

export type Action =
  | "create-agent"
  | "delete-agent"
  | "edit-agent"
  | "promote-to-production"
  | "retire-agent"
  | "manage-team"
  | "change-member-roles"
  | "manage-api-keys"
  | "publish-to-marketplace"
  | "install-from-marketplace"

const rolePermissions: Record<UserRole, Action[]> = {
  owner: [
    "create-agent",
    "delete-agent",
    "edit-agent",
    "promote-to-production",
    "retire-agent",
    "manage-team",
    "change-member-roles",
    "manage-api-keys",
    "publish-to-marketplace",
    "install-from-marketplace",
  ],
  admin: [
    "create-agent",
    "delete-agent",
    "edit-agent",
    "promote-to-production",
    "retire-agent",
    "manage-team",
    "manage-api-keys",
    "publish-to-marketplace",
    "install-from-marketplace",
  ],
  member: [
    "create-agent",
    "edit-agent",
    "publish-to-marketplace",
    "install-from-marketplace",
  ],
  viewer: [],
}

export function usePermission(action: Action): boolean {
  // In v1 we read the role from the mock user.
  // When Auth.js is integrated this will read from useSession().
  const role = mockCurrentUser.role
  return useMemo(() => rolePermissions[role]?.includes(action) ?? false, [role, action])
}

export function useCurrentUser() {
  return mockCurrentUser
}
