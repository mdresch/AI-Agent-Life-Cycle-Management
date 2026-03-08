"use client"

import { useState } from "react"
import { Loader2, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BreakthroughAlertCard } from "@/components/trends/breakthrough-alert-card"
import { TrendingTopics } from "@/components/trends/trending-topics"
import { NewsArticles } from "@/components/trends/news-articles"
import { ResearchHighlights } from "@/components/trends/research-highlights"
import { TechnologyRadar } from "@/components/trends/technology-radar"
import {
  breakthroughAlert,
  TREND_CATEGORY_LABELS,
  type TrendCategory,
} from "@/lib/mock-data/trends"

function getMinutesAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 60_000)
  if (diff < 1) return "just now"
  if (diff === 1) return "1 min ago"
  return `${diff} min ago`
}

export function TrendsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<TrendCategory>("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdated(new Date())
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Select
          value={selectedCategory}
          onValueChange={(v) => setSelectedCategory(v as TrendCategory)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {(Object.entries(TREND_CATEGORY_LABELS) as [TrendCategory, string][]).map(
              ([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Badge variant="outline">Last updated: {getMinutesAgo(lastUpdated)}</Badge>
        </div>
      </div>

      <BreakthroughAlertCard
        alert={breakthroughAlert}
        isBookmarked={bookmarkedIds.has(breakthroughAlert.id)}
        onToggleBookmark={() => toggleBookmark(breakthroughAlert.id)}
      />

      <Tabs defaultValue="trending">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trending">Trending Topics</TabsTrigger>
          <TabsTrigger value="news">News & Articles</TabsTrigger>
          <TabsTrigger value="research">Research Highlights</TabsTrigger>
          <TabsTrigger value="radar">Technology Radar</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="pt-4">
          <TrendingTopics category={selectedCategory} />
        </TabsContent>

        <TabsContent value="news" className="pt-4">
          <NewsArticles
            category={selectedCategory}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        </TabsContent>

        <TabsContent value="research" className="pt-4">
          <ResearchHighlights category={selectedCategory} />
        </TabsContent>

        <TabsContent value="radar" className="pt-4">
          <TechnologyRadar category={selectedCategory} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
