"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Search, PlusCircle, Copy, Trash2, Star, StarHalf, MessageSquare, Bot, Sparkles, Pencil } from "lucide-react"

export function PromptLibrary() {
  const [activePrompt, setActivePrompt] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const promptCategories = [
    { id: "all", name: "All Categories", count: 156 },
    { id: "customer-support", name: "Customer Support", count: 42 },
    { id: "marketing", name: "Marketing", count: 35 },
    { id: "sales", name: "Sales", count: 28 },
    { id: "technical", name: "Technical", count: 22 },
    { id: "general", name: "General", count: 18 },
    { id: "creative", name: "Creative", count: 11 },
  ]

  const prompts = [
    {
      id: "prompt-1",
      title: "Customer Support Introduction",
      description: "A friendly introduction for customer support conversations",
      category: "customer-support",
      tags: ["greeting", "support", "introduction"],
      rating: 5,
      usageCount: 128,
      content:
        "Hello! I'm {{agent_name}}, your customer support assistant. I'm here to help with any questions or issues you might have regarding {{product_name}}. How can I assist you today?",
      variables: ["agent_name", "product_name"],
      createdBy: "John Doe",
      createdAt: "2 weeks ago",
    },
    {
      id: "prompt-2",
      title: "Technical Troubleshooting",
      description: "Guide for technical troubleshooting scenarios",
      category: "technical",
      tags: ["troubleshooting", "technical", "support"],
      rating: 4.5,
      usageCount: 95,
      content:
        "I understand you're experiencing an issue with {{feature_name}}. Let's troubleshoot this together.\n\nFirst, could you please tell me:\n\n1. What version of {{product_name}} are you using?\n2. When did you first notice this issue?\n3. Have you made any recent changes to your settings?\n\nThis information will help me provide a more accurate solution.",
      variables: ["feature_name", "product_name"],
      createdBy: "Jane Smith",
      createdAt: "1 month ago",
    },
    {
      id: "prompt-3",
      title: "Product Feature Explanation",
      description: "Explains product features in a clear, concise manner",
      category: "sales",
      tags: ["features", "explanation", "product"],
      rating: 4.8,
      usageCount: 112,
      content:
        "{{feature_name}} is one of our most powerful features in {{product_name}}. Here's what it does and how it can benefit you:\n\n**What it does:**\n{{feature_description}}\n\n**Key benefits:**\n- {{benefit_1}}\n- {{benefit_2}}\n- {{benefit_3}}\n\n**How to get started:**\n{{getting_started_steps}}\n\nWould you like me to explain any specific aspect of this feature in more detail?",
      variables: [
        "feature_name",
        "product_name",
        "feature_description",
        "benefit_1",
        "benefit_2",
        "benefit_3",
        "getting_started_steps",
      ],
      createdBy: "Michael Johnson",
      createdAt: "3 weeks ago",
    },
    {
      id: "prompt-4",
      title: "Marketing Campaign Idea",
      description: "Generates creative marketing campaign ideas",
      category: "marketing",
      tags: ["marketing", "creative", "campaign"],
      rating: 4.2,
      usageCount: 78,
      content:
        "Here's a creative marketing campaign idea for {{product_name}} targeting {{target_audience}}:\n\n**Campaign Name:** {{campaign_name}}\n\n**Concept:**\n{{campaign_concept}}\n\n**Key Messaging:**\n- {{message_1}}\n- {{message_2}}\n- {{message_3}}\n\n**Channels:**\n{{channels}}\n\n**Timeline:**\n{{timeline}}\n\n**Expected Outcomes:**\n{{outcomes}}",
      variables: [
        "product_name",
        "target_audience",
        "campaign_name",
        "campaign_concept",
        "message_1",
        "message_2",
        "message_3",
        "channels",
        "timeline",
        "outcomes",
      ],
      createdBy: "Sarah Williams",
      createdAt: "1 month ago",
    },
  ]

  const filteredPrompts = prompts.filter(
    (prompt) =>
      (activeCategory === "all" || prompt.category === activeCategory) &&
      (prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Browse prompts by category</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 p-2">
                {promptCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{category.name}</span>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Category
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-3">
          {!activePrompt ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prompts..."
                    className="h-9 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Prompt
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrompts.map((prompt) => (
                  <Card
                    key={prompt.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => setActivePrompt(prompt.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{prompt.title}</CardTitle>
                        <div className="flex items-center">
                          {prompt.rating === 5 ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          )}
                          <span className="ml-1 text-sm">{prompt.rating}</span>
                        </div>
                      </div>
                      <CardDescription>{prompt.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {prompt.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">{prompt.variables.length}</span> variables • Used{" "}
                        <span className="font-medium">{prompt.usageCount}</span> times
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between text-xs text-muted-foreground">
                      <span>By {prompt.createdBy}</span>
                      <span>{prompt.createdAt}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <Button variant="outline" className="mb-2" onClick={() => setActivePrompt(null)}>
                      Back to Library
                    </Button>
                    <CardTitle>{prompts.find((p) => p.id === activePrompt)?.title}</CardTitle>
                    <CardDescription>{prompts.find((p) => p.id === activePrompt)?.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </Button>
                    <Button variant="outline">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {promptCategories.find((c) => c.id === prompts.find((p) => p.id === activePrompt)?.category)?.name}
                  </Badge>
                  {prompts
                    .find((p) => p.id === activePrompt)
                    ?.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                </div>

                <div className="space-y-2">
                  <Label>Prompt Template</Label>
                  <div className="rounded-md border bg-muted p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {prompts.find((p) => p.id === activePrompt)?.content}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Variables</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    {prompts
                      .find((p) => p.id === activePrompt)
                      ?.variables.map((variable) => (
                        <div key={variable} className="flex items-center space-x-2">
                          <div className="rounded-md border px-3 py-2 text-sm font-mono bg-muted flex-1">
                            {`{{${variable}}}`}
                          </div>
                          <Input placeholder={`Enter ${variable.replace(/_/g, " ")}`} />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preview</Label>
                  <Tabs defaultValue="raw">
                    <TabsList>
                      <TabsTrigger value="raw">Raw</TabsTrigger>
                      <TabsTrigger value="filled">With Sample Values</TabsTrigger>
                    </TabsList>
                    <TabsContent value="raw" className="mt-2">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <MessageSquare className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">User</span>
                        </div>
                        <p className="text-sm">I'd like to know more about your product features.</p>

                        <div className="flex items-center space-x-2 mt-4 mb-2">
                          <Bot className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">AI Agent</span>
                        </div>
                        <p className="text-sm whitespace-pre-line">
                          {prompts.find((p) => p.id === activePrompt)?.content}
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="filled" className="mt-2">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <MessageSquare className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">User</span>
                        </div>
                        <p className="text-sm">I'd like to know more about your product features.</p>

                        <div className="flex items-center space-x-2 mt-4 mb-2">
                          <Bot className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">AI Agent</span>
                        </div>
                        <p className="text-sm whitespace-pre-line">
                          {activePrompt === "prompt-3"
                            ? `Analytics Dashboard is one of our most powerful features in DataViz Pro. Here's what it does and how it can benefit you:

**What it does:**
The Analytics Dashboard provides real-time visualization of your data with customizable charts, graphs, and KPI tracking.

**Key benefits:**
- Gain instant insights from complex data sets
- Create custom reports with drag-and-drop simplicity
- Share interactive dashboards with your team

**How to get started:**
1. Navigate to the Dashboard tab
2. Click "New Dashboard"
3. Select your data source
4. Add widgets from the library

Would you like me to explain any specific aspect of this feature in more detail?`
                            : prompts.find((p) => p.id === activePrompt)?.content}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Usage Statistics</Label>
                    <div className="rounded-md border p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Uses</span>
                          <span className="text-sm font-medium">
                            {prompts.find((p) => p.id === activePrompt)?.usageCount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Average Rating</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">
                              {prompts.find((p) => p.id === activePrompt)?.rating}
                            </span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Created By</span>
                          <span className="text-sm font-medium">
                            {prompts.find((p) => p.id === activePrompt)?.createdBy}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Created</span>
                          <span className="text-sm font-medium">
                            {prompts.find((p) => p.id === activePrompt)?.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Related Prompts</Label>
                    <div className="rounded-md border p-4">
                      <div className="space-y-2">
                        {prompts
                          .filter(
                            (p) =>
                              p.id !== activePrompt &&
                              (p.category === prompts.find((p) => p.id === activePrompt)?.category ||
                                p.tags.some((tag) => prompts.find((p) => p.id === activePrompt)?.tags.includes(tag))),
                          )
                          .slice(0, 3)
                          .map((prompt) => (
                            <div
                              key={prompt.id}
                              className="flex items-center justify-between cursor-pointer hover:bg-accent/50 rounded-md p-2"
                              onClick={() => setActivePrompt(prompt.id)}
                            >
                              <div>
                                <p className="text-sm font-medium">{prompt.title}</p>
                                <p className="text-xs text-muted-foreground">{prompt.description}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs mr-1">{prompt.rating}</span>
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Prompt
                </Button>
                <Button>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Use Prompt
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

