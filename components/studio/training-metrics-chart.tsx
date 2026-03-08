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

/** Extracts a short label from a scenario string, splitting on common separators */
function getShortScenarioLabel(scenario: string, scenarioLabels: Record<string, string>): string {
  const full = scenarioLabels[scenario]
  if (!full) return scenario
  // Support both em dash (—) and hyphen (-) as separators
  const separatorIndex = full.search(/\s[—\-]\s/)
  return separatorIndex >= 0 ? full.slice(separatorIndex + 3) : full
}

const chartData = trainingSessions.slice(-8).map((session) => ({
  label: getShortScenarioLabel(session.scenario, scenarioLabels),
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
