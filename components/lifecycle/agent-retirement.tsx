"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Archive, AlertTriangle, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

const retirementCandidates = [
  {
    id: "legacy-support",
    name: "Legacy Support Agent",
    type: "Support",
    stage: "maintenance",
    daysInStage: 45,
  },
  {
    id: "old-email",
    name: "Email Assistant v1",
    type: "Communication",
    stage: "maintenance",
    daysInStage: 30,
  },
  {
    id: "basic-scheduler",
    name: "Basic Scheduling Agent",
    type: "Productivity",
    stage: "development",
    daysInStage: 60,
  },
]

type Step = 1 | 2 | 3 | "complete"

export function AgentRetirement() {
  const [selectedAgent, setSelectedAgent] = useState<(typeof retirementCandidates)[0] | null>(null)
  const [step, setStep] = useState<Step>(1)
  const [endDate, setEndDate] = useState("")

  function startRetirement(agent: (typeof retirementCandidates)[0]) {
    setSelectedAgent(agent)
    setStep(1)
  }

  function handleComplete() {
    setStep("complete")
    toast.success(`Agent "${selectedAgent?.name}" has been retired and archived.`)
  }

  function reset() {
    setSelectedAgent(null)
    setStep(1)
    setEndDate("")
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Candidates list */}
        <Card>
          <CardHeader>
            <CardTitle>Retirement Candidates</CardTitle>
            <CardDescription>Agents eligible for retirement based on activity and stage</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {retirementCandidates.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.type}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {agent.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{agent.daysInStage}d</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startRetirement(agent)}
                      >
                        <Archive className="mr-2 h-4 w-4" />
                        Retire
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Retirement workflow */}
        <Card>
          <CardHeader>
            <CardTitle>Retirement Workflow</CardTitle>
            <CardDescription>
              {selectedAgent
                ? `Retiring: ${selectedAgent.name}`
                : "Select an agent to begin the retirement process"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedAgent ? (
              <div className="flex flex-col items-center justify-center h-[280px] text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-base font-medium">No Agent Selected</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Select an agent from the list to begin retirement.
                </p>
              </div>
            ) : step === "complete" ? (
              <div className="flex flex-col items-center justify-center h-[280px] text-center">
                <CheckCircle className="h-14 w-14 text-emerald-500 mb-4" />
                <h3 className="text-base font-semibold">Agent Retired Successfully</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                  <strong>{selectedAgent.name}</strong> has been archived. Configuration is preserved for audit purposes.
                </p>
                <Button variant="outline" className="mt-6" onClick={reset}>
                  Start Another Retirement
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Step indicators */}
                <div className="flex items-center gap-2">
                  {([1, 2, 3] as const).map((s) => (
                    <div key={s} className="flex items-center gap-1">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          step >= s
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {s}
                      </div>
                      {s < 3 && <div className="h-px w-8 bg-muted" />}
                    </div>
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">
                    Step {step} of 3
                  </span>
                </div>

                {/* Step 1: Confirm Intent */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
                      <p className="text-sm font-medium">
                        You are about to retire{" "}
                        <span className="text-primary">{selectedAgent.name}</span>.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Retired agents will no longer accept new requests.
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      Current stage: {selectedAgent.stage}
                    </Badge>
                  </div>
                )}

                {/* Step 2: Set End Date */}
                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Set the date from which the agent will stop accepting new requests.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    {endDate && (
                      <p className="text-xs text-muted-foreground">
                        The agent will stop on{" "}
                        <strong>{new Date(endDate).toLocaleDateString()}</strong>.
                      </p>
                    )}
                  </div>
                )}

                {/* Step 3: Archive Confirm */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                      <p className="text-sm font-medium">Retirement Summary</p>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="text-muted-foreground">Agent: </span>
                          <span className="font-medium">{selectedAgent.name}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">End date: </span>
                          <span className="font-medium">
                            {endDate
                              ? new Date(endDate).toLocaleDateString()
                              : "Immediately"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The agent configuration will be archived and stored for audit purposes.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          {selectedAgent && step !== "complete" && (
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (step === 1) reset()
                  else setStep((s) => (s === 2 ? 1 : 2) as Step)
                }}
              >
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              <Button
                variant={step === 3 ? "destructive" : "default"}
                onClick={() => {
                  if (step === 3) handleComplete()
                  else setStep((s) => (s === 1 ? 2 : 3) as Step)
                }}
                disabled={step === 2 && !endDate}
              >
                {step === 1 && "Confirm Retirement"}
                {step === 2 && "Set End Date"}
                {step === 3 && "Archive & Retire"}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
