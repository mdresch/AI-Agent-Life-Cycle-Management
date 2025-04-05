import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TrendsConfigTabs } from "@/components/trends/config/trends-config-tabs"
import { DevModeBanner } from "@/components/dev-mode-banner"

export default function TrendsConfigPage() {
  return (
    <DashboardShell>
      <DevModeBanner />
      <DashboardHeader
        heading="AI Trends & Insights Configuration"
        text="Manage content and data sources for the AI Trends & Insights dashboard"
      />
      <TrendsConfigTabs />
    </DashboardShell>
  )
}

