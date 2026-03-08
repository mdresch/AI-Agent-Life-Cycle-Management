import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"
import type { TopAgent } from "@/lib/types"

const topAgents: TopAgent[] = [
  { id: "1", name: "Customer Support Agent", type: "Support", successRate: 98.2, requestsPerDay: 342, trend: "up" },
  { id: "2", name: "Data Analysis Agent", type: "Analytics", successRate: 97.5, requestsPerDay: 218, trend: "up" },
  { id: "3", name: "Content Generator", type: "Creative", successRate: 95.8, requestsPerDay: 185, trend: "neutral" },
  { id: "4", name: "Scheduling Assistant", type: "Productivity", successRate: 94.3, requestsPerDay: 97, trend: "down" },
  { id: "5", name: "Research Agent", type: "Research", successRate: 93.7, requestsPerDay: 64, trend: "up" },
]

export function TopAgents() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Performing Agents</CardTitle>
        <CardDescription>Ranked by success rate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topAgents.map((agent, index) => (
            <div key={agent.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground w-4 shrink-0">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {agent.trend === "up" && <ArrowUp className="h-3 w-3 text-emerald-500" />}
                  {agent.trend === "down" && <ArrowDown className="h-3 w-3 text-destructive" />}
                  {agent.trend === "neutral" && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                  <Badge variant="outline" className="text-xs font-mono">
                    {agent.successRate}%
                  </Badge>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${agent.successRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

