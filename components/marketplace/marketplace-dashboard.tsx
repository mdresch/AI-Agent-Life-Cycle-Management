"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, Star, Clock, Tag, Upload, ShoppingCart, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarketplaceAgents } from "@/components/marketplace/marketplace-agents"
import { MarketplacePublish } from "@/components/marketplace/marketplace-publish"
import { MarketplaceSubscriptions } from "@/components/marketplace/marketplace-subscriptions"

export function MarketplaceDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="productivity">Productivity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Publish Agent
          </Button>
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            My Purchases
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Agents</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+156 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured Agents</CardTitle>
          <CardDescription>Curated selection of high-quality agents for various use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <img
                    src={`/placeholder.svg?height=200&width=400&text=Agent+${i}`}
                    alt={`Featured Agent ${i}`}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">
                    {i === 1
                      ? "Advanced Customer Support Agent"
                      : i === 2
                        ? "Data Visualization Expert"
                        : "Content Creation Suite"}
                  </CardTitle>
                  <CardDescription>{i === 1 ? "Support" : i === 2 ? "Analytics" : "Creative"}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{i === 1 ? "4.9" : i === 2 ? "4.8" : "4.7"}/5</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <Download className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm text-muted-foreground">
                        {i === 1 ? "2.4K" : i === 2 ? "1.8K" : "1.5K"}
                      </span>
                    </div>
                    <Button size="sm">
                      {i === 1 ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Installed
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Install
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="discover">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="subscriptions">My Subscriptions</TabsTrigger>
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="pt-4">
          <MarketplaceAgents searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="subscriptions" className="pt-4">
          <MarketplaceSubscriptions />
        </TabsContent>

        <TabsContent value="publish" className="pt-4">
          <MarketplacePublish />
        </TabsContent>
      </Tabs>
    </div>
  )
}

