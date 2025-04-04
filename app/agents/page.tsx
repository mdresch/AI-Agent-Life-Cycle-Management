import { Suspense } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AgentsList } from "@/components/agents/agents-list"
import { AgentsSkeleton } from "@/components/skeletons/agents-skeleton"

export default function AgentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="AI Agents" text="Create and manage your AI agents">
        <Link href="/agents/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Agent
          </Button>
        </Link>
      </DashboardHeader>
      <Suspense fallback={<AgentsSkeleton />}>
        <AgentsList />
      </Suspense>
    </DashboardShell>
  )
}

