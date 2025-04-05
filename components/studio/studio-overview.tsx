"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Code, Dumbbell, BookText, History } from "lucide-react"
import { StudioActivityChart } from "@/components/charts/studio-activity-chart"

interface StudioOverviewProps {
  activeProject: string | null
}

export function StudioOverview({ activeProject }: StudioOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>AI Studio Dashboard</CardTitle>
            <CardDescription>Your workspace for creating, testing, and refining AI agents</CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-3 text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">Active Projects</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-3 text-center">
                <div className="text-2xl font-bold">48</div>
                <div className="text-xs text-muted-foreground">Training Sessions</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BookText className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-3 text-center">
                <div className="text-2xl font-bold">156</div>
                <div className="text-xs text-muted-foreground">Saved Prompts</div>
              </div>
            </div>
          </div>

          <div className="mt-4 h-[200px]">
            <StudioActivityChart />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions in the studio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                <History className="h-4 w-4 text-blue-700 dark:text-blue-300" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Updated "Customer Support Agent"</p>
                <p className="text-xs text-muted-foreground">Modified system prompt and added new training examples</p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-0.5 rounded-full bg-green-100 p-1 dark:bg-green-900">
                <History className="h-4 w-4 text-green-700 dark:text-green-300" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Created new prompt template</p>
                <p className="text-xs text-muted-foreground">Added "Product Recommendation" template to library</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-0.5 rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                <History className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Completed training session</p>
                <p className="text-xs text-muted-foreground">
                  "Data Analysis Agent" improved by 12% on benchmark tests
                </p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                <History className="h-4 w-4 text-purple-700 dark:text-purple-300" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Started new project</p>
                <p className="text-xs text-muted-foreground">Created "Marketing Campaign Assistant" project</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

