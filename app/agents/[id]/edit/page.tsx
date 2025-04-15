import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AgentEditForm } from "@/components/agents/agent-edit-form"
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
      capabilities: ["Answer FAQs", "Create support tickets", "Escalate issues"],
      integrations: ["Zendesk", "Intercom", "Slack"],
      trainingData: ["Customer support transcripts", "Product documentation", "FAQ database"],
    },
    {
      id: "2",
      name: "Data Analysis Agent",
      description: "Processes and analyzes data sets, generates reports",
      type: "Analytics",
      status: "active",
      capabilities: ["Data processing", "Statistical analysis", "Report generation"],
      integrations: ["Tableau", "Power BI", "Google Analytics"],
      trainingData: ["Historical reports", "Data schemas", "Analysis methodologies"],
    },
    {
      id: "3",
      name: "Content Generator",
      description: "Creates blog posts, social media content, and marketing copy",
      type: "Creative",
      status: "active",
      capabilities: ["Blog writing", "Social media posts", "Email campaigns"],
      integrations: ["WordPress", "Buffer", "Mailchimp"],
      trainingData: ["Marketing guidelines", "Brand voice documents", "Previous campaigns"],
    },
    {
      id: "4",
      name: "Scheduling Assistant",
      description: "Manages calendars and schedules appointments",
      type: "Productivity",
      status: "inactive",
      capabilities: ["Calendar management", "Meeting scheduling", "Reminder setting"],
      integrations: ["Google Calendar", "Outlook", "Calendly"],
      trainingData: ["Scheduling preferences", "Meeting templates", "Calendar data"],
    },
    {
      id: "5",
      name: "Research Agent",
      description: "Conducts market research and competitive analysis",
      type: "Research",
      status: "active",
      capabilities: ["Market analysis", "Competitor tracking", "Trend identification"],
      integrations: ["SEMrush", "Ahrefs", "Google Trends"],
      trainingData: ["Industry reports", "Competitor websites", "Market data"],
    },
    {
      id: "6",
      name: "Email Assistant",
      description: "Drafts and sends emails, manages follow-ups",
      type: "Communication",
      status: "active",
      capabilities: ["Email drafting", "Follow-up management", "Template creation"],
      integrations: ["Gmail", "Outlook", "HubSpot"],
      trainingData: ["Email templates", "Communication guidelines", "Response patterns"],
    },
  ]

  const agent = agents.find((a) => a.id === id)
  return agent
}

export default function EditAgentPage({ params }: { params: { id: string } }) {
  const agent = getAgent(params.id)

  if (!agent) {
    notFound()
  }

  return (
    <DashboardShell>
      <DevModeBanner />
      <DashboardHeader heading={`Edit ${agent.name}`} text="Modify your agent's settings and capabilities" />
      <AgentEditForm agent={agent} />
    </DashboardShell>
  )
}

