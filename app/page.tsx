import { Suspense } from "react"
import Link from "next/link"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TopAgents } from "@/components/dashboard/top-agents"
import { AgentStatusOverview } from "@/components/dashboard/agent-status-overview"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Settings, Bot, Activity, Timer, CheckCircle } from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AgentsSkeleton } from "@/components/skeletons/agents-skeleton"
import type { KpiMetric } from "@/lib/types"

const kpiMetrics: KpiMetric[] = [
  {
    label: "Total Agents",
    value: 24,
    trend: "up",
    trendValue: "+4 from last month",
  },
  {
    label: "Active Agents",
    value: 18,
    trend: "neutral",
    trendValue: "75% of total",
  },
  {
    label: "Avg Response Time",
    value: "1.2",
    unit: "s",
    trend: "up",
    trendValue: "-0.3s from last week",
  },
  {
    label: "Success Rate",
    value: "94.2",
    unit: "%",
    trend: "up",
    trendValue: "+2.1% from last month",
  },
]

const kpiIcons = [
  <Bot key="bot" className="h-4 w-4" />,
  <Activity key="activity" className="h-4 w-4" />,
  <Timer key="timer" className="h-4 w-4" />,
  <CheckCircle key="check" className="h-4 w-4" />,
]

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage and monitor your AI agents">
        <div className="flex items-center gap-2">
          <Link href="/settings">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <Link href="/agents/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Agent
            </Button>
          </Link>
        </div>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric, i) => (
          <KpiCard key={metric.label} {...metric} icon={kpiIcons[i]} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <Suspense fallback={<AgentsSkeleton />}>
            <AgentStatusOverview />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<AgentsSkeleton />}>
            <TopAgents />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<AgentsSkeleton />}>
        <RecentActivity />
      </Suspense>
    </DashboardShell>
  )
}

