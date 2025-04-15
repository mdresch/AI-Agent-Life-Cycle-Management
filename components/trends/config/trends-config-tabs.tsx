"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingTopicsConfig } from "./trending-topics-config"
import { NewsArticlesConfig } from "./news-articles-config"
import { ResearchHighlightsConfig } from "./research-highlights-config"
import { TechnologyRadarConfig } from "./technology-radar-config"
import { DataSourcesConfig } from "./data-sources-config"

export function TrendsConfigTabs() {
  return (
    <Tabs defaultValue="trending-topics" className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="trending-topics">Trending Topics</TabsTrigger>
        <TabsTrigger value="news-articles">News Articles</TabsTrigger>
        <TabsTrigger value="research-highlights">Research Highlights</TabsTrigger>
        <TabsTrigger value="technology-radar">Technology Radar</TabsTrigger>
        <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
      </TabsList>
      <TabsContent value="trending-topics">
        <TrendingTopicsConfig />
      </TabsContent>
      <TabsContent value="news-articles">
        <NewsArticlesConfig />
      </TabsContent>
      <TabsContent value="research-highlights">
        <ResearchHighlightsConfig />
      </TabsContent>
      <TabsContent value="technology-radar">
        <TechnologyRadarConfig />
      </TabsContent>
      <TabsContent value="data-sources">
        <DataSourcesConfig />
      </TabsContent>
    </Tabs>
  )
}

