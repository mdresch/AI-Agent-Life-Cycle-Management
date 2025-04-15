"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Wrench, FileCode } from "lucide-react"

export function ProjectToolsConfig({ data, updateData }) {
  const [enabledTools, setEnabledTools] = useState(data.enabledTools || [])
  const [customTools, setCustomTools] = useState(data.customTools || [])
  const [activeToolTab, setActiveToolTab] = useState("available")
  const [selectedTool, setSelectedTool] = useState(null)
  const [newCustomTool, setNewCustomTool] = useState({
    id: "",
    name: "",
    description: "",
    parameters: [],
    implementation: "",
  })
  const [showNewToolForm, setShowNewToolForm] = useState(false)
  // Track if data has been modified to prevent infinite updates
  const [isDataModified, setIsDataModified] = useState(false)

  useEffect(() => {
    if (isDataModified) {
      updateData({
        enabledTools,
        customTools,
      })
      setIsDataModified(false)
    }
  }, [isDataModified, enabledTools, customTools]) // Removed updateData from dependencies

  const availableTools = [
    {
      id: "web-search",
      name: "Web Search",
      description: "Search the web for up-to-date information",
      parameters: [
        { name: "query", type: "string", required: true, description: "Search query string" },
        {
          name: "num_results",
          type: "number",
          required: false,
          description: "Number of results to return",
          defaultValue: "3",
        },
      ],
    },
    {
      id: "knowledge-base",
      name: "Knowledge Base",
      description: "Access internal knowledge base documents",
      parameters: [
        { name: "query", type: "string", required: true, description: "Search query string" },
        { name: "filters", type: "object", required: false, description: "Optional filters to apply" },
      ],
    },
    {
      id: "customer-database",
      name: "Customer Database",
      description: "Query customer information and history",
      parameters: [
        { name: "customer_id", type: "string", required: false, description: "Customer ID" },
        { name: "email", type: "string", required: false, description: "Customer email" },
        { name: "query_type", type: "string", required: true, description: "Type of query to perform" },
      ],
    },
    {
      id: "ticket-system",
      name: "Ticket System",
      description: "Create and update support tickets",
      parameters: [
        { name: "title", type: "string", required: true, description: "Ticket title" },
        { name: "description", type: "string", required: true, description: "Ticket description" },
        { name: "priority", type: "string", required: false, description: "Ticket priority", defaultValue: "medium" },
      ],
    },
  ]

  const toggleTool = (toolId) => {
    if (enabledTools.includes(toolId)) {
      setEnabledTools(enabledTools.filter((id) => id !== toolId))
    } else {
      setEnabledTools([...enabledTools, toolId])
    }
    setIsDataModified(true)
  }

  const handleAddCustomTool = () => {
    if (newCustomTool.name && newCustomTool.description) {
      const toolWithId = {
        ...newCustomTool,
        id: `custom-tool-${Date.now()}`,
      }

      setCustomTools([...customTools, toolWithId])
      setEnabledTools([...enabledTools, toolWithId.id])
      setNewCustomTool({
        id: "",
        name: "",
        description: "",
        parameters: [],
        implementation: "",
      })
      setShowNewToolForm(false)
      setIsDataModified(true)
    }
  }

  const handleAddParameter = () => {
    setNewCustomTool({
      ...newCustomTool,
      parameters: [...newCustomTool.parameters, { name: "", type: "string", required: false, description: "" }],
    })
  }

  const updateParameter = (index, field, value) => {
    const updatedParameters = [...newCustomTool.parameters]
    updatedParameters[index] = {
      ...updatedParameters[index],
      [field]: field === "required" ? value === "true" : value,
    }

    setNewCustomTool({
      ...newCustomTool,
      parameters: updatedParameters,
    })
  }

  const removeParameter = (index) => {
    setNewCustomTool({
      ...newCustomTool,
      parameters: newCustomTool.parameters.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeToolTab} onValueChange={setActiveToolTab}>
        <TabsList>
          <TabsTrigger value="available">Available Tools</TabsTrigger>
          <TabsTrigger value="custom">Custom Tools</TabsTrigger>
          {selectedTool && <TabsTrigger value="configure">Configure Tool</TabsTrigger>}
        </TabsList>

        <TabsContent value="available" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Tools</CardTitle>
              <CardDescription>Configure the tools your agent can use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Input placeholder="Search tools..." className="max-w-sm" />
                  <Button
                    onClick={() => {
                      setShowNewToolForm(true)
                      setActiveToolTab("custom")
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Custom Tool
                  </Button>
                </div>

                <div className="space-y-2">
                  {availableTools.map((tool) => (
                    <div key={tool.id} className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Wrench className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">{tool.name}</h3>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTool(tool)
                              setActiveToolTab("configure")
                            }}
                          >
                            Configure
                          </Button>
                          <Switch
                            checked={enabledTools.includes(tool.id)}
                            onCheckedChange={() => toggleTool(tool.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Tools</CardTitle>
              <CardDescription>Create and manage custom tools for your agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button onClick={() => setShowNewToolForm(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Custom Tool
                </Button>

                {customTools.length === 0 && !showNewToolForm ? (
                  <div className="flex h-[200px] items-center justify-center rounded-md border">
                    <p className="text-center text-muted-foreground">
                      No custom tools yet. Create your first custom tool to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {customTools.map((tool) => (
                      <div key={tool.id} className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Wrench className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h3 className="font-medium">{tool.name}</h3>
                              <p className="text-sm text-muted-foreground">{tool.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedTool(tool)
                                setActiveToolTab("configure")
                              }}
                            >
                              Configure
                            </Button>
                            <Switch
                              checked={enabledTools.includes(tool.id)}
                              onCheckedChange={() => toggleTool(tool.id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {showNewToolForm && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h3 className="text-lg font-medium">New Custom Tool</h3>

                    <div className="space-y-2">
                      <Label htmlFor="tool-name">Tool Name</Label>
                      <Input
                        id="tool-name"
                        value={newCustomTool.name}
                        onChange={(e) => setNewCustomTool({ ...newCustomTool, name: e.target.value })}
                        placeholder="E.g., Data Processor"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tool-description">Description</Label>
                      <Textarea
                        id="tool-description"
                        value={newCustomTool.description}
                        onChange={(e) => setNewCustomTool({ ...newCustomTool, description: e.target.value })}
                        placeholder="Describe what this tool does"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Parameters</Label>
                        <Button variant="outline" size="sm" onClick={handleAddParameter}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Parameter
                        </Button>
                      </div>

                      {newCustomTool.parameters.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No parameters added yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {newCustomTool.parameters.map((param, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2 rounded-md border p-2">
                              <div>
                                <Label className="text-xs">Name</Label>
                                <Input
                                  value={param.name}
                                  onChange={(e) => updateParameter(index, "name", e.target.value)}
                                  placeholder="param_name"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Type</Label>
                                <Select
                                  value={param.type}
                                  onValueChange={(value) => updateParameter(index, "type", value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
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
                              <div>
                                <Label className="text-xs">Required</Label>
                                <Select
                                  value={param.required ? "true" : "false"}
                                  onValueChange={(value) => updateParameter(index, "required", value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-end">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-auto"
                                  onClick={() => removeParameter(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                              <div className="col-span-4">
                                <Label className="text-xs">Description</Label>
                                <Input
                                  value={param.description}
                                  onChange={(e) => updateParameter(index, "description", e.target.value)}
                                  placeholder="Parameter description"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tool-implementation">Implementation</Label>
                      <div className="rounded-md border bg-muted">
                        <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
                          <div className="flex items-center space-x-2">
                            <FileCode className="h-4 w-4" />
                            <span className="text-sm font-medium">JavaScript</span>
                          </div>
                        </div>
                        <Textarea
                          id="tool-implementation"
                          value={newCustomTool.implementation}
                          onChange={(e) => setNewCustomTool({ ...newCustomTool, implementation: e.target.value })}
                          className="min-h-[200px] font-mono text-sm border-0 bg-muted"
                          placeholder={`async function handler(params) {\n  // Your implementation here\n  \n  return {\n    // Return your result\n  };\n}`}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowNewToolForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCustomTool}>Add Tool</Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configure" className="space-y-4 pt-4">
          {selectedTool && (
            <Card>
              <CardHeader>
                <CardTitle>Tool Configuration: {selectedTool.name}</CardTitle>
                <CardDescription>Configure the selected tool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tool Information</Label>
                  <div className="rounded-md border p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">{selectedTool.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">ID</p>
                        <p className="text-sm text-muted-foreground">{selectedTool.id}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm text-muted-foreground">{selectedTool.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Parameters</Label>
                  <div className="rounded-md border">
                    {selectedTool.parameters.map((param, index) => (
                      <div key={index} className="border-b p-4 last:border-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{param.name}</h4>
                            <p className="text-sm text-muted-foreground">{param.description}</p>
                          </div>
                          <Badge variant={param.required ? "default" : "outline"}>
                            {param.required ? "Required" : "Optional"}
                          </Badge>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label className="text-xs">Type</Label>
                            <div className="rounded-md border px-3 py-1 text-sm">{param.type}</div>
                          </div>
                          {param.defaultValue && (
                            <div className="space-y-1">
                              <Label className="text-xs">Default Value</Label>
                              <div className="rounded-md border px-3 py-1 text-sm">{param.defaultValue}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTool.implementation && (
                  <div className="space-y-2">
                    <Label>Implementation</Label>
                    <div className="rounded-md border bg-muted">
                      <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <FileCode className="h-4 w-4" />
                          <span className="text-sm font-medium">JavaScript</span>
                        </div>
                      </div>
                      <pre className="p-4 text-xs overflow-auto">
                        <code>{selectedTool.implementation}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTool(null)
                    setActiveToolTab("available")
                  }}
                >
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

