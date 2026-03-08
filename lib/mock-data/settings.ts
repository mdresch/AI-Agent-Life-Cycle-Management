import type { User, TeamMember, NotificationPreferences, ApiKey } from "@/lib/types"

export const mockCurrentUser: User = {
  id: "user-001",
  displayName: "John Doe",
  email: "demo@example.com",
  role: "owner",
  timezone: "America/New_York",
  createdAt: "2023-04-23T09:00:00Z",
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-001",
    userId: "user-001",
    displayName: "John Doe",
    email: "demo@example.com",
    role: "owner",
    joinedAt: "2023-04-23T09:00:00Z",
    isCurrentUser: true,
  },
  {
    id: "tm-002",
    userId: "user-002",
    displayName: "Jane Smith",
    email: "jane.smith@example.com",
    role: "admin",
    joinedAt: "2023-05-12T10:00:00Z",
    isCurrentUser: false,
  },
  {
    id: "tm-003",
    userId: "user-003",
    displayName: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "member",
    joinedAt: "2023-06-05T11:00:00Z",
    isCurrentUser: false,
  },
  {
    id: "tm-004",
    userId: "user-004",
    displayName: "Alice Brown",
    email: "alice.brown@example.com",
    role: "member",
    joinedAt: "2023-07-20T09:30:00Z",
    isCurrentUser: false,
  },
  {
    id: "tm-005",
    userId: "user-005",
    displayName: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "viewer",
    joinedAt: "2024-01-10T14:00:00Z",
    isCurrentUser: false,
  },
]

export const mockNotificationPreferences: NotificationPreferences = {
  lifecycleTransitions: { email: true, inApp: true },
  agentErrors: { email: true, inApp: true },
  marketplaceUpdates: { email: false, inApp: true },
  teamActivity: { email: true, inApp: false },
}

export const mockApiKeys: ApiKey[] = [
  {
    id: "key-001",
    label: "Production API Key",
    maskedKey: "sk_••••••••••••••••••••••••••••abcd",
    permissions: ["read", "write"],
    createdAt: "2023-04-23T09:00:00Z",
    lastUsedAt: "2025-04-14T18:30:00Z",
  },
  {
    id: "key-002",
    label: "Development API Key",
    maskedKey: "sk_••••••••••••••••••••••••••••efgh",
    permissions: ["read"],
    createdAt: "2023-06-15T10:00:00Z",
    lastUsedAt: "2025-04-10T12:00:00Z",
  },
  {
    id: "key-003",
    label: "CI/CD Pipeline Key",
    maskedKey: "sk_••••••••••••••••••••••••••••ijkl",
    permissions: ["read", "write", "admin"],
    createdAt: "2024-01-08T08:00:00Z",
    lastUsedAt: "2025-04-15T06:00:00Z",
  },
  {
    id: "key-004",
    label: "Legacy Integration Key",
    maskedKey: "sk_••••••••••••••••••••••••••••mnop",
    permissions: ["read"],
    createdAt: "2023-02-10T11:00:00Z",
    lastUsedAt: "2024-08-20T09:00:00Z",
    revokedAt: "2024-10-01T00:00:00Z",
  },
]
