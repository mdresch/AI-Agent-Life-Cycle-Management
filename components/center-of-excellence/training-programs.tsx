"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, BookOpen, Award, Play, CheckCircle } from "lucide-react"

export function TrainingPrograms() {
  const [activeTab, setActiveTab] = useState("courses")

  const courses = [
    {
      id: 1,
      title: "AI Agent Development Fundamentals",
      description: "Learn the fundamentals of AI agent development on our platform",
      level: "Beginner",
      duration: "4 weeks",
      instructor: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Lead AI Engineer",
      },
      enrolled: 245,
      modules: 8,
      progress: 0,
      status: "not-started",
    },
    {
      id: 2,
      title: "Advanced Prompt Engineering",
      description: "Master advanced prompt engineering techniques for AI agents",
      level: "Intermediate",
      duration: "3 weeks",
      instructor: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Prompt Engineering Specialist",
      },
      enrolled: 189,
      modules: 6,
      progress: 33,
      status: "in-progress",
    },
    {
      id: 3,
      title: "AI Agent Testing and Quality Assurance",
      description: "Learn comprehensive testing strategies for AI agents",
      level: "Intermediate",
      duration: "2 weeks",
      instructor: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "QA Lead",
      },
      enrolled: 156,
      modules: 5,
      progress: 100,
      status: "completed",
    },
    {
      id: 4,
      title: "Responsible AI Development",
      description: "Explore ethical considerations and responsible AI development",
      level: "All Levels",
      duration: "2 weeks",
      instructor: {
        name: "Dr. Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "AI Ethics Researcher",
      },
      enrolled: 210,
      modules: 4,
      progress: 0,
      status: "not-started",
    },
    {
      id: 5,
      title: "AI Agent Performance Optimization",
      description: "Techniques for optimizing AI agent performance and efficiency",
      level: "Advanced",
      duration: "3 weeks",
      instructor: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Performance Engineer",
      },
      enrolled: 132,
      modules: 7,
      progress: 57,
      status: "in-progress",
    },
  ]

  const certifications = [
    {
      id: 1,
      title: "Certified AI Agent Developer",
      description: "Professional certification for AI agent developers",
      level: "Professional",
      duration: "6 weeks",
      examDate: "June 15, 2025",
      prerequisites: ["AI Agent Development Fundamentals", "Advanced Prompt Engineering"],
      skills: ["Agent Development", "Prompt Engineering", "Testing", "Deployment"],
      certified: 156,
    },
    {
      id: 2,
      title: "AI Ethics Specialist",
      description: "Certification for ethical AI development practices",
      level: "Professional",
      duration: "4 weeks",
      examDate: "July 10, 2025",
      prerequisites: ["Responsible AI Development"],
      skills: ["Ethical AI", "Bias Detection", "Fairness Assessment", "Transparency"],
      certified: 89,
    },
    {
      id: 3,
      title: "AI Performance Engineer",
      description: "Certification for optimizing AI agent performance",
      level: "Expert",
      duration: "5 weeks",
      examDate: "August 5, 2025",
      prerequisites: ["AI Agent Development Fundamentals", "AI Agent Performance Optimization"],
      skills: ["Performance Tuning", "Optimization", "Benchmarking", "Monitoring"],
      certified: 72,
    },
  ]

  const workshops = [
    {
      id: 1,
      title: "Prompt Engineering Workshop",
      description: "Hands-on workshop for effective prompt engineering",
      date: "May 25, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Virtual",
      facilitator: "Michael Chen",
      participants: 25,
      status: "upcoming",
    },
    {
      id: 2,
      title: "AI Agent Testing Strategies",
      description: "Workshop on comprehensive testing strategies for AI agents",
      date: "June 8, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "Virtual",
      facilitator: "David Kim",
      participants: 20,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Ethical AI Development",
      description: "Workshop on ethical considerations in AI development",
      date: "May 15, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Virtual",
      facilitator: "Dr. Emily Rodriguez",
      participants: 30,
      status: "completed",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "upcoming":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Upcoming</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getLevelBadge = (level) => {
    switch (level) {
      case "Beginner":
        return <Badge variant="outline" className="border-green-500 text-green-500">Beginner</Badge>
      case "Intermediate":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Intermediate</Badge>
      case "Advanced":
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Advanced</Badge>
      case "Expert":
        return <Badge variant="outline" className="border-red-500 text-red-500">Expert</Badge>
      case "Professional":
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Professional</Badge>
      default:
        return <Badge variant="outline">All Levels</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4 pt-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </div>
                      {getLevelBadge(course.level)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{course.instructor.name}</p>
                        <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{course.modules} modules</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{course.enrolled} enrolled</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        {getStatusBadge(course.status)}
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-xs text-right text-muted-foreground">{course.progress}% complete</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {course.status === "not-started" ? (
                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Start Course
                      </Button>
                    ) : course.status === "in-progress" ? (
                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Continue Course
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Review Course
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4 pt-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {certifications.map((certification) => (
                <Card key={certification.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{certification.title}</CardTitle>
                        <CardDescription>{certification.description}</CardDescription>
                      </div>
                      {getLevelBadge(certification.level)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{certification.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Exam: {certification.examDate}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Prerequisites:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {certification.prerequisites.map((prereq, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {prereq}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills Covered:</h4>
                      <div className="flex flex-wrap gap-1">
                        {certification.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{certification.certified} professionals certified</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Award className="mr-2 h-4 w-4" />
                      Enroll in Certification
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-4 pt-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {workshops.map((workshop) => (
                <Card key={workshop.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{workshop.title}</CardTitle>
                        <CardDescription>{workshop.description}</CardDescription>
                      </div>
                      {getStatusBadge(workshop.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{workshop.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{workshop.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Facilitator:</span>
                        <span className="text-sm">{workshop.facilitator}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{workshop.participants} participants</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Location:</span>
                      <Badge variant="outline">{workshop.location}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {workshop.status === "upcoming" ? (
                      <Button className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Register for Workshop
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Materials
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

