"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trendingTopics, TREND_CATEGORY_LABELS, type TrendCategory } from "@/lib/mock-data/trends"

interface TrendingTopicsProps {
  category: TrendCategory
}

export function TrendingTopics({ category }: TrendingTopicsProps) {
  const filtered =
    category === "all" ? trendingTopics : trendingTopics.filter((t) => t.category === category)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((topic) => (
        <Card key={topic.id}>
          <CardContent className="pt-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold leading-tight">{topic.name}</h4>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {TREND_CATEGORY_LABELS[topic.category]}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-sm">
              {topic.momentum === "rising" && (
                <>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">
                    +{topic.weeklyChangePercent}% this week
                  </span>
                </>
              )}
              {topic.momentum === "declining" && (
                <>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="text-destructive font-medium">
                    -{Math.abs(topic.weeklyChangePercent)}% this week
                  </span>
                </>
              )}
              {topic.momentum === "stable" && (
                <>
                  <Minus className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">stable</span>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{topic.articleCount.toLocaleString()} articles</p>
          </CardContent>
        </Card>
      ))}

      {filtered.length === 0 && (
        <p className="col-span-full text-center text-muted-foreground py-10">
          No trending topics found for this category.
        </p>
      )}
    </div>
  )
}
