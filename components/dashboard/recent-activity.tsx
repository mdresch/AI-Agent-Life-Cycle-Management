import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, RefreshCw, Zap, AlertCircle, Download, Settings } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { ActivityEvent } from "@/lib/types"

const activities: ActivityEvent[] = [
  {
    id: "1",
    type: "agent_created",
    message: "New agent created",
    actor: "John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    agentName: "HR Onboarding Agent",
  },
  {
    id: "2",
    type: "lifecycle_transition",
    message: "Agent promoted to Production",
    actor: "Jane Smith",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    agentName: "Customer Support Agent",
  },
  {
    id: "3",
    type: "training_completed",
    message: "Model training completed",
    actor: "System",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    agentName: "Data Analysis Agent",
  },
  {
    id: "4",
    type: "agent_error",
    message: "Execution error detected",
    actor: "System",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    agentName: "Code Review Agent",
  },
  {
    id: "5",
    type: "marketplace_install",
    message: "Template installed from marketplace",
    actor: "Bob Johnson",
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    agentName: "Research Specialist",
  },
  {
    id: "6",
    type: "settings_change",
    message: "Notification settings updated",
    actor: "Alice Brown",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
]

const eventConfig: Record<
  ActivityEvent["type"],
  { icon: React.ReactNode; colour: string }
> = {
  agent_created: { icon: <Bot className="h-4 w-4" />, colour: "text-primary" },
  lifecycle_transition: { icon: <RefreshCw className="h-4 w-4" />, colour: "text-accent" },
  training_completed: { icon: <Zap className="h-4 w-4" />, colour: "text-emerald-500" },
  agent_error: { icon: <AlertCircle className="h-4 w-4" />, colour: "text-destructive" },
  marketplace_install: { icon: <Download className="h-4 w-4" />, colour: "text-secondary" },
  settings_change: { icon: <Settings className="h-4 w-4" />, colour: "text-muted-foreground" },
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest platform events and agent updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
          {activities.map((activity) => {
            const config = eventConfig[activity.type]
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0"
              >
                <div className={`mt-0.5 shrink-0 ${config.colour}`}>{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {activity.message}
                    {activity.agentName && (
                      <span className="text-primary"> — {activity.agentName}</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.actor}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

