"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Video,
  Globe,
  BookOpen,
  ExternalLink,
  Code,
  Shield,
} from "lucide-react"

export function CommunityOfPractice() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Community of Practice</h1>
        <p className="text-muted-foreground">
          Connect with other AI practitioners to share knowledge, experiences, and solutions
        </p>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="experts">Expert Directory</TabsTrigger>
          <TabsTrigger value="resources">Shared Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Upcoming Events</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Active Discussions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {discussions.map((discussion, index) => (
              <DiscussionCard key={index} {...discussion} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experts" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Expert Directory</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert, index) => (
              <ExpertCard key={index} {...expert} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <h2 className="text-xl font-semibold mt-4">Shared Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface EventProps {
  title: string
  description: string
  date: string
  time: string
  type: "Webinar" | "Workshop" | "Conference" | "Meetup"
  icon: React.ReactNode
}

function EventCard({ title, description, date, time, type, icon }: EventProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{title}</CardTitle>
            <Badge variant="outline">{type}</Badge>
          </div>
          <CardDescription className="text-xs flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {date} • {time}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="ml-auto">
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}

interface DiscussionProps {
  title: string
  description: string
  author: {
    name: string
    avatar: string
  }
  replies: number
  views: number
  lastActivity: string
  tags: string[]
}

function DiscussionCard({ title, description, author, replies, views, lastActivity, tags }: DiscussionProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        <div className="flex gap-2 mt-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> {replies}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {lastActivity}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="ml-auto">
          Join Discussion
        </Button>
      </CardFooter>
    </Card>
  )
}

interface ExpertProps {
  name: string
  title: string
  organization: string
  expertise: string[]
  avatar: string
}

function ExpertCard({ name, title, organization, expertise, avatar }: ExpertProps) {
  return (
    <Card>
      <CardHeader className="text-center pb-2">
        <Avatar className="h-20 w-20 mx-auto">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-2 text-base">{name}</CardTitle>
        <CardDescription className="text-xs">
          {title}, {organization}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {expertise.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <Button variant="outline" size="sm">
          View Profile
        </Button>
        <Button size="sm">Connect</Button>
      </CardFooter>
    </Card>
  )
}

interface ResourceProps {
  title: string
  description: string
  type: string
  author: string
  date: string
  icon: React.ReactNode
}

function ResourceCard({ title, description, type, author, date, icon }: ResourceProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">
            {type} • {author}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-2 text-xs text-muted-foreground">
          <Calendar className="inline h-3 w-3 mr-1" /> Shared on {date}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="ml-auto">
          <ExternalLink className="mr-2 h-4 w-4" />
          Access Resource
        </Button>
      </CardFooter>
    </Card>
  )
}

const events = [
  {
    title: "AI Agent Design Patterns Workshop",
    description: "Learn about common design patterns for creating effective AI agents",
    date: "April 15, 2025",
    time: "10:00 AM - 12:00 PM EST",
    type: "Workshop" as const,
    icon: <Video className="h-6 w-6 text-primary" />,
  },
  {
    title: "Ethical AI Development Webinar",
    description: "Join our panel discussion on ethical considerations in AI agent development",
    date: "April 20, 2025",
    time: "2:00 PM - 3:30 PM EST",
    type: "Webinar" as const,
    icon: <Video className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Agents in Healthcare Meetup",
    description: "Connect with practitioners using AI agents in healthcare settings",
    date: "April 25, 2025",
    time: "6:00 PM - 8:00 PM EST",
    type: "Meetup" as const,
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Annual AI Agents Conference",
    description: "The premier event for AI agent developers and practitioners",
    date: "May 10-12, 2025",
    time: "All Day",
    type: "Conference" as const,
    icon: <Globe className="h-6 w-6 text-primary" />,
  },
]

const discussions = [
  {
    title: "Best practices for handling sensitive data in AI agents",
    description:
      "I'm working on an AI agent that needs to process sensitive user data. What are the best practices for ensuring data privacy and security?",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    replies: 12,
    views: 156,
    lastActivity: "2 hours ago",
    tags: ["Data Privacy", "Security", "Best Practices"],
  },
  {
    title: "Strategies for reducing hallucinations in LLM-based agents",
    description:
      "Our team is struggling with hallucinations in our customer service AI agent. What strategies have worked for others?",
    author: {
      name: "Samantha Wong",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    replies: 24,
    views: 302,
    lastActivity: "1 day ago",
    tags: ["LLM", "Hallucinations", "Accuracy"],
  },
  {
    title: "Implementing effective feedback loops for AI agent improvement",
    description:
      "Looking for advice on implementing feedback loops that actually lead to measurable improvements in AI agent performance.",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    replies: 8,
    views: 97,
    lastActivity: "3 days ago",
    tags: ["Feedback", "Performance", "Improvement"],
  },
  {
    title: "Tools for monitoring AI agent performance in production",
    description:
      "What tools are people using to monitor their AI agents in production environments? Looking for recommendations.",
    author: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    replies: 15,
    views: 183,
    lastActivity: "5 days ago",
    tags: ["Monitoring", "Tools", "Production"],
  },
]

const experts = [
  {
    name: "Dr. Sarah Chen",
    title: "AI Research Scientist",
    organization: "Stanford University",
    expertise: ["LLM Architecture", "Prompt Engineering", "AI Ethics"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Michael Rodriguez",
    title: "Lead AI Engineer",
    organization: "TechCorp",
    expertise: ["Agent Development", "System Design", "Performance Optimization"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Dr. Aisha Johnson",
    title: "AI Ethics Consultant",
    organization: "EthicalAI Solutions",
    expertise: ["AI Governance", "Bias Mitigation", "Responsible AI"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "David Kim",
    title: "AI Product Manager",
    organization: "InnovateAI",
    expertise: ["Product Strategy", "User Experience", "Market Analysis"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Dr. Maya Patel",
    title: "AI Research Director",
    organization: "Global AI Institute",
    expertise: ["Multi-agent Systems", "Reinforcement Learning", "AI Safety"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "James Wilson",
    title: "AI Implementation Specialist",
    organization: "Enterprise Solutions",
    expertise: ["Enterprise Integration", "Deployment", "Scaling"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

const resources = [
  {
    title: "AI Agent Design Patterns Handbook",
    description: "A comprehensive guide to common design patterns for AI agents",
    type: "PDF Guide",
    author: "Dr. Sarah Chen",
    date: "March 15, 2025",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "Prompt Engineering Best Practices",
    description: "Learn effective techniques for creating prompts that produce reliable outputs",
    type: "Interactive Tutorial",
    author: "Michael Rodriguez",
    date: "March 10, 2025",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "AI Agent Testing Framework",
    description: "A framework for comprehensive testing of AI agents across various scenarios",
    type: "GitHub Repository",
    author: "David Kim",
    date: "March 5, 2025",
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    title: "Ethical AI Development Guidelines",
    description: "Guidelines for ensuring ethical considerations are integrated into AI development",
    type: "PDF Guide",
    author: "Dr. Aisha Johnson",
    date: "February 28, 2025",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
]

