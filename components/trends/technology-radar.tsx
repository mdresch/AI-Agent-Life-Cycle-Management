"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TechnologyRadarChart } from "@/components/charts/technology-radar-chart"

export function TechnologyRadar() {
  const radarData = [
    { name: "Agent Frameworks", x: 80, y: 90, radius: 10, category: "adopt" },
    { name: "Multi-Agent Systems", x: 70, y: 75, radius: 8, category: "trial" },
    { name: "Agent Marketplaces", x: 40, y: 60, radius: 7, category: "assess" },
    { name: "Autonomous Planning", x: 60, y: 85, radius: 9, category: "trial" },
    { name: "Agent Memory Systems", x: 75, y: 65, radius: 8, category: "trial" },
    { name: "Tool-Using Agents", x: 85, y: 80, radius: 10, category: "adopt" },
    { name: "Agent Orchestration", x: 55, y: 70, radius: 7, category: "assess" },
    { name: "Federated Agents", x: 45, y: 50, radius: 6, category: "assess" },
    { name: "Agent Alignment", x: 65, y: 60, radius: 9, category: "trial" },
    { name: "Embodied Agents", x: 30, y: 40, radius: 5, category: "hold" },
  ]

  const categories = [
    { name: "adopt", description: "Technologies we strongly recommend for immediate adoption" },
    { name: "trial", description: "Technologies worth pursuing with caution and evaluation" },
    { name: "assess", description: "Technologies worth exploring with the goal of understanding their impact" },
    { name: "hold", description: "Technologies that should be approached with caution or are not yet mature" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Technology Adoption Radar</CardTitle>
            <CardDescription>
              Visual representation of emerging AI agent technologies and their adoption readiness
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <TechnologyRadarChart data={radarData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Radar Categories</CardTitle>
            <CardDescription>Understanding the technology adoption lifecycle stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="flex items-start space-x-3">
                  <Badge
                    className={`mt-0.5 ${
                      category.name === "adopt"
                        ? "bg-green-500"
                        : category.name === "trial"
                          ? "bg-blue-500"
                          : category.name === "assess"
                            ? "bg-amber-500"
                            : "bg-red-500"
                    }`}
                  >
                    {category.name}
                  </Badge>
                  <div>
                    <p className="text-sm">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emerging Technologies</CardTitle>
          <CardDescription>Detailed breakdown of key technologies on our radar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {radarData.slice(0, 4).map((tech) => (
              <div key={tech.name} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{tech.name}</h3>
                  <Badge
                    className={`${
                      tech.category === "adopt"
                        ? "bg-green-500"
                        : tech.category === "trial"
                          ? "bg-blue-500"
                          : tech.category === "assess"
                            ? "bg-amber-500"
                            : "bg-red-500"
                    }`}
                  >
                    {tech.category}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tech.name === "Agent Frameworks" &&
                    "Frameworks that provide infrastructure for building, deploying, and managing AI agents. These frameworks offer standardized components for agent development, reducing implementation complexity."}
                  {tech.name === "Multi-Agent Systems" &&
                    "Systems that enable multiple AI agents to work together, communicate, and coordinate to solve complex problems. These systems demonstrate emergent behaviors and capabilities beyond single-agent approaches."}
                  {tech.name === "Agent Marketplaces" &&
                    "Platforms that facilitate the discovery, distribution, and monetization of AI agents. These marketplaces enable developers to share and sell specialized agents for various use cases."}
                  {tech.name === "Autonomous Planning" &&
                    "Technologies that enable AI agents to formulate plans, adapt to changing conditions, and achieve goals with minimal human intervention. These capabilities are essential for truly autonomous agents."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline">AI</Badge>
                  <Badge variant="outline">Agents</Badge>
                  <Badge variant="outline">{tech.name.split(" ")[0]}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

