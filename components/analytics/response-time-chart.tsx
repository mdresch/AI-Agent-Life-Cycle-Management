"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AgentResponseTime } from "@/lib/mock-data/analytics"

interface ResponseTimeChartProps {
  data: AgentResponseTime[]
}

interface TooltipPayload {
  payload?: AgentResponseTime
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length || !payload[0].payload) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md text-sm">
      <p className="font-semibold mb-1">{d.agentName}</p>
      <p className="text-muted-foreground">Avg: <span className="text-foreground font-medium">{d.avgMs}ms</span></p>
      <p className="text-muted-foreground">P95: <span className="text-foreground font-medium">{d.p95Ms}ms</span></p>
      <p className="text-muted-foreground">P99: <span className="text-foreground font-medium">{d.p99Ms}ms</span></p>
    </div>
  )
}

export function ResponseTimeChart({ data }: ResponseTimeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Time by Agent</CardTitle>
        <CardDescription>Average response time in milliseconds</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 16, left: 8, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
            <XAxis
              dataKey="agentName"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${v}ms`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avgMs" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
