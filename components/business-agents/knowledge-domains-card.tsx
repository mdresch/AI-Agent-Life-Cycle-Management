"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { knowledgeDomains } from "@/lib/mock-data/business-agents"

export function KnowledgeDomainsCard() {
  const maxCount = knowledgeDomains[0]?.agentCount ?? 1

  return (
    <div className="space-y-3">
      {knowledgeDomains.map((kd) => (
        <div key={kd.domain} className="flex items-center gap-3">
          <span className="w-44 shrink-0 text-sm font-medium">{kd.domain}</span>
          <Progress
            value={(kd.agentCount / maxCount) * 100}
            className="h-2 flex-1"
          />
          <Badge variant="secondary" className="w-10 shrink-0 justify-center text-xs">
            {kd.agentCount}
          </Badge>
        </div>
      ))}
    </div>
  )
}
