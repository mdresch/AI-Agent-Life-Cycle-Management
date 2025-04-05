import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AgentEvaluation } from "@/components/lifecycle/agent-evaluation"

export default function AgentEvaluationPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Agent Evaluation" text="Comprehensive evaluation and testing of AI agents" />
      <AgentEvaluation />
    </DashboardShell>
  )
}

