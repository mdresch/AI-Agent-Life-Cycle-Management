"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendChart } from "@/components/charts/trend-chart"

export function TrendingTopics() {
  const trendingTopics = [
    {
      id: 1,
      name: "Agent-based AI Systems",
      description: "Autonomous AI agents that can perform complex tasks and make decisions",
      trend: "rising",
      percentage: 85,
      categories: ["Agents", "Autonomy"],
      mentions: 1245,
      mentionChange: "+32%",
    },
    {
      id: 2,
      name: "Multimodal Large Language Models",
      description: "LLMs that can process and generate multiple types of data (text, images, audio)",
      trend: "rising",
      percentage: 92,
      categories: ["LLM", "Multimodal"],
      mentions: 2340,
      mentionChange: "+45%",
    },
    {
      id: 3,
      name: "AI Alignment & Safety",
      description: "Ensuring AI systems act in accordance with human values and intentions",
      trend: "rising",
      percentage: 78,
      categories: ["Safety", "Ethics"],
      mentions: 980,
      mentionChange: "+28%",
    },
    {
      id: 4,
      name: "Retrieval Augmented Generation (RAG)",
      description: "Enhancing LLM outputs with external knowledge retrieval",
      trend: "rising",
      percentage: 88,
      categories: ["LLM", "Knowledge"],
      mentions: 1560,
      mentionChange: "+38%",
    },
    {
      id: 5,
      name: "AI Agents for Code Generation",
      description: "Specialized agents that can write, review, and optimize code",
      trend: "rising",
      percentage: 82,
      categories: ["Agents", "Coding"],
      mentions: 1120,
      mentionChange: "+25%",
    },
    {
      id: 6,
      name: "Federated Learning",
      description: "Training AI models across multiple devices while preserving privacy",
      trend: "stable",
      percentage: 65,
      categories: ["Privacy", "Training"],
      mentions: 780,
      mentionChange: "+12%",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trendingTopics.map((topic) => (
          <Card key={topic.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{topic.name}</CardTitle>
                <Badge variant={topic.trend === "rising" ? "default" : "secondary"}>{topic.mentionChange}</Badge>
              </div>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[100px] mb-4">
                <TrendChart
                  data={[
                    { date: "Week 1", value: Math.floor(Math.random() * 50) + 50 },
                    { date: "Week 2", value: Math.floor(Math.random() * 50) + 50 },
                    { date: "Week 3", value: Math.floor(Math.random() * 50) + 60 },
                    { date: "Week 4", value: Math.floor(Math.random() * 50) + 70 },
                    { date: "Week 5", value: Math.floor(Math.random() * 50) + 80 },
                    { date: "Week 6", value: topic.percentage },
                  ]}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {topic.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{topic.mentions} mentions</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

