"use client"

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ErrorRateByType } from "@/lib/mock-data/analytics"

interface ErrorRateChartProps {
  data: ErrorRateByType[]
}

interface TooltipPayload {
  payload?: ErrorRateByType
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length || !payload[0].payload) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md text-sm">
      <p className="font-semibold mb-1">{d.agentType}</p>
      <p className="text-muted-foreground">
        Error Rate: <span className="text-foreground font-medium">{d.errorRate}%</span>
      </p>
      <p className="text-muted-foreground">
        Count: <span className="text-foreground font-medium">{d.errorCount}</span>
      </p>
    </div>
  )
}

export function ErrorRateChart({ data }: ErrorRateChartProps) {
  const sorted = [...data].sort((a, b) => b.errorRate - a.errorRate)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Rate by Agent Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            layout="vertical"
            data={sorted}
            margin={{ top: 5, right: 40, left: 8, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted" />
            <YAxis
              dataKey="agentType"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              width={110}
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="errorRate" radius={[0, 4, 4, 0]}>
              {sorted.map((entry) => (
                <Cell
                  key={entry.agentType}
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.7 + (entry.errorRate / 10) * 0.3}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
