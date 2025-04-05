import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AgentHealthMonitoring } from "@/components/lifecycle/agent-health-monitoring"

export default function HealthMonitoringPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Agent Health Monitoring"
        text="Monitor the health and performance of your AI agents in real-time"
      />
      <AgentHealthMonitoring />
    </DashboardShell>
  )
}

