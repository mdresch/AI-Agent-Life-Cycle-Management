import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CenterOfExcellenceDashboard } from "@/components/center-of-excellence/center-of-excellence-dashboard"

export default function CenterOfExcellencePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Center of Excellence"
        text="Centralized governance, best practices, and resources for AI agent development"
      />
      <CenterOfExcellenceDashboard />
    </DashboardShell>
  )
}

