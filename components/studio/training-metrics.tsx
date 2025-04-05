"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, BarChart4 } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface TrainingMetricsProps {
  scenario: {
    id: string
    name: string
    description: string
    status: string
    progress: number
    metrics: {
      accuracy: number
      satisfaction: number
      efficiency: number
    }
  }
}

export function TrainingMetrics({ scenario }: TrainingMetricsProps) {
  const progressData = [
    { name: "Day 1", accuracy: 65, satisfaction: 60, efficiency: 70 },
    { name: "Day 2", accuracy: 70, satisfaction: 68, efficiency: 75 },
    { name: "Day 3", accuracy: 75, satisfaction: 72, efficiency: 80 },
    { name: "Day 4", accuracy: 80, satisfaction: 76, efficiency: 85 },
    { name: "Day 5", accuracy: 85, satisfaction: 80, efficiency: 90 },
    {
      name: "Current",
      accuracy: scenario.metrics.accuracy,
      satisfaction: scenario.metrics.satisfaction,
      efficiency: scenario.metrics.efficiency,
    },
  ]

  const categoryData = [
    { name: "Product Info", score: 92 },
    { name: "Billing", score: 78 },
    { name: "Technical", score: 85 },
    { name: "Account", score: 88 },
    { name: "Returns", score: 72 },
  ]

  const errorData = [
    { name: "Factual Errors", count: 12 },
    { name: "Incomplete Info", count: 18 },
    { name: "Tone Issues", count: 8 },
    { name: "Formatting", count: 15 },
    { name: "Other", count: 5 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Training Metrics</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline">
            <BarChart4 className="mr-2 h-4 w-4" />
            Advanced Analytics
          </Button>
        </div>
      </div>

      <Tabs defaultValue="progress">
        <TabsList>
          <TabsTrigger value="progress">Progress Over Time</TabsTrigger>
          <TabsTrigger value="categories">Performance by Category</TabsTrigger>
          <TabsTrigger value="errors">Common Errors</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
              <CardDescription>Performance metrics over the training period</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={progressData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="satisfaction" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Category</CardTitle>
              <CardDescription>How the agent performs across different question categories</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Errors</CardTitle>
              <CardDescription>Frequency of different error types during training</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={errorData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Improvement Opportunities</CardTitle>
            <CardDescription>Areas where the agent can improve</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Billing Knowledge</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agent shows lower accuracy when handling billing-related inquiries. Consider adding more training
                  examples in this category.
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Response Completeness</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agent sometimes provides incomplete information. Encourage more comprehensive responses in training
                  feedback.
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Technical Troubleshooting</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agent could improve in step-by-step troubleshooting guidance. Add more structured examples for
                  technical issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
            <CardDescription>Areas where the agent performs well</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Product Information</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agent demonstrates strong knowledge of product features and capabilities, with 92% accuracy in this
                  category.
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Response Efficiency</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agent provides concise and direct answers without unnecessary information, improving user experience.
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Tone and Empathy</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agent maintains a consistently professional and empathetic tone, especially in customer support
                  scenarios.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

