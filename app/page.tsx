import { Suspense } from "react"
import Link from "next/link"
import { AgentStats } from "@/components/dashboard/agent-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TopAgents } from "@/components/dashboard/top-agents"
import { AgentStatusOverview } from "@/components/dashboard/agent-status-overview"
import { Button } from "@/components/ui/button"
import { PlusCircle, Settings } from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AgentsSkeleton } from "@/components/skeletons/agents-skeleton"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="AI Agents Dashboard" text="Manage and monitor your AI agents">
        <div className="flex items-center gap-2">
          <Link href="/settings">
            <Button variant="outline" size="icon" className="rounded-full h-9 w-9 transition-all hover:bg-muted">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <Link href="/agents/new">
            <Button className="shadow-sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Agent
            </Button>
          </Link>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AgentStats title="Total Agents" value="24" description="+4 from last month" trend="increase" />
        <AgentStats title="Active Agents" value="18" description="75% of total agents" trend="neutral" />
        <AgentStats title="Avg. Response Time" value="1.2s" description="-0.3s from last week" trend="increase" />
        <AgentStats title="Success Rate" value="94.2%" description="+2.1% from last month" trend="increase" />
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
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

      <div className="mt-6">
        <Suspense fallback={<AgentsSkeleton />}>
          <RecentActivity />
        </Suspense>
      </div>
    </DashboardShell>
  )
}

