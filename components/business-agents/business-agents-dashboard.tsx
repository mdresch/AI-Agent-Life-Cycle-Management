"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BusinessAgentsHeader } from "@/components/business-agents/business-agents-header"
import { DepartmentDistributionChart } from "@/components/business-agents/department-distribution-chart"
import { DepartmentCardGrid } from "@/components/business-agents/department-card-grid"
import { KnowledgeDomainsCard } from "@/components/business-agents/knowledge-domains-card"
import { DepartmentView } from "@/components/business-agents/department-view"
import { DivisionView } from "@/components/business-agents/division-view"
import { ExpertiseView } from "@/components/business-agents/expertise-view"

export function BusinessAgentsDashboard() {

  return (
    <div className="space-y-6">
      <BusinessAgentsHeader />

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="divisions">Divisions</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="expertise">Expertise</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Distribution by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <DepartmentDistributionChart />
            </CardContent>
          </Card>
          <DepartmentCardGrid />
          <Card>
            <CardHeader>
              <CardTitle>Top Knowledge Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <KnowledgeDomainsCard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="divisions" className="pt-4">
          <DivisionView viewMode="grid" searchQuery="" />
        </TabsContent>

        <TabsContent value="departments" className="pt-4">
          <DepartmentView viewMode="grid" searchQuery="" />
        </TabsContent>

        <TabsContent value="expertise" className="pt-4">
          <ExpertiseView viewMode="grid" searchQuery="" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

