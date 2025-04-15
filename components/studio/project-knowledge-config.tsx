"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Layers, FileText, Globe, Database } from "lucide-react"

export function ProjectKnowledgeConfig({ data, updateData }) {
  const [sources, setSources] = useState(data.sources || [])
  const [retrievalStrategy, setRetrievalStrategy] = useState(data.retrievalStrategy || "semantic")
  const [chunkSize, setChunkSize] = useState(data.chunkSize || 500)
  const [topK, setTopK] = useState(data.topK || 5)
  const [autoCitation, setAutoCitation] = useState(data.autoCitation !== undefined ? data.autoCitation : true)
  const [knowledgeFallback, setKnowledgeFallback] = useState(
    data.knowledgeFallback !== undefined ? data.knowledgeFallback : true,
  )
  const [showAddSourceForm, setShowAddSourceForm] = useState(false)
  const [newSource, setNewSource] = useState({
    name: "",
    description: "",
    type: "document",
    url: "",
    enabled: true,
  })
  // Track if data has been modified to prevent infinite updates
  const [isDataModified, setIsDataModified] = useState(false)

  useEffect(() => {
    if (isDataModified) {
      updateData({
        sources,
        retrievalStrategy,
        chunkSize,
        topK,
        autoCitation,
        knowledgeFallback,
      })
      setIsDataModified(false)
    }
  }, [isDataModified, sources, retrievalStrategy, chunkSize, topK, autoCitation, knowledgeFallback]) // Removed updateData from dependencies

  // Helper function to mark data as modified
  const markAsModified = () => {
    setIsDataModified(true)
  }

  const handleAddSource = () => {
    if (newSource.name && newSource.type) {
      const sourceWithId = {
        ...newSource,
        id: `source-${Date.now()}`,
      }

      setSources([...sources, sourceWithId])
      setNewSource({
        name: "",
        description: "",
        type: "document",
        url: "",
        enabled: true,
      })
      setShowAddSourceForm(false)
      markAsModified()
    }
  }

  const toggleSourceEnabled = (sourceId) => {
    setSources(sources.map((source) => (source.id === sourceId ? { ...source, enabled: !source.enabled } : source)))
    markAsModified()
  }

  const removeSource = (sourceId) => {
    setSources(sources.filter((source) => source.id !== sourceId))
    markAsModified()
  }

  const getSourceIcon = (type) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-muted-foreground" />
      case "website":
        return <Globe className="h-5 w-5 text-muted-foreground" />
      case "database":
        return <Database className="h-5 w-5 text-muted-foreground" />
      default:
        return <Layers className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Sources</CardTitle>
          <CardDescription>Manage the knowledge sources for your agent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search knowledge sources..." className="max-w-sm" />
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="database">Databases</SelectItem>
                  <SelectItem value="api">APIs</SelectItem>
                  <SelectItem value="website">Websites</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setShowAddSourceForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Knowledge Source
            </Button>
          </div>

          {sources.length === 0 && !showAddSourceForm ? (
            <div className="flex h-[200px] items-center justify-center rounded-md border">
              <p className="text-center text-muted-foreground">
                No knowledge sources yet. Add your first knowledge source to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {sources.map((source) => (
                <div key={source.id} className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getSourceIcon(source.type)}
                      <div>
                        <h3 className="font-medium">{source.name}</h3>
                        <p className="text-sm text-muted-foreground">{source.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>{source.type}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => removeSource(source.id)}>
                        Remove
                      </Button>
                      <Switch checked={source.enabled} onCheckedChange={() => toggleSourceEnabled(source.id)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showAddSourceForm && (
            <div className="space-y-4 rounded-md border p-4">
              <h3 className="text-lg font-medium">Add Knowledge Source</h3>

              <div className="space-y-2">
                <Label htmlFor="source-name">Name</Label>
                <Input
                  id="source-name"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  placeholder="E.g., Product Documentation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-description">Description</Label>
                <Input
                  id="source-description"
                  value={newSource.description}
                  onChange={(e) => setNewSource({ ...newSource, description: e.target.value })}
                  placeholder="E.g., Official product documentation and user guides"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-type">Type</Label>
                <Select value={newSource.type} onValueChange={(value) => setNewSource({ ...newSource, type: value })}>
                  <SelectTrigger id="source-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-url">URL or Path</Label>
                <Input
                  id="source-url"
                  value={newSource.url}
                  onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                  placeholder="E.g., https://docs.example.com or /data/documents"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddSourceForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSource}>Add Source</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Knowledge Configuration</CardTitle>
          <CardDescription>Configure how your agent uses knowledge sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="retrieval-strategy">Retrieval Strategy</Label>
            <Select
              value={retrievalStrategy}
              onValueChange={(value) => {
                setRetrievalStrategy(value)
                markAsModified()
              }}
            >
              <SelectTrigger id="retrieval-strategy">
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semantic">Semantic Search</SelectItem>
                <SelectItem value="keyword">Keyword Search</SelectItem>
                <SelectItem value="hybrid">Hybrid Search</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Determines how the agent retrieves information from knowledge sources
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chunk-size">Chunk Size</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="chunk-size"
                type="range"
                min="100"
                max="1000"
                step="50"
                value={chunkSize}
                onChange={(e) => {
                  setChunkSize(Number.parseInt(e.target.value))
                  markAsModified()
                }}
              />
              <span className="w-12 text-center">{chunkSize}</span>
            </div>
            <p className="text-sm text-muted-foreground">Size of text chunks for knowledge retrieval (in tokens)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="top-k">Top K Results</Label>
            <Input
              id="top-k"
              type="number"
              value={topK}
              onChange={(e) => {
                setTopK(Number.parseInt(e.target.value))
                markAsModified()
              }}
            />
            <p className="text-sm text-muted-foreground">Number of top results to retrieve from knowledge sources</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-citation">Automatic Citations</Label>
              <Switch
                id="auto-citation"
                checked={autoCitation}
                onCheckedChange={(checked) => {
                  setAutoCitation(checked)
                  markAsModified()
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Automatically add citations to responses based on knowledge sources
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="knowledge-fallback">Knowledge Fallback</Label>
              <Switch
                id="knowledge-fallback"
                checked={knowledgeFallback}
                onCheckedChange={(checked) => {
                  setKnowledgeFallback(checked)
                  markAsModified()
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Fall back to model knowledge when no relevant information is found in knowledge sources
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

