"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ThumbsUp, MessageSquare, BookOpen, Star, Filter, ArrowUpDown } from "lucide-react"

export function BestPractices() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("guidelines")

  const guidelines = [
    {
      id: 1,
      title: "Prompt Engineering Best Practices",
      description: "Guidelines for creating effective prompts for AI agents",
      category: "Development",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastUpdated: "2 weeks ago",
      status: "published",
      views: 1245,
    },
    {
      id: 2,
      title: "Agent Testing Framework",
      description: "Comprehensive approach to testing AI agents before deployment",
      category: "Quality Assurance",
      author: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastUpdated: "1 month ago",
      status: "published",
      views: 982,
    },
    {
      id: 3,
      title: "Knowledge Base Integration Guide",
      description: "How to effectively integrate knowledge bases with AI agents",
      category: "Development",
      author: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastUpdated: "3 weeks ago",
      status: "published",
      views: 876,
    },
    {
      id: 4,
      title: "Agent Performance Optimization",
      description: "Techniques for optimizing AI agent performance and response time",
      category: "Operations",
      author: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastUpdated: "1 week ago",
      status: "published",
      views: 754,
    },
    {
      id: 5,
      title: "Responsible AI Development",
      description: "Guidelines for developing AI agents responsibly and ethically",
      category: "Ethics",
      author: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      lastUpdated: "2 days ago",
      status: "draft",
      views: 0,
    },
  ]

  const patterns = [
    {
      id: 1,
      title: "Chain-of-Thought Reasoning",
      description: "Pattern for implementing step-by-step reasoning in complex problem-solving agents",
      category: "Reasoning",
      popularity: 5,
      complexity: "Medium",
      useCases: ["Problem-solving agents", "Math agents", "Logical reasoning"],
    },
    {
      id: 2,
      title: "Retrieval-Augmented Generation",
      description: "Pattern for enhancing agent responses with external knowledge sources",
      category: "Knowledge",
      popularity: 5,
      complexity: "High",
      useCases: ["Customer support", "Research agents", "Documentation assistants"],
    },
    {
      id: 3,
      title: "Multi-Agent Collaboration",
      description: "Pattern for designing systems where multiple agents collaborate on complex tasks",
      category: "Architecture",
      popularity: 4,
      complexity: "High",
      useCases: ["Complex workflows", "Research projects", "Creative collaboration"],
    },
    {
      id: 4,
      title: "Contextual Memory Management",
      description: "Pattern for effectively managing conversation context and agent memory",
      category: "Memory",
      popularity: 4,
      complexity: "Medium",
      useCases: ["Conversational agents", "Long-running assistants", "Personalized agents"],
    },
    {
      id: 5,
      title: "Progressive Disclosure",
      description: "Pattern for revealing information gradually based on user needs",
      category: "UX",
      popularity: 3,
      complexity: "Low",
      useCases: ["Educational agents", "Onboarding assistants", "Complex information delivery"],
    },
  ]

  const caseStudies = [
    {
      id: 1,
      title: "Customer Support Automation Success Story",
      description: "How Company X reduced response time by 80% with AI agents",
      industry: "E-commerce",
      results: ["80% faster response time", "95% customer satisfaction", "60% cost reduction"],
      author: {
        name: "Jennifer Lee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 15, 2025",
      likes: 42,
      comments: 12,
    },
    {
      id: 2,
      title: "AI Agents in Healthcare Documentation",
      description: "Implementation of AI agents for medical documentation and analysis",
      industry: "Healthcare",
      results: ["70% reduction in documentation time", "99.2% accuracy rate", "Improved patient care"],
      author: {
        name: "Dr. Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 3, 2025",
      likes: 38,
      comments: 15,
    },
    {
      id: 3,
      title: "Financial Analysis Agent Deployment",
      description: "How a financial institution implemented AI for market analysis",
      industry: "Finance",
      results: ["2.5x faster market analysis", "Identified 35% more opportunities", "Reduced human error by 90%"],
      author: {
        name: "Robert Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "March 22, 2025",
      likes: 29,
      comments: 8,
    },
    {
      id: 4,
      title: "Educational Content Creation with AI",
      description: "Using AI agents to create personalized educational content",
      industry: "Education",
      results: [
        "Created content for 200+ topics",
        "40% improvement in student engagement",
        "Personalized learning paths",
      ],
      author: {
        name: "Emily Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "February 18, 2025",
      likes: 35,
      comments: 10,
    },
  ]

  const filteredGuidelines = guidelines.filter(
    (guideline) =>
      guideline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guideline.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guideline.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPatterns = patterns.filter(
    (pattern) =>
      pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCaseStudies = caseStudies.filter(
    (caseStudy) =>
      caseStudy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseStudy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseStudy.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
        />
      ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search best practices..."
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
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="patterns">Design Patterns</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="guidelines" className="space-y-4 pt-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredGuidelines.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center rounded-md border">
                  <p className="text-center text-muted-foreground">No guidelines found matching your search.</p>
                </div>
              ) : (
                filteredGuidelines.map((guideline) => (
                  <Card key={guideline.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{guideline.title}</CardTitle>
                          <CardDescription>{guideline.description}</CardDescription>
                        </div>
                        <Badge>{guideline.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={guideline.author.avatar} alt={guideline.author.name} />
                            <AvatarFallback>{guideline.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{guideline.author.name}</p>
                            <p className="text-xs text-muted-foreground">Updated {guideline.lastUpdated}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{guideline.views} views</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Read Guidelines
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4 pt-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredPatterns.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center rounded-md border">
                  <p className="text-center text-muted-foreground">No design patterns found matching your search.</p>
                </div>
              ) : (
                filteredPatterns.map((pattern) => (
                  <Card key={pattern.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{pattern.title}</CardTitle>
                          <CardDescription>{pattern.description}</CardDescription>
                        </div>
                        <Badge>{pattern.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Popularity</p>
                          <div className="flex mt-1">{renderStars(pattern.popularity)}</div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Complexity</p>
                          <p className="text-sm text-muted-foreground">{pattern.complexity}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Common Use Cases</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {pattern.useCases.map((useCase, index) => (
                            <Badge key={index} variant="outline">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Pattern Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="case-studies" className="space-y-4 pt-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredCaseStudies.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center rounded-md border">
                  <p className="text-center text-muted-foreground">No case studies found matching your search.</p>
                </div>
              ) : (
                filteredCaseStudies.map((caseStudy) => (
                  <Card key={caseStudy.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                          <CardDescription>{caseStudy.description}</CardDescription>
                        </div>
                        <Badge>{caseStudy.industry}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Key Results</p>
                        <ul className="list-disc pl-5 space-y-1 mt-1">
                          {caseStudy.results.map((result, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={caseStudy.author.avatar} alt={caseStudy.author.name} />
                            <AvatarFallback>{caseStudy.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{caseStudy.author.name}</p>
                            <p className="text-xs text-muted-foreground">{caseStudy.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{caseStudy.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{caseStudy.comments}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Read Full Case Study
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

