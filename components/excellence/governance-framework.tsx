"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Download,
  ExternalLink,
  Users,
  Lock,
  Eye,
  Database,
} from "lucide-react"

export function GovernanceFramework() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Governance Framework</h1>
        <p className="text-muted-foreground">
          Standards and guidelines for responsible AI agent development and deployment
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          This governance framework is designed to help organizations establish responsible AI practices. Always consult
          with legal and compliance teams before implementation.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="policies" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="roles">Roles & Responsibilities</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Governance Policies</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {policies.map((policy, index) => (
              <PolicyCard key={index} {...policy} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Compliance Requirements</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {complianceItems.map((item, index) => (
              <ComplianceCard key={index} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Roles & Responsibilities</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role, index) => (
              <RoleCard key={index} {...role} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Governance Templates</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template, index) => (
              <TemplateCard key={index} {...template} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PolicyCardProps {
  title: string
  description: string
  status: "Required" | "Recommended" | "Optional"
  icon: React.ReactNode
}

function PolicyCard({ title, description, status, icon }: PolicyCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{title}</CardTitle>
            <Badge variant={status === "Required" ? "default" : status === "Recommended" ? "secondary" : "outline"}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            View Policy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface ComplianceCardProps {
  title: string
  description: string
  regulation: string
  icon: React.ReactNode
}

function ComplianceCard({ title, description, regulation, icon }: ComplianceCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">{regulation}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface RoleCardProps {
  title: string
  description: string
  responsibilities: string[]
  icon: React.ReactNode
}

function RoleCard({ title, description, responsibilities, icon }: RoleCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <h4 className="text-sm font-medium mb-1">Key Responsibilities:</h4>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          {responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

interface TemplateCardProps {
  title: string
  description: string
  format: string
  icon: React.ReactNode
}

function TemplateCard({ title, description, format, icon }: TemplateCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">{format}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const policies = [
  {
    title: "AI Agent Development Policy",
    description: "Guidelines for the development and testing of AI agents within the organization",
    status: "Required" as const,
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Ethics Policy",
    description: "Ethical principles and considerations for AI agent development and deployment",
    status: "Required" as const,
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Risk Management Policy",
    description: "Framework for identifying, assessing, and mitigating risks associated with AI agents",
    status: "Required" as const,
    icon: <AlertTriangle className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Quality Assurance Policy",
    description: "Standards and procedures for ensuring the quality and reliability of AI agents",
    status: "Recommended" as const,
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
]

const complianceItems = [
  {
    title: "Data Privacy Compliance",
    description: "Ensure AI agents comply with data privacy regulations such as GDPR, CCPA, and HIPAA",
    regulation: "GDPR, CCPA, HIPAA",
    icon: <Lock className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Transparency Requirements",
    description: "Comply with regulations requiring transparency in AI decision-making processes",
    regulation: "EU AI Act, NIST AI Framework",
    icon: <Eye className="h-6 w-6 text-primary" />,
  },
  {
    title: "Bias and Fairness Standards",
    description: "Adhere to standards for preventing bias and ensuring fairness in AI systems",
    regulation: "ISO/IEC 24027, IEEE 7003",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Data Governance Requirements",
    description: "Comply with regulations governing data usage, storage, and management for AI systems",
    regulation: "ISO/IEC 38505, NIST Privacy Framework",
    icon: <Database className="h-6 w-6 text-primary" />,
  },
]

const roles = [
  {
    title: "AI Governance Committee",
    description: "Cross-functional team responsible for overseeing AI governance across the organization",
    responsibilities: [
      "Develop and maintain AI governance policies",
      "Review and approve high-risk AI projects",
      "Monitor compliance with AI governance framework",
      "Report on AI governance metrics to executive leadership",
    ],
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Ethics Officer",
    description: "Responsible for ensuring ethical considerations are integrated into AI development",
    responsibilities: [
      "Review AI projects for ethical implications",
      "Develop and maintain AI ethics guidelines",
      "Provide ethics training to AI development teams",
      "Investigate ethical concerns related to AI agents",
    ],
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Risk Manager",
    description: "Responsible for identifying and mitigating risks associated with AI agents",
    responsibilities: [
      "Conduct risk assessments for AI projects",
      "Develop risk mitigation strategies",
      "Monitor AI systems for emerging risks",
      "Report on risk metrics to AI Governance Committee",
    ],
    icon: <AlertTriangle className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Quality Assurance Lead",
    description: "Responsible for ensuring the quality and reliability of AI agents",
    responsibilities: [
      "Develop and maintain AI testing frameworks",
      "Conduct quality assurance testing for AI agents",
      "Establish performance benchmarks for AI systems",
      "Monitor AI agent performance in production",
    ],
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
]

const templates = [
  {
    title: "AI Risk Assessment Template",
    description: "Template for conducting risk assessments for AI agent projects",
    format: "Excel Spreadsheet",
    icon: <AlertTriangle className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Ethics Review Checklist",
    description: "Checklist for evaluating ethical considerations in AI agent development",
    format: "PDF Document",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Governance Policy Template",
    description: "Template for creating organizational AI governance policies",
    format: "Word Document",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Incident Response Plan",
    description: "Template for creating an incident response plan for AI-related incidents",
    format: "PDF Document",
    icon: <AlertTriangle className="h-6 w-6 text-primary" />,
  },
]

