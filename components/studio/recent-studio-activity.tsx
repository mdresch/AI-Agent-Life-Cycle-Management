"use client"

import { CheckCircle2, BookMarked, FolderPlus, Rocket } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activityEvents = [
  {
    id: 1,
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    description: 'Training session completed on "Customer Support Agent v2"',
    time: "10 minutes ago",
  },
  {
    id: 2,
    icon: BookMarked,
    iconClass: "text-blue-500",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
    description: 'Prompt saved: "Escalation Acknowledgement"',
    time: "42 minutes ago",
  },
  {
    id: 3,
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    description: 'Training session completed on "Data Analysis Pipeline"',
    time: "2 hours ago",
  },
  {
    id: 4,
    icon: FolderPlus,
    iconClass: "text-violet-500",
    bgClass: "bg-violet-100 dark:bg-violet-900/30",
    description: 'Project created: "Code Review Assistant"',
    time: "4 hours ago",
  },
  {
    id: 5,
    icon: BookMarked,
    iconClass: "text-blue-500",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
    description: 'Prompt saved: "Anomaly Detection Report"',
    time: "Yesterday",
  },
  {
    id: 6,
    icon: Rocket,
    iconClass: "text-orange-500",
    bgClass: "bg-orange-100 dark:bg-orange-900/30",
    description: '"Customer Support Agent v2" promoted to staging',
    time: "Yesterday",
  },
  {
    id: 7,
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    description: 'Training session completed on "Data Analysis Pipeline"',
    time: "2 days ago",
  },
  {
    id: 8,
    icon: FolderPlus,
    iconClass: "text-violet-500",
    bgClass: "bg-violet-100 dark:bg-violet-900/30",
    description: 'Project created: "Content Generator Pro"',
    time: "3 days ago",
  },
]

export function RecentStudioActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activityEvents.map((event) => {
            const Icon = event.icon
            return (
              <li key={event.id} className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${event.bgClass}`}>
                  <Icon className={`h-4 w-4 ${event.iconClass}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-foreground">{event.description}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{event.time}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
