"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MessageSquare, Calendar, Users, ThumbsUp, Eye, Clock, Tag, PlusCircle, Filter } from "lucide-react"

export function CommunityOfPractice() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("discussions")

  const discussions = [
    {
      id: 1,
      title: "Best practices for prompt engineering in customer support agents",
      category: "Prompt Engineering",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2 days ago",
      replies: 15,
      views: 245,
      likes: 32,
      tags: ["prompt-engineering", "customer-support", "best-practices"],
    },
    {
      id: 2,
      title: "How to effectively test AI agents for bias?",
      category: "Testing",
      author: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "1 week ago",
      replies: 28,
      views: 312,
      likes: 45,
      tags: ["testing", "bias", "ethics"],
    },
    {
      id: 3,
      title: "Strategies for optimizing agent response time",
      category: "Performance",
      author: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "3 days ago",
      replies: 12,
      views: 189,
      likes: 24,
      tags: ["performance", "optimization", "response-time"],
    },
    {
      id: 4,
      title: "Implementing effective knowledge retrieval for agents",
      category: "Knowledge Management",
      author: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "5 days ago",
      replies: 19,
      views: 276,
      likes: 38,
      tags: ["knowledge-retrieval", "rag", "implementation"],
    },
    {
      id: 5,
      title: "Handling edge cases in conversational agents",
      category: "Development",
      author: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "1 day ago",
      replies: 8,
      views: 142,
      likes: 17,
      tags: ["edge-cases", "conversational-ai", "development"],
    },
  ]

  const events = [
    {
      id: 1,
      title: "AI Agent Development Community Call",
      description: "Monthly community call to discuss AI agent development topics",
      date: "May 20, 2025",
      time: "10:00 AM - 11:30 AM",
      location: "Virtual",
      organizer: "AI Center of Excellence",
      attendees: 45,
      recurring: true,
    },
    {
      id: 2,
      title: "Prompt Engineering Guild Meeting",
      description: "Bi-weekly meeting of the Prompt Engineering Guild",
      date: "May 15, 2025",
      time: "2:00 PM - 3:30 PM",
      location: "Virtual",
      organizer: "Prompt Engineering Guild",
      attendees: 28,
      recurring: true,
    },
    {
      id: 3,
      title: "AI Ethics Roundtable",
      description: "Discussion on ethical considerations in AI agent development",
      date: "May 25, 2025",
      time: "11:00 AM - 12:30 PM",
      location: "Virtual",
      organizer: "Ethics Committee",
      attendees: 32,
      recurring: false,
    },
    {
      id: 4,
      title: "AI Agent Testing Best Practices",
      description: "Sharing best practices for testing AI agents",
      date: "June 2, 2025",
      time: "1:00 PM - 2:30 PM",
      location: "Virtual",
      organizer: "QA Team",
      attendees: 25,
      recurring: false,
    },
  ]

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Lead AI Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      expertise: ["Agent Development", "Prompt Engineering", "LLM Integration"],
      contributions: 45,
      rating: 4.9,
      availability: "Available for consultation",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Prompt Engineering Specialist",
      avatar: "/placeholder.svg?height=40&width=40",
      expertise: ["Prompt Engineering", "Chain-of-Thought", "Few-Shot Learning"],
      contributions: 38,
      rating: 4.8,
      availability: "Limited availability",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "AI Ethics Researcher",
      avatar: "/placeholder.svg?height=40&width=40",
      expertise: ["AI Ethics", "Bias Detection", "Responsible AI"],
      contributions: 32,
      rating: 4.7,
      availability: "Available for consultation",
    },
    {
      id: 4,
      name: "David Kim",
      title: "QA Lead",
      avatar: "/placeholder.svg?height=40&width=40",
      expertise: ["Agent Testing", "Quality Assurance", "Test Automation"],
      contributions: 29,
      rating: 4.6,
      availability: "Available for consultation",
    },
    {
      id: 5,
      name: "James Wilson",
      title: "Performance Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      expertise: ["Performance Optimization", "Benchmarking", "Monitoring"],
      contributions: 27,
      rating: 4.8,
      availability: "Limited availability",
    },
  ]

  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredExperts = experts.filter(
    (expert) =>
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search community resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="experts">Expert Directory</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Community Discussions</h3>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>

          <ScrollArea className="h-[550px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiscussions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No discussions found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDiscussions.map((discussion) => (
                    <TableRow key={discussion.id}>
                      <TableCell>
                        <div className="font-medium">{discussion.title}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{discussion.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{discussion.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{discussion.likes}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{discussion.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{discussion.author.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{discussion.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {discussion.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="events" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Community Events</h3>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Add to Calendar
            </Button>
          </div>

          <ScrollArea className="h-[550px]">
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center rounded-md border">
                  <p className="text-center text-muted-foreground">No events found matching your search.</p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </div>
                        {event.recurring ? (
                          <Badge className="bg-blue-500 hover:bg-blue-600">Recurring</Badge>
                        ) : (
                          <Badge>One-time</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Organized by: {event.organizer}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.attendees} attending</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Location:</span>
                        <Badge variant="outline">{event.location}</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Register for Event</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="experts" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Expert Directory</h3>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Become an Expert
            </Button>
          </div>

          <ScrollArea className="h-[550px]">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredExperts.length === 0 ? (
                <div className="md:col-span-2 flex h-[200px] items-center justify-center rounded-md border">
                  <p className="text-center text-muted-foreground">No experts found matching your search.</p>
                </div>
              ) : (
                filteredExperts.map((expert) => (
                  <Card key={expert.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={expert.avatar} alt={expert.name} />
                          <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{expert.name}</CardTitle>
                          <CardDescription>{expert.title}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Areas of Expertise:</h4>
                        <div className="flex flex-wrap gap-1">
                          {expert.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Contributions</p>
                          <p className="text-sm">{expert.contributions} resources</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Rating</p>
                          <div className="flex items-center">
                            <span className="text-sm mr-1">{expert.rating}/5</span>
                            <div className="flex">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(expert.rating)
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

                      <div>
                        <Badge
                          variant="outline"
                          className={
                            expert.availability === "Available for consultation"
                              ? "border-green-500 text-green-500"
                              : "border-yellow-500 text-yellow-500"
                          }
                        >
                          {expert.availability}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Expert
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

