"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Send, Filter, Search, CheckCircle2, Clock, AlertCircle } from "lucide-react"

export function UserFeedbackSystem() {
  const [activeTab, setActiveTab] = useState("submit")
  const [feedbackType, setFeedbackType] = useState("suggestion")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const feedbackItems = [
    {
      id: 1,
      type: "suggestion",
      title: "Add batch processing for agent training",
      description: "It would be helpful to train multiple agents at once with the same dataset.",
      status: "under-review",
      votes: 12,
      agent: "Training Ground",
      submittedBy: "John Doe",
      submittedAt: "2 days ago",
      comments: 3,
    },
    {
      id: 2,
      type: "issue",
      title: "Response time degradation in Customer Support Agent",
      description: "The agent's response time has increased from 1.2s to 2.5s after the latest update.",
      status: "in-progress",
      votes: 8,
      agent: "Customer Support Agent",
      submittedBy: "Jane Smith",
      submittedAt: "1 week ago",
      comments: 5,
    },
    {
      id: 3,
      type: "praise",
      title: "Great improvement in content quality",
      description: "The latest update to the Content Generator has significantly improved the quality of outputs.",
      status: "completed",
      votes: 15,
      agent: "Content Generator",
      submittedBy: "Michael Johnson",
      submittedAt: "2 weeks ago",
      comments: 2,
    },
    {
      id: 4,
      type: "suggestion",
      title: "Add template sharing in Prompt Library",
      description:
        "Would be great to have a way to share prompt templates with team members directly from the library.",
      status: "planned",
      votes: 20,
      agent: "Prompt Library",
      submittedBy: "Sarah Williams",
      submittedAt: "3 weeks ago",
      comments: 7,
    },
  ]

  const filteredFeedback = feedbackItems.filter(
    (item) =>
      (statusFilter === "all" || item.status === statusFilter) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agent.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const comments = [
    {
      id: 1,
      feedbackId: 2,
      user: "Admin",
      content: "We're investigating this issue. It appears to be related to the new knowledge base integration.",
      timestamp: "3 days ago",
      isOfficial: true,
    },
    {
      id: 2,
      feedbackId: 2,
      user: "Jane Smith",
      content: "I've noticed this happens more frequently with complex queries.",
      timestamp: "5 days ago",
      isOfficial: false,
    },
    {
      id: 3,
      feedbackId: 2,
      user: "Tech Support",
      content: "We've identified the issue and are working on a fix. Should be resolved in the next update.",
      timestamp: "2 days ago",
      isOfficial: true,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "under-review":
        return <Badge variant="secondary">Under Review</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "planned":
        return <Badge variant="outline">Planned</Badge>
      case "completed":
        return (
          <Badge variant="success" className="bg-green-500 hover:bg-green-600">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "suggestion":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "issue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "praise":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="submit" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="browse">Browse Feedback</TabsTrigger>
          <TabsTrigger value="my-feedback">My Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>Share your thoughts, report issues, or suggest improvements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Feedback Type</Label>
                <Select defaultValue="suggestion" onValueChange={setFeedbackType}>
                  <SelectTrigger id="feedback-type">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="issue">Issue Report</SelectItem>
                    <SelectItem value="praise">Praise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-title">Title</Label>
                <Input
                  id="feedback-title"
                  placeholder={
                    feedbackType === "suggestion"
                      ? "Enter your suggestion title"
                      : feedbackType === "issue"
                        ? "Summarize the issue"
                        : "What would you like to praise?"
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-description">Description</Label>
                <Textarea
                  id="feedback-description"
                  placeholder={
                    feedbackType === "suggestion"
                      ? "Describe your suggestion in detail..."
                      : feedbackType === "issue"
                        ? "Provide details about the issue, including steps to reproduce..."
                        : "Tell us what you like or what's working well..."
                  }
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="related-agent">Related Agent or Component</Label>
                <Select defaultValue="customer-support">
                  <SelectTrigger id="related-agent">
                    <SelectValue placeholder="Select related agent or component" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer-support">Customer Support Agent</SelectItem>
                    <SelectItem value="data-analysis">Data Analysis Agent</SelectItem>
                    <SelectItem value="content-generator">Content Generator</SelectItem>
                    <SelectItem value="training-ground">Training Ground</SelectItem>
                    <SelectItem value="prompt-library">Prompt Library</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {feedbackType === "issue" && (
                <div className="space-y-2">
                  <Label htmlFor="issue-severity">Severity</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="issue-severity">
                      <SelectValue placeholder="Select issue severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                      <SelectItem value="medium">Medium - Affects functionality</SelectItem>
                      <SelectItem value="high">High - Critical functionality broken</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <Input id="attachments" type="file" multiple />
                <p className="text-xs text-muted-foreground">Upload screenshots or relevant files (max 5MB each)</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="browse" className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all" onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredFeedback.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <div className="mt-1">{getTypeIcon(item.type)}</div>
                      <div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span>{item.agent}</span>
                          <span>•</span>
                          <span>Submitted by {item.submittedBy}</span>
                          <span>•</span>
                          <span>{item.submittedAt}</span>
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">{item.votes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{item.comments} comments</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>

                  {item.id === 2 && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <h4 className="text-sm font-medium">Recent Comments</h4>
                      {comments
                        .filter((c) => c.feedbackId === item.id)
                        .slice(0, 2)
                        .map((comment) => (
                          <div key={comment.id} className="rounded-md bg-muted p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{comment.user}</span>
                                {comment.isOfficial && (
                                  <Badge variant="outline" className="text-xs">
                                    Staff
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="mt-1 text-sm">{comment.content}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-feedback" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Feedback</CardTitle>
              <CardDescription>Track the status of feedback you've submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Add keyboard shortcuts for common actions</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        It would be helpful to have keyboard shortcuts for common actions like saving, testing, and
                        deploying agents.
                      </p>
                    </div>
                    <Badge variant="outline">Planned</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Submitted 1 month ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span>15 votes</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">
                        <span className="font-medium">Update:</span> This feature has been added to our roadmap for the
                        next release.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Bug in prompt template variables</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        When using multiple variables with similar names, the wrong values are sometimes applied.
                      </p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Submitted 2 weeks ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span>8 votes</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">
                        <span className="font-medium">Update:</span> Our development team has identified the issue and
                        is working on a fix.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

