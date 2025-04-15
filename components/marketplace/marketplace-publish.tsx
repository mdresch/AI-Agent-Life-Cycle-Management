"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Upload, Plus, X } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const publishFormSchema = z.object({
  name: z.string().min(3, {
    message: "Agent name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Please add at least one tag.",
  }),
  pricingModel: z.string({
    required_error: "Please select a pricing model.",
  }),
  price: z.string().optional(),
  termsAgreed: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

type PublishFormValues = z.infer<typeof publishFormSchema>

export function MarketplacePublish() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTag, setCurrentTag] = useState("")

  const form = useForm<PublishFormValues>({
    resolver: zodResolver(publishFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
      pricingModel: "free",
      price: "",
      termsAgreed: false,
    },
  })

  const watchPricingModel = form.watch("pricingModel")
  const watchTags = form.watch("tags")

  const addTag = () => {
    if (currentTag && !watchTags.includes(currentTag)) {
      form.setValue("tags", [...watchTags, currentTag])
      setCurrentTag("")
    }
  }

  const removeTag = (tag: string) => {
    form.setValue(
      "tags",
      watchTags.filter((t) => t !== tag),
    )
  }

  function onSubmit(data: PublishFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsSubmitting(false)
      // Reset form or show success message
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Your Agent</CardTitle>
        <CardDescription>Share your AI agent with the community or sell it on the marketplace</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <h3 className="text-lg font-medium">Basic Information</h3>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome Agent" {...field} />
                      </FormControl>
                      <FormDescription>A descriptive name for your AI agent.</FormDescription>
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
                          placeholder="Describe what your agent does and its key features..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A detailed description of your agent's capabilities and use cases.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="analytics">Data Analytics</SelectItem>
                          <SelectItem value="creative">Creative & Content</SelectItem>
                          <SelectItem value="productivity">Productivity</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The primary category for your agent.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addTag()
                            }
                          }}
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {watchTags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="rounded-full hover:bg-muted p-0.5"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {tag} tag</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormDescription>Add relevant tags to help users discover your agent.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <h3 className="text-lg font-medium">Pricing</h3>

                <FormField
                  control={form.control}
                  name="pricingModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pricing Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pricing model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="one-time">One-time Purchase</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How you want to monetize your agent.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchPricingModel !== "free" && (
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price {watchPricingModel === "subscription" && "(per month)"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">$</span>
                            <Input placeholder="9.99" className="pl-7" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>Set a competitive price for your agent.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="grid gap-3">
                <h3 className="text-lg font-medium">Agent Files</h3>

                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <h4 className="text-sm font-medium">Drag and drop your agent files</h4>
                  <p className="text-xs text-muted-foreground mt-1">Or click to browse files (max 50MB)</p>
                  <Button variant="outline" className="mt-4">
                    Select Files
                  </Button>
                </div>
              </div>

              <FormField
                control={form.control}
                name="termsAgreed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Terms and Conditions</FormLabel>
                      <FormDescription>
                        I agree to the marketplace terms and conditions, and confirm that my agent complies with all
                        guidelines.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-end px-0">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Publishing..." : "Publish Agent"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

