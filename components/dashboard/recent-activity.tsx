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
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your agents' latest actions and status updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-medium">{activity.agent}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={activity.status === "success" ? "default" : "destructive"}>{activity.status}</Badge>
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

