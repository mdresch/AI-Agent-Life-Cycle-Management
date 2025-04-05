"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Support",
    time: 1.2,
  },
  {
    name: "Analytics",
    time: 1.8,
  },
  {
    name: "Creative",
    time: 2.3,
  },
  {
    name: "Productivity",
    time: 0.9,
  },
  {
    name: "Research",
    time: 1.5,
  },
]

export function ResponseTimeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Seconds", angle: -90, position: "insideLeft" }} />
        <Tooltip
          formatter={(value: number) => [`${value}s`, "Response Time"]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Bar dataKey="time" fill="#0ea5e9" />
      </BarChart>
    </ResponsiveContainer>
  )
}

