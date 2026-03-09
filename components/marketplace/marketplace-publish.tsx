"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockAgents } from "@/lib/mock-data/agents"

const publishFormSchema = z.object({
  agentId: z.string({ required_error: "Please select an agent." }),
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(50, "Description must be at least 50 characters."),
  category: z.enum(
    ["customer-support", "analytics", "creative", "productivity", "research", "communication", "custom"],
    { required_error: "Please select a category." },
  ),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must be semver (e.g. 1.0.0)."),
})

type PublishFormValues = z.infer<typeof publishFormSchema>

export function MarketplacePublish() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PublishFormValues>({
    resolver: zodResolver(publishFormSchema),
    defaultValues: {
      agentId: "",
      title: "",
      description: "",
      version: "",
    },
  })

  function onSubmit(_data: PublishFormValues) {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Your agent has been submitted for review")
      form.reset()
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Your Agent</CardTitle>
        <CardDescription>
          Submit one of your agents to the marketplace for others to discover and install.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="agentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an agent to publish" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockAgents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose an existing agent from your workspace.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Advanced Customer Support Pro" {...field} />
                  </FormControl>
                  <FormDescription>A descriptive title for your marketplace listing.</FormDescription>
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
                    <Textarea
                      placeholder="Describe what your agent does, its key features, and use cases. (min 50 characters)"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value.length}/50 characters minimum.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="customer-support">Customer Support</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="productivity">Productivity</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>The primary category for your agent.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 1.0.0" {...field} />
                    </FormControl>
                    <FormDescription>Semantic version (major.minor.patch).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
