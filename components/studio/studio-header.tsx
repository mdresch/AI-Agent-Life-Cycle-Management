"use client"

import { FolderOpen, FlaskConical, Library } from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { studioProjects, trainingSessions, promptTemplates } from "@/lib/mock-data/studio"

const activeProjects = studioProjects.filter((p) => p.status === "active").length
const totalSessions = trainingSessions.length
const totalPrompts = promptTemplates.length

export function StudioHeader() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <KpiCard
        label="Active Projects"
        value={activeProjects}
        trend="up"
        trendValue="+1 this month"
        icon={<FolderOpen className="h-4 w-4" />}
      />
      <KpiCard
        label="Training Sessions Run"
        value={totalSessions}
        trend="up"
        trendValue="+3 this week"
        icon={<FlaskConical className="h-4 w-4" />}
      />
      <KpiCard
        label="Saved Prompts"
        value={totalPrompts}
        trend="neutral"
        trendValue="No change"
        icon={<Library className="h-4 w-4" />}
      />
    </div>
  )
}
