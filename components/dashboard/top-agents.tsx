import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TopAgents() {
  const agents = [
    {
      id: 1,
      name: "Customer Support Agent",
      type: "Support",
      successRate: 98.2,
      status: "active",
    },
    {
      id: 2,
      name: "Data Analysis Agent",
      type: "Analytics",
      successRate: 97.5,
      status: "active",
    },
    {
      id: 3,
      name: "Content Generator",
      type: "Creative",
      successRate: 95.8,
      status: "active",
    },
    {
      id: 4,
      name: "Scheduling Assistant",
      type: "Productivity",
      successRate: 94.3,
      status: "active",
    },
    {
      id: 5,
      name: "Research Agent",
      type: "Research",
      successRate: 93.7,
      status: "active",
    },
  ]

  return (
    <Card className="shadow-card border-0 overflow-hidden h-full">
      <CardHeader className="bg-muted/30 pb-4">
        <CardTitle className="text-lg font-medium">Top Performing Agents</CardTitle>
        <CardDescription>Your most reliable AI agents by success rate</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-center space-x-4">
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {agent.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none mb-1">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant={agent.status === "active" ? "default" : "secondary"}
                  className={
                    agent.status === "active"
                      ? "bg-success/20 text-success hover:bg-success/30 dark:bg-success/30 dark:text-success-foreground"
                      : ""
                  }
                >
                  {agent.status}
                </Badge>
                <span className="text-sm font-medium">{agent.successRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

