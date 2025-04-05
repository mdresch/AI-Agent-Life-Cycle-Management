import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { PersonalizedDashboard } from "@/components/user-dashboard/personalized-dashboard"

export default function MyDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Dashboard" text="Your personalized view of AI agents and activities" />
      <PersonalizedDashboard />
    </DashboardShell>
  )
}

