"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronUp,
  Users,
  Megaphone,
  ShoppingCart,
  HeadphonesIcon,
  BarChart4,
  Settings,
  Bot,
} from "lucide-react"
import { AgentCard } from "@/components/business-agents/agent-card"
import { AgentRow } from "@/components/business-agents/agent-row"

interface DepartmentViewProps {
  viewMode: "grid" | "list"
  searchQuery: string
}

export function DepartmentView({ viewMode, searchQuery }: DepartmentViewProps) {
  const [expandedDepartments, setExpandedDepartments] = useState<Record<string, boolean>>({
    hr: true,
    marketing: true,
    sales: true,
    customerService: true,
    finance: true,
    it: true,
  })

  const toggleDepartment = (department: string) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }))
  }

  // Human Resources Agents
  const hrAgents = [
    {
      id: "hr-1",
      name: "Recruitment Assistant",
      description: "Screens resumes, schedules interviews, and assists with the hiring process",
      expertise: ["Talent Acquisition", "Resume Screening", "Interview Scheduling"],
      knowledgeDomains: ["Hiring Policies", "Job Requirements", "Candidate Evaluation"],
      icon: "👥",
    },
    {
      id: "hr-2",
      name: "Employee Onboarding Guide",
      description: "Guides new employees through the onboarding process and answers common questions",
      expertise: ["Onboarding", "Company Policies", "Benefits Explanation"],
      knowledgeDomains: ["HR Policies", "Company Structure", "Employee Benefits"],
      icon: "🚪",
    },
    {
      id: "hr-3",
      name: "HR Policy Advisor",
      description: "Provides guidance on HR policies, procedures, and compliance issues",
      expertise: ["Policy Interpretation", "Compliance", "Employee Relations"],
      knowledgeDomains: ["Labor Laws", "Company Policies", "Regulatory Requirements"],
      icon: "📜",
    },
    {
      id: "hr-4",
      name: "Performance Review Assistant",
      description: "Helps managers prepare for and conduct performance reviews",
      expertise: ["Performance Evaluation", "Feedback", "Goal Setting"],
      knowledgeDomains: ["Performance Metrics", "Review Procedures", "Employee Development"],
      icon: "📊",
    },
  ]

  // Marketing Agents
  const marketingAgents = [
    {
      id: "mkt-1",
      name: "Content Creator",
      description: "Generates marketing content for various channels and campaigns",
      expertise: ["Content Creation", "Copywriting", "Brand Voice"],
      knowledgeDomains: ["Brand Guidelines", "Marketing Strategies", "Content Types"],
      icon: "✍️",
    },
    {
      id: "mkt-2",
      name: "Campaign Analyzer",
      description: "Analyzes marketing campaign performance and provides insights",
      expertise: ["Data Analysis", "Campaign Metrics", "Performance Reporting"],
      knowledgeDomains: ["Marketing Analytics", "KPIs", "Conversion Metrics"],
      icon: "📈",
    },
    {
      id: "mkt-3",
      name: "Social Media Manager",
      description: "Schedules, creates, and monitors social media content",
      expertise: ["Social Media", "Content Planning", "Community Management"],
      knowledgeDomains: ["Platform Algorithms", "Engagement Metrics", "Social Trends"],
      icon: "🌐",
    },
    {
      id: "mkt-4",
      name: "SEO Optimizer",
      description: "Analyzes and suggests improvements for search engine optimization",
      expertise: ["SEO", "Keyword Research", "Content Optimization"],
      knowledgeDomains: ["Search Algorithms", "Ranking Factors", "SEO Best Practices"],
      icon: "🔍",
    },
  ]

  // Sales Agents
  const salesAgents = [
    {
      id: "sales-1",
      name: "Lead Qualifier",
      description: "Evaluates and qualifies sales leads based on criteria and behavior",
      expertise: ["Lead Qualification", "Prospect Analysis", "Sales Funnel Management"],
      knowledgeDomains: ["Customer Profiles", "Qualification Criteria", "Sales Process"],
      icon: "🎯",
    },
    {
      id: "sales-2",
      name: "Sales Proposal Generator",
      description: "Creates customized sales proposals and quotes for prospects",
      expertise: ["Proposal Creation", "Pricing Strategy", "Solution Customization"],
      knowledgeDomains: ["Product Offerings", "Pricing Models", "Competitive Positioning"],
      icon: "📝",
    },
    {
      id: "sales-3",
      name: "Deal Coach",
      description: "Provides guidance to sales reps on deal strategies and negotiation",
      expertise: ["Sales Strategy", "Negotiation", "Deal Management"],
      knowledgeDomains: ["Sales Methodologies", "Competitive Intelligence", "Closing Techniques"],
      icon: "🤝",
    },
    {
      id: "sales-4",
      name: "Sales Forecasting Analyst",
      description: "Analyzes sales data and provides forecasting insights",
      expertise: ["Sales Analytics", "Forecasting", "Trend Analysis"],
      knowledgeDomains: ["Sales Metrics", "Historical Performance", "Market Trends"],
      icon: "📊",
    },
  ]

  // Customer Service Agents
  const customerServiceAgents = [
    {
      id: "cs-1",
      name: "Customer Support Assistant",
      description: "Handles common customer inquiries and support tickets",
      expertise: ["Ticket Resolution", "Customer Communication", "Problem Diagnosis"],
      knowledgeDomains: ["Product Features", "Common Issues", "Support Procedures"],
      icon: "🎧",
    },
    {
      id: "cs-2",
      name: "Order Status Tracker",
      description: "Provides updates on order status and shipping information",
      expertise: ["Order Tracking", "Shipping Logistics", "Status Communication"],
      knowledgeDomains: ["Order Systems", "Shipping Providers", "Delivery Processes"],
      icon: "📦",
    },
    {
      id: "cs-3",
      name: "Returns & Refunds Processor",
      description: "Guides customers through the returns and refunds process",
      expertise: ["Returns Processing", "Refund Policies", "Customer Satisfaction"],
      knowledgeDomains: ["Return Policies", "Refund Procedures", "Inventory Management"],
      icon: "↩️",
    },
    {
      id: "cs-4",
      name: "Customer Feedback Analyzer",
      description: "Analyzes customer feedback and identifies improvement opportunities",
      expertise: ["Sentiment Analysis", "Feedback Categorization", "Trend Identification"],
      knowledgeDomains: ["Customer Experience", "Feedback Metrics", "Service Quality"],
      icon: "📣",
    },
  ]

  // Finance Agents
  const financeAgents = [
    {
      id: "fin-1",
      name: "Expense Analyzer",
      description: "Reviews and categorizes expenses, identifies savings opportunities",
      expertise: ["Expense Analysis", "Cost Categorization", "Budget Optimization"],
      knowledgeDomains: ["Accounting Principles", "Expense Categories", "Budget Management"],
      icon: "💰",
    },
    {
      id: "fin-2",
      name: "Invoice Processor",
      description: "Processes invoices, matches with purchase orders, and prepares for payment",
      expertise: ["Invoice Processing", "Payment Verification", "Vendor Management"],
      knowledgeDomains: ["Accounts Payable", "Payment Terms", "Procurement Processes"],
      icon: "📄",
    },
    {
      id: "fin-3",
      name: "Financial Report Generator",
      description: "Creates financial reports and summaries from accounting data",
      expertise: ["Financial Reporting", "Data Visualization", "Financial Analysis"],
      knowledgeDomains: ["Accounting Standards", "Financial Metrics", "Reporting Requirements"],
      icon: "📊",
    },
    {
      id: "fin-4",
      name: "Budget Planner",
      description: "Assists with budget planning, forecasting, and tracking",
      expertise: ["Budget Planning", "Financial Forecasting", "Variance Analysis"],
      knowledgeDomains: ["Budgeting Methodologies", "Financial Planning", "Resource Allocation"],
      icon: "📈",
    },
  ]

  // IT Agents
  const itAgents = [
    {
      id: "it-1",
      name: "IT Service Desk Assistant",
      description: "Handles common IT support requests and troubleshooting",
      expertise: ["Technical Support", "Troubleshooting", "Issue Resolution"],
      knowledgeDomains: ["IT Systems", "Common Issues", "Resolution Procedures"],
      icon: "🖥️",
    },
    {
      id: "it-2",
      name: "System Monitoring Alert",
      description: "Monitors system performance and alerts on potential issues",
      expertise: ["System Monitoring", "Performance Analysis", "Alert Management"],
      knowledgeDomains: ["IT Infrastructure", "Performance Metrics", "Alert Thresholds"],
      icon: "📟",
    },
    {
      id: "it-3",
      name: "Code Review Assistant",
      description: "Assists developers with code reviews and best practices",
      expertise: ["Code Analysis", "Best Practices", "Quality Assurance"],
      knowledgeDomains: ["Programming Languages", "Coding Standards", "Software Architecture"],
      icon: "👨‍💻",
    },
    {
      id: "it-4",
      name: "IT Asset Manager",
      description: "Tracks and manages IT assets and licenses",
      expertise: ["Asset Management", "License Tracking", "Inventory Control"],
      knowledgeDomains: ["IT Assets", "Licensing Requirements", "Inventory Systems"],
      icon: "🏷️",
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

  const filteredHrAgents = filterAgents(hrAgents)
  const filteredMarketingAgents = filterAgents(marketingAgents)
  const filteredSalesAgents = filterAgents(salesAgents)
  const filteredCustomerServiceAgents = filterAgents(customerServiceAgents)
  const filteredFinanceAgents = filterAgents(financeAgents)
  const filteredItAgents = filterAgents(itAgents)

  // Check if any department has matching agents
  const hasResults =
    filteredHrAgents.length > 0 ||
    filteredMarketingAgents.length > 0 ||
    filteredSalesAgents.length > 0 ||
    filteredCustomerServiceAgents.length > 0 ||
    filteredFinanceAgents.length > 0 ||
    filteredItAgents.length > 0

  return (
    <div className="space-y-6">
      {!hasResults && searchQuery && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bot className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No matching agents found</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            We couldn't find any agents matching "{searchQuery}". Try adjusting your search terms.
          </p>
        </div>
      )}

      {/* Human Resources Department */}
      {filteredHrAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDepartment("hr")}>
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Users className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <CardTitle>Human Resources</CardTitle>
                  <CardDescription>AI agents for HR processes and employee management</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDepartments.hr ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          {expandedDepartments.hr && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredHrAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredHrAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Marketing Department */}
      {filteredMarketingAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDepartment("marketing")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Megaphone className="h-5 w-5 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <CardTitle>Marketing</CardTitle>
                  <CardDescription>AI agents for marketing campaigns and content creation</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDepartments.marketing ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedDepartments.marketing && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredMarketingAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMarketingAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Sales Department */}
      {filteredSalesAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDepartment("sales")}>
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                  <ShoppingCart className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                </div>
                <div>
                  <CardTitle>Sales</CardTitle>
                  <CardDescription>AI agents for sales processes and customer acquisition</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDepartments.sales ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          {expandedDepartments.sales && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredSalesAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredSalesAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Customer Service Department */}
      {filteredCustomerServiceAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDepartment("customerService")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                  <HeadphonesIcon className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <CardTitle>Customer Service</CardTitle>
                  <CardDescription>AI agents for customer support and issue resolution</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDepartments.customerService ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedDepartments.customerService && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredCustomerServiceAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredCustomerServiceAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* Finance Department */}
      {filteredFinanceAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDepartment("finance")}
            >
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-pink-100 p-2 dark:bg-pink-900">
                  <BarChart4 className="h-5 w-5 text-pink-700 dark:text-pink-300" />
                </div>
                <div>
                  <CardTitle>Finance</CardTitle>
                  <CardDescription>AI agents for financial operations and reporting</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDepartments.finance ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          {expandedDepartments.finance && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredFinanceAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFinanceAgents.map((agent) => (
                    <AgentRow key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {/* IT Department */}
      {filteredItAgents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDepartment("it")}>
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
                  <Settings className="h-5 w-5 text-indigo-700 dark:text-indigo-300" />
                </div>
                <div>
                  <CardTitle>IT Department</CardTitle>
                  <CardDescription>AI agents for IT support, development, and infrastructure</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedDepartments.it ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          {expandedDepartments.it && (
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredItAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredItAgents.map((agent) => (
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

