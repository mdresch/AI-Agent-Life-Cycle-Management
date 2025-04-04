import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AgentCreationForm } from "@/components/agents/agent-creation-form"

export default function NewAgentPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Agent" text="Configure and deploy a new AI agent" />
      <AgentCreationForm />
    </DashboardShell>
  )
}

