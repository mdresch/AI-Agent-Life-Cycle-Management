"use client"

import { useState } from "react"
import { Grid2X2, List, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BusinessAgentsHeader } from "@/components/business-agents/business-agents-header"
import { DepartmentDistributionChart } from "@/components/business-agents/department-distribution-chart"
import { DepartmentCardGrid } from "@/components/business-agents/department-card-grid"
import { KnowledgeDomainsCard } from "@/components/business-agents/knowledge-domains-card"
import { DepartmentView } from "@/components/business-agents/department-view"
import { DivisionView } from "@/components/business-agents/division-view"
import { ExpertiseView } from "@/components/business-agents/expertise-view"

interface AgentFilterBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

function AgentFilterBar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: AgentFilterBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search agents…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="icon"
        onClick={() => onViewModeChange("grid")}
        aria-label="Grid view"
      >
        <Grid2X2 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => onViewModeChange("list")}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function BusinessAgentsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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

        <TabsContent value="divisions" className="space-y-4 pt-4">
          <AgentFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <DivisionView viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="departments" className="space-y-4 pt-4">
          <AgentFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <DepartmentView viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="expertise" className="space-y-4 pt-4">
          <AgentFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <ExpertiseView viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

