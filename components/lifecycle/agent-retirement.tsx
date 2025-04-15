"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Archive, AlertTriangle, ArrowRight, FileDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AgentRetirement() {
  const [selectedAgent, setSelectedAgent] = useState("")

  const agents = [
    {
      id: "legacy-support",
      name: "Legacy Support Agent",
      type: "Support",
      lastActive: "45 days ago",
      status: "inactive",
      usageDecline: "85%",
      replacedBy: "Customer Support Agent v2",
    },
    {
      id: "old-email",
      name: "Email Assistant v1",
      type: "Communication",
      lastActive: "30 days ago",
      status: "inactive",
      usageDecline: "92%",
      replacedBy: "Email Assistant v2",
    },
    {
      id: "basic-scheduler",
      name: "Basic Scheduling Agent",
      type: "Productivity",
      lastActive: "60 days ago",
      status: "inactive",
      usageDecline: "78%",
      replacedBy: "Scheduling Assistant Pro",
    },
  ]

  const archivedAgents = [
    {
      id: "old-content",
      name: "Content Generator v1",
      type: "Creative",
      archivedDate: "Jan 15, 2025",
      archivedBy: "John Doe",
      reason: "Replaced by improved version with better performance",
    },
    {
      id: "legacy-research",
      name: "Legacy Research Agent",
      type: "Research",
      archivedDate: "Dec 10, 2024",
      archivedBy: "Jane Smith",
      reason: "Outdated methodology and poor performance",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Retirement Candidates</CardTitle>
            <CardDescription>Agents with declining usage that may be candidates for retirement</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Usage Decline</TableHead>
                  <TableHead>Replaced By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.type}</p>
                      </div>
                    </TableCell>
                    <TableCell>{agent.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{agent.usageDecline}</Badge>
                    </TableCell>
                    <TableCell>{agent.replacedBy}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelectedAgent(agent.id)}>
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

        <Card>
          <CardHeader>
            <CardTitle>Retirement Process</CardTitle>
            <CardDescription>Configure the retirement process for the selected agent</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedAgent ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Selected Agent</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{agents.find((a) => a.id === selectedAgent)?.name}</Badge>
                    <Badge variant="secondary">{agents.find((a) => a.id === selectedAgent)?.type}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirement-type">Retirement Type</Label>
                  <Select defaultValue="archive">
                    <SelectTrigger id="retirement-type">
                      <SelectValue placeholder="Select retirement type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="archive">Archive (Preserve Data)</SelectItem>
                      <SelectItem value="redirect">Redirect to Replacement</SelectItem>
                      <SelectItem value="delete">Delete Permanently</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirement-reason">Retirement Reason</Label>
                  <Textarea
                    id="retirement-reason"
                    placeholder="Explain why this agent is being retired..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="replacement-agent">Replacement Agent</Label>
                  <Select
                    defaultValue={agents
                      .find((a) => a.id === selectedAgent)
                      ?.replacedBy.toLowerCase()
                      .replace(/\s+/g, "-")}
                  >
                    <SelectTrigger id="replacement-agent">
                      <SelectValue placeholder="Select replacement agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support-agent-v2">Customer Support Agent v2</SelectItem>
                      <SelectItem value="email-assistant-v2">Email Assistant v2</SelectItem>
                      <SelectItem value="scheduling-assistant-pro">Scheduling Assistant Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirement-date">Retirement Date</Label>
                  <Input type="date" id="retirement-date" />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="notify-users" />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="notify-users"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Notify users
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send notification to users about this agent's retirement
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="export-data" />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="export-data"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Export data before retirement
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Create a backup of all agent data and conversation history
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Agent Selected</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Select an agent from the retirement candidates list to configure the retirement process.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" className="mr-2" disabled={!selectedAgent}>
              Cancel
            </Button>
            <Button disabled={!selectedAgent}>
              <Archive className="mr-2 h-4 w-4" />
              Proceed with Retirement
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Archived Agents</CardTitle>
          <CardDescription>Previously retired agents that have been archived</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Archived Date</TableHead>
                <TableHead>Archived By</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archivedAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>{agent.archivedDate}</TableCell>
                  <TableCell>{agent.archivedBy}</TableCell>
                  <TableCell className="max-w-xs truncate">{agent.reason}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <FileDown className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Restore
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

