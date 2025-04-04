"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", value: 92.4 },
  { name: "Feb", value: 93.1 },
  { name: "Mar", value: 92.8 },
  { name: "Apr", value: 93.7 },
  { name: "May", value: 94.2 },
  { name: "Jun", value: 94.5 },
  { name: "Jul", value: 94.8 },
]

export function PerformanceChart() {
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
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} domain={[90, 100]} tickCount={5} />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => [`${value}%`, "Success Rate"]}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

