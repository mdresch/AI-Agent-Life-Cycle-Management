"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, BarChart, Play, Pause } from "lucide-react"
import Link from "next/link"

interface AgentDetailProps {
  agent: {
    id: string
    name: string
    description: string
    type: string
    status: string
    lastUpdated: string
    createdAt: string
    version: string
    capabilities: string[]
    integrations: string[]
    trainingData: string[]
  }
}

export function AgentDetail({ agent }: AgentDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
          <span className="text-sm text-muted-foreground">Last updated: {agent.lastUpdated}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href={`/agents/${agent.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Agent
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/agents/${agent.id}/analytics`}>
              <BarChart className="mr-2 h-4 w-4" />
              View Analytics
            </Link>
          </Button>
          <Button variant={agent.status === "active" ? "destructive" : "default"}>
            {agent.status === "active" ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause Agent
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Activate Agent
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="training">Training Data</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Details</CardTitle>
              <CardDescription>Basic information about this agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">{agent.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Type</h3>
                  <p className="text-sm text-muted-foreground">{agent.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Created</h3>
                  <p className="text-sm text-muted-foreground">{agent.createdAt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Version</h3>
                  <p className="text-sm text-muted-foreground">{agent.version}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="capabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Capabilities</CardTitle>
              <CardDescription>What this agent can do</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {agent.capabilities.map((capability, index) => (
                  <li key={index} className="text-sm">
                    {capability}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Services this agent connects with</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {agent.integrations.map((integration, index) => (
                  <li key={index} className="text-sm">
                    {integration}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Data</CardTitle>
              <CardDescription>Data sources used to train this agent</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {agent.trainingData.map((data, index) => (
                  <li key={index} className="text-sm">
                    {data}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

