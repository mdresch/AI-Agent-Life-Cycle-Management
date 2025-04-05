"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Star, Info } from "lucide-react"

interface MarketplaceAgentsProps {
  searchQuery: string
}

export function MarketplaceAgents({ searchQuery }: MarketplaceAgentsProps) {
  const agents = [
    {
      id: 1,
      name: "Advanced Customer Support Agent",
      description: "Handles customer inquiries and support tickets with empathy and efficiency",
      category: "Support",
      author: "AI Agents Team",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      downloads: 2432,
      rating: 4.9,
      tags: ["Support", "Customer Service", "Tickets"],
      price: "Free",
    },
    {
      id: 2,
      name: "Data Visualization Expert",
      description: "Analyzes data and creates beautiful visualizations and reports",
      category: "Analytics",
      author: "Data Science Team",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      downloads: 1845,
      rating: 4.8,
      tags: ["Analytics", "Visualization", "Reports"],
      price: "$9.99/mo",
    },
    {
      id: 3,
      name: "Content Creation Suite",
      description: "Creates blog posts, social media content, and marketing copy",
      category: "Creative",
      author: "Marketing Team",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      downloads: 1532,
      rating: 4.7,
      tags: ["Content", "Marketing", "Creative"],
      price: "$14.99/mo",
    },
    {
      id: 4,
      name: "Meeting Assistant Pro",
      description: "Takes notes, summarizes meetings, and creates action items",
      category: "Productivity",
      author: "Productivity Team",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      downloads: 1245,
      rating: 4.6,
      tags: ["Meetings", "Notes", "Productivity"],
      price: "$7.99/mo",
    },
    {
      id: 5,
      name: "Market Research Agent",
      description: "Conducts market research and competitive analysis",
      category: "Research",
      author: "Strategy Team",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      downloads: 987,
      rating: 4.5,
      tags: ["Research", "Analysis", "Market"],
      price: "$19.99/mo",
    },
    {
      id: 6,
      name: "Email Campaign Manager",
      description: "Creates, schedules, and analyzes email marketing campaigns",
      category: "Marketing",
      author: "Marketing Team",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      downloads: 876,
      rating: 4.4,
      tags: ["Email", "Marketing", "Campaigns"],
      price: "$12.99/mo",
    },
  ]

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{agent.name}</CardTitle>
                  <CardDescription>{agent.category}</CardDescription>
                </div>
                <Badge variant={agent.price === "Free" ? "secondary" : "default"}>{agent.price}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={agent.authorAvatar} alt={agent.author} />
                    <AvatarFallback>{agent.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{agent.author}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{agent.rating}/5</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Download className="mr-1 h-4 w-4" />
                <span>{agent.downloads} downloads</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Info className="mr-2 h-4 w-4" />
                  Details
                </Button>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Install
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="outline">Load More Agents</Button>
      </div>
    </div>
  )
}

