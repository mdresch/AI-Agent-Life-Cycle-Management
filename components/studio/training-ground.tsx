"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, PlusCircle, Play, BarChart, FileText } from "lucide-react"
import { TrainingScenario } from "@/components/studio/training-scenario"

interface TrainingGroundProps {
  activeProject: string | null
}

export function TrainingGround({ activeProject }: TrainingGroundProps) {
  const [activeScenario, setActiveScenario] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const scenarios = [
    {
      id: "customer-support-basic",
      name: "Basic Customer Support",
      description: "Train the agent on handling common customer support inquiries",
      status: "completed",
      progress: 100,
      metrics: {
        accuracy: 92,
        satisfaction: 88,
        efficiency: 95,
      },
    },
    {
      id: "billing-inquiries",
      name: "Billing Inquiries",
      description: "Train the agent on handling billing-related questions and issues",
      status: "in-progress",
      progress: 65,
      metrics: {
        accuracy: 78,
        satisfaction: 82,
        efficiency: 85,
      },
    },
    {
      id: "product-features",
      name: "Product Features",
      description: "Train the agent on explaining product features and capabilities",
      status: "not-started",
      progress: 0,
      metrics: {
        accuracy: 0,
        satisfaction: 0,
        efficiency: 0,
      },
    },
    {
      id: "troubleshooting",
      name: "Troubleshooting",
      description: "Train the agent on troubleshooting common product issues",
      status: "not-started",
      progress: 0,
      metrics: {
        accuracy: 0,
        satisfaction: 0,
        efficiency: 0,
      },
    },
  ]

  const filteredScenarios = scenarios.filter(
    (scenario) =>
      scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6">
      {!activeScenario ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search training scenarios..."
                className="h-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Training Scenario
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredScenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                  scenario.status === "completed"
                    ? "border-green-200"
                    : scenario.status === "in-progress"
                      ? "border-blue-200"
                      : ""
                }`}
                onClick={() => setActiveScenario(scenario.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <Badge
                      variant={
                        scenario.status === "completed"
                          ? "default"
                          : scenario.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {scenario.status === "completed"
                        ? "Completed"
                        : scenario.status === "in-progress"
                          ? "In Progress"
                          : "Not Started"}
                    </Badge>
                  </div>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{scenario.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${scenario.progress}%` }} />
                    </div>

                    {scenario.status !== "not-started" && (
                      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-sm font-medium">{scenario.metrics.accuracy}%</div>
                          <div className="text-xs text-muted-foreground">Accuracy</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{scenario.metrics.satisfaction}%</div>
                          <div className="text-xs text-muted-foreground">Satisfaction</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{scenario.metrics.efficiency}%</div>
                          <div className="text-xs text-muted-foreground">Efficiency</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                  <span>20 training examples</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Play className="h-4 w-4" />
                      <span className="sr-only">Start</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Details</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <BarChart className="h-4 w-4" />
                      <span className="sr-only">Metrics</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <TrainingScenario
          scenario={scenarios.find((s) => s.id === activeScenario)!}
          onBack={() => setActiveScenario(null)}
        />
      )}
    </div>
  )
}

