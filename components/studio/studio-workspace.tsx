"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Search,
  PlusCircle,
  Save,
  Play,
  Settings,
  Trash2,
  Copy,
  MoreHorizontal,
  MessageSquare,
  Wrench,
  FileCode,
  Layers,
  Cpu,
} from "lucide-react"

interface StudioWorkspaceProps {
  activeProject: string | null
  setActiveProject: (project: string | null) => void
}

export function StudioWorkspace({ activeProject, setActiveProject }: StudioWorkspaceProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const projects = [
    {
      id: "customer-support",
      name: "Customer Support Agent",
      description: "AI agent for handling customer inquiries and support tickets",
      lastUpdated: "2 hours ago",
      status: "active",
      model: "gpt-4o",
    },
    {
      id: "data-analysis",
      name: "Data Analysis Agent",
      description: "AI agent for analyzing data and generating insights",
      lastUpdated: "Yesterday",
      status: "draft",
      model: "gpt-4o",
    },
    {
      id: "content-generator",
      name: "Content Generator",
      description: "AI agent for creating marketing content and social media posts",
      lastUpdated: "3 days ago",
      status: "active",
      model: "claude-3-opus",
    },
    {
      id: "research-assistant",
      name: "Research Assistant",
      description: "AI agent for conducting research and summarizing findings",
      lastUpdated: "1 week ago",
      status: "active",
      model: "gpt-4o",
    },
  ]

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleNewProject = () => {
    router.push("/studio/new-project")
  }

  return (
    <div className="p-6">
      {!activeProject ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="h-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleNewProject}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setActiveProject(project.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Cpu className="mr-1 h-4 w-4" />
                    <span>{project.model}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                  <span>Updated {project.lastUpdated}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Play className="h-4 w-4" />
                      <span className="sr-only">Test</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Settings</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setActiveProject(null)}>
                Back to Projects
              </Button>
              <h2 className="text-xl font-bold">{projects.find((p) => p.id === activeProject)?.name}</h2>
              <Badge variant="outline">{projects.find((p) => p.id === activeProject)?.model}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Test
              </Button>
              <Button variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          <Tabs defaultValue="configuration">
            <TabsList>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="prompts">Prompts</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
            </TabsList>

            <TabsContent value="configuration" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Configuration</CardTitle>
                  <CardDescription>Configure the basic settings for your AI agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-name">Agent Name</Label>
                      <Input id="agent-name" defaultValue={projects.find((p) => p.id === activeProject)?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-model">Model</Label>
                      <Select defaultValue={projects.find((p) => p.id === activeProject)?.model}>
                        <SelectTrigger id="agent-model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                          <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                          <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agent-description">Description</Label>
                    <Textarea
                      id="agent-description"
                      defaultValue={projects.find((p) => p.id === activeProject)?.description}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-temperature">Temperature</Label>
                      <div className="flex items-center space-x-2">
                        <Input id="agent-temperature" type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
                        <span className="w-12 text-center">0.7</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-max-tokens">Max Tokens</Label>
                      <Input id="agent-max-tokens" type="number" defaultValue="1024" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="agent-active">Active</Label>
                      <Switch
                        id="agent-active"
                        defaultChecked={projects.find((p) => p.id === activeProject)?.status === "active"}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When active, this agent will be available for use in the platform
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Configuration</CardTitle>
                  <CardDescription>Fine-tune your agent's behavior and capabilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-system-prompt">System Prompt</Label>
                    <Textarea
                      id="agent-system-prompt"
                      className="min-h-[150px] font-mono text-sm"
                      defaultValue={`You are a helpful AI assistant designed to provide customer support for our product. 
You should be friendly, professional, and concise in your responses.

When helping customers:
1. Greet them politely
2. Address their specific question or issue
3. Provide clear, step-by-step solutions when applicable
4. Ask clarifying questions if needed
5. End with an offer for additional help

You have access to product documentation and can help with common issues like account setup, billing questions, and basic troubleshooting.`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Response Format</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="format-markdown" defaultChecked />
                        <Label htmlFor="format-markdown">Allow Markdown</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="format-code" defaultChecked />
                        <Label htmlFor="format-code">Allow Code Blocks</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="format-lists" defaultChecked />
                        <Label htmlFor="format-lists">Allow Lists</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="format-tables" defaultChecked />
                        <Label htmlFor="format-tables">Allow Tables</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Behavior Controls</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="behavior-refusal" defaultChecked />
                        <Label htmlFor="behavior-refusal">Enable Content Refusal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="behavior-citations" defaultChecked />
                        <Label htmlFor="behavior-citations">Require Citations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="behavior-clarification" defaultChecked />
                        <Label htmlFor="behavior-clarification">Ask for Clarification</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="behavior-reasoning" defaultChecked />
                        <Label htmlFor="behavior-reasoning">Show Reasoning</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prompts" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prompt Templates</CardTitle>
                  <CardDescription>Create and manage prompt templates for your agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Input placeholder="Search templates..." className="max-w-sm" />
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Template
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-medium">General Support Inquiry</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Duplicate</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Template for handling general customer support inquiries
                        </p>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-medium">Billing Issue</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Duplicate</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Template for addressing billing-related questions and issues
                        </p>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-medium">Product Feature Explanation</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Duplicate</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Template for explaining product features and capabilities
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prompt Editor</CardTitle>
                  <CardDescription>Edit and test prompt templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input id="template-name" defaultValue="General Support Inquiry" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-content">Template Content</Label>
                    <Textarea
                      id="template-content"
                      className="min-h-[200px] font-mono text-sm"
                      defaultValue={`I need help with {{issue}}. 

I've been a customer for {{duration}} and I'm using the {{product_version}} version of your product.

{{additional_details}}

Can you please help me resolve this issue?`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Variables</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="var-issue" className="text-xs">
                          issue
                        </Label>
                        <Input id="var-issue" placeholder="Enter issue" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="var-duration" className="text-xs">
                          duration
                        </Label>
                        <Input id="var-duration" placeholder="Enter duration" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="var-product-version" className="text-xs">
                          product_version
                        </Label>
                        <Input id="var-product-version" placeholder="Enter product version" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="var-additional-details" className="text-xs">
                          additional_details
                        </Label>
                        <Input id="var-additional-details" placeholder="Enter additional details" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Preview</Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Play className="mr-2 h-4 w-4" />
                      Test
                    </Button>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Template
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Tools</CardTitle>
                  <CardDescription>Configure the tools your agent can use</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Input placeholder="Search tools..." className="max-w-sm" />
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Custom Tool
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Wrench className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h3 className="font-medium">Web Search</h3>
                              <p className="text-sm text-muted-foreground">Search the web for up-to-date information</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Wrench className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h3 className="font-medium">Knowledge Base</h3>
                              <p className="text-sm text-muted-foreground">Access internal knowledge base documents</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Wrench className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h3 className="font-medium">Customer Database</h3>
                              <p className="text-sm text-muted-foreground">Query customer information and history</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Wrench className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h3 className="font-medium">Ticket System</h3>
                              <p className="text-sm text-muted-foreground">Create and update support tickets</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tool Configuration</CardTitle>
                  <CardDescription>Configure the selected tool</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tool-name">Tool Name</Label>
                    <Input id="tool-name" defaultValue="Web Search" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tool-description">Description</Label>
                    <Textarea
                      id="tool-description"
                      className="min-h-[100px]"
                      defaultValue="Search the web for up-to-date information on various topics. Use this tool when you need to provide current information that might not be in your training data."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tool-parameters">Parameters</Label>
                    <div className="rounded-md border">
                      <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">query</h4>
                            <p className="text-sm text-muted-foreground">The search query to execute</p>
                          </div>
                          <Badge>Required</Badge>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="param-type" className="text-xs">
                              Type
                            </Label>
                            <Select defaultValue="string">
                              <SelectTrigger id="param-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="string">String</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="boolean">Boolean</SelectItem>
                                <SelectItem value="array">Array</SelectItem>
                                <SelectItem value="object">Object</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="param-description" className="text-xs">
                              Description
                            </Label>
                            <Input id="param-description" defaultValue="Search query string" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">num_results</h4>
                            <p className="text-sm text-muted-foreground">Number of search results to return</p>
                          </div>
                          <Badge variant="outline">Optional</Badge>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="param-type-2" className="text-xs">
                              Type
                            </Label>
                            <Select defaultValue="number">
                              <SelectTrigger id="param-type-2">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="string">String</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="boolean">Boolean</SelectItem>
                                <SelectItem value="array">Array</SelectItem>
                                <SelectItem value="object">Object</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="param-default" className="text-xs">
                              Default Value
                            </Label>
                            <Input id="param-default" defaultValue="3" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-2">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Parameter
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tool-code">Implementation</Label>
                    <div className="rounded-md border bg-muted">
                      <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <FileCode className="h-4 w-4" />
                          <span className="text-sm font-medium">web-search.js</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="p-4">
                        <pre className="text-xs overflow-auto">
                          <code>{`async function webSearch(params) {
const { query, num_results = 3 } = params;

// Implementation would connect to a search API
console.log(\`Searching for: \${query}, results: \${num_results}\`);

// Mock response for demonstration
return {
  results: [
    {
      title: "Example Search Result 1",
      url: "https://example.com/result1",
      snippet: "This is a snippet from the first search result..."
    },
    {
      title: "Example Search Result 2",
      url: "https://example.com/result2",
      snippet: "This is a snippet from the second search result..."
    },
    {
      title: "Example Search Result 3",
      url: "https://example.com/result3",
      snippet: "This is a snippet from the third search result..."
    }
  ]
};
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Test Tool</Button>
                  <Button>Save Configuration</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Sources</CardTitle>
                  <CardDescription>Manage the knowledge sources for your agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Search knowledge sources..." className="max-w-sm" />
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="document">Documents</SelectItem>
                          <SelectItem value="database">Databases</SelectItem>
                          <SelectItem value="api">APIs</SelectItem>
                          <SelectItem value="website">Websites</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Knowledge Source
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Layers className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Product Documentation</h3>
                            <p className="text-sm text-muted-foreground">
                              Official product documentation and user guides
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>Document</Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Layers className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">FAQ Database</h3>
                            <p className="text-sm text-muted-foreground">Frequently asked questions and answers</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>Database</Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Layers className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Support Knowledge Base</h3>
                            <p className="text-sm text-muted-foreground">Internal knowledge base for support agents</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>Document</Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Layers className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">Company Website</h3>
                            <p className="text-sm text-muted-foreground">Public company website content</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>Website</Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Configuration</CardTitle>
                  <CardDescription>Configure how your agent uses knowledge sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="retrieval-strategy">Retrieval Strategy</Label>
                    <Select defaultValue="semantic">
                      <SelectTrigger id="retrieval-strategy">
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semantic">Semantic Search</SelectItem>
                        <SelectItem value="keyword">Keyword Search</SelectItem>
                        <SelectItem value="hybrid">Hybrid Search</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Determines how the agent retrieves information from knowledge sources
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chunk-size">Chunk Size</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="chunk-size" type="range" min="100" max="1000" step="50" defaultValue="500" />
                      <span className="w-12 text-center">500</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Size of text chunks for knowledge retrieval (in tokens)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="top-k">Top K Results</Label>
                    <Input id="top-k" type="number" defaultValue="5" />
                    <p className="text-sm text-muted-foreground">
                      Number of top results to retrieve from knowledge sources
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-citation">Automatic Citations</Label>
                      <Switch id="auto-citation" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically add citations to responses based on knowledge sources
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="knowledge-fallback">Knowledge Fallback</Label>
                      <Switch id="knowledge-fallback" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Fall back to model knowledge when no relevant information is found in knowledge sources
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Configuration</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="testing" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test Cases</CardTitle>
                  <CardDescription>Create and manage test cases for your agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Input placeholder="Search test cases..." className="max-w-sm" />
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Test Case
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Basic Product Question</h3>
                          <p className="text-sm text-muted-foreground">
                            Tests agent's ability to answer basic product questions
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">5 test inputs</Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Run
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Billing Inquiries</h3>
                          <p className="text-sm text-muted-foreground">
                            Tests agent's handling of billing-related questions
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">3 test inputs</Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Run
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Troubleshooting Scenarios</h3>
                          <p className="text-sm text-muted-foreground">
                            Tests agent's ability to troubleshoot common issues
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">7 test inputs</Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Run
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Edge Cases</h3>
                          <p className="text-sm text-muted-foreground">
                            Tests agent's handling of unusual or edge case scenarios
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">4 test inputs</Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Run
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Case Editor</CardTitle>
                  <CardDescription>Create and edit test cases for your agent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-name">Test Case Name</Label>
                    <Input id="test-name" defaultValue="Basic Product Question" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="test-description">Description</Label>
                    <Textarea
                      id="test-description"
                      className="min-h-[100px]"
                      defaultValue="Tests the agent's ability to answer basic questions about product features, pricing, and availability."
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Test Inputs</Label>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Input
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Test Input #1</h4>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 space-y-2">
                          <Label htmlFor="test-input-1" className="text-xs">
                            User Input
                          </Label>
                          <Textarea
                            id="test-input-1"
                            className="min-h-[80px]"
                            defaultValue="What features are included in the premium plan?"
                          />
                        </div>
                        <div className="mt-2 space-y-2">
                          <Label htmlFor="test-expected-1" className="text-xs">
                            Expected Response (Optional)
                          </Label>
                          <Textarea
                            id="test-expected-1"
                            className="min-h-[80px]"
                            placeholder="Enter expected response or leave blank to manually evaluate"
                          />
                        </div>
                        <div className="mt-2 space-y-2">
                          <Label className="text-xs">Evaluation Criteria</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="criteria-1-1" defaultChecked />
                              <Label htmlFor="criteria-1-1" className="text-xs">
                                Must mention all premium features
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="criteria-1-2" defaultChecked />
                              <Label htmlFor="criteria-1-2" className="text-xs">
                                Must include pricing information
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="criteria-1-3" defaultChecked />
                              <Label htmlFor="criteria-1-3" className="text-xs">
                                Should compare with other plans
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Test Input #2</h4>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 space-y-2">
                          <Label htmlFor="test-input-2" className="text-xs">
                            User Input
                          </Label>
                          <Textarea
                            id="test-input-2"
                            className="min-h-[80px]"
                            defaultValue="Is your product available in Europe?"
                          />
                        </div>
                        <div className="mt-2 space-y-2">
                          <Label htmlFor="test-expected-2" className="text-xs">
                            Expected Response (Optional)
                          </Label>
                          <Textarea
                            id="test-expected-2"
                            className="min-h-[80px]"
                            placeholder="Enter expected response or leave blank to manually evaluate"
                          />
                        </div>
                        <div className="mt-2 space-y-2">
                          <Label className="text-xs">Evaluation Criteria</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="criteria-2-1" defaultChecked />
                              <Label htmlFor="criteria-2-1" className="text-xs">
                                Must clearly state European availability
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="criteria-2-2" defaultChecked />
                              <Label htmlFor="criteria-2-2" className="text-xs">
                                Should mention supported countries
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Run Test Case
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Test Case
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

