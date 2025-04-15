"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Clock, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DataSourcesConfig() {
  const [dataSources, setDataSources] = useState([
    {
      id: "1",
      name: "Twitter API",
      type: "social",
      status: "active",
      lastSync: "2023-04-01T10:30:00Z",
      credentials: { apiKey: "••••••••", apiSecret: "••••••••" },
    },
    {
      id: "2",
      name: "arXiv API",
      type: "academic",
      status: "active",
      lastSync: "2023-04-01T09:15:00Z",
      credentials: {},
    },
    {
      id: "3",
      name: "HackerNews API",
      type: "news",
      status: "error",
      lastSync: "2023-03-31T22:45:00Z",
      credentials: { apiKey: "••••••••" },
    },
    {
      id: "4",
      name: "GitHub API",
      type: "developer",
      status: "pending",
      lastSync: null,
      credentials: { apiKey: "••••••••", username: "aitrends" },
    },
  ])

  const [keywords, setKeywords] = useState([
    { id: "1", term: "artificial intelligence", weight: 1.0 },
    { id: "2", term: "machine learning", weight: 0.9 },
    { id: "3", term: "deep learning", weight: 0.8 },
    { id: "4", term: "neural networks", weight: 0.7 },
    { id: "5", term: "large language models", weight: 1.0 },
  ])

  const removeDataSource = (id: string) => {
    setDataSources(dataSources.filter((source) => source.id !== id))
  }

  const removeKeyword = (id: string) => {
    setKeywords(keywords.filter((keyword) => keyword.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500">
            <Check className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" /> Error
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Sources Configuration</CardTitle>
          <CardDescription>Configure the data sources used for trend analysis and monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sources">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sources">Data Sources</TabsTrigger>
              <TabsTrigger value="keywords">Keywords & Filters</TabsTrigger>
              <TabsTrigger value="schedule">Sync Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="sources" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connected Data Sources</h3>
                <div className="space-y-2">
                  {dataSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{source.name}</span>
                          {getStatusBadge(source.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Type: {source.type.charAt(0).toUpperCase() + source.type.slice(1)}
                          {source.lastSync && ` • Last synced: ${new Date(source.lastSync).toLocaleString()}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeDataSource(source.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="mb-3 font-medium">Add New Data Source</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="source-type">Source Type</Label>
                      <Select>
                        <SelectTrigger id="source-type">
                          <SelectValue placeholder="Select source type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="news">News & Media</SelectItem>
                          <SelectItem value="academic">Academic & Research</SelectItem>
                          <SelectItem value="developer">Developer Communities</SelectItem>
                          <SelectItem value="custom">Custom API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="source-name">Source Name</Label>
                      <Input id="source-name" placeholder="e.g., Twitter API" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input id="api-key" type="password" placeholder="Enter API key" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="api-secret">API Secret (if required)</Label>
                      <Input id="api-secret" type="password" placeholder="Enter API secret" />
                    </div>
                    <Button>Add Data Source</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="keywords" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Keywords & Search Terms</h3>
                <div className="space-y-2">
                  {keywords.map((keyword) => (
                    <div key={keyword.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="space-y-0.5">
                        <span className="font-medium">{keyword.term}</span>
                        <p className="text-sm text-muted-foreground">Weight: {keyword.weight.toFixed(1)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => removeKeyword(keyword.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="mb-3 font-medium">Add New Keyword</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="keyword">Keyword or Phrase</Label>
                      <Input id="keyword" placeholder="e.g., artificial intelligence" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="weight">Weight (0.1 - 1.0)</Label>
                      <Input id="weight" type="number" min="0.1" max="1.0" step="0.1" defaultValue="1.0" />
                    </div>
                    <Button>Add Keyword</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <div className="rounded-md border p-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="min-relevance">Minimum Relevance Score</Label>
                        <Select defaultValue="0.6">
                          <SelectTrigger id="min-relevance">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.3">0.3 (More inclusive)</SelectItem>
                            <SelectItem value="0.5">0.5 (Balanced)</SelectItem>
                            <SelectItem value="0.6">0.6 (Default)</SelectItem>
                            <SelectItem value="0.7">0.7 (More focused)</SelectItem>
                            <SelectItem value="0.8">0.8 (Highly focused)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="language-filter">Language Filter</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language-filter">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English only</SelectItem>
                            <SelectItem value="multi">Multiple languages</SelectItem>
                            <SelectItem value="all">All languages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="exclude-retweets" defaultChecked />
                        <Label htmlFor="exclude-retweets">Exclude retweets/reposts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="exclude-low-engagement" defaultChecked />
                        <Label htmlFor="exclude-low-engagement">Filter out low engagement content</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sync Schedule</h3>
                <div className="rounded-md border p-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sync-frequency">Sync Frequency</Label>
                      <Select defaultValue="hourly">
                        <SelectTrigger id="sync-frequency">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time (when possible)</SelectItem>
                          <SelectItem value="15min">Every 15 minutes</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sync-time">Preferred Sync Time (for daily/weekly)</Label>
                      <Input id="sync-time" type="time" defaultValue="00:00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="max-items">Maximum Items Per Sync</Label>
                      <Select defaultValue="100">
                        <SelectTrigger id="max-items">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 items</SelectItem>
                          <SelectItem value="100">100 items</SelectItem>
                          <SelectItem value="250">250 items</SelectItem>
                          <SelectItem value="500">500 items</SelectItem>
                          <SelectItem value="1000">1000 items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-retry" defaultChecked />
                      <Label htmlFor="auto-retry">Auto-retry on failure</Label>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Rate Limits</AlertTitle>
                  <AlertDescription>
                    Be aware of API rate limits when configuring sync schedules. Setting too frequent syncs may result
                    in API throttling or additional costs.
                  </AlertDescription>
                </Alert>

                <div className="rounded-md border p-4">
                  <h4 className="mb-3 font-medium">Manual Sync</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Trigger an immediate sync of all data sources or select specific ones to sync now.
                    </p>
                    <div className="flex gap-2">
                      <Button>Sync All Sources</Button>
                      <Button variant="outline">Select Sources</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

