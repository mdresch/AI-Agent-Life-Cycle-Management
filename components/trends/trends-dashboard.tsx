"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingTopics } from "@/components/trends/trending-topics"
import { NewsArticles } from "@/components/trends/news-articles"
import { ResearchHighlights } from "@/components/trends/research-highlights"
import { TechnologyRadar } from "@/components/trends/technology-radar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookmarkIcon, Share2, Filter, RefreshCw, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TrendsDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="llm">Large Language Models</SelectItem>
              <SelectItem value="vision">Computer Vision</SelectItem>
              <SelectItem value="multimodal">Multimodal AI</SelectItem>
              <SelectItem value="agents">AI Agents</SelectItem>
              <SelectItem value="tools">AI Tools & Frameworks</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Badge variant="outline" className="ml-2">
            Last updated: 10 minutes ago
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
            Breakthrough Alert
          </CardTitle>
          <CardDescription>Recent significant advancements in AI technology</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">GPT-5 Demonstrates Advanced Reasoning Capabilities</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    OpenAI's latest model shows unprecedented performance in complex problem-solving and multi-step
                    reasoning tasks.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <BookmarkIcon className="h-4 w-4" />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge>LLM</Badge>
                <Badge variant="outline">Reasoning</Badge>
                <Badge variant="secondary">OpenAI</Badge>
                <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">New Framework Enables Autonomous Agent Collaboration</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Researchers have developed a framework allowing multiple AI agents to collaborate on complex tasks
                    with minimal human supervision.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <BookmarkIcon className="h-4 w-4" />
                    <span className="sr-only">Bookmark</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge>Agents</Badge>
                <Badge variant="outline">Collaboration</Badge>
                <Badge variant="secondary">Research</Badge>
                <span className="text-xs text-muted-foreground ml-auto">5 days ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="trending">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trending">Trending Topics</TabsTrigger>
          <TabsTrigger value="news">News & Articles</TabsTrigger>
          <TabsTrigger value="research">Research Highlights</TabsTrigger>
          <TabsTrigger value="radar">Technology Radar</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="pt-4">
          <TrendingTopics />
        </TabsContent>

        <TabsContent value="news" className="pt-4">
          <NewsArticles />
        </TabsContent>

        <TabsContent value="research" className="pt-4">
          <ResearchHighlights />
        </TabsContent>

        <TabsContent value="radar" className="pt-4">
          <TechnologyRadar />
        </TabsContent>
      </Tabs>
    </div>
  )
}

