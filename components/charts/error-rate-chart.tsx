"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Support",
    critical: 0.2,
    major: 0.8,
    minor: 2.1,
  },
  {
    name: "Analytics",
    critical: 0.4,
    major: 1.2,
    minor: 3.5,
  },
  {
    name: "Creative",
    critical: 0.1,
    major: 0.5,
    minor: 1.8,
  },
  {
    name: "Productivity",
    critical: 0.3,
    major: 1.0,
    minor: 2.5,
  },
  {
    name: "Research",
    critical: 0.5,
    major: 1.5,
    minor: 4.2,
  },
]

export function ErrorRateChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Error Rate (%)", angle: -90, position: "insideLeft" }} />
        <Tooltip
          formatter={(value: number) => [`${value}%`, ""]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend />
        <Bar dataKey="critical" name="Critical Errors" fill="#ef4444" />
        <Bar dataKey="major" name="Major Errors" fill="#f97316" />
        <Bar dataKey="minor" name="Minor Errors" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}

