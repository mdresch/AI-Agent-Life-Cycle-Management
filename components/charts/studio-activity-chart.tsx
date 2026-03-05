"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Jan 1", projects: 4, training: 12, prompts: 45 },
  { date: "Jan 15", projects: 5, training: 18, prompts: 62 },
  { date: "Feb 1", projects: 7, training: 24, prompts: 78 },
  { date: "Feb 15", projects: 8, training: 28, prompts: 89 },
  { date: "Mar 1", projects: 10, training: 32, prompts: 105 },
  { date: "Mar 15", projects: 11, training: 38, prompts: 124 },
  { date: "Apr 1", projects: 12, training: 48, prompts: 156 },
]

export function StudioActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid hsl(210 40% 88%)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Line
          type="monotone"
          dataKey="projects"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="training"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="prompts"
          stroke="hsl(var(--chart-4))"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

