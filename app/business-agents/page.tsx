import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { BusinessAgentsDashboard } from "@/components/business-agents/business-agents-dashboard"

export default function BusinessAgentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Business AI Agents"
        text="Specialized AI agents organized by business departments, divisions, and knowledge domains"
      />
      <BusinessAgentsDashboard />
    </DashboardShell>
  )
}

