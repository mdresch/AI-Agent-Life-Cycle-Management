import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AgentAnalytics } from "@/components/agents/agent-analytics"
import { DevModeBanner } from "@/components/dev-mode-banner"

// This would normally fetch from an API
const getAgent = (id: string) => {
  const agents = [
    {
      id: "1",
      name: "Customer Support Agent",
      description: "Handles customer inquiries and support tickets",
      type: "Support",
      status: "active",
    },
    {
      id: "2",
      name: "Data Analysis Agent",
      description: "Processes and analyzes data sets, generates reports",
      type: "Analytics",
      status: "active",
    },
    {
      id: "3",
      name: "Content Generator",
      description: "Creates blog posts, social media content, and marketing copy",
      type: "Creative",
      status: "active",
    },
    {
      id: "4",
      name: "Scheduling Assistant",
      description: "Manages calendars and schedules appointments",
      type: "Productivity",
      status: "inactive",
    },
    {
      id: "5",
      name: "Research Agent",
      description: "Conducts market research and competitive analysis",
      type: "Research",
      status: "active",
    },
    {
      id: "6",
      name: "Email Assistant",
      description: "Drafts and sends emails, manages follow-ups",
      type: "Communication",
      status: "active",
    },
  ]

  const agent = agents.find((a) => a.id === id)
  return agent
}

export default function AgentAnalyticsPage({ params }: { params: { id: string } }) {
  const agent = getAgent(params.id)

  if (!agent) {
    notFound()
  }

  return (
    <DashboardShell>
      <DevModeBanner />
      <DashboardHeader heading={`${agent.name} Analytics`} text="Performance metrics and usage statistics" />
      <AgentAnalytics agentId={agent.id} agentName={agent.name} />
    </DashboardShell>
  )
}

