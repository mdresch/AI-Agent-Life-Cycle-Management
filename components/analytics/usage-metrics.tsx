"use client"

import { Activity, Coins, Users } from "lucide-react"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KpiCard } from "@/components/dashboard/kpi-card"
import type { UsageDataPoint, UsageKpis } from "@/lib/mock-data/analytics"

interface UsageMetricsProps {
  kpis: UsageKpis
  series: UsageDataPoint[]
}

function formatLargeNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function UsageMetrics({ kpis, series }: UsageMetricsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard
          label="Token Consumption"
          value={formatLargeNumber(kpis.totalTokens)}
          trend="up"
          trendValue="vs previous period"
          icon={<Coins className="h-4 w-4" />}
        />
        <KpiCard
          label="Total Requests"
          value={formatLargeNumber(kpis.totalRequests)}
          trend="up"
          trendValue="vs previous period"
          icon={<Activity className="h-4 w-4" />}
        />
        <KpiCard
          label="Active Users"
          value={formatLargeNumber(kpis.activeUsers)}
          trend="up"
          trendValue="vs previous period"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Over Time</CardTitle>
          <CardDescription>Tokens, requests, and active users across the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={series} margin={{ top: 5, right: 16, left: 8, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} tickFormatter={formatLargeNumber} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = { tokens: "Tokens", requests: "Requests", users: "Users" }
                  return [formatLargeNumber(value), labels[name] ?? name]
                }}
              />
              <Legend formatter={(v: string) => ({ tokens: "Tokens", requests: "Requests", users: "Users" }[v] ?? v)} />
              <Area type="monotone" dataKey="tokens"   fill="hsl(var(--chart-1))" fillOpacity={0.2} stroke="hsl(var(--chart-1))" strokeWidth={2} />
              <Area type="monotone" dataKey="requests" fill="hsl(var(--chart-2))" fillOpacity={0.2} stroke="hsl(var(--chart-2))" strokeWidth={2} />
              <Area type="monotone" dataKey="users"    fill="hsl(var(--chart-3))" fillOpacity={0.2} stroke="hsl(var(--chart-3))" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

