import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TrendsDashboard } from "@/components/trends/trends-dashboard"

export default function TrendsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Trends & Insights"
        text="Stay updated with the latest AI developments and emerging trends"
      />
      <TrendsDashboard />
    </DashboardShell>
  )
}

