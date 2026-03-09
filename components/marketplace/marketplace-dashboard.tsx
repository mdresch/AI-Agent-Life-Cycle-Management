"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MarketplaceKpis } from "@/components/marketplace/marketplace-kpis"
import { FeaturedAgentsCarousel } from "@/components/marketplace/featured-agents-carousel"
import { AgentCatalogueGrid } from "@/components/marketplace/agent-catalogue-grid"
import { SubscriptionsList } from "@/components/marketplace/marketplace-subscriptions"
import { MarketplacePublish } from "@/components/marketplace/marketplace-publish"
import { mockMarketplaceListings, mockMarketplaceKpis, mockMarketplaceSubscriptions } from "@/lib/mock-data/marketplace"

export function MarketplaceDashboard() {
  const [listings, setListings] = useState(mockMarketplaceListings)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("most-downloads")
  const [activeTab, setActiveTab] = useState("browse")

  const handleInstall = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isInstalled: true, installedVersion: l.version } : l)),
    )
    toast.success("Agent installed")
  }

  const handleUninstall = (id: string) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, isInstalled: false, installedVersion: undefined } : l,
      ),
    )
    toast.success("Agent uninstalled")
  }

  const featuredListings = listings.filter((l) => l.isFeatured)

  return (
    <div className="space-y-6">
      <MarketplaceKpis kpis={mockMarketplaceKpis} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          {activeTab === "browse" && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  className="pl-8 w-52"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="customer-support">Customer Support</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-downloads">Most Downloads</SelectItem>
                  <SelectItem value="highest-rated">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <TabsContent value="browse" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Featured Agents</CardTitle>
              <CardDescription>Curated selection of high-quality agents for various use cases</CardDescription>
            </CardHeader>
            <CardContent className="px-8">
              <FeaturedAgentsCarousel listings={featuredListings} onInstall={handleInstall} />
            </CardContent>
          </Card>

          <div>
            <h2 className="text-lg font-semibold mb-4">All Agents</h2>
            <AgentCatalogueGrid
              listings={listings}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onInstall={handleInstall}
              onUninstall={handleUninstall}
            />
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="mt-4">
          <SubscriptionsList subscriptions={mockMarketplaceSubscriptions} />
        </TabsContent>

        <TabsContent value="publish" className="mt-4">
          <MarketplacePublish />
        </TabsContent>
      </Tabs>
    </div>
  )
}
