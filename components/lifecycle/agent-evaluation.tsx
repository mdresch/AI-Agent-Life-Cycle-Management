"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Play,
  Download,
  FileText,
  BarChartIcon,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  RefreshCw,
  Filter,
} from "lucide-react"

export function AgentEvaluation() {
  const [selectedAgent, setSelectedAgent] = useState("customer-support")
  const [activeTab, setActiveTab] = useState("overview")

  const agents = [
    { id: "customer-support", name: "Customer Support Agent" },
    { id: "data-analysis", name: "Data Analysis Agent" },
    { id: "content-generator", name: "Content Generator" },
  ]

  const evaluationMetrics = [
    {
      id: 1,
      name: "Response Quality",
      score: 87,
      benchmark: 80,
      trend: "improving",
      description: "Measures the overall quality and helpfulness of agent responses",
    },
    {
      id: 2,
      name: "Accuracy",
      score: 92,
      benchmark: 90,
      trend: "stable",
      description: "Measures the factual accuracy of information provided by the agent",
    },
    {
      id: 3,
      name: "Task Completion",
      score: 85,
      benchmark: 85,
      trend: "stable",
      description: "Measures the agent's ability to successfully complete assigned tasks",
    },
    {
      id: 4,
      name: "Response Time",
      score: 95,
      benchmark: 85,
      trend: "improving",
      description: "Measures the speed at which the agent responds to queries",
    },
    {
      id: 5,
      name: "Contextual Understanding",
      score: 78,
      benchmark: 75,
      trend: "improving",
      description: "Measures the agent's ability to understand and maintain context",
    },
    {
      id: 6,
      name: "Bias Detection",
      score: 72,
      benchmark: 80,
      trend: "declining",
      description: "Measures the presence of bias in agent responses",
    },
  ]

  const evaluationHistory = [
    {
      id: 1,
      date: "May 10, 2025",
      evaluator: "Automated System",
      type: "Automated",
      metrics: {
        "Response Quality": 87,
        Accuracy: 92,
        "Task Completion": 85,
        "Response Time": 95,
        "Contextual Understanding": 78,
        "Bias Detection": 72,
      },
      status: "completed",
      issues: 2,
    },
    {
      id: 2,
      date: "April 25, 2025",
      evaluator: "Automated System",
      type: "Automated",
      metrics: {
        "Response Quality": 85,
        Accuracy: 91,
        "Task Completion": 83,
        "Response Time": 92,
        "Contextual Understanding": 75,
        "Bias Detection": 75,
      },
      status: "completed",
      issues: 3,
    },
    {
      id: 3,
      date: "April 10, 2025",
      evaluator: "Sarah Johnson",
      type: "Manual",
      metrics: {
        "Response Quality": 82,
        Accuracy: 90,
        "Task Completion": 80,
        "Response Time": 90,
        "Contextual Understanding": 72,
        "Bias Detection": 78,
      },
      status: "completed",
      issues: 4,
    },
    {
      id: 4,
      date: "March 25, 2025",
      evaluator: "Automated System",
      type: "Automated",
      metrics: {
        "Response Quality": 80,
        Accuracy: 88,
        "Task Completion": 78,
        "Response Time": 88,
        "Contextual Understanding": 70,
        "Bias Detection": 80,
      },
      status: "completed",
      issues: 5,
    },
  ]

  const testCases = [
    {
      id: 1,
      name: "Basic Customer Inquiry",
      description: "Tests the agent's ability to handle basic customer inquiries",
      category: "Customer Support",
      status: "passed",
      lastRun: "2 days ago",
    },
    {
      id: 2,
      name: "Complex Product Question",
      description: "Tests the agent's ability to answer complex product questions",
      category: "Customer Support",
      status: "passed",
      lastRun: "2 days ago",
    },
    {
      id: 3,
      name: "Multi-turn Conversation",
      description: "Tests the agent's ability to maintain context across multiple turns",
      category: "Conversation",
      status: "warning",
      lastRun: "2 days ago",
    },
    {
      id: 4,
      name: "Edge Case Handling",
      description: "Tests the agent's ability to handle edge cases and unusual requests",
      category: "Robustness",
      status: "failed",
      lastRun: "2 days ago",
    },
    {
      id: 5,
      name: "Bias and Fairness Test",
      description: "Tests the agent for potential biases in responses",
      category: "Ethics",
      status: "warning",
      lastRun: "2 days ago",
    },
  ]

  const issues = [
    {
      id: 1,
      title: "Inconsistent responses to similar queries",
      description: "Agent provides different answers to similar questions",
      severity: "medium",
      status: "open",
      assignedTo: "David Kim",
      dateIdentified: "May 8, 2025",
    },
    {
      id: 2,
      title: "Potential bias in product recommendations",
      description: "Agent shows preference for certain product categories",
      severity: "high",
      status: "open",
      assignedTo: "Unassigned",
      dateIdentified: "May 10, 2025",
    },
    {
      id: 3,
      title: "Context loss in long conversations",
      description: "Agent loses context after 5+ conversation turns",
      severity: "medium",
      status: "in-progress",
      assignedTo: "Sarah Johnson",
      dateIdentified: "May 5, 2025",
    },
    {
      id: 4,
      title: "Incorrect handling of date-related queries",
      description: "Agent provides wrong information for date-specific questions",
      severity: "low",
      status: "resolved",
      assignedTo: "Michael Chen",
      dateIdentified: "April 28, 2025",
    },
  ]

  const performanceData = [
    { month: "Jan", score: 72 },
    { month: "Feb", score: 75 },
    { month: "Mar", score: 80 },
    { month: "Apr", score: 85 },
    { month: "May", score: 87 },
  ]

  const metricTrendData = evaluationMetrics.map((metric) => {
    return {
      name: metric.name,
      current: metric.score,
      benchmark: metric.benchmark,
    }
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-green-500 hover:bg-green-600">Passed</Badge>
      case "warning":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "open":
        return <Badge variant="outline">Open</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-500 hover:bg-green-600">Resolved</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "stable":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "declining":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Run Evaluation
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overall Evaluation Score</CardTitle>
                <CardDescription>Current performance score based on all metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="relative h-40 w-40 flex items-center justify-center">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <circle
                        className="text-primary stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${(2 * Math.PI * 40 * 85) / 100} ${2 * Math.PI * 40}`}
                        strokeDashoffset={2 * Math.PI * 40 * 0.25}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold">85</div>
                        <div className="text-sm text-muted-foreground">out of 100</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Previous: 82</span>
                    <span className="text-green-500">+3.7%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Benchmark: 80</span>
                    <span className="text-green-500">+6.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Score evolution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Evaluation Metrics</CardTitle>
              <CardDescription>Detailed breakdown of performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {evaluationMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{metric.score}/100</span>
                        <span
                          className={`text-xs ${
                            metric.score >= metric.benchmark
                              ? "text-green-500"
                              : metric.score >= metric.benchmark * 0.9
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {metric.score >= metric.benchmark
                            ? `+${(((metric.score - metric.benchmark) / metric.benchmark) * 100).toFixed(1)}%`
                            : `-${(((metric.benchmark - metric.score) / metric.benchmark) * 100).toFixed(1)}%`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={metric.score} className="h-2" />
                      <span className="text-xs text-muted-foreground w-10">{metric.score}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metrics Comparison</CardTitle>
              <CardDescription>Current scores vs. benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricTrendData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Current Score" fill="#8884d8" />
                    <Bar dataKey="benchmark" name="Benchmark" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test-cases" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search test cases..." className="w-[250px]" />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Create Test Case
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
              <CardDescription>Automated and manual test cases for agent evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Case</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testCases.map((testCase) => (
                    <TableRow key={testCase.id}>
                      <TableCell>
                        <div className="font-medium">{testCase.name}</div>
                        <div className="text-sm text-muted-foreground">{testCase.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{testCase.category}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(testCase.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{testCase.lastRun}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Run
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Test Case</CardTitle>
              <CardDescription>Define a new test case for agent evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="test-name" className="text-sm font-medium">
                  Test Case Name
                </label>
                <Input id="test-name" placeholder="Enter test case name" />
              </div>

              <div className="space-y-2">
                <label htmlFor="test-description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea id="test-description" placeholder="Describe the purpose of this test case" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="test-category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select>
                    <SelectTrigger id="test-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="conversation">Conversation</SelectItem>
                      <SelectItem value="robustness">Robustness</SelectItem>
                      <SelectItem value="ethics">Ethics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="test-type" className="text-sm font-medium">
                    Test Type
                  </label>
                  <Select>
                    <SelectTrigger id="test-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automated">Automated</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="test-input" className="text-sm font-medium">
                  Test Input
                </label>
                <Textarea id="test-input" placeholder="Enter the input to be provided to the agent" />
              </div>

              <div className="space-y-2">
                <label htmlFor="expected-output" className="text-sm font-medium">
                  Expected Output/Behavior
                </label>
                <Textarea id="expected-output" placeholder="Describe the expected output or behavior" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Test Case</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search issues..." className="w-[250px]" />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Identified Issues</CardTitle>
              <CardDescription>Issues identified during evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Date Identified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div className="font-medium">{issue.title}</div>
                        <div className="text-sm text-muted-foreground">{issue.description}</div>
                      </TableCell>
                      <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                      <TableCell>{getStatusBadge(issue.status)}</TableCell>
                      <TableCell>
                        {issue.assignedTo === "Unassigned" ? (
                          <Badge variant="outline">Unassigned</Badge>
                        ) : (
                          issue.assignedTo
                        )}
                      </TableCell>
                      <TableCell>{issue.dateIdentified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report New Issue</CardTitle>
              <CardDescription>Report a new issue identified during evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="issue-title" className="text-sm font-medium">
                  Issue Title
                </label>
                <Input id="issue-title" placeholder="Enter issue title" />
              </div>

              <div className="space-y-2">
                <label htmlFor="issue-description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea id="issue-description" placeholder="Describe the issue in detail" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="issue-severity" className="text-sm font-medium">
                    Severity
                  </label>
                  <Select>
                    <SelectTrigger id="issue-severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="issue-assignee" className="text-sm font-medium">
                    Assign To
                  </label>
                  <Select>
                    <SelectTrigger id="issue-assignee">
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="david-kim">David Kim</SelectItem>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="michael-chen">Michael Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="issue-steps" className="text-sm font-medium">
                  Steps to Reproduce
                </label>
                <Textarea id="issue-steps" placeholder="Provide steps to reproduce the issue" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Submit Issue</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation History</CardTitle>
              <CardDescription>History of previous evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Evaluator</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluationHistory.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell>{evaluation.date}</TableCell>
                      <TableCell>{evaluation.evaluator}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{evaluation.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={
                              Object.values(evaluation.metrics).reduce((sum, value) => sum + value, 0) /
                              Object.values(evaluation.metrics).length
                            }
                            className="h-2 w-[100px]"
                          />
                          <span className="text-sm">
                            {Math.round(
                              Object.values(evaluation.metrics).reduce((sum, value) => sum + value, 0) /
                                Object.values(evaluation.metrics).length,
                            )}
                            %
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {evaluation.issues > 0 ? (
                          <Badge variant={evaluation.issues > 3 ? "destructive" : "outline"}>
                            {evaluation.issues} issues
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500 hover:bg-green-600">No issues</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <BarChartIcon className="mr-2 h-4 w-4" />
                          View Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metrics Comparison Over Time</CardTitle>
              <CardDescription>Compare how metrics have evolved across evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      type="category"
                      allowDuplicatedCategory={false}
                      data={evaluationHistory.map((e) => ({ date: e.date }))}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    {Object.keys(evaluationHistory[0].metrics).map((metric, index) => (
                      <Line
                        key={metric}
                        type="monotone"
                        dataKey={`metrics.${metric}`}
                        data={evaluationHistory}
                        name={metric}
                        stroke={`hsl(${index * 40}, 70%, 50%)`}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

