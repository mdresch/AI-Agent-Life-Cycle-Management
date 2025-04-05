"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  FileText,
  Database,
  Globe,
  Upload,
  RefreshCw,
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  PlusCircle,
  Trash2,
  Download,
} from "lucide-react"

export function KnowledgeManagement() {
  const [activeTab, setActiveTab] = useState("sources")
  const [searchQuery, setSearchQuery] = useState("")

  const knowledgeSources = [
    {
      id: 1,
      name: "Product Documentation",
      type: "Document Collection",
      format: "PDF, Markdown",
      status: "active",
      lastUpdated: "2 days ago",
      documentCount: 156,
      size: "45 MB",
      syncStatus: "synced",
    },
    {
      id: 2,
      name: "Customer Support Knowledge Base",
      type: "Document Collection",
      format: "HTML, Markdown",
      status: "active",
      lastUpdated: "1 week ago",
      documentCount: 324,
      size: "78 MB",
      syncStatus: "synced",
    },
    {
      id: 3,
      name: "Internal Wiki",
      type: "Website",
      format: "HTML",
      status: "active",
      lastUpdated: "3 days ago",
      documentCount: 215,
      size: "52 MB",
      syncStatus: "syncing",
    },
    {
      id: 4,
      name: "Customer FAQ Database",
      type: "Database",
      format: "SQL",
      status: "active",
      lastUpdated: "5 days ago",
      documentCount: 189,
      size: "12 MB",
      syncStatus: "synced",
    },
    {
      id: 5,
      name: "Legacy Product Manuals",
      type: "Document Collection",
      format: "PDF",
      status: "inactive",
      lastUpdated: "2 months ago",
      documentCount: 87,
      size: "120 MB",
      syncStatus: "out-of-sync",
    },
  ]

  const documents = [
    {
      id: 1,
      title: "Product User Guide",
      source: "Product Documentation",
      format: "PDF",
      size: "2.5 MB",
      lastUpdated: "May 10, 2025",
      status: "indexed",
      relevanceScore: 95,
    },
    {
      id: 2,
      title: "API Documentation",
      source: "Product Documentation",
      format: "Markdown",
      size: "1.2 MB",
      lastUpdated: "May 8, 2025",
      status: "indexed",
      relevanceScore: 92,
    },
    {
      id: 3,
      title: "Troubleshooting Guide",
      source: "Customer Support Knowledge Base",
      format: "HTML",
      size: "1.8 MB",
      lastUpdated: "May 5, 2025",
      status: "indexed",
      relevanceScore: 88,
    },
    {
      id: 4,
      title: "Feature Documentation",
      source: "Internal Wiki",
      format: "HTML",
      size: "3.2 MB",
      lastUpdated: "May 7, 2025",
      status: "indexing",
      relevanceScore: 0,
    },
    {
      id: 5,
      title: "Customer FAQ",
      source: "Customer FAQ Database",
      format: "SQL",
      size: "0.5 MB",
      lastUpdated: "May 9, 2025",
      status: "indexed",
      relevanceScore: 90,
    },
  ]

  const retrievalMetrics = [
    {
      id: 1,
      name: "Retrieval Accuracy",
      score: 92,
      trend: "improving",
      description: "Accuracy of retrieved information based on query relevance",
    },
    {
      id: 2,
      name: "Retrieval Speed",
      score: 95,
      trend: "stable",
      description: "Speed of knowledge retrieval operations",
    },
    {
      id: 3,
      name: "Context Relevance",
      score: 88,
      trend: "improving",
      description: "Relevance of retrieved context to the query",
    },
    {
      id: 4,
      name: "Citation Accuracy",
      score: 90,
      trend: "stable",
      description: "Accuracy of citations in agent responses",
    },
    {
      id: 5,
      name: "Knowledge Coverage",
      score: 85,
      trend: "improving",
      description: "Coverage of knowledge across different domains",
    },
  ]

  const syncHistory = [
    {
      id: 1,
      source: "Product Documentation",
      date: "May 10, 2025",
      time: "14:32:15",
      status: "success",
      documentsAdded: 12,
      documentsUpdated: 5,
      documentsRemoved: 2,
      duration: "3m 45s",
    },
    {
      id: 2,
      source: "Customer Support Knowledge Base",
      date: "May 8, 2025",
      time: "09:15:22",
      status: "success",
      documentsAdded: 8,
      documentsUpdated: 15,
      documentsRemoved: 0,
      duration: "5m 12s",
    },
    {
      id: 3,
      source: "Internal Wiki",
      date: "May 12, 2025",
      time: "10:45:33",
      status: "in-progress",
      documentsAdded: 0,
      documentsUpdated: 0,
      documentsRemoved: 0,
      duration: "ongoing",
    },
    {
      id: 4,
      source: "Customer FAQ Database",
      date: "May 9, 2025",
      time: "16:20:45",
      status: "success",
      documentsAdded: 5,
      documentsUpdated: 3,
      documentsRemoved: 1,
      duration: "2m 30s",
    },
    {
      id: 5,
      source: "Legacy Product Manuals",
      date: "March 15, 2025",
      time: "11:10:05",
      status: "failed",
      documentsAdded: 0,
      documentsUpdated: 0,
      documentsRemoved: 0,
      duration: "1m 15s",
    },
  ]

  const filteredSources = knowledgeSources.filter(
    (source) =>
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.format.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredSyncHistory = syncHistory.filter(
    (sync) =>
      sync.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sync.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      case "indexed":
        return <Badge className="bg-green-500 hover:bg-green-600">Indexed</Badge>
      case "indexing":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Indexing</Badge>
      case "success":
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getSyncStatusBadge = (status) => {
    switch (status) {
      case "synced":
        return <Badge className="bg-green-500 hover:bg-green-600">Synced</Badge>
      case "syncing":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Syncing</Badge>
      case "out-of-sync":
        return <Badge variant="destructive">Out of Sync</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getSourceIcon = (type) => {
    switch (type) {
      case "Document Collection":
        return <FileText className="h-5 w-5 text-muted-foreground" />
      case "Website":
        return <Globe className="h-5 w-5 text-muted-foreground" />
      case "Database":
        return <Database className="h-5 w-5 text-muted-foreground" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "stable":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "declining":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search knowledge sources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sources">Knowledge Sources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="metrics">Retrieval Metrics</TabsTrigger>
          <TabsTrigger value="sync">Sync History</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Knowledge Sources</h3>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Knowledge Source
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Sync Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSources.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No knowledge sources found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSources.map((source) => (
                      <TableRow key={source.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getSourceIcon(source.type)}
                            <div>
                              <div className="font-medium">{source.name}</div>
                              <div className="text-xs text-muted-foreground">Format: {source.format}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{source.type}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(source.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{source.documentCount}</span>
                            <span className="text-xs text-muted-foreground">({source.size})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{source.lastUpdated}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getSyncStatusBadge(source.syncStatus)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                              <span className="sr-only">Sync</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Knowledge Source</CardTitle>
              <CardDescription>Connect a new knowledge source to your agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="source-name" className="text-sm font-medium">
                  Source Name
                </label>
                <Input id="source-name" placeholder="Enter source name" />
              </div>

              <div className="space-y-2">
                <label htmlFor="source-type" className="text-sm font-medium">
                  Source Type
                </label>
                <Select>
                  <SelectTrigger id="source-type">
                    <SelectValue placeholder="Select source type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document-collection">Document Collection</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="source-location" className="text-sm font-medium">
                  Source Location
                </label>
                <Input id="source-location" placeholder="Enter URL or file path" />
              </div>

              <div className="space-y-2">
                <label htmlFor="source-format" className="text-sm font-medium">
                  Format
                </label>
                <Select>
                  <SelectTrigger id="source-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="markdown">Markdown</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="text">Plain Text</SelectItem>
                    <SelectItem value="sql">SQL Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="sync-frequency" className="text-sm font-medium">
                  Sync Frequency
                </label>
                <Select>
                  <SelectTrigger id="sync-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Source</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Documents</h3>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Relevance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No documents found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="font-medium">{doc.title}</div>
                        </TableCell>
                        <TableCell>{doc.source}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.format}</Badge>
                        </TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.lastUpdated}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell>
                          {doc.status === "indexed" ? (
                            <div className="flex items-center space-x-2">
                              <Progress value={doc.relevanceScore} className="h-2 w-[60px]" />
                              <span className="text-sm">{doc.relevanceScore}%</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Retrieval Metrics</CardTitle>
              <CardDescription>Performance metrics for knowledge retrieval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {retrievalMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{metric.score}/100</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={metric.score} className="h-2" />
                      <span className="text-xs text-muted-foreground w-10">{metric.score}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Knowledge Sources</CardTitle>
                <CardDescription>Sources with highest retrieval relevance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgeSources
                    .filter((source) => source.status === "active")
                    .slice(0, 3)
                    .map((source, index) => (
                      <div key={source.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{source.name}</p>
                            <p className="text-xs text-muted-foreground">{source.documentCount} documents</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={95 - index * 5} className="h-2 w-[60px]" />
                          <span className="text-sm">{95 - index * 5}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Referenced Documents</CardTitle>
                <CardDescription>Documents most frequently used in responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents
                    .filter((doc) => doc.status === "indexed")
                    .sort((a, b) => b.relevanceScore - a.relevanceScore)
                    .slice(0, 3)
                    .map((doc, index) => (
                      <div key={doc.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">{doc.source}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={doc.relevanceScore} className="h-2 w-[60px]" />
                          <span className="text-sm">{doc.relevanceScore}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Sync History</h3>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync All Sources
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents Added</TableHead>
                    <TableHead>Documents Updated</TableHead>
                    <TableHead>Documents Removed</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSyncHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No sync history found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSyncHistory.map((sync) => (
                      <TableRow key={sync.id}>
                        <TableCell>{sync.source}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{sync.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{sync.time}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(sync.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-green-500">
                            +{sync.documentsAdded}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-blue-500">
                            ~{sync.documentsUpdated}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-red-500">
                            -{sync.documentsRemoved}
                          </Badge>
                        </TableCell>
                        <TableCell>{sync.duration}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule Sync</CardTitle>
              <CardDescription>Schedule a sync for a specific knowledge source</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="sync-source" className="text-sm font-medium">
                  Knowledge Source
                </label>
                <Select>
                  <SelectTrigger id="sync-source">
                    <SelectValue placeholder="Select knowledge source" />
                  </SelectTrigger>
                  <SelectContent>
                    {knowledgeSources.map((source) => (
                      <SelectItem key={source.id} value={source.id.toString()}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="sync-date" className="text-sm font-medium">
                    Date
                  </label>
                  <Input type="date" id="sync-date" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="sync-time" className="text-sm font-medium">
                    Time
                  </label>
                  <Input type="time" id="sync-time" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="sync-frequency" className="text-sm font-medium">
                  Repeat
                </label>
                <Select>
                  <SelectTrigger id="sync-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Schedule Sync</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

