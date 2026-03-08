"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { departmentSummaries } from "@/lib/mock-data/business-agents"

const data = departmentSummaries.map((d) => ({
  department: d.department,
  agentCount: d.agentCount,
  activeCount: d.activeCount,
}))

interface TooltipPayloadEntry {
  name: string
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const activeCount = departmentSummaries.find((d) => d.department === label)?.activeCount ?? 0
  return (
    <div className="rounded-md border bg-background px-3 py-2 text-sm shadow-md">
      <p className="font-semibold">{label}</p>
      <p className="text-muted-foreground">Total agents: {payload[0]?.value}</p>
      <p className="text-muted-foreground">Active: {activeCount}</p>
    </div>
  )
}

export function DepartmentDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="department"
          width={110}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="agentCount" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
