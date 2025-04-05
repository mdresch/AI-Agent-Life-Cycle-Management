"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Briefcase, Server, HeadphonesIcon, Code } from "lucide-react"
import { AgentCard } from "@/components/business-agents/agent-card"
import { AgentRow } from "@/components/business-agents/agent-row"

interface DivisionViewProps {
  viewMode: "grid" | "list"
  searchQuery: string
}

export function DivisionView({ viewMode, searchQuery }: DivisionViewProps) {
  const [expandedDivisions, setExpandedDivisions] = useState<Record<string, boolean>>({
    generalManagement: true,
    itInfrastructure: true,
    itServiceDesk: true,
    itDevelopment: true,
  })

  const toggleDivision = (division: string) => {
    setExpandedDivisions((prev) => ({
      ...prev,
      [division]: !prev[division],
    }))
  }

  // General Management Agents
  const generalManagementAgents = [
    {
      id: "gm-1",
      name: "Executive Dashboard",
      description: "Provides real-time business metrics and KPIs for executive decision-making",
      expertise: ["Business Intelligence", "KPI Monitoring", "Executive Reporting"],
      knowledgeDomains: ["Business Metrics", "Performance Indicators", "Strategic Planning"],
      icon: "📊",
    },
    {
      id: "gm-2",
      name: "Strategic Planning Assistant",
      description: "Assists with strategic planning, goal setting, and initiative tracking",
      expertise: ["Strategic Planning", "Goal Management", "Initiative Tracking"],
      knowledgeDomains: ["Business Strategy", "Organizational Goals", "Performance Management"],
      icon: "🎯",
    },
    {
      id: "gm-3",
      name: "Board Meeting Preparer",
      description: "Helps prepare materials and presentations for board meetings",
      expertise: ["Meeting Preparation", "Presentation Creation", "Board Communication"],
      knowledgeDomains: ["Corporate Governance", "Board Relations", "Executive Communication"],
      icon: "🗣️",
    },
    {
      id: "gm-4",
      name: "Competitive Intelligence Analyst",
      description: "Gathers and analyzes information about market and competitors",
      expertise: ["Market Analysis", "Competitor Research", "Industry Trends"],
      knowledgeDomains: ["Competitive Landscape", "Market Dynamics", "Industry Benchmarks"],
      icon: "🔍",
    },
  ]

  // IT Infrastructure Agents
  const itInfrastructureAgents = [
    {
      id: "iti-1",
      name: "Network Monitor",
      description: "Monitors network performance and alerts on issues",
      expertise: ["Network Monitoring", "Performance Analysis", "Issue Detection"],
      knowledgeDomains: ["Network Architecture", "Performance Metrics", "Troubleshooting Protocols"],
      icon: "🌐",
    },
    {
      id: "iti-2",
      name: "Server Capacity Planner",
      description: "Analyzes server usage and helps plan for future capacity needs",
      expertise: ["Capacity Planning", "Resource Utilization", "Growth Forecasting"],
      knowledgeDomains: ["Server Infrastructure", "Resource Management", "Scaling Strategies"],
      icon: "🖥️",
    },
    {
      id: "iti-3",
      name: "Security Compliance Checker",
      description: "Verifies systems against security policies and compliance requirements",
      expertise: ["Security Compliance", "Policy Verification", "Vulnerability Assessment"],
      knowledgeDomains: ["Security Standards", "Compliance Frameworks", "Security Best Practices"],
      icon: "🔒",
    },
    {
      id: "iti-4",
      name: "Cloud Resource Optimizer",
      description: "Identifies optimization opportunities for cloud resources",
      expertise: ["Cloud Optimization", "Cost Management", "Resource Efficiency"],
      knowledgeDomains: ["Cloud Platforms", "Resource Pricing", "Optimization Techniques"],
      icon: "☁️",
    },
  ]

  // IT Service Desk Agents
  const itServiceDeskAgents = [
    {
      id: "itsd-1",
      name: "Ticket Triage Assistant",
      description: "Categorizes and prioritizes incoming support tickets",
      expertise: ["Ticket Triage", "Issue Categorization", "Priority Assignment"],
      knowledgeDomains: ["Support Processes", "Issue Types", "Service Level Agreements"],
      icon: "🎟️",
    },
    {
      id: "itsd-2",
      name: "Password Reset Helper",
      description: "Guides users through password reset procedures",
      expertise: ["Password Management", "User Authentication", "Security Protocols"],
      knowledgeDomains: ["Identity Systems", "Authentication Processes", "Security Policies"],
      icon: "🔑",
    },
    {
      id: "itsd-3",
      name: "Software Installation Guide",
      description: "Provides step-by-step guidance for software installation",
      expertise: ["Software Installation", "Troubleshooting", "User Guidance"],
      knowledgeDomains: ["Software Packages", "Installation Procedures", "System Requirements"],
      icon: "💿",
    },
    {
      id: "itsd-4",
      name: "Hardware Troubleshooter",
      description: "Helps diagnose and resolve hardware-related issues",
      expertise: ["Hardware Diagnostics", "Troubleshooting", "Issue Resolution"],
      knowledgeDomains: ["Computer Hardware", "Peripheral Devices", "Diagnostic Procedures"],
      icon: "🔧",
    },
  ]

  // IT Development Agents
  const itDevelopmentAgents = [
    {
      id: "itdev-1",
      name: "Code Review Assistant",
      description: "Reviews code for quality, standards compliance, and potential issues",
      expertise: ["Code Analysis", "Standards Compliance", "Issue Detection"],
      knowledgeDomains: ["Programming Languages", "Coding Standards", "Best Practices"],
      icon: "👨‍💻",
    },
    {
      id: "itdev-2",
      name: "Documentation Generator",
      description: "Creates and maintains technical documentation for software projects",
      expertise: ["Technical Writing", "Documentation Standards", "Information Organization"],
      knowledgeDomains: ["Software Architecture", "API Documentation", "User Guides"],
      icon: "📚",
    },
    {
      id: "itdev-3",
      name: "Test Case Generator",
      description: "Creates comprehensive test cases based on requirements",
      expertise: ["Test Planning", "Test Case Design", "Coverage Analysis"],
      knowledgeDomains: ["Testing Methodologies", "Quality Assurance", "Test Coverage"],
      icon: "🧪",
    },
    {
      id: "itdev-4",
      name: "Sprint Planning Assistant",
      description: "Helps plan and organize development sprints and tasks",
      expertise: ["Agile Planning", "Task Estimation", "Sprint Organization"],
      knowledgeDomains: ["Agile Methodologies", "Project Management", "Development Processes"],
      icon: "🏃",
    },
  ]

  // Filter agents based on search query
  const filterAgents = (agents: any[]) => {
    if (!searchQuery) return agents

    return agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.expertise.some((exp: string) => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
        agent.knowledgeDomains.some((domain: string) => domain.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  const filteredGeneralManagementAgents = filterAgents(generalManagementAgents)
  const filteredItInfrastructureAgents = filterAgents(itInfrastructureAgents)
  const filteredItServiceDeskAgents = filterAgents(itServiceDeskAgents)
  const filteredItDevelopmentAgents = filterAgents(itDevelopmentAgents)

  // Check if any division has matching agents
  const hasResults =
    filteredGeneralManagementAgents.length > 0 ||
    filteredItInfrastructureAgents.length > 0 ||
    filteredItServiceDeskAgents.length > 0 ||
    filteredItDevelopmentAgents.length > 0

  return (
    <div className="space-y-6">
      {!hasResults && searchQuery && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <ChevronUp className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No matching agents found</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            We couldn't find any agents matching "{searchQuery}". Try adjusting your search terms.
          </p>
        </div>
      )}

      {/* General Management Division */}
      {filteredGeneralManagementAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDivision("generalManagement")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Briefcase className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <CardTitle>General Management</CardTitle>
                  <CardDescription>AI agents for executive and management functions</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDivisions.generalManagement ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedDivisions.generalManagement && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredGeneralManagementAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredGeneralManagementAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* IT Infrastructure Division */}
      {filteredItInfrastructureAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDivision("itInfrastructure")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Server className="h-5 w-5 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <CardTitle>IT Infrastructure</CardTitle>
                  <CardDescription>AI agents for managing IT systems and infrastructure</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDivisions.itInfrastructure ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedDivisions.itInfrastructure && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredItInfrastructureAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredItInfrastructureAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* IT Service Desk Division */}
      {filteredItServiceDeskAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDivision("itServiceDesk")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                  <HeadphonesIcon className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                </div>
                <div>
                  <CardTitle>IT Service Desk</CardTitle>
                  <CardDescription>AI agents for IT support and service management</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDivisions.itServiceDesk ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedDivisions.itServiceDesk && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredItServiceDeskAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredItServiceDeskAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* IT Development Division */}
      {filteredItDevelopmentAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDivision("itDevelopment")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                  <Code className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <CardTitle>IT Development</CardTitle>
                  <CardDescription>AI agents for software development and testing</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDivisions.itDevelopment ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedDivisions.itDevelopment && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredItDevelopmentAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredItDevelopmentAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}
    </div>
  )
}

