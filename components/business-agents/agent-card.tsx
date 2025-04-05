"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, Download, Settings } from "lucide-react"

interface AgentCardProps {
  agent: {
    id: string
    name: string
    description: string
    expertise: string[]
    knowledgeDomains: string[]
    icon: string
    department?: string
  }
  showDepartment?: boolean
}

export function AgentCard({ agent, showDepartment = false }: AgentCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="mr-2 text-2xl">{agent.icon}</div>
            <div>
              <CardTitle className="text-base">{agent.name}</CardTitle>
              {showDepartment && agent.department && <CardDescription>{agent.department}</CardDescription>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium mb-1">Expertise</h4>
            <div className="flex flex-wrap gap-1">
              {agent.expertise.map((exp) => (
                <Badge key={exp} variant="secondary" className="text-xs">
                  {exp}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium mb-1">Knowledge Domains</h4>
            <div className="flex flex-wrap gap-1">
              {agent.knowledgeDomains.map((domain) => (
                <Badge key={domain} variant="outline" className="text-xs">
                  {domain}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm">
            <Info className="mr-1 h-3 w-3" />
            Details
          </Button>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              <Settings className="mr-1 h-3 w-3" />
              Configure
            </Button>
            <Button size="sm">
              <Download className="mr-1 h-3 w-3" />
              Deploy
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

