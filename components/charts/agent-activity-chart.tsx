"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface AgentActivityChartProps {
  data: any[]
  type: "requests" | "latency" | "errors"
}

export function AgentActivityChart({ data, type }: AgentActivityChartProps) {
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
        <YAxis
          label={{
            value: type === "requests" ? "Requests" : type === "latency" ? "Seconds" : "Errors",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="Agent1" fill="#8884d8" />
        <Bar dataKey="Agent2" fill="#82ca9d" />
        <Bar dataKey="Agent3" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

