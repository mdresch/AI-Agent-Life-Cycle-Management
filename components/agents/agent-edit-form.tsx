"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

const agentFormSchema = z.object({
  name: z.string().min(2, {
    message: "Agent name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Agent description must be at least 10 characters.",
  }),
  type: z.string({
    required_error: "Please select an agent type.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
})

type AgentFormValues = z.infer<typeof agentFormSchema>

interface AgentEditFormProps {
  agent: {
    id: string
    name: string
    description: string
    type: string
    status: string
    capabilities: string[]
    integrations: string[]
    trainingData: string[]
  }
}

export function AgentEditForm({ agent }: AgentEditFormProps) {
  const router = useRouter()
  const [capabilities, setCapabilities] = useState<string[]>(agent.capabilities)
  const [newCapability, setNewCapability] = useState("")
  const [integrations, setIntegrations] = useState<string[]>(agent.integrations)
  const [newIntegration, setNewIntegration] = useState("")
  const [trainingData, setTrainingData] = useState<string[]>(agent.trainingData)
  const [newTrainingData, setNewTrainingData] = useState("")

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      name: agent.name,
      description: agent.description,
      type: agent.type,
      status: agent.status,
    },
  })

  function onSubmit(data: AgentFormValues) {
    // In a real app, you would send this data to your API
    toast({
      title: "Agent updated",
      description: "Your agent has been updated successfully.",
    })

    // Navigate back to the agent detail page
    router.push(`/agents/${agent.id}`)
  }

  function addCapability() {
    if (newCapability.trim() !== "") {
      setCapabilities([...capabilities, newCapability.trim()])
      setNewCapability("")
    }
  }

  function removeCapability(index: number) {
    setCapabilities(capabilities.filter((_, i) => i !== index))
  }

  function addIntegration() {
    if (newIntegration.trim() !== "") {
      setIntegrations([...integrations, newIntegration.trim()])
      setNewIntegration("")
    }
  }

  function removeIntegration(index: number) {
    setIntegrations(integrations.filter((_, i) => i !== index))
  }

  function addTrainingData() {
    if (newTrainingData.trim() !== "") {
      setTrainingData([...trainingData, newTrainingData.trim()])
      setNewTrainingData("")
    }
  }

  function removeTrainingData(index: number) {
    setTrainingData(trainingData.filter((_, i) => i !== index))
  }

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="training">Training Data</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Edit the basic details of your agent</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Agent name" {...field} />
                      </FormControl>
                      <FormDescription>This is the name of your agent that will be displayed to users.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe what your agent does" className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a clear description of what your agent does and its purpose.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Support">Support</SelectItem>
                          <SelectItem value="Analytics">Analytics</SelectItem>
                          <SelectItem value="Creative">Creative</SelectItem>
                          <SelectItem value="Productivity">Productivity</SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                          <SelectItem value="Communication">Communication</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the category that best describes your agent.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="development">In Development</SelectItem>
                          <SelectItem value="deprecated">Deprecated</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Set the current operational status of your agent.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="capabilities">
        <Card>
          <CardHeader>
            <CardTitle>Agent Capabilities</CardTitle>
            <CardDescription>Define what your agent can do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {capabilities.map((capability, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {capability}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeCapability(index)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add a capability"
                value={newCapability}
                onChange={(e) => setNewCapability(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addCapability()
                  }
                }}
              />
              <Button type="button" onClick={addCapability}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => form.handleSubmit(onSubmit)()}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect your agent with other services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {integrations.map((integration, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {integration}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeIntegration(index)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add an integration"
                value={newIntegration}
                onChange={(e) => setNewIntegration(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addIntegration()
                  }
                }}
              />
              <Button type="button" onClick={addIntegration}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => form.handleSubmit(onSubmit)()}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="training">
        <Card>
          <CardHeader>
            <CardTitle>Training Data</CardTitle>
            <CardDescription>Manage the data sources used to train your agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {trainingData.map((data, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {data}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeTrainingData(index)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add training data source"
                value={newTrainingData}
                onChange={(e) => setNewTrainingData(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTrainingData()
                  }
                }}
              />
              <Button type="button" onClick={addTrainingData}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => form.handleSubmit(onSubmit)()}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

