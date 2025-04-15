import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      agent: "Customer Support Agent",
      action: "Resolved ticket #1234",
      status: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      id: 2,
      agent: "Data Analysis Agent",
      action: "Generated weekly report",
      status: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: 3,
      agent: "Content Generator",
      action: "Created 5 social media posts",
      status: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: 4,
      agent: "Scheduling Assistant",
      action: "Failed to book appointment",
      status: "error",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    },
    {
      id: 5,
      agent: "Research Agent",
      action: "Completed market research",
      status: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: 6,
      agent: "Email Assistant",
      action: "Sent 15 follow-up emails",
      status: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    },
  ]

  return (
    <Card className="shadow-card border-0 overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        <CardDescription>Your agents' latest actions and status updates</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
            >
              <div>
                <p className="text-sm font-medium mb-1">{activity.agent}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge
                  variant={activity.status === "success" ? "default" : "destructive"}
                  className={
                    activity.status === "success"
                      ? "bg-success/20 text-success hover:bg-success/30 dark:bg-success/30 dark:text-success-foreground"
                      : "bg-destructive/20 text-destructive hover:bg-destructive/30 dark:bg-destructive/30 dark:text-destructive-foreground"
                  }
                >
                  {activity.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

