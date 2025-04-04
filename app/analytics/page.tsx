import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics" text="Monitor your AI agents' performance and usage metrics" />
      <AnalyticsDashboard />
    </DashboardShell>
  )
}

