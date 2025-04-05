"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BusinessAgentsChart } from "@/components/charts/business-agents-chart"

export function BusinessAgentsOverview() {
  const departmentData = [
    { name: "Human Resources", value: 18 },
    { name: "Marketing", value: 24 },
    { name: "Sales", value: 22 },
    { name: "Customer Service", value: 28 },
    { name: "IT", value: 32 },
    { name: "Finance", value: 16 },
    { name: "Operations", value: 14 },
    { name: "Legal", value: 8 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Agents by Department</CardTitle>
          <CardDescription>Distribution of AI agents across business departments</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <BusinessAgentsChart data={departmentData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business AI Agents Overview</CardTitle>
          <CardDescription>Key statistics about your business-specific AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Total Business Agents</h3>
              <p className="text-2xl font-bold">162</p>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Most Active Department</h3>
              <p className="text-2xl font-bold">IT</p>
              <p className="text-xs text-muted-foreground">32 active agents</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Specialized Agents</h3>
              <p className="text-2xl font-bold">78%</p>
              <p className="text-xs text-muted-foreground">Domain-specific knowledge</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Cross-functional Agents</h3>
              <p className="text-2xl font-bold">22%</p>
              <p className="text-xs text-muted-foreground">Work across departments</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-medium">Top Knowledge Domains</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between rounded-md border px-3 py-1.5">
                <span className="text-sm">Customer Data</span>
                <span className="text-xs font-medium">42 agents</span>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-1.5">
                <span className="text-sm">Product Knowledge</span>
                <span className="text-xs font-medium">38 agents</span>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-1.5">
                <span className="text-sm">IT Systems</span>
                <span className="text-xs font-medium">32 agents</span>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-1.5">
                <span className="text-sm">HR Policies</span>
                <span className="text-xs font-medium">28 agents</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

