"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudioWorkspace } from "@/components/studio/studio-workspace"
import { TrainingGround } from "@/components/studio/training-ground"
import { PromptLibrary } from "@/components/studio/prompt-library"
import { StudioHeader } from "@/components/studio/studio-header"
import { StudioActivityChart } from "@/components/studio/studio-activity-chart"
import { RecentStudioActivity } from "@/components/studio/recent-studio-activity"
import { TrainingMetricsChart } from "@/components/studio/training-metrics-chart"

export function StudioDashboard() {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <StudioHeader />

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="workspace"
                className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Workspace
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Training Ground
              </TabsTrigger>
              <TabsTrigger
                value="prompts"
                className="rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Prompt Library
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <StudioActivityChart />
                <RecentStudioActivity />
              </div>
            </TabsContent>

            <TabsContent value="workspace" className="p-0">
              <StudioWorkspace activeProject={activeProject} setActiveProject={setActiveProject} />
            </TabsContent>

            <TabsContent value="training" className="p-4 space-y-4">
              <TrainingGround activeProject={activeProject} />
              <TrainingMetricsChart />
            </TabsContent>

            <TabsContent value="prompts" className="p-0">
              <PromptLibrary />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

