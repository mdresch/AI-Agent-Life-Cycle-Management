"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LifecycleStageChart } from "@/components/charts/lifecycle-stage-chart"

export function LifecycleOverview() {
  const lifecycleStages = [
    {
      id: 1,
      name: "Development",
      description: "Agents in the initial development and testing phase",
      count: 8,
      percentage: 33,
    },
    {
      id: 2,
      name: "Production",
      description: "Agents actively deployed and serving users",
      count: 12,
      percentage: 50,
    },
    {
      id: 3,
      name: "Maintenance",
      description: "Agents undergoing updates or performance tuning",
      count: 3,
      percentage: 13,
    },
    {
      id: 4,
      name: "Retirement",
      description: "Agents being phased out or archived",
      count: 1,
      percentage: 4,
    },
  ]

  const recentTransitions = [
    {
      id: 1,
      agentName: "Customer Support Agent",
      fromStage: "Development",
      toStage: "Production",
      date: "2 days ago",
      user: "John Doe",
    },
    {
      id: 2,
      agentName: "Data Analysis Agent",
      fromStage: "Maintenance",
      toStage: "Production",
      date: "5 days ago",
      user: "Jane Smith",
    },
    {
      id: 3,
      agentName: "Legacy Email Assistant",
      fromStage: "Production",
      toStage: "Retirement",
      date: "1 week ago",
      user: "Bob Johnson",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lifecycle Stage Distribution</CardTitle>
            <CardDescription>Current distribution of agents across lifecycle stages</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LifecycleStageChart data={lifecycleStages} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lifecycle Stages</CardTitle>
            <CardDescription>Overview of agents in each lifecycle stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lifecycleStages.map((stage) => (
                <div key={stage.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{stage.name}</h3>
                    <p className="text-xs text-muted-foreground">{stage.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{stage.count} agents</Badge>
                    <Badge
                      variant={
                        stage.name === "Production"
                          ? "default"
                          : stage.name === "Development"
                            ? "secondary"
                            : stage.name === "Maintenance"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {stage.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Stage Transitions</CardTitle>
          <CardDescription>Agents that have recently moved between lifecycle stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransitions.map((transition) => (
              <div
                key={transition.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <h3 className="text-sm font-medium">{transition.agentName}</h3>
                  <p className="text-xs text-muted-foreground">
                    Moved from <span className="font-medium">{transition.fromStage}</span> to{" "}
                    <span className="font-medium">{transition.toStage}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{transition.date}</p>
                  <p className="text-xs text-muted-foreground">by {transition.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

