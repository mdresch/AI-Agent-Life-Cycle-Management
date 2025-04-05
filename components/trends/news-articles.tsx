"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookmarkIcon, ExternalLink, Search, ThumbsUp } from "lucide-react"

export function NewsArticles() {
  const [searchQuery, setSearchQuery] = useState("")

  const articles = [
    {
      id: 1,
      title: "OpenAI Introduces GPT-5 with Enhanced Agent Capabilities",
      source: "TechCrunch",
      date: "2 days ago",
      summary:
        "OpenAI has unveiled GPT-5, featuring significant improvements in reasoning, planning, and agent-like behaviors. The new model demonstrates enhanced capabilities in executing complex tasks autonomously.",
      url: "#",
      categories: ["LLM", "Agents", "OpenAI"],
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "Google DeepMind's New Framework for Multi-Agent Collaboration",
      source: "VentureBeat",
      date: "3 days ago",
      summary:
        "Google DeepMind researchers have published a new framework that enables multiple AI agents to collaborate effectively on complex tasks, showing promising results in problem-solving scenarios.",
      url: "#",
      categories: ["Agents", "Collaboration", "Google"],
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "AI Agents Revolutionizing Customer Service Operations",
      source: "Forbes",
      date: "5 days ago",
      summary:
        "Major enterprises are reporting significant improvements in customer satisfaction and operational efficiency after deploying specialized AI agents for customer service tasks.",
      url: "#",
      categories: ["Agents", "Business", "Customer Service"],
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 4,
      title: "New Research Shows AI Agents Can Learn from Human Feedback",
      source: "MIT Technology Review",
      date: "1 week ago",
      summary:
        "A study from MIT researchers demonstrates how AI agents can effectively learn from human feedback, improving their performance and alignment with human preferences over time.",
      url: "#",
      categories: ["Agents", "Learning", "Research"],
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 5,
      title: "Anthropic Releases Claude 3.5 with Advanced Tool Use",
      source: "The Verge",
      date: "1 week ago",
      summary:
        "Anthropic has released Claude 3.5, featuring significant improvements in the model's ability to use external tools and APIs, enabling more complex agent-like behaviors.",
      url: "#",
      categories: ["LLM", "Tools", "Anthropic"],
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.categories.some((category) => category.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <Card key={article.id}>
            <div className="md:flex">
              <div className="md:w-1/4 p-4 flex items-center justify-center">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="rounded-md object-cover h-[100px] w-full"
                />
              </div>
              <div className="md:w-3/4">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <span>{article.source}</span>
                        <span className="mx-2">•</span>
                        <span>{article.date}</span>
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <BookmarkIcon className="h-4 w-4" />
                      <span className="sr-only">Bookmark</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{article.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Relevant
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Read Full Article
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="outline">Load More Articles</Button>
      </div>
    </div>
  )
}

