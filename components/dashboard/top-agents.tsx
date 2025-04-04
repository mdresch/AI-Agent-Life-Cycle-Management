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
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Agents</CardTitle>
        <CardDescription>Your most reliable AI agents by success rate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {agent.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
                <span className="text-sm font-medium">{agent.successRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

