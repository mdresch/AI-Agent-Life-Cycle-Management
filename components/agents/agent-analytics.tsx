"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface AgentAnalyticsProps {
  agentId: string
  agentName: string
}

export function AgentAnalytics({ agentId, agentName }: AgentAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("7d")

  // Mock data - in a real app, this would come from an API
  const usageData = [
    { date: "Mon", queries: 120, completions: 115 },
    { date: "Tue", queries: 150, completions: 142 },
    { date: "Wed", queries: 180, completions: 175 },
    { date: "Thu", queries: 190, completions: 182 },
    { date: "Fri", queries: 210, completions: 205 },
    { date: "Sat", queries: 150, completions: 145 },
    { date: "Sun", queries: 130, completions: 125 },
  ]

  const performanceData = [
    { date: "Mon", responseTime: 0.8, errorRate: 2.1 },
    { date: "Tue", responseTime: 0.9, errorRate: 1.8 },
    { date: "Wed", responseTime: 1.2, errorRate: 2.5 },
    { date: "Thu", responseTime: 0.7, errorRate: 1.5 },
    { date: "Fri", responseTime: 0.6, errorRate: 1.2 },
    { date: "Sat", responseTime: 0.5, errorRate: 1.0 },
    { date: "Sun", responseTime: 0.7, errorRate: 1.4 },
  ]

  const userFeedbackData = [
    { name: "Excellent", value: 45 },
    { name: "Good", value: 30 },
    { name: "Average", value: 15 },
    { name: "Poor", value: 10 },
  ]

  const COLORS = ["#4ade80", "#60a5fa", "#f59e0b", "#ef4444"]

  const topQueries = [
    { query: "How do I reset my password?", count: 45 },
    { query: "What are your business hours?", count: 32 },
    { query: "How do I cancel my subscription?", count: 28 },
    { query: "Where is my order?", count: 24 },
    { query: "How do I contact support?", count: 19 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics for {agentName}</h2>
          <p className="text-muted-foreground">Monitor performance, usage, and user feedback</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="usage" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
          <TabsTrigger value="queries">Top Queries</TabsTrigger>
        </TabsList>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage Metrics</CardTitle>
              <CardDescription>Number of queries and completions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usageData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="queries" fill="#60a5fa" name="Queries" />
                    <Bar dataKey="completions" fill="#4ade80" name="Completions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Response time and error rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#60a5fa" />
                    <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="responseTime"
                      stroke="#60a5fa"
                      name="Response Time (s)"
                      activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#ef4444" name="Error Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
              <CardDescription>Distribution of user ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userFeedbackData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userFeedbackData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries">
          <Card>
            <CardHeader>
              <CardTitle>Top Queries</CardTitle>
              <CardDescription>Most frequent user queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {topQueries.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{item.query}</p>
                      <p className="text-sm text-muted-foreground">{item.count} queries</p>
                    </div>
                    <div className="ml-auto font-medium">
                      {((item.count / topQueries.reduce((acc, curr) => acc + curr.count, 0)) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

