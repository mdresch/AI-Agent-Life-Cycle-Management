"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  ArrowUpDown,
  FileText,
  Video,
  Download,
  ExternalLink,
  Clock,
  Calendar,
  Tag,
} from "lucide-react"

export function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("documents")

  const documents = [
    {
      id: 1,
      title: "AI Agent Development Guide",
      description: "Comprehensive guide to developing AI agents on our platform",
      type: "PDF",
      size: "4.2 MB",
      author: "AI Development Team",
      dateAdded: "May 10, 2025",
      tags: ["development", "guide", "best-practices"],
      downloads: 342,
    },
    {
      id: 2,
      title: "Prompt Engineering Handbook",
      description: "Advanced techniques for effective prompt engineering",
      type: "PDF",
      size: "2.8 MB",
      author: "Prompt Engineering Guild",
      dateAdded: "April 22, 2025",
      tags: ["prompts", "engineering", "techniques"],
      downloads: 289,
    },
    {
      id: 3,
      title: "AI Agent Security Guidelines",
      description: "Security best practices for AI agent development and deployment",
      type: "DOCX",
      size: "1.5 MB",
      author: "Security Team",
      dateAdded: "May 5, 2025",
      tags: ["security", "guidelines", "compliance"],
      downloads: 156,
    },
    {
      id: 4,
      title: "Model Evaluation Framework",
      description: "Framework for evaluating AI models and agents",
      type: "PDF",
      size: "3.1 MB",
      author: "Quality Assurance Team",
      dateAdded: "March 18, 2025",
      tags: ["evaluation", "quality", "metrics"],
      downloads: 201,
    },
    {
      id: 5,
      title: "Agent Deployment Checklist",
      description: "Comprehensive checklist for deploying agents to production",
      type: "PDF",
      size: "1.2 MB",
      author: "DevOps Team",
      dateAdded: "May 1, 2025",
      tags: ["deployment", "checklist", "production"],
      downloads: 178,
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Introduction to AI Agent Development",
      description: "Overview of AI agent development on our platform",
      duration: "32:15",
      presenter: "Sarah Johnson",
      datePublished: "April 15, 2025",
      tags: ["introduction", "development", "overview"],
      views: 1245,
    },
    {
      id: 2,
      title: "Advanced Prompt Engineering Techniques",
      description: "Deep dive into advanced prompt engineering for AI agents",
      duration: "45:22",
      presenter: "Michael Chen",
      datePublished: "May 2, 2025",
      tags: ["prompts", "advanced", "techniques"],
      views: 982,
    },
    {
      id: 3,
      title: "AI Agent Testing Strategies",
      description: "Effective strategies for testing AI agents",
      duration: "28:45",
      presenter: "David Kim",
      datePublished: "April 28, 2025",
      tags: ["testing", "quality", "strategies"],
      views: 876,
    },
    {
      id: 4,
      title: "Optimizing Agent Performance",
      description: "Techniques for optimizing AI agent performance",
      duration: "38:10",
      presenter: "Emily Rodriguez",
      datePublished: "May 8, 2025",
      tags: ["performance", "optimization", "techniques"],
      views: 754,
    },
    {
      id: 5,
      title: "Ethical Considerations in AI Development",
      description: "Exploring ethical considerations in AI agent development",
      duration: "41:35",
      presenter: "James Wilson",
      datePublished: "April 20, 2025",
      tags: ["ethics", "responsible-ai", "guidelines"],
      views: 892,
    },
  ]

  const templates = [
    {
      id: 1,
      name: "Customer Support Agent Template",
      description: "Ready-to-use template for customer support agents",
      category: "Support",
      lastUpdated: "May 5, 2025",
      author: "Support Team",
      downloads: 245,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Data Analysis Agent Template",
      description: "Template for creating data analysis agents",
      category: "Analytics",
      lastUpdated: "April 28, 2025",
      author: "Data Science Team",
      downloads: 189,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Content Generation Template",
      description: "Template for content generation agents",
      category: "Creative",
      lastUpdated: "May 10, 2025",
      author: "Content Team",
      downloads: 156,
      rating: 4.5,
    },
    {
      id: 4,
      name: "Research Assistant Template",
      description: "Template for research assistant agents",
      category: "Research",
      lastUpdated: "April 15, 2025",
      author: "Research Team",
      downloads: 132,
      rating: 4.7,
    },
    {
      id: 5,
      name: "Email Management Template",
      description: "Template for email management agents",
      category: "Productivity",
      lastUpdated: "May 2, 2025",
      author: "Productivity Team",
      downloads: 178,
      rating: 4.4,
    },
  ]

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
        <Button variant="outline" size="icon">
          <ArrowUpDown className="h-4 w-4" />
          <span className="sr-only">Sort</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="pt-4">
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No documents found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-sm text-muted-foreground">{doc.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">{doc.size}</div>
                      </TableCell>
                      <TableCell>{doc.author}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{doc.dateAdded}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="videos" className="pt-4">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredVideos.length === 0 ? (
                <div className="md:col-span-2 flex h-[200px] items-center justify-center rounded-md border">
                  <p className="text-center text-muted-foreground">No videos found matching your search.</p>
                </div>
              ) : (
                filteredVideos.map((video) => (
                  <Card key={video.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{video.title}</CardTitle>
                          <CardDescription>{video.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Video className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{video.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{video.datePublished}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Presenter: {video.presenter}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {video.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Watch Video
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="pt-4">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredTemplates.length === 0 ? (
                <div className="md:col-span-2 flex h-[200px] items-center justify-center rounded-md border">
                  <p className="text-center text-muted-foreground">No templates found matching your search.</p>
                </div>
              ) : (
                filteredTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                        <Badge>{template.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{template.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{template.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{template.downloads} downloads</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium">{template.rating}/5</span>
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(template.rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

