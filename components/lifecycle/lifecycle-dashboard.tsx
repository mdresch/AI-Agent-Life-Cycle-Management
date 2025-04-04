"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LifecycleOverview } from "@/components/lifecycle/lifecycle-overview"
import { VersionHistory } from "@/components/lifecycle/version-history"
import { AgentTemplates } from "@/components/lifecycle/agent-templates"
import { AgentRetirement } from "@/components/lifecycle/agent-retirement"

export function LifecycleDashboard() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lifecycle Management</CardTitle>
          <CardDescription>
            Comprehensive tools for managing your AI agents throughout their entire lifecycle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="versions">Version History</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="retirement">Retirement</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
              <LifecycleOverview />
            </TabsContent>

            <TabsContent value="versions" className="pt-4">
              <VersionHistory />
            </TabsContent>

            <TabsContent value="templates" className="pt-4">
              <AgentTemplates />
            </TabsContent>

            <TabsContent value="retirement" className="pt-4">
              <AgentRetirement />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

