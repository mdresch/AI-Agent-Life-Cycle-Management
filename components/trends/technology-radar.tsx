"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { radarEntries, type RadarStage, type TrendCategory } from "@/lib/mock-data/trends"

interface TechnologyRadarProps {
  category: TrendCategory
}

const STAGE_CONFIG: Record<
  RadarStage,
  { label: string; badgeClass: string }
> = {
  adopt: { label: "Adopt", badgeClass: "bg-emerald-600 text-white hover:bg-emerald-600" },
  trial: { label: "Trial", badgeClass: "bg-primary text-primary-foreground hover:bg-primary" },
  assess: {
    label: "Assess",
    badgeClass: "bg-secondary text-secondary-foreground hover:bg-secondary",
  },
  hold: { label: "Hold", badgeClass: "text-muted-foreground border" },
}

const STAGES: RadarStage[] = ["adopt", "trial", "assess", "hold"]

export function TechnologyRadar({ category }: TechnologyRadarProps) {
  const filtered =
    category === "all" ? radarEntries : radarEntries.filter((e) => e.category === category)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {STAGES.map((stage) => {
        const entries = filtered.filter((e) => e.stage === stage)
        const config = STAGE_CONFIG[stage]

        return (
          <Card key={stage}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Badge className={config.badgeClass}>{config.label}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{entry.name}</span>
                    {entry.isNew && (
                      <Badge
                        className="text-xs bg-amber-500 text-white hover:bg-amber-500 px-1.5 py-0"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                </div>
              ))}

              {entries.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  No entries for this stage.
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
