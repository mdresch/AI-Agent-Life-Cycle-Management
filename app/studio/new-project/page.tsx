import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ProjectCreationForm } from "@/components/studio/project-creation-form"

export default function NewProjectPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Create New AI Agent Project"
        text="Configure your new AI agent project with all the necessary details"
      />
      <ProjectCreationForm />
    </DashboardShell>
  )
}

