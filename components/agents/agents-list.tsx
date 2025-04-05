"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, ExternalLink, MoreHorizontal, Play, Search, StopCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AgentsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const agents = [
    {
      id: "1",
      name: "Customer Support Agent",
      description: "Handles customer inquiries and resolves common issues",
      type: "support",
      status: "active",
      lastActive: "2 minutes ago",
    },
    {
      id: "2",
      name: "Data Analysis Agent",
      description: "Processes and analyzes data sets to extract insights",
      type: "analytics",
      status: "active",
      lastActive: "15 minutes ago",
    },
    {
      id: "3",
      name: "Content Generator",
      description: "Creates various types of content based on prompts",
      type: "creative",
      status: "inactive",
      lastActive: "3 hours ago",
    },
    {
      id: "4",
      name: "Scheduling Assistant",
      description: "Manages calendars and schedules appointments",
      type: "productivity",
      status: "active",
      lastActive: "Just now",
    },
    {
      id: "5",
      name: "Research Agent",
      description: "Conducts research on specified topics",
      type: "research",
      status: "active",
      lastActive: "5 minutes ago",
    },
    {
      id: "6",
      name: "Email Assistant",
      description: "Drafts and sends emails based on user instructions",
      type: "communication",
      status: "inactive",
      lastActive: "1 day ago",
    },
  ]

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || agent.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search agents..."
                className="w-full pl-8 input-focus"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((agent) => (
          <Card
            key={agent.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-soft border-0 shadow-card"
          >
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex items-center justify-between">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {agent.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge
                  variant={agent.status === "active" ? "default" : "secondary"}
                  className={`rounded-full px-2 py-0 text-xs ${
                    agent.status === "active" ? "bg-success/20 text-success hover:bg-success/30" : ""
                  }`}
                >
                  {agent.status}
                </Badge>
              </div>
              <CardTitle className="mt-2 text-lg font-medium">{agent.name}</CardTitle>
              <CardDescription className="line-clamp-2">{agent.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Last active: {agent.lastActive}</p>
                  <p className="mt-1 text-xs font-medium capitalize">{agent.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    title={agent.status === "active" ? "Stop Agent" : "Start Agent"}
                  >
                    {agent.status === "active" ? (
                      <StopCircle className="h-4 w-4 text-destructive" />
                    ) : (
                      <Play className="h-4 w-4 text-success" />
                    )}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={`/agents/${agent.id}`}>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/agents/${agent.id}/edit`}>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Agent
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/agents/${agent.id}/analytics`}>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

