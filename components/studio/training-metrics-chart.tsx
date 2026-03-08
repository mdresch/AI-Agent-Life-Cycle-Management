"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { trainingSessions } from "@/lib/mock-data/studio"
import { TRAINING_SCENARIOS } from "@/lib/mock-data/studio"

const scenarioLabels = Object.fromEntries(TRAINING_SCENARIOS.map((s) => [s.id, s.label]))

const chartData = trainingSessions.slice(-8).map((session) => ({
  label: scenarioLabels[session.scenario]?.split(" — ")[1] ?? session.scenario,
  score: session.score,
  date: new Date(session.completedAt).toLocaleDateString("en-GB", { month: "short", day: "numeric" }),
}))

export function TrainingMetricsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Scores</CardTitle>
        <CardDescription>Last 8 training session scores with target threshold</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value}`, "Score"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <ReferenceLine
              y={80}
              stroke="hsl(var(--chart-4))"
              strokeDasharray="5 5"
              label={{ value: "Target", position: "insideTopRight", fontSize: 11, fill: "hsl(var(--chart-4))" }}
            />
            <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
