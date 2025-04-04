"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Edit, Play, Pause, Trash2, Copy, BarChart } from "lucide-react"

export function AgentsList() {
  const [searchQuery, setSearchQuery] = useState("")

  const agents = [
    {
      id: 1,
      name: "Customer Support Agent",
      description: "Handles customer inquiries and support tickets",
      type: "Support",
      status: "active",
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      name: "Data Analysis Agent",
      description: "Processes and analyzes data sets, generates reports",
      type: "Analytics",
      status: "active",
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      name: "Content Generator",
      description: "Creates blog posts, social media content, and marketing copy",
      type: "Creative",
      status: "active",
      lastUpdated: "3 days ago",
    },
    {
      id: 4,
      name: "Scheduling Assistant",
      description: "Manages calendars and schedules appointments",
      type: "Productivity",
      status: "inactive",
      lastUpdated: "1 week ago",
    },
    {
      id: 5,
      name: "Research Agent",
      description: "Conducts market research and competitive analysis",
      type: "Research",
      status: "active",
      lastUpdated: "5 days ago",
    },
    {
      id: 6,
      name: "Email Assistant",
      description: "Drafts and sends emails, manages follow-ups",
      type: "Communication",
      status: "active",
      lastUpdated: "2 days ago",
    },
  ]

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search agents..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>{agent.type}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {agent.status === "active" ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        <span>Activate</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Duplicate</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Analytics</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{agent.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
                  <span className="text-xs text-muted-foreground">Updated {agent.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

