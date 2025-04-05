"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid3X3, LayoutGrid, ListFilter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DepartmentView } from "@/components/business-agents/department-view"
import { DivisionView } from "@/components/business-agents/division-view"
import { ExpertiseView } from "@/components/business-agents/expertise-view"
import { BusinessAgentsOverview } from "@/components/business-agents/business-agents-overview"

export function BusinessAgentsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="customer-service">Customer Service</SelectItem>
              <SelectItem value="it">IT Department</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="border rounded-md p-1 flex">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
          <Button variant="outline">
            <ListFilter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      <BusinessAgentsOverview />

      <Tabs defaultValue="departments">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="divisions">By Division</TabsTrigger>
          <TabsTrigger value="expertise">By Expertise</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="pt-4">
          <DepartmentView viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="divisions" className="pt-4">
          <DivisionView viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="expertise" className="pt-4">
          <ExpertiseView viewMode={viewMode} searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

