"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, PlusCircle, Maximize2, Minimize2, LayoutGrid } from "lucide-react"

interface WidgetProps {
  id: string
  title: string
  description: string
  type: string
  priority: "high" | "medium" | "low" | "none"
  isExpanded?: boolean
  onToggleExpand?: () => void
  children?: React.ReactNode
}

function Widget({ id, title, description, type, priority, isExpanded = false, onToggleExpand, children }: WidgetProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{title}</CardTitle>
            {priority !== "none" && (
              <Badge variant={priority === "high" ? "destructive" : priority === "medium" ? "default" : "secondary"}>
                {priority}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onToggleExpand}>
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function PersonalizedDashboard() {
  const [expandedWidgets, setExpandedWidgets] = useState<Record<string, boolean>>({
    "agent-alerts": true,
    "recent-activity": true,
    "performance-issues": false,
    "scheduled-maintenance": false,
    "favorite-agents": true,
  })

  const [widgets, setWidgets] = useState([
    {
      id: "agent-alerts",
      title: "Agent Alerts",
      description: "Critical alerts requiring attention",
      type: "alerts",
      priority: "high" as const,
    },
    {
      id: "recent-activity",
      title: "Recent Activity",
      description: "Latest actions and updates",
      type: "activity",
      priority: "medium" as const,
    },
    {
      id: "performance-issues",
      title: "Performance Issues",
      description: "Agents with performance concerns",
      type: "performance",
      priority: "medium" as const,
    },
    {
      id: "scheduled-maintenance",
      title: "Scheduled Maintenance",
      description: "Upcoming maintenance tasks",
      type: "maintenance",
      priority: "low" as const,
    },
    {
      id: "favorite-agents",
      title: "Favorite Agents",
      description: "Your bookmarked agents",
      type: "favorites",
      priority: "none" as const,
    },
  ])

  const [userPreferences, setUserPreferences] = useState({
    showAlerts: true,
    autoRefresh: true,
    refreshInterval: 5,
    defaultView: "list",
    notificationsEnabled: true,
    emailNotifications: true,
    darkModeSchedule: false,
  })

  const toggleWidgetExpansion = (widgetId: string) => {
    setExpandedWidgets((prev) => ({
      ...prev,
      [widgetId]: !prev[widgetId],
    }))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setWidgets(items)
  }

  const alerts = [
    {
      id: 1,
      agent: "Customer Support Agent",
      issue: "Response accuracy below threshold",
      severity: "high",
      time: "10 minutes ago",
    },
    { id: 2, agent: "Data Analysis Agent", issue: "API connection failed", severity: "high", time: "1 hour ago" },
    { id: 3, agent: "Email Assistant", issue: "Rate limit approaching", severity: "medium", time: "3 hours ago" },
  ]

  const recentActivity = [
    { id: 1, agent: "Marketing Agent", action: "Updated prompt template", user: "John Doe", time: "15 minutes ago" },
    {
      id: 2,
      agent: "Customer Support Agent",
      action: "Completed training session",
      user: "System",
      time: "2 hours ago",
    },
    { id: 3, agent: "Research Assistant", action: "Knowledge base updated", user: "Jane Smith", time: "Yesterday" },
  ]

  const performanceIssues = [
    { id: 1, agent: "Sales Assistant", metric: "Response Time", value: "2.8s", threshold: "2.0s", trend: "increasing" },
    { id: 2, agent: "Content Generator", metric: "Accuracy", value: "82%", threshold: "90%", trend: "stable" },
    {
      id: 3,
      agent: "Email Assistant",
      metric: "User Satisfaction",
      value: "3.6/5",
      threshold: "4.0/5",
      trend: "decreasing",
    },
  ]

  const scheduledMaintenance = [
    { id: 1, agent: "All Agents", task: "Model Update", scheduled: "Tomorrow, 2:00 AM", duration: "1 hour" },
    {
      id: 2,
      agent: "Customer Support Agent",
      task: "Knowledge Base Refresh",
      scheduled: "May 15, 3:00 PM",
      duration: "30 minutes",
    },
    {
      id: 3,
      agent: "Data Analysis Agent",
      task: "Performance Optimization",
      scheduled: "May 18, 1:00 PM",
      duration: "2 hours",
    },
  ]

  const favoriteAgents = [
    { id: 1, name: "Customer Support Agent", type: "Support", lastUsed: "Today" },
    { id: 2, name: "Data Analysis Agent", type: "Analytics", lastUsed: "Yesterday" },
    { id: 3, name: "Content Generator", type: "Creative", lastUsed: "3 days ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Customize Layout
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="widgets">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {widgets.map((widget, index) => (
                    <Draggable key={widget.id} draggableId={widget.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Widget
                            id={widget.id}
                            title={widget.title}
                            description={widget.description}
                            type={widget.type}
                            priority={widget.priority}
                            isExpanded={expandedWidgets[widget.id]}
                            onToggleExpand={() => toggleWidgetExpansion(widget.id)}
                          >
                            {widget.id === "agent-alerts" && (
                              <div className="space-y-2">
                                {alerts.map((alert) => (
                                  <div
                                    key={alert.id}
                                    className={`p-3 rounded-md border ${
                                      alert.severity === "high"
                                        ? "border-red-200 bg-red-50 dark:bg-red-950/20"
                                        : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20"
                                    }`}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <div className="font-medium">{alert.agent}</div>
                                        <div className="text-sm text-muted-foreground">{alert.issue}</div>
                                      </div>
                                      <Badge variant={alert.severity === "high" ? "destructive" : "default"}>
                                        {alert.severity}
                                      </Badge>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                                      <Button size="sm" variant="outline">
                                        Investigate
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {widget.id === "recent-activity" && (
                              <div className="space-y-2">
                                {recentActivity.map((activity) => (
                                  <div key={activity.id} className="p-3 rounded-md border">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <div className="font-medium">{activity.agent}</div>
                                        <div className="text-sm text-muted-foreground">{activity.action}</div>
                                      </div>
                                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                                    </div>
                                    <div className="mt-1 text-xs text-muted-foreground">by {activity.user}</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {widget.id === "performance-issues" && (
                              <div className="space-y-2">
                                {performanceIssues.map((issue) => (
                                  <div key={issue.id} className="p-3 rounded-md border">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <div className="font-medium">{issue.agent}</div>
                                        <div className="text-sm text-muted-foreground">
                                          {issue.metric}: <span className="font-medium">{issue.value}</span> (Threshold:{" "}
                                          {issue.threshold})
                                        </div>
                                      </div>
                                      <Badge
                                        variant={
                                          issue.trend === "increasing" && issue.metric === "Response Time"
                                            ? "destructive"
                                            : issue.trend === "decreasing" && issue.metric !== "Response Time"
                                              ? "destructive"
                                              : "secondary"
                                        }
                                      >
                                        {issue.trend}
                                      </Badge>
                                    </div>
                                    <div className="mt-2 flex justify-end">
                                      <Button size="sm" variant="outline">
                                        Optimize
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {widget.id === "scheduled-maintenance" && (
                              <div className="space-y-2">
                                {scheduledMaintenance.map((task) => (
                                  <div key={task.id} className="p-3 rounded-md border">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <div className="font-medium">{task.task}</div>
                                        <div className="text-sm text-muted-foreground">Agent: {task.agent}</div>
                                      </div>
                                      <Badge variant="outline">{task.duration}</Badge>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">Scheduled: {task.scheduled}</span>
                                      <Button size="sm" variant="outline">
                                        Reschedule
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {widget.id === "favorite-agents" && (
                              <div className="space-y-2">
                                {favoriteAgents.map((agent) => (
                                  <div
                                    key={agent.id}
                                    className="p-3 rounded-md border flex items-center justify-between"
                                  >
                                    <div>
                                      <div className="font-medium">{agent.name}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {agent.type} • Last used: {agent.lastUsed}
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm" variant="outline">
                                        Edit
                                      </Button>
                                      <Button size="sm">Use</Button>
                                    </div>
                                  </div>
                                ))}
                                <Button variant="outline" className="w-full">
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  Add Favorite
                                </Button>
                              </div>
                            )}
                          </Widget>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Preferences</CardTitle>
              <CardDescription>Customize your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-alerts">Show Critical Alerts</Label>
                      <Switch
                        id="show-alerts"
                        checked={userPreferences.showAlerts}
                        onCheckedChange={(checked) => setUserPreferences({ ...userPreferences, showAlerts: checked })}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Display critical alerts at the top of your dashboard
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-refresh">Auto-Refresh Dashboard</Label>
                      <Switch
                        id="auto-refresh"
                        checked={userPreferences.autoRefresh}
                        onCheckedChange={(checked) => setUserPreferences({ ...userPreferences, autoRefresh: checked })}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications-enabled">Browser Notifications</Label>
                      <Switch
                        id="notifications-enabled"
                        checked={userPreferences.notificationsEnabled}
                        onCheckedChange={(checked) =>
                          setUserPreferences({ ...userPreferences, notificationsEnabled: checked })
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Receive browser notifications for important events</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <Switch
                        id="email-notifications"
                        checked={userPreferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          setUserPreferences({ ...userPreferences, emailNotifications: checked })
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Receive email notifications for critical alerts</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Widget Management</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Select which widgets to display on your dashboard</p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {widgets.map((widget) => (
                      <div key={widget.id} className="flex items-center space-x-2 rounded-md border p-3">
                        <Switch id={`widget-${widget.id}`} defaultChecked />
                        <Label htmlFor={`widget-${widget.id}`} className="flex-1">
                          <div className="font-medium">{widget.title}</div>
                          <div className="text-xs text-muted-foreground">{widget.description}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

