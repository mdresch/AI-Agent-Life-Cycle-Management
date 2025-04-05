"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Star, Download, Copy } from "lucide-react"
import { useState } from "react"

export function AgentTemplates() {
  const [searchQuery, setSearchQuery] = useState("")

  const templates = [
    {
      id: 1,
      name: "Customer Support Agent",
      description: "Handles customer inquiries and support tickets with empathy and efficiency",
      category: "Support",
      author: "AI Agents Team",
      downloads: 1245,
      rating: 4.8,
      tags: ["Support", "Customer Service", "Tickets"],
      featured: true,
    },
    {
      id: 2,
      name: "Data Analysis Agent",
      description: "Processes and analyzes data sets, generates reports and insights",
      category: "Analytics",
      author: "Data Science Team",
      downloads: 982,
      rating: 4.6,
      tags: ["Analytics", "Data", "Reports"],
      featured: true,
    },
    {
      id: 3,
      name: "Content Generator",
      description: "Creates blog posts, social media content, and marketing copy",
      category: "Creative",
      author: "Marketing Team",
      downloads: 876,
      rating: 4.5,
      tags: ["Content", "Marketing", "Creative"],
      featured: false,
    },
    {
      id: 4,
      name: "Scheduling Assistant",
      description: "Manages calendars and schedules appointments",
      category: "Productivity",
      author: "Operations Team",
      downloads: 754,
      rating: 4.3,
      tags: ["Scheduling", "Calendar", "Productivity"],
      featured: false,
    },
    {
      id: 5,
      name: "Research Agent",
      description: "Conducts market research and competitive analysis",
      category: "Research",
      author: "Strategy Team",
      downloads: 645,
      rating: 4.7,
      tags: ["Research", "Analysis", "Market"],
      featured: false,
    },
    {
      id: 6,
      name: "Email Assistant",
      description: "Drafts and sends emails, manages follow-ups",
      category: "Communication",
      author: "Productivity Team",
      downloads: 532,
      rating: 4.4,
      tags: ["Email", "Communication", "Productivity"],
      featured: false,
    },
  ]

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className={template.featured ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.category}</CardDescription>
                </div>
                {template.featured && (
                  <Badge className="bg-primary">
                    <Star className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Download className="mr-1 h-3 w-3" />
                  <span>{template.downloads}</span>
                  <span className="mx-2">•</span>
                  <Star className="mr-1 h-3 w-3" />
                  <span>{template.rating}/5</span>
                </div>
                <div className="mt-1">By {template.author}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Clone
                </Button>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Use
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

