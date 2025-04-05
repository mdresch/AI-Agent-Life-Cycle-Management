"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  SkipForward,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Bot,
  BarChart,
  Download,
  PlusCircle,
} from "lucide-react"
import { TrainingMetrics } from "@/components/studio/training-metrics"
import { Switch } from "@/components/ui/switch"

interface TrainingScenarioProps {
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
  onBack: () => void
}

export function TrainingScenario({ scenario, onBack }: TrainingScenarioProps) {
  const [activeTab, setActiveTab] = useState("examples")
  const [isTraining, setIsTraining] = useState(scenario.status === "in-progress")

  const trainingExamples = [
    {
      id: "example-1",
      input: "How do I reset my password?",
      expectedOutput:
        "To reset your password, please follow these steps:\n\n1. Go to the login page\n2. Click on 'Forgot Password'\n3. Enter your email address\n4. Follow the instructions sent to your email\n\nIf you don't receive the email within a few minutes, please check your spam folder or contact our support team for assistance.",
      status: "completed",
      agentResponse:
        "To reset your password, please follow these steps:\n\n1. Go to the login page\n2. Click on 'Forgot Password'\n3. Enter your email address\n4. Follow the instructions sent to your email\n\nIf you don't receive the email within a few minutes, please check your spam folder or contact our support team for assistance.",
      feedback: "Good response, covers all necessary steps and provides additional help if needed.",
      metrics: {
        accuracy: 95,
        helpfulness: 90,
        clarity: 100,
      },
    },
    {
      id: "example-2",
      input: "What payment methods do you accept?",
      expectedOutput:
        "We accept the following payment methods:\n\n- Credit/debit cards (Visa, Mastercard, American Express)\n- PayPal\n- Bank transfers\n- Apple Pay and Google Pay\n\nIf you have any questions about payment methods or are experiencing issues with payment, please contact our billing department at billing@example.com.",
      status: "completed",
      agentResponse:
        "We accept several payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and digital wallets like Apple Pay and Google Pay. If you need help with payments, please contact our billing team at billing@example.com.",
      feedback: "Good content but could be better formatted for readability.",
      metrics: {
        accuracy: 90,
        helpfulness: 85,
        clarity: 80,
      },
    },
    {
      id: "example-3",
      input: "I was charged twice for my subscription. Can you help?",
      expectedOutput: "",
      status: "in-progress",
      agentResponse:
        "I'm sorry to hear about the double charge. This shouldn't happen, and we'll help resolve this issue. Please provide your account email and order numbers if available, and I'll check what happened. In most cases, we can process a refund for the duplicate charge within 3-5 business days. Would you like me to initiate this process for you?",
      feedback: "",
      metrics: {
        accuracy: 0,
        helpfulness: 0,
        clarity: 0,
      },
    },
    {
      id: "example-4",
      input: "How do I cancel my subscription?",
      expectedOutput: "",
      status: "not-started",
      agentResponse: "",
      feedback: "",
      metrics: {
        accuracy: 0,
        helpfulness: 0,
        clarity: 0,
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <h2 className="text-xl font-bold">{scenario.name}</h2>
          <Badge
            variant={
              scenario.status === "completed" ? "default" : scenario.status === "in-progress" ? "secondary" : "outline"
            }
          >
            {scenario.status === "completed"
              ? "Completed"
              : scenario.status === "in-progress"
                ? "In Progress"
                : "Not Started"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {isTraining ? (
            <>
              <Button variant="outline" onClick={() => setIsTraining(false)}>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
              <Button variant="outline">
                <SkipForward className="mr-2 h-4 w-4" />
                Skip Example
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsTraining(true)}>
              <Play className="mr-2 h-4 w-4" />
              {scenario.status === "not-started" ? "Start Training" : "Resume Training"}
            </Button>
          )}
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Progress
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Training Examples</CardTitle>
            <CardDescription>Train your agent with these examples</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="examples" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="current">Current Example</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="examples" className="space-y-4 pt-4">
                <div className="space-y-2">
                  {trainingExamples.map((example) => (
                    <div
                      key={example.id}
                      className={`rounded-md border p-4 ${
                        example.status === "completed"
                          ? "border-green-200"
                          : example.status === "in-progress"
                            ? "border-blue-200"
                            : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {example.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {example.status === "in-progress" && <RefreshCw className="h-5 w-5 text-blue-500" />}
                          {example.status === "not-started" && (
                            <AlertCircle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <h3 className="font-medium">Example #{trainingExamples.indexOf(example) + 1}</h3>
                        </div>
                        <Badge
                          variant={
                            example.status === "completed"
                              ? "default"
                              : example.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {example.status === "completed"
                            ? "Completed"
                            : example.status === "in-progress"
                              ? "In Progress"
                              : "Not Started"}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">User Input:</p>
                        <p className="text-sm text-muted-foreground">{example.input}</p>
                      </div>
                      {example.status === "completed" && (
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                              <span className="text-xs">{example.metrics.accuracy}% Accuracy</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                              <span className="text-xs">{example.metrics.helpfulness}% Helpfulness</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                              <span className="text-xs">{example.metrics.clarity}% Clarity</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Training Example
                </Button>
              </TabsContent>

              <TabsContent value="current" className="space-y-4 pt-4">
                {trainingExamples.find((e) => e.status === "in-progress") ? (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">User Input</h3>
                      </div>
                      <p className="mt-2 text-sm">{trainingExamples.find((e) => e.status === "in-progress")?.input}</p>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">Agent Response</h3>
                      </div>
                      <p className="mt-2 text-sm whitespace-pre-line">
                        {trainingExamples.find((e) => e.status === "in-progress")?.agentResponse}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expected-response">Expected Response (Optional)</Label>
                      <Textarea
                        id="expected-response"
                        className="min-h-[150px]"
                        placeholder="Enter the ideal response for this input..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback">Feedback</Label>
                      <Textarea
                        id="feedback"
                        className="min-h-[100px]"
                        placeholder="Provide feedback on the agent's response..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Response Evaluation</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accuracy" className="text-xs">
                            Accuracy
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input id="accuracy" type="range" min="0" max="100" step="5" defaultValue="85" />
                            <span className="w-8 text-center">85%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="helpfulness" className="text-xs">
                            Helpfulness
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input id="helpfulness" type="range" min="0" max="100" step="5" defaultValue="80" />
                            <span className="w-8 text-center">80%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="clarity" className="text-xs">
                            Clarity
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input id="clarity" type="range" min="0" max="100" step="5" defaultValue="90" />
                            <span className="w-8 text-center">90%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate Response
                      </Button>
                      <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submit Evaluation
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Active Example</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                      There is no training example currently in progress. Start or resume training to see the current
                      example.
                    </p>
                    <Button className="mt-4" onClick={() => setIsTraining(true)}>
                      <Play className="mr-2 h-4 w-4" />
                      Start Training
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="metrics" className="pt-4">
                <TrainingMetrics scenario={scenario} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
            <CardDescription>Overall progress and metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">{scenario.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${scenario.progress}%` }} />
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium mb-2">Training Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Examples</span>
                  <span>{trainingExamples.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span>{trainingExamples.filter((e) => e.status === "completed").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Progress</span>
                  <span>{trainingExamples.filter((e) => e.status === "in-progress").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Not Started</span>
                  <span>{trainingExamples.filter((e) => e.status === "not-started").length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium mb-2">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span>{scenario.metrics.accuracy}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${scenario.metrics.accuracy}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Satisfaction</span>
                    <span>{scenario.metrics.satisfaction}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${scenario.metrics.satisfaction}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency</span>
                    <span>{scenario.metrics.efficiency}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-purple-500"
                      style={{ width: `${scenario.metrics.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Training Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-progress" className="text-sm">
                    Auto Progress
                  </Label>
                  <Switch id="auto-progress" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically progress to the next example after evaluation
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-mode" className="text-sm">
                  Feedback Mode
                </Label>
                <Select defaultValue="manual">
                  <SelectTrigger id="feedback-mode">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Feedback</SelectItem>
                    <SelectItem value="auto">Auto-Evaluation</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </Button>
              <Button variant="outline">
                <BarChart className="mr-2 h-4 w-4" />
                Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

