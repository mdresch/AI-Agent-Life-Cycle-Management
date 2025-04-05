"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

const agentFormSchema = z.object({
  name: z.string().min(3, {
    message: "Agent name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.string({
    required_error: "Please select an agent type.",
  }),
  model: z.string({
    required_error: "Please select a model.",
  }),
  systemPrompt: z.string().min(10, {
    message: "System prompt must be at least 10 characters.",
  }),
  maxTokens: z.coerce.number().min(100).max(4000),
  temperature: z.coerce.number().min(0).max(1),
  tools: z.array(z.string()).optional(),
  autoActivate: z.boolean().default(true),
})

type AgentFormValues = z.infer<typeof agentFormSchema>

const defaultValues: Partial<AgentFormValues> = {
  name: "",
  description: "",
  type: "",
  model: "gpt-4o",
  systemPrompt: "You are a helpful AI assistant.",
  maxTokens: 1000,
  temperature: 0.7,
  tools: [],
  autoActivate: true,
}

export function AgentCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues,
  })

  async function onSubmit(data: AgentFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(data)
    setIsSubmitting(false)
    router.push("/agents")
  }

  const tools = [
    { id: "web-search", label: "Web Search" },
    { id: "database-query", label: "Database Query" },
    { id: "file-access", label: "File Access" },
    { id: "email-send", label: "Email Sending" },
    { id: "calendar-access", label: "Calendar Access" },
    { id: "code-execution", label: "Code Execution" },
  ]

  return (
    <Card className="overflow-hidden border-0 shadow-card">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="w-full grid grid-cols-3 rounded-none border-b bg-muted/50 p-0">
                <TabsTrigger
                  value="basic"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                >
                  Basic Information
                </TabsTrigger>
                <TabsTrigger
                  value="model"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                >
                  Model Configuration
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                >
                  Tools & Capabilities
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="basic" className="space-y-6 mt-0">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">Agent Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Customer Support Agent" {...field} className="input-focus" />
                        </FormControl>
                        <FormDescription className="text-xs">A descriptive name for your AI agent.</FormDescription>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="This agent handles customer support inquiries and helps resolve common issues."
                            className="min-h-[100px] input-focus"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Describe what this agent does and its purpose.
                        </FormDescription>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">Agent Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="input-focus">
                              <SelectValue placeholder="Select agent type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="support">Customer Support</SelectItem>
                            <SelectItem value="analytics">Data Analysis</SelectItem>
                            <SelectItem value="creative">Content Creation</SelectItem>
                            <SelectItem value="productivity">Productivity</SelectItem>
                            <SelectItem value="research">Research</SelectItem>
                            <SelectItem value="communication">Communication</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">
                          The primary function category of this agent.
                        </FormDescription>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="autoActivate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium">Activate immediately</FormLabel>
                          <FormDescription className="text-xs">
                            Automatically activate this agent after creation.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="model" className="space-y-6 mt-0">
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">AI Model</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="input-focus">
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                            <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                            <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">The AI model that powers this agent.</FormDescription>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="systemPrompt"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium">System Prompt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="You are a helpful AI assistant..."
                            className="min-h-[150px] input-focus"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Instructions that define the agent's behavior and capabilities.
                        </FormDescription>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="maxTokens"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium">Max Tokens</FormLabel>
                          <FormControl>
                            <Input type="number" min={100} max={4000} {...field} className="input-focus" />
                          </FormControl>
                          <FormDescription className="text-xs">Maximum response length (100-4000).</FormDescription>
                          <FormMessage className="text-xs font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-medium">Temperature</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} max={1} step={0.1} {...field} className="input-focus" />
                          </FormControl>
                          <FormDescription className="text-xs">Creativity level (0-1).</FormDescription>
                          <FormMessage className="text-xs font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="tools" className="space-y-6 mt-0">
                  <FormField
                    control={form.control}
                    name="tools"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base text-sm font-medium">Available Tools</FormLabel>
                          <FormDescription className="text-xs">
                            Select the tools this agent can use to perform tasks.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {tools.map((tool) => (
                            <FormField
                              key={tool.id}
                              control={form.control}
                              name="tools"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={tool.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(tool.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), tool.id])
                                            : field.onChange(field.value?.filter((value) => value !== tool.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm font-medium">{tool.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex justify-end space-x-4 p-6 pt-0">
              <Button variant="outline" type="button" onClick={() => router.push("/agents")} className="btn-outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Creating..." : "Create Agent"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

