"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Users, Award, Lightbulb, BookMarked } from "lucide-react"
import Link from "next/link"

export function ExcellenceDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Center of Excellence</h1>
        <p className="text-muted-foreground">
          Resources, best practices, and guidelines for AI agent development and management
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/excellence/governance" className="block h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Governance Framework</CardTitle>
                <CardDescription>Standards and guidelines for responsible AI use</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Establish clear governance policies for AI agent development, deployment, and monitoring
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/excellence/best-practices" className="block h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>Learn industry best practices for AI agent development</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover proven methodologies and techniques for creating effective and reliable AI agents
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/excellence/community" className="block h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Community of Practice</CardTitle>
                <CardDescription>Connect with other AI practitioners</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Join a community of AI professionals to share knowledge, experiences, and solutions
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resources">Resource Library</TabsTrigger>
          <TabsTrigger value="training">Training Programs</TabsTrigger>
          <TabsTrigger value="insights">Latest Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="resources" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Resource Library</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="training" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Training Programs</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {trainingPrograms.map((program, index) => (
              <TrainingCard key={index} {...program} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="insights" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Latest Insights</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => (
              <InsightCard key={index} {...insight} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ResourceCardProps {
  title: string
  description: string
  type: string
  icon: React.ReactNode
}

function ResourceCard({ title, description, type, icon }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">{type}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

interface TrainingCardProps {
  title: string
  description: string
  duration: string
  level: string
  icon: React.ReactNode
}

function TrainingCard({ title, description, duration, level, icon }: TrainingCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">
            {duration} • {level}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

interface InsightCardProps {
  title: string
  description: string
  date: string
  author: string
  icon: React.ReactNode
}

function InsightCard({ title, description, date, author, icon }: InsightCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">
            {date} • {author}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

const resources = [
  {
    title: "AI Agent Design Patterns",
    description: "A comprehensive guide to common design patterns for AI agents",
    type: "PDF Guide",
    icon: <BookMarked className="h-6 w-6 text-primary" />,
  },
  {
    title: "Prompt Engineering Handbook",
    description: "Best practices for creating effective prompts for AI agents",
    type: "Interactive Guide",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Ethics Framework",
    description: "Guidelines for ethical considerations in AI agent development",
    type: "Framework",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "Agent Performance Optimization",
    description: "Techniques for optimizing AI agent performance and efficiency",
    type: "Toolkit",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
  },
]

const trainingPrograms = [
  {
    title: "AI Agent Fundamentals",
    description: "Learn the basics of AI agent development and deployment",
    duration: "4 weeks",
    level: "Beginner",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "Advanced Prompt Engineering",
    description: "Master the art of creating effective prompts for AI agents",
    duration: "2 weeks",
    level: "Intermediate",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Governance & Compliance",
    description: "Understand the regulatory landscape for AI agents",
    duration: "3 weeks",
    level: "Advanced",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "Building Enterprise AI Agents",
    description: "Develop enterprise-grade AI agents for business applications",
    duration: "6 weeks",
    level: "Advanced",
    icon: <Award className="h-6 w-6 text-primary" />,
  },
]

const insights = [
  {
    title: "The Future of AI Agents in Enterprise",
    description: "Exploring how AI agents are transforming enterprise operations",
    date: "Apr 2, 2025",
    author: "Dr. Sarah Chen",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
  },
  {
    title: "Ethical Considerations in Agent Design",
    description: "Key ethical principles to consider when designing AI agents",
    date: "Mar 28, 2025",
    author: "Prof. James Wilson",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "Measuring AI Agent Effectiveness",
    description: "Frameworks for evaluating the effectiveness of AI agents",
    date: "Mar 15, 2025",
    author: "Alex Rodriguez",
    icon: <Award className="h-6 w-6 text-primary" />,
  },
  {
    title: "Collaborative AI Agent Systems",
    description: "How multiple AI agents can work together to solve complex problems",
    date: "Mar 10, 2025",
    author: "Dr. Maya Patel",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
]

