"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, Download, Settings, ChevronRight } from "lucide-react"

interface AgentRowProps {
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

export function AgentRow({ agent, showDepartment = false }: AgentRowProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-1">{agent.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{agent.name}</h3>
                {showDepartment && agent.department && <Badge variant="outline">{agent.department}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">Expertise:</span>
                  <div className="flex flex-wrap gap-1">
                    {agent.expertise.slice(0, 2).map((exp) => (
                      <Badge key={exp} variant="secondary" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                    {agent.expertise.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{agent.expertise.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">Knowledge:</span>
                  <div className="flex flex-wrap gap-1">
                    {agent.knowledgeDomains.slice(0, 2).map((domain) => (
                      <Badge key={domain} variant="outline" className="text-xs">
                        {domain}
                      </Badge>
                    ))}
                    {agent.knowledgeDomains.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.knowledgeDomains.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
                <span className="sr-only">Details</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Configure</span>
              </Button>
              <Button size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
                <span className="sr-only">Deploy</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

