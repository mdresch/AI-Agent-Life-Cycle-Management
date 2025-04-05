import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AgentDetail } from "@/components/agents/agent-detail"
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
      lastUpdated: "2 hours ago",
      createdAt: "2023-04-15",
      version: "1.2.0",
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
      lastUpdated: "1 day ago",
      createdAt: "2023-03-10",
      version: "2.1.0",
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
      lastUpdated: "3 days ago",
      createdAt: "2023-02-22",
      version: "1.5.0",
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
      lastUpdated: "1 week ago",
      createdAt: "2023-01-05",
      version: "1.0.2",
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
      lastUpdated: "5 days ago",
      createdAt: "2023-05-01",
      version: "1.3.1",
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
      lastUpdated: "2 days ago",
      createdAt: "2023-04-02",
      version: "1.1.0",
      capabilities: ["Email drafting", "Follow-up management", "Template creation"],
      integrations: ["Gmail", "Outlook", "HubSpot"],
      trainingData: ["Email templates", "Communication guidelines", "Response patterns"],
    },
  ]

  const agent = agents.find((a) => a.id === id)
  return agent
}

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = getAgent(params.id)

  if (!agent) {
    notFound()
  }

  return (
    <DashboardShell>
      <DevModeBanner />
      <DashboardHeader heading={agent.name} text={`Agent ID: ${agent.id}`} />
      <AgentDetail agent={agent} />
    </DashboardShell>
  )
}

