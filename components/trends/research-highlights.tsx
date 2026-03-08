"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { researchHighlights, TREND_CATEGORY_LABELS, type TrendCategory } from "@/lib/mock-data/trends"
import { formatDate } from "@/lib/utils"

interface ResearchHighlightsProps {
  category: TrendCategory
}

export function ResearchHighlights({ category }: ResearchHighlightsProps) {
  const filtered =
    category === "all"
      ? researchHighlights
      : researchHighlights.filter((r) => r.category === category)

  return (
    <div className="space-y-4">
      {filtered.map((paper) => {
        const formattedDate = formatDate(paper.publishedAt)

        return (
          <Card key={paper.id}>
            <CardContent className="pt-5 space-y-3">
              <h4 className="font-semibold text-base leading-snug">{paper.title}</h4>
              <p className="text-sm text-muted-foreground">
                {paper.authors.join(", ")} &mdash; {paper.publication}
              </p>
              <p className="text-sm">{paper.abstract}</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {TREND_CATEGORY_LABELS[paper.category]}
                </Badge>
                <span className="text-xs text-muted-foreground">{formattedDate}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No research highlights found for this category.
        </p>
      )}
    </div>
  )
}
