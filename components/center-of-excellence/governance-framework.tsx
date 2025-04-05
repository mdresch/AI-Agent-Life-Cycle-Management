"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, Shield, Users, CheckCircle, AlertTriangle, Info } from "lucide-react"

export function GovernanceFramework() {
  const [activeTab, setActiveTab] = useState("policies")

  const policies = [
    {
      id: 1,
      name: "AI Ethics Policy",
      description: "Guidelines for ethical AI development and deployment",
      status: "active",
      lastUpdated: "2 weeks ago",
      owner: "Ethics Committee",
      complianceLevel: 92,
    },
    {
      id: 2,
      name: "Data Governance Policy",
      description: "Standards for data usage, privacy, and security in AI systems",
      status: "active",
      lastUpdated: "1 month ago",
      owner: "Data Governance Team",
      complianceLevel: 88,
    },
    {
      id: 3,
      name: "Model Risk Management",
      description: "Framework for identifying and mitigating AI model risks",
      status: "active",
      lastUpdated: "3 weeks ago",
      owner: "Risk Management",
      complianceLevel: 85,
    },
    {
      id: 4,
      name: "Agent Deployment Standards",
      description: "Requirements for testing and deploying AI agents to production",
      status: "active",
      lastUpdated: "1 week ago",
      owner: "DevOps Team",
      complianceLevel: 95,
    },
    {
      id: 5,
      name: "Responsible AI Guidelines",
      description: "Principles for responsible AI development and usage",
      status: "draft",
      lastUpdated: "2 days ago",
      owner: "AI Strategy Team",
      complianceLevel: 0,
    },
  ]

  const roles = [
    {
      id: 1,
      name: "AI Ethics Officer",
      description: "Oversees ethical considerations in AI development",
      responsibilities: ["Policy development", "Ethics reviews", "Compliance monitoring"],
      assignedTo: "Sarah Johnson",
    },
    {
      id: 2,
      name: "AI Governance Lead",
      description: "Manages the overall AI governance framework",
      responsibilities: ["Framework development", "Cross-team coordination", "Governance reporting"],
      assignedTo: "Michael Chen",
    },
    {
      id: 3,
      name: "Model Risk Manager",
      description: "Assesses and mitigates risks associated with AI models",
      responsibilities: ["Risk assessment", "Mitigation strategies", "Model validation"],
      assignedTo: "Priya Patel",
    },
    {
      id: 4,
      name: "AI Compliance Specialist",
      description: "Ensures AI systems comply with regulations and internal policies",
      responsibilities: ["Compliance reviews", "Regulatory monitoring", "Audit support"],
      assignedTo: "James Wilson",
    },
    {
      id: 5,
      name: "AI Documentation Manager",
      description: "Maintains comprehensive documentation for AI systems",
      responsibilities: ["Documentation standards", "Version control", "Knowledge management"],
      assignedTo: "Unassigned",
    },
  ]

  const complianceItems = [
    {
      id: 1,
      name: "Ethics Review",
      description: "Review of agent against ethical guidelines",
      status: "compliant",
      lastChecked: "1 week ago",
      requiredFor: ["All agents"],
    },
    {
      id: 2,
      name: "Data Privacy Assessment",
      description: "Evaluation of data handling and privacy protections",
      status: "compliant",
      lastChecked: "2 weeks ago",
      requiredFor: ["Customer-facing agents", "Data processing agents"],
    },
    {
      id: 3,
      name: "Bias Testing",
      description: "Testing for potential biases in agent responses",
      status: "attention",
      lastChecked: "1 month ago",
      requiredFor: ["All agents"],
    },
    {
      id: 4,
      name: "Security Assessment",
      description: "Evaluation of security vulnerabilities",
      status: "compliant",
      lastChecked: "3 weeks ago",
      requiredFor: ["All agents"],
    },
    {
      id: 5,
      name: "Performance Validation",
      description: "Validation of agent performance metrics",
      status: "non-compliant",
      lastChecked: "2 months ago",
      requiredFor: ["Production agents"],
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "compliant":
        return <Badge className="bg-green-500 hover:bg-green-600">Compliant</Badge>
      case "attention":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Needs Attention</Badge>
      case "non-compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "attention":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "non-compliant":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="policies">Policies & Standards</TabsTrigger>
          <TabsTrigger value="roles">Roles & Responsibilities</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">AI Governance Policies</h3>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              New Policy
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{policy.name}</div>
                      <div className="text-sm text-muted-foreground">{policy.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(policy.status)}</TableCell>
                  <TableCell>{policy.owner}</TableCell>
                  <TableCell>
                    {policy.status === "active" ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{policy.complianceLevel}%</span>
                        </div>
                        <Progress value={policy.complianceLevel} className="h-2" />
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Governance Roles</h3>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Define New Role
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    {role.assignedTo === "Unassigned" ? (
                      <Badge variant="outline">Unassigned</Badge>
                    ) : (
                      <Badge>{role.assignedTo}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Responsibilities:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {role.responsibilities.map((resp, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Compliance Checklist</h3>
            <Button variant="outline" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Run Compliance Check
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requirement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead>Required For</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.lastChecked}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.requiredFor.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}

