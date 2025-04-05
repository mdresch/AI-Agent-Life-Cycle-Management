import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UserFeedbackSystem } from "@/components/user-dashboard/user-feedback-system"

export default function FeedbackPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Feedback Center"
        text="Submit feedback, report issues, and track improvement requests"
      />
      <UserFeedbackSystem />
    </DashboardShell>
  )
}

