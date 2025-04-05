"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, BookOpen, Database, FileText, Users, ShoppingBag, Code } from "lucide-react"
import { AgentCard } from "@/components/business-agents/agent-card"
import { AgentRow } from "@/components/business-agents/agent-row"

interface ExpertiseViewProps {
  viewMode: "grid" | "list"
  searchQuery: string
}

export function ExpertiseView({ viewMode, searchQuery }: ExpertiseViewProps) {
  const [expandedExpertise, setExpandedExpertise] = useState<Record<string, boolean>>({
    productKnowledge: true,
    customerData: true,
    companyPolicies: true,
    technicalSystems: true,
    marketIntelligence: true,
    developmentProcesses: true,
  })

  const toggleExpertise = (expertise: string) => {
    setExpandedExpertise((prev) => ({
      ...prev,
      [expertise]: !prev[expertise],
    }))
  }

  // Product Knowledge Agents
  const productKnowledgeAgents = [
    {
      id: "pk-1",
      name: "Product Catalog Navigator",
      description: "Helps users find and understand product details and specifications",
      expertise: ["Product Specifications", "Feature Comparison", "Product Catalog"],
      knowledgeDomains: ["Product Database", "Technical Specifications", "Product Categories"],
      icon: "📋",
      department: "Sales",
    },
    {
      id: "pk-2",
      name: "Product Training Assistant",
      description: "Provides training materials and guidance on product features",
      expertise: ["Product Training", "Feature Education", "Use Cases"],
      knowledgeDomains: ["Product Features", "Training Materials", "Learning Paths"],
      icon: "🎓",
      department: "Marketing",
    },
    {
      id: "pk-3",
      name: "Product Roadmap Tracker",
      description: "Tracks and communicates product development roadmap and timelines",
      expertise: ["Product Roadmap", "Release Planning", "Feature Timelines"],
      knowledgeDomains: ["Development Cycles", "Feature Prioritization", "Release Management"],
      icon: "🗺️",
      department: "Product Management",
    },
    {
      id: "pk-4",
      name: "Compatibility Advisor",
      description: "Advises on product compatibility and integration requirements",
      expertise: ["Compatibility Analysis", "Integration Requirements", "System Dependencies"],
      knowledgeDomains: ["Technical Requirements", "Integration Points", "System Architecture"],
      icon: "🔄",
      department: "IT",
    },
  ]

  // Customer Data Agents
  const customerDataAgents = [
    {
      id: "cd-1",
      name: "Customer Profile Analyzer",
      description: "Analyzes customer profiles and behavior patterns",
      expertise: ["Customer Segmentation", "Behavior Analysis", "Profile Management"],
      knowledgeDomains: ["Customer Demographics", "Purchase History", "Interaction Patterns"],
      icon: "👤",
      department: "Marketing",
    },
    {
      id: "cd-2",
      name: "Customer Feedback Processor",
      description: "Processes and categorizes customer feedback and reviews",
      expertise: ["Sentiment Analysis", "Feedback Categorization", "Review Processing"],
      knowledgeDomains: ["Customer Opinions", "Product Reviews", "Service Feedback"],
      icon: "💬",
      department: "Customer Service",
    },
    {
      id: "cd-3",
      name: "Customer Journey Mapper",
      description: "Maps and analyzes customer journeys across touchpoints",
      expertise: ["Journey Mapping", "Touchpoint Analysis", "Experience Design"],
      knowledgeDomains: ["Customer Touchpoints", "Interaction History", "Experience Metrics"],
      icon: "🗺️",
      department: "Marketing",
    },
    {
      id: "cd-4",
      name: "Customer Retention Predictor",
      description: "Predicts customer churn risk and suggests retention strategies",
      expertise: ["Churn Prediction", "Retention Strategies", "Customer Loyalty"],
      knowledgeDomains: ["Customer Lifetime Value", "Churn Indicators", "Retention Programs"],
      icon: "🔮",
      department: "Sales",
    },
  ]

  // Company Policies Agents
  const companyPoliciesAgents = [
    {
      id: "cp-1",
      name: "HR Policy Advisor",
      description: "Provides guidance on HR policies and procedures",
      expertise: ["Policy Interpretation", "Procedure Guidance", "Compliance Advice"],
      knowledgeDomains: ["HR Policies", "Employee Handbook", "Workplace Regulations"],
      icon: "📚",
      department: "Human Resources",
    },
    {
      id: "cp-2",
      name: "Security Policy Enforcer",
      description: "Monitors and enforces security policies and protocols",
      expertise: ["Security Compliance", "Policy Enforcement", "Risk Management"],
      knowledgeDomains: ["Security Protocols", "Data Protection", "Access Controls"],
      icon: "🔒",
      department: "IT",
    },
    {
      id: "cp-3",
      name: "Travel & Expense Guide",
      description: "Guides employees through travel and expense policies",
      expertise: ["Expense Policies", "Travel Guidelines", "Reimbursement Procedures"],
      knowledgeDomains: ["Travel Regulations", "Expense Categories", "Approval Workflows"],
      icon: "✈️",
      department: "Finance",
    },
    {
      id: "cp-4",
      name: "Compliance Monitor",
      description: "Monitors activities for compliance with company policies",
      expertise: ["Compliance Monitoring", "Policy Adherence", "Violation Detection"],
      knowledgeDomains: ["Corporate Policies", "Regulatory Requirements", "Compliance Metrics"],
      icon: "⚖️",
      department: "Legal",
    },
  ]

  // Technical Systems Agents
  const technicalSystemsAgents = [
    {
      id: "ts-1",
      name: "ERP System Assistant",
      description: "Helps users navigate and use the ERP system effectively",
      expertise: ["ERP Navigation", "Transaction Processing", "Report Generation"],
      knowledgeDomains: ["ERP Modules", "Business Processes", "System Functions"],
      icon: "🖥️",
      department: "IT",
    },
    {
      id: "ts-2",
      name: "CRM Data Manager",
      description: "Manages and optimizes customer data in the CRM system",
      expertise: ["CRM Data Management", "Record Optimization", "Data Quality"],
      knowledgeDomains: ["Customer Records", "CRM Functionality", "Data Standards"],
      icon: "📊",
      department: "Sales",
    },
    {
      id: "ts-3",
      name: "Network Diagnostics Expert",
      description: "Diagnoses and troubleshoots network issues",
      expertise: ["Network Diagnostics", "Troubleshooting", "Performance Optimization"],
      knowledgeDomains: ["Network Architecture", "Connectivity Issues", "Performance Metrics"],
      icon: "🌐",
      department: "IT",
    },
    {
      id: "ts-4",
      name: "Cloud Services Manager",
      description: "Manages and optimizes cloud service usage and configuration",
      expertise: ["Cloud Management", "Service Configuration", "Resource Optimization"],
      knowledgeDomains: ["Cloud Platforms", "Service Models", "Resource Allocation"],
      icon: "☁️",
      department: "IT",
    },
  ]

  // Market Intelligence Agents
  const marketIntelligenceAgents = [
    {
      id: "mi-1",
      name: "Competitor Analyst",
      description: "Analyzes competitor activities, products, and strategies",
      expertise: ["Competitive Analysis", "Market Positioning", "Strategy Comparison"],
      knowledgeDomains: ["Competitor Products", "Market Strategies", "Competitive Landscape"],
      icon: "🔍",
      department: "Marketing",
    },
    {
      id: "mi-2",
      name: "Market Trend Spotter",
      description: "Identifies and analyzes emerging market trends",
      expertise: ["Trend Analysis", "Market Monitoring", "Pattern Recognition"],
      knowledgeDomains: ["Industry Trends", "Consumer Behavior", "Market Dynamics"],
      icon: "📈",
      department: "Marketing",
    },
    {
      id: "mi-3",
      name: "Industry News Curator",
      description: "Curates and summarizes relevant industry news and developments",
      expertise: ["News Curation", "Content Summarization", "Relevance Assessment"],
      knowledgeDomains: ["Industry Publications", "News Sources", "Market Events"],
      icon: "📰",
      department: "Marketing",
    },
    {
      id: "mi-4",
      name: "Pricing Strategy Advisor",
      description: "Analyzes market pricing and recommends pricing strategies",
      expertise: ["Pricing Analysis", "Competitive Pricing", "Value Positioning"],
      knowledgeDomains: ["Market Prices", "Pricing Models", "Value Perception"],
      icon: "💰",
      department: "Sales",
    },
  ]

  // Development Processes Agents
  const developmentProcessesAgents = [
    {
      id: "dp-1",
      name: "Agile Coach",
      description: "Guides teams in implementing agile methodologies and practices",
      expertise: ["Agile Methodologies", "Scrum Practices", "Team Facilitation"],
      knowledgeDomains: ["Agile Frameworks", "Development Processes", "Team Dynamics"],
      icon: "🏃",
      department: "IT",
    },
    {
      id: "dp-2",
      name: "Code Quality Guardian",
      description: "Monitors and enforces code quality standards",
      expertise: ["Code Quality", "Standards Enforcement", "Best Practices"],
      knowledgeDomains: ["Coding Standards", "Quality Metrics", "Development Best Practices"],
      icon: "✅",
      department: "IT",
    },
    {
      id: "dp-3",
      name: "DevOps Orchestrator",
      description: "Manages and optimizes CI/CD pipelines and deployment processes",
      expertise: ["CI/CD Pipelines", "Deployment Automation", "Infrastructure as Code"],
      knowledgeDomains: ["DevOps Practices", "Deployment Strategies", "Automation Tools"],
      icon: "🔄",
      department: "IT",
    },
    {
      id: "dp-4",
      name: "Test Automation Engineer",
      description: "Designs and implements automated testing frameworks and processes",
      expertise: ["Test Automation", "QA Processes", "Testing Frameworks"],
      knowledgeDomains: ["Testing Methodologies", "Automation Tools", "Quality Assurance"],
      icon: "🧪",
      department: "IT",
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
        agent.knowledgeDomains.some((domain: string) => domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
        agent.department.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const filteredProductKnowledgeAgents = filterAgents(productKnowledgeAgents)
  const filteredCustomerDataAgents = filterAgents(customerDataAgents)
  const filteredCompanyPoliciesAgents = filterAgents(companyPoliciesAgents)
  const filteredTechnicalSystemsAgents = filterAgents(technicalSystemsAgents)
  const filteredMarketIntelligenceAgents = filterAgents(marketIntelligenceAgents)
  const filteredDevelopmentProcessesAgents = filterAgents(developmentProcessesAgents)

  // Check if any expertise area has matching agents
  const hasResults =
    filteredProductKnowledgeAgents.length > 0 ||
    filteredCustomerDataAgents.length > 0 ||
    filteredCompanyPoliciesAgents.length > 0 ||
    filteredTechnicalSystemsAgents.length > 0 ||
    filteredMarketIntelligenceAgents.length > 0 ||
    filteredDevelopmentProcessesAgents.length > 0

  return (
    <div className="space-y-6">
      {!hasResults && searchQuery && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No matching agents found</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            We couldn't find any agents matching "{searchQuery}" in our expertise areas. Try adjusting your search
            terms.
          </p>
        </div>
      )}

      {/* Product Knowledge Expertise */}
      {filteredProductKnowledgeAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpertise("productKnowledge")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <ShoppingBag className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <CardTitle>Product Knowledge</CardTitle>
                  <CardDescription>AI agents specialized in product information and features</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedExpertise.productKnowledge ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedExpertise.productKnowledge && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProductKnowledgeAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProductKnowledgeAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Customer Data Expertise */}
      {filteredCustomerDataAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpertise("customerData")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Users className="h-5 w-5 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <CardTitle>Customer Data</CardTitle>
                  <CardDescription>AI agents specialized in customer information and insights</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedExpertise.customerData ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedExpertise.customerData && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredCustomerDataAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCustomerDataAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Company Policies Expertise */}
      {filteredCompanyPoliciesAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpertise("companyPolicies")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                  <FileText className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                </div>
                <div>
                  <CardTitle>Company Policies</CardTitle>
                  <CardDescription>AI agents specialized in company policies and procedures</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedExpertise.companyPolicies ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedExpertise.companyPolicies && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredCompanyPoliciesAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCompanyPoliciesAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Technical Systems Expertise */}
      {filteredTechnicalSystemsAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpertise("technicalSystems")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                  <Database className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <CardTitle>Technical Systems</CardTitle>
                  <CardDescription>AI agents specialized in technical systems and infrastructure</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedExpertise.technicalSystems ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedExpertise.technicalSystems && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredTechnicalSystemsAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTechnicalSystemsAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Market Intelligence Expertise */}
      {filteredMarketIntelligenceAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpertise("marketIntelligence")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-pink-100 p-2 dark:bg-pink-900">
                  <BookOpen className="h-5 w-5 text-pink-700 dark:text-pink-300" />
                </div>
                <div>
                  <CardTitle>Market Intelligence</CardTitle>
                  <CardDescription>AI agents specialized in market trends and competitive intelligence</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedExpertise.marketIntelligence ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedExpertise.marketIntelligence && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredMarketIntelligenceAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMarketIntelligenceAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Development Processes Expertise */}
      {filteredDevelopmentProcessesAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpertise("developmentProcesses")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
                  <Code className="h-5 w-5 text-indigo-700 dark:text-indigo-300" />
                </div>
                <div>
                  <CardTitle>Development Processes</CardTitle>
                  <CardDescription>
                    AI agents specialized in software development methodologies and practices
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedExpertise.developmentProcesses ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedExpertise.developmentProcesses && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredDevelopmentProcessesAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} showDepartment />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredDevelopmentProcessesAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} showDepartment />
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

