import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MarketplaceDashboard } from "@/components/marketplace/marketplace-dashboard"

export default function MarketplacePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Agent Marketplace"
        text="Discover, share, and deploy pre-built AI agents for various use cases"
      />
      <MarketplaceDashboard />
    </DashboardShell>
  )
}

