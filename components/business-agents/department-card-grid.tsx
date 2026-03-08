"use client"

import {
  DollarSign,
  HeadphonesIcon,
  Megaphone,
  Monitor,
  Scale,
  Settings2,
  TrendingUp,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { departmentSummaries } from "@/lib/mock-data/business-agents"

const iconMap: Record<string, LucideIcon> = {
  Users,
  Megaphone,
  TrendingUp,
  HeadphonesIcon,
  Monitor,
  DollarSign,
  Settings2,
  Scale,
}

export function DepartmentCardGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {departmentSummaries.map((dept) => {
        const Icon = iconMap[dept.icon] ?? Users
        return (
          <div
            key={dept.department}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-semibold leading-tight">{dept.department}</h4>
            </div>
            <p className="mb-2 text-3xl font-bold">{dept.agentCount}</p>
            <Progress value={dept.percentage} className="mb-2 h-2" />
            <p className="text-xs text-muted-foreground">
              {dept.activeCount} active · {dept.percentage}% of total
            </p>
          </div>
        )
      })}
    </div>
  )
}
