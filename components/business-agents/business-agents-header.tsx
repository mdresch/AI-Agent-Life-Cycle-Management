"use client"

import { Building2, Sparkles, Users } from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { businessAgents, departmentSummaries } from "@/lib/mock-data/business-agents"

export function BusinessAgentsHeader() {
  const totalAgents = departmentSummaries.reduce((sum, d) => sum + d.agentCount, 0)

  const mostActiveDept = departmentSummaries.reduce((prev, current) =>
    current.activeCount > prev.activeCount ? current : prev
  )

  const specialisedCount = businessAgents.filter((a) => a.isSpecialised).length
  const specialisedRatio =
    totalAgents === 0 ? "0%" : ((specialisedCount / totalAgents) * 100).toFixed(0) + "%"

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <KpiCard
        label="Total Business Agents"
        value={String(totalAgents)}
        trend="up"
        trendValue="+5% from last month"
        icon={<Users className="h-5 w-5" />}
      />
      <KpiCard
        label="Most Active Department"
        value={mostActiveDept.department}
        trend="neutral"
        trendValue={`${mostActiveDept.activeCount} active agents`}
        icon={<Building2 className="h-5 w-5" />}
      />
      <KpiCard
        label="Specialized Ratio"
        value={specialisedRatio}
        trend="up"
        trendValue="+2% from last quarter"
        icon={<Sparkles className="h-5 w-5" />}
      />
    </div>
  )
}
