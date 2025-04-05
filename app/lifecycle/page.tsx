import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { LifecycleDashboard } from "@/components/lifecycle/lifecycle-dashboard"

export default function LifecyclePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Agent Lifecycle Management"
        text="Manage the complete lifecycle of your AI agents from creation to retirement"
      />
      <LifecycleDashboard />
    </DashboardShell>
  )
}

