"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, FileText, Users } from "lucide-react"

export function ResearchHighlights() {
  const researchPapers = [
    {
      id: 1,
      title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
      authors: "Smith et al.",
      institution: "Microsoft Research",
      date: "April 2025",
      summary:
        "This paper introduces AutoGen, a framework that enables the development of LLM applications using multiple conversing agents. The framework allows for flexible customization of agents and supports diverse conversation patterns.",
      url: "#",
      categories: ["Agents", "LLM", "Framework"],
      citations: 145,
    },
    {
      id: 2,
      title: "AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors",
      authors: "Johnson et al.",
      institution: "Stanford University",
      date: "March 2025",
      summary:
        "AgentVerse is a framework designed to facilitate the collaboration of multiple agents to solve complex tasks. This paper explores the emergent behaviors that arise when multiple specialized agents work together.",
      url: "#",
      categories: ["Agents", "Collaboration", "Emergence"],
      citations: 98,
    },
    {
      id: 3,
      title: "RLHF for Agent Alignment: A Comprehensive Study",
      authors: "Garcia et al.",
      institution: "DeepMind",
      date: "February 2025",
      summary:
        "This study examines the effectiveness of Reinforcement Learning from Human Feedback (RLHF) in aligning AI agents with human preferences and values, with a focus on complex decision-making scenarios.",
      url: "#",
      categories: ["Agents", "Alignment", "RLHF"],
      citations: 112,
    },
    {
      id: 4,
      title: "ToolFormer++: Enhanced Tool Use Capabilities in Large Language Models",
      authors: "Brown et al.",
      institution: "Meta AI Research",
      date: "January 2025",
      summary:
        "ToolFormer++ builds upon previous work to enhance the ability of large language models to use external tools effectively, enabling more complex agent behaviors and problem-solving capabilities.",
      url: "#",
      categories: ["LLM", "Tools", "Agents"],
      citations: 87,
    },
  ]

  return (
    <div className="space-y-4">
      {researchPapers.map((paper) => (
        <Card key={paper.id}>
          <CardHeader>
            <CardTitle className="text-xl">{paper.title}</CardTitle>
            <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{paper.authors}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>{paper.institution}</span>
              <span className="hidden sm:inline">•</span>
              <span>{paper.date}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{paper.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {paper.categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
              <Badge variant="secondary">{paper.citations} citations</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Abstract
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="default" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Paper
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

