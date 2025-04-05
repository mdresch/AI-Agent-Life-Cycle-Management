"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingTopicsConfig } from "@/components/trends/config/trending-topics-config"
import { NewsArticlesConfig } from "@/components/trends/config/news-articles-config"
import { ResearchHighlightsConfig } from "@/components/trends/config/research-highlights-config"
import { TechnologyRadarConfig } from "@/components/trends/config/technology-radar-config"
import { DataSourcesConfig } from "@/components/trends/config/data-sources-config"

export function TrendsConfigTabs() {
  return (
    <Tabs defaultValue="trending" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="trending">Trending Topics</TabsTrigger>
        <TabsTrigger value="news">News & Articles</TabsTrigger>
        <TabsTrigger value="research">Research Highlights</TabsTrigger>
        <TabsTrigger value="radar">Technology Radar</TabsTrigger>
        <TabsTrigger value="sources">Data Sources</TabsTrigger>
      </TabsList>

      <TabsContent value="trending" className="space-y-4 pt-4">
        <TrendingTopicsConfig />
      </TabsContent>

      <TabsContent value="news" className="space-y-4 pt-4">
        <NewsArticlesConfig />
      </TabsContent>

      <TabsContent value="research" className="space-y-4 pt-4">
        <ResearchHighlightsConfig />
      </TabsContent>

      <TabsContent value="radar" className="space-y-4 pt-4">
        <TechnologyRadarConfig />
      </TabsContent>

      <TabsContent value="sources" className="space-y-4 pt-4">
        <DataSourcesConfig />
      </TabsContent>
    </Tabs>
  )
}

