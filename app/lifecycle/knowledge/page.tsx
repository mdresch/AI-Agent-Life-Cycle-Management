import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { KnowledgeManagement } from "@/components/lifecycle/knowledge-management"

export default function KnowledgeManagementPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Knowledge Management" text="Manage knowledge sources and documents for AI agents" />
      <KnowledgeManagement />
    </DashboardShell>
  )
}

