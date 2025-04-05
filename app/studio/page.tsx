import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StudioDashboard } from "@/components/studio/studio-dashboard"

export default function StudioPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Studio"
        text="Create, test, and refine your AI agents in a comprehensive development environment"
      />
      <StudioDashboard />
    </DashboardShell>
  )
}

