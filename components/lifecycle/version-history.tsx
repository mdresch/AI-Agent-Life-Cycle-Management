"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Clock, GitBranch, GitMerge, RotateCcw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function VersionHistory() {
  const [selectedAgent, setSelectedAgent] = useState("customer-support")

  const agents = [
    { id: "customer-support", name: "Customer Support Agent" },
    { id: "data-analysis", name: "Data Analysis Agent" },
    { id: "content-generator", name: "Content Generator" },
  ]

  const versions = [
    {
      id: 1,
      version: "v2.3.0",
      date: "Apr 15, 2025",
      author: "John Doe",
      changes: "Added support for multi-step reasoning and improved response quality",
      status: "current",
    },
    {
      id: 2,
      version: "v2.2.1",
      date: "Mar 28, 2025",
      author: "Jane Smith",
      changes: "Fixed issue with API rate limiting and improved error handling",
      status: "previous",
    },
    {
      id: 3,
      version: "v2.2.0",
      date: "Mar 10, 2025",
      author: "Bob Johnson",
      changes: "Added integration with knowledge base and enhanced context retention",
      status: "previous",
    },
    {
      id: 4,
      version: "v2.1.0",
      date: "Feb 22, 2025",
      author: "Alice Brown",
      changes: "Implemented improved sentiment analysis and response personalization",
      status: "previous",
    },
    {
      id: 5,
      version: "v2.0.0",
      date: "Jan 15, 2025",
      author: "John Doe",
      changes: "Major update with new model and completely redesigned prompt structure",
      status: "previous",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <GitBranch className="mr-2 h-4 w-4" />
            Create Branch
          </Button>
          <Button variant="outline" size="sm">
            <GitMerge className="mr-2 h-4 w-4" />
            Merge Versions
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Version History</CardTitle>
              <CardDescription>Track changes and updates to your AI agent over time</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Rollback
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Version</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Changes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((version) => (
                <TableRow key={version.id}>
                  <TableCell className="font-medium">{version.version}</TableCell>
                  <TableCell>{version.date}</TableCell>
                  <TableCell>{version.author}</TableCell>
                  <TableCell className="max-w-xs truncate">{version.changes}</TableCell>
                  <TableCell>
                    <Badge variant={version.status === "current" ? "default" : "outline"}>{version.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Clock className="h-4 w-4" />
                        <span className="sr-only">View history</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Compare with previous</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">Compare with next</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>Compare performance metrics between versions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Response Time</span>
                <div className="flex items-center">
                  <span className="text-sm mr-2">v2.2.1: 1.5s</span>
                  <ArrowRight className="h-4 w-4 mx-1" />
                  <span className="text-sm ml-2">v2.3.0: 1.2s</span>
                  <Badge variant="outline" className="ml-2 text-green-500">
                    -20%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Success Rate</span>
                <div className="flex items-center">
                  <span className="text-sm mr-2">v2.2.1: 92.5%</span>
                  <ArrowRight className="h-4 w-4 mx-1" />
                  <span className="text-sm ml-2">v2.3.0: 94.8%</span>
                  <Badge variant="outline" className="ml-2 text-green-500">
                    +2.3%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User Satisfaction</span>
                <div className="flex items-center">
                  <span className="text-sm mr-2">v2.2.1: 4.2/5</span>
                  <ArrowRight className="h-4 w-4 mx-1" />
                  <span className="text-sm ml-2">v2.3.0: 4.5/5</span>
                  <Badge variant="outline" className="ml-2 text-green-500">
                    +7.1%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Version Notes</CardTitle>
            <CardDescription>Detailed information about the current version</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">v2.3.0 Release Notes</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This version introduces multi-step reasoning capabilities, allowing the agent to break down complex
                  problems into manageable steps. The response quality has been improved through enhanced context
                  understanding and more natural language generation.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Key Changes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Implemented chain-of-thought reasoning</li>
                  <li>Improved context retention across conversation turns</li>
                  <li>Enhanced response quality with better natural language generation</li>
                  <li>Optimized performance for faster response times</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Dependencies</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Model: GPT-4o
                  <br />
                  Framework: AutoGen v2.1.0
                  <br />
                  Tools: 5 enabled
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

