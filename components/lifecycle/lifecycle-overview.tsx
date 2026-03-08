"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { LifecycleStageChart } from "@/components/charts/lifecycle-stage-chart"
import { mockStageSummaries, mockLifecycleTransitions } from "@/lib/mock-data/lifecycle"

const stageBadgeStyle: Record<string, string> = {
  development: "bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100",
  production: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  maintenance: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  retirement: "bg-muted text-muted-foreground hover:bg-muted",
}

function StageBadge({ stage }: { stage: string }) {
  return (
    <Badge className={`capitalize ${stageBadgeStyle[stage] ?? ""}`}>
      {stage}
    </Badge>
  )
}

export function LifecycleOverview() {
  const recentTransitions = mockLifecycleTransitions.slice(0, 10)

  const chartData = mockStageSummaries.map((s, i) => ({
    id: i + 1,
    name: s.label,
    description: s.description,
    count: s.count,
    percentage: s.percentage,
  }))

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lifecycle Stage Distribution</CardTitle>
            <CardDescription>Current distribution of agents across lifecycle stages</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LifecycleStageChart data={chartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lifecycle Stages</CardTitle>
            <CardDescription>Overview of agents in each lifecycle stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStageSummaries.map((stage) => (
                <div key={stage.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ background: stage.colour }}
                      />
                      <span className="text-sm font-medium">{stage.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{stage.count}</span>
                      <span className="text-xs text-muted-foreground w-10 text-right">
                        {stage.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${stage.percentage}%`, background: stage.colour }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{stage.description}</p>
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
          <div className="space-y-3">
            {recentTransitions.map((transition) => (
              <div
                key={transition.id}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{transition.agentName}</p>
                  {transition.reason && (
                    <p className="text-xs text-muted-foreground truncate">{transition.reason}</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <StageBadge stage={transition.fromStage} />
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <StageBadge stage={transition.toStage} />
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">
                    {new Date(transition.transitionedAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">by {transition.transitionedBy}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

