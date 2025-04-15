"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Activity, Bell, CheckCircle, Download, RefreshCw, Search, Settings, Zap, Bot } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function AgentHealthMonitoring() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("24h")
  const [searchQuery, setSearchQuery] = useState("")

  const agents = [
    {
      id: "customer-support",
      name: "Customer Support Agent",
      status: "healthy",
      health: 98,
      responseTime: 1.2,
      errorRate: 0.5,
      uptime: 99.9,
      lastIncident: "None in last 30 days",
      alertsToday: 0,
    },
    {
      id: "data-analysis",
      name: "Data Analysis Agent",
      status: "warning",
      health: 82,
      responseTime: 2.8,
      errorRate: 3.2,
      uptime: 98.5,
      lastIncident: "High latency (2 hours ago)",
      alertsToday: 2,
    },
    {
      id: "content-generator",
      name: "Content Generator",
      status: "degraded",
      health: 65,
      responseTime: 3.5,
      errorRate: 8.7,
      uptime: 94.2,
      lastIncident: "API timeout (1 hour ago)",
      alertsToday: 5,
    },
    {
      id: "email-assistant",
      name: "Email Assistant",
      status: "healthy",
      health: 95,
      responseTime: 1.5,
      errorRate: 1.2,
      uptime: 99.7,
      lastIncident: "Minor error spike (2 days ago)",
      alertsToday: 0,
    },
  ]

  const filteredAgents = agents.filter((agent) => agent.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const selectedAgentData = selectedAgent ? agents.find((a) => a.id === selectedAgent) : null

  const performanceData = [
    { time: "00:00", responseTime: 1.2, errorRate: 0.5, requestVolume: 120 },
    { time: "04:00", responseTime: 1.3, errorRate: 0.7, requestVolume: 85 },
    { time: "08:00", responseTime: 1.8, errorRate: 1.2, requestVolume: 210 },
    { time: "12:00", responseTime: 2.5, errorRate: 3.5, requestVolume: 320 },
    { time: "16:00", responseTime: 2.2, errorRate: 2.8, requestVolume: 280 },
    { time: "20:00", responseTime: 1.5, errorRate: 1.0, requestVolume: 190 },
    { time: "Now", responseTime: 1.3, errorRate: 0.8, requestVolume: 150 },
  ]

  const errorBreakdownData = [
    { name: "API Timeout", count: 12 },
    { name: "Rate Limit", count: 8 },
    { name: "Auth Error", count: 5 },
    { name: "Data Error", count: 15 },
    { name: "Other", count: 3 },
  ]

  const alerts = [
    {
      id: 1,
      agent: "Data Analysis Agent",
      type: "performance",
      message: "Response time above threshold (2.8s > 2.0s)",
      severity: "warning",
      time: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      agent: "Data Analysis Agent",
      type: "error",
      message: "Increased error rate (3.2% > 2.0%)",
      severity: "warning",
      time: "2 hours ago",
      status: "active",
    },
    {
      id: 3,
      agent: "Content Generator",
      type: "performance",
      message: "Response time critical (3.5s > 2.0s)",
      severity: "critical",
      time: "1 hour ago",
      status: "active",
    },
    {
      id: 4,
      agent: "Content Generator",
      type: "error",
      message: "Error rate critical (8.7% > 5.0%)",
      severity: "critical",
      time: "1 hour ago",
      status: "active",
    },
    {
      id: 5,
      agent: "Content Generator",
      type: "availability",
      message: "API timeout detected",
      severity: "critical",
      time: "1 hour ago",
      status: "active",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500 hover:bg-green-600">Healthy</Badge>
      case "warning":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
      case "degraded":
        return <Badge className="bg-red-500 hover:bg-red-600">Degraded</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAlertSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
      case "info":
        return <Badge variant="secondary">Info</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {!selectedAgent ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="24h" onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last hour</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Refresh</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agents.length}</div>
                <div className="flex items-center mt-1">
                  <div className="flex gap-1 text-xs">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {agents.filter((a) => a.status === "healthy").length} Healthy
                    </Badge>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      {agents.filter((a) => a.status === "warning").length} Warning
                    </Badge>
                    <Badge className="bg-red-500 hover:bg-red-600">
                      {agents.filter((a) => a.status === "degraded").length} Degraded
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alerts.length}</div>
                <div className="flex items-center mt-1">
                  <div className="flex gap-1 text-xs">
                    <Badge variant="destructive">
                      {alerts.filter((a) => a.severity === "critical").length} Critical
                    </Badge>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      {alerts.filter((a) => a.severity === "warning").length} Warning
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(agents.reduce((sum, agent) => sum + agent.responseTime, 0) / agents.length).toFixed(1)}s
                </div>
                <p className="text-xs text-muted-foreground mt-1">Across all agents</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(agents.reduce((sum, agent) => sum + agent.health, 0) / agents.length)}%
                </div>
                <div className="h-2 w-full rounded-full bg-secondary mt-2">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.round(agents.reduce((sum, agent) => sum + agent.health, 0) / agents.length)}%`,
                      backgroundColor:
                        Math.round(agents.reduce((sum, agent) => sum + agent.health, 0) / agents.length) > 90
                          ? "#10b981"
                          : Math.round(agents.reduce((sum, agent) => sum + agent.health, 0) / agents.length) > 75
                            ? "#f59e0b"
                            : "#ef4444",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agent Health Status</CardTitle>
              <CardDescription>Monitor the health and performance of your AI agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                      agent.status === "degraded"
                        ? "border-red-200"
                        : agent.status === "warning"
                          ? "border-yellow-200"
                          : "border-green-200"
                    }`}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-full h-3 w-3 ${
                            agent.status === "healthy"
                              ? "bg-green-500"
                              : agent.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <h3 className="font-medium">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Health: {agent.health}% • Response Time: {agent.responseTime}s • Error Rate:{" "}
                            {agent.errorRate}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(agent.status)}
                        {agent.alertsToday > 0 && <Badge variant="destructive">{agent.alertsToday} Alerts</Badge>}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Last incident: {agent.lastIncident}</div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle action
                          }}
                        >
                          <Activity className="mr-2 h-4 w-4" />
                          View Metrics
                        </Button>
                        {(agent.status === "warning" || agent.status === "degraded") && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle action
                            }}
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            Troubleshoot
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>Current issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-md border p-4 ${
                        alert.severity === "critical"
                          ? "border-red-200 bg-red-50 dark:bg-red-950/20"
                          : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{alert.agent}</div>
                          <div className="text-sm">{alert.message}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getAlertSeverityBadge(alert.severity)}
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Bell className="mr-2 h-4 w-4" />
                          Mute
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Acknowledge
                        </Button>
                        <Button size="sm">
                          <Zap className="mr-2 h-4 w-4" />
                          Investigate
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-medium">All Clear</h3>
                    <p className="text-sm text-muted-foreground mt-1">No active alerts at this time</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedAgent(null)}>
              Back to Overview
            </Button>
            <div className="flex items-center gap-2">
              <Select defaultValue="24h">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last hour</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Refresh</span>
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">{selectedAgentData?.name}</h2>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedAgentData?.status || "unknown")}
                  <span className="text-sm text-muted-foreground">Health Score: {selectedAgentData?.health}%</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configure Alerts
              </Button>
              {(selectedAgentData?.status === "warning" || selectedAgentData?.status === "degraded") && (
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Troubleshoot
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedAgentData?.responseTime}s</div>
                <div className="flex items-center mt-1">
                  <div
                    className={`text-xs ${
                      (selectedAgentData?.responseTime || 0) > 2.5
                        ? "text-red-500"
                        : (selectedAgentData?.responseTime || 0) > 2.0
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {(selectedAgentData?.responseTime || 0) > 2.5
                      ? "Critical"
                      : (selectedAgentData?.responseTime || 0) > 2.0
                        ? "Warning"
                        : "Good"}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Threshold: 2.0s</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedAgentData?.errorRate}%</div>
                <div className="flex items-center mt-1">
                  <div
                    className={`text-xs ${
                      (selectedAgentData?.errorRate || 0) > 5.0
                        ? "text-red-500"
                        : (selectedAgentData?.errorRate || 0) > 2.0
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {(selectedAgentData?.errorRate || 0) > 5.0
                      ? "Critical"
                      : (selectedAgentData?.errorRate || 0) > 2.0
                        ? "Warning"
                        : "Good"}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Threshold: 2.0%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedAgentData?.uptime}%</div>
                <div className="flex items-center mt-1">
                  <div
                    className={`text-xs ${
                      (selectedAgentData?.uptime || 0) < 95.0
                        ? "text-red-500"
                        : (selectedAgentData?.uptime || 0) < 99.0
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {(selectedAgentData?.uptime || 0) < 95.0
                      ? "Critical"
                      : (selectedAgentData?.uptime || 0) < 99.0
                        ? "Warning"
                        : "Good"}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Threshold: 99.0%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {alerts.filter((a) => a.agent === selectedAgentData?.name).length}
                </div>
                <div className="flex items-center mt-1">
                  <div
                    className={`text-xs ${
                      alerts.filter((a) => a.agent === selectedAgentData?.name && a.severity === "critical").length > 0
                        ? "text-red-500"
                        : alerts.filter((a) => a.agent === selectedAgentData?.name).length > 0
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {alerts.filter((a) => a.agent === selectedAgentData?.name && a.severity === "critical").length > 0
                      ? "Critical Issues"
                      : alerts.filter((a) => a.agent === selectedAgentData?.name).length > 0
                        ? "Warning Issues"
                        : "All Clear"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance">
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="errors">Errors</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Response time and request volume over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="responseTime"
                        name="Response Time (s)"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="requestVolume"
                        name="Request Volume"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Utilization</CardTitle>
                    <CardDescription>CPU, memory, and API usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">CPU Usage</span>
                          <span className="text-sm">42%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: "42%" }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Memory Usage</span>
                          <span className="text-sm">68%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-purple-500" style={{ width: "68%" }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">API Rate Limit</span>
                          <span className="text-sm">35%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-green-500" style={{ width: "35%" }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Recommendations</CardTitle>
                    <CardDescription>Suggestions to improve agent performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md border p-3">
                        <div className="font-medium">Optimize Knowledge Retrieval</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Response time spikes correlate with knowledge base queries. Consider optimizing the retrieval
                          process.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Apply Optimization
                        </Button>
                      </div>

                      <div className="rounded-md border p-3">
                        <div className="font-medium">Adjust Rate Limiting</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Current rate limits may be causing throttling during peak usage. Consider increasing the
                          limit.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Adjust Limits
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Error Rate Trend</CardTitle>
                  <CardDescription>Error rate over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="errorRate"
                        name="Error Rate (%)"
                        stroke="#ff4d4f"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error Breakdown</CardTitle>
                  <CardDescription>Types of errors encountered</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={errorBreakdownData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Error Count" fill="#ff4d4f" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Errors</CardTitle>
                  <CardDescription>Latest error occurrences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">API Timeout</div>
                        <Badge variant="outline">1 hour ago</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">External API call timed out after 5000ms</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        <code>Error: Request timed out after 5000ms (endpoint: /api/data)</code>
                      </div>
                    </div>

                    <div className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Data Processing Error</div>
                        <Badge variant="outline">2 hours ago</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Failed to process malformed data from user input
                      </p>
                      <div className="text-xs text-muted-foreground mt-2">
                        <code>Error: Cannot read property 'value' of undefined</code>
                      </div>
                    </div>

                    <div className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Rate Limit Exceeded</div>
                        <Badge variant="outline">3 hours ago</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">API rate limit exceeded during peak usage</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        <code>Error: Rate limit exceeded (100 requests/minute)</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Current alerts for this agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.filter((a) => a.agent === selectedAgentData?.name).length > 0 ? (
                      alerts
                        .filter((a) => a.agent === selectedAgentData?.name)
                        .map((alert) => (
                          <div
                            key={alert.id}
                            className={`rounded-md border p-4 ${
                              alert.severity === "critical"
                                ? "border-red-200 bg-red-50 dark:bg-red-950/20"
                                : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium">
                                  {alert.type === "performance"
                                    ? "Performance Alert"
                                    : alert.type === "error"
                                      ? "Error Alert"
                                      : "Availability Alert"}
                                </div>
                                <div className="text-sm">{alert.message}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getAlertSeverityBadge(alert.severity)}
                                <span className="text-xs text-muted-foreground">{alert.time}</span>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Bell className="mr-2 h-4 w-4" />
                                Mute
                              </Button>
                              <Button variant="outline" size="sm">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Acknowledge
                              </Button>
                              <Button size="sm">
                                <Zap className="mr-2 h-4 w-4" />
                                Investigate
                              </Button>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-medium">All Clear</h3>
                        <p className="text-sm text-muted-foreground mt-1">No active alerts for this agent</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Configuration</CardTitle>
                  <CardDescription>Manage alert thresholds and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Performance Thresholds</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="response-time-threshold">Response Time Threshold (s)</Label>
                          <div className="flex items-center space-x-2">
                            <Input id="response-time-threshold" type="number" defaultValue="2.0" step="0.1" min="0.1" />
                            <Select defaultValue="warning">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Severity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="error-rate-threshold">Error Rate Threshold (%)</Label>
                          <div className="flex items-center space-x-2">
                            <Input id="error-rate-threshold" type="number" defaultValue="2.0" step="0.1" min="0.1" />
                            <Select defaultValue="warning">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Severity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="slack-notifications">Slack Notifications</Label>
                          <Switch id="slack-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="webhook-notifications">Webhook Notifications</Label>
                          <Switch id="webhook-notifications" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Configuration</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Logs</CardTitle>
                  <CardDescription>Recent activity and system logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Log level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="error">Error</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="debug">Debug</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Filter logs..." className="max-w-sm" />
                      </div>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Logs
                      </Button>
                    </div>

                    <div className="rounded-md border bg-muted">
                      <div className="p-4 space-y-2 font-mono text-sm">
                        <div className="flex">
                          <span className="text-red-500 mr-2">[ERROR]</span>
                          <span className="text-muted-foreground mr-2">2025-05-10 14:32:15</span>
                          <span>API request to /data/fetch timed out after 5000ms</span>
                        </div>
                        <div className="flex">
                          <span className="text-yellow-500 mr-2">[WARN]</span>
                          <span className="text-muted-foreground mr-2">2025-05-10 14:30:22</span>
                          <span>Rate limit approaching (80% of maximum)</span>
                        </div>
                        <div className="flex">
                          <span className="text-blue-500 mr-2">[INFO]</span>
                          <span className="text-muted-foreground mr-2">2025-05-10 14:28:05</span>
                          <span>Successfully processed 150 requests in the last minute</span>
                        </div>
                        <div className="flex">
                          <span className="text-blue-500 mr-2">[INFO]</span>
                          <span className="text-muted-foreground mr-2">2025-05-10 14:25:18</span>
                          <span>Knowledge base updated successfully</span>
                        </div>
                        <div className="flex">
                          <span className="text-green-500 mr-2">[DEBUG]</span>
                          <span className="text-muted-foreground mr-2">2025-05-10 14:22:33</span>
                          <span>Cache hit ratio: 78.5%</span>
                        </div>
                        <div className="flex">
                          <span className="text-blue-500 mr-2">[INFO]</span>
                          <span className="text-muted-foreground mr-2">2025-05-10 14:20:01</span>
                          <span>Agent configuration reloaded</span>
                        </div>
                        <div className="flex">
                          <span className="text-yellow-500 mr-2">[WARN]</span>
                          <span className="text-muted-foreground mr-2">2025-05-10 14:15:45</span>
                          <span>Slow response detected (2.8s)</span>
                        </div>
                        <div className="flex">
                          <span className="text-blue-500 mr-2">[INFO]</span>
                          <span className="text-muted-foreground mr-2">2025-05-10 14:10:12</span>
                          <span>Processing batch of 50 requests</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

