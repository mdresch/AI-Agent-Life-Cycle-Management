"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function TechnologyRadarConfig() {
  const [rings, setRings] = useState([
    { id: "1", name: "Adopt", description: "Technologies we should be using now", color: "#4CAF50" },
    { id: "2", name: "Trial", description: "Technologies worth pursuing", color: "#2196F3" },
    { id: "3", name: "Assess", description: "Technologies worth exploring", color: "#FF9800" },
    { id: "4", name: "Hold", description: "Technologies to avoid for now", color: "#F44336" },
  ])

  const [quadrants, setQuadrants] = useState([
    { id: "1", name: "Techniques", description: "Elements of a software development process" },
    { id: "2", name: "Tools", description: "Software development tools and products" },
    { id: "3", name: "Platforms", description: "Things that host code or services" },
    { id: "4", name: "Languages & Frameworks", description: "Programming languages and frameworks" },
  ])

  const [technologies, setTechnologies] = useState([
    { id: "1", name: "GPT-4", quadrant: "1", ring: "1", isNew: true },
    { id: "2", name: "LangChain", quadrant: "2", ring: "2", isNew: true },
    { id: "3", name: "Retrieval Augmented Generation", quadrant: "1", ring: "1", isNew: false },
    { id: "4", name: "Vector Databases", quadrant: "3", ring: "2", isNew: false },
    { id: "5", name: "Multimodal Models", quadrant: "1", ring: "3", isNew: true },
  ])

  const removeRing = (id: string) => {
    setRings(rings.filter((ring) => ring.id !== id))
  }

  const removeQuadrant = (id: string) => {
    setQuadrants(quadrants.filter((quadrant) => quadrant.id !== id))
  }

  const removeTechnology = (id: string) => {
    setTechnologies(technologies.filter((tech) => tech.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Technology Radar Configuration</CardTitle>
          <CardDescription>Configure the structure and content of your technology radar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="structure">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="structure">Radar Structure</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
              <TabsTrigger value="display">Display Options</TabsTrigger>
            </TabsList>
            <TabsContent value="structure" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rings (Assessment Levels)</h3>
                <div className="space-y-2">
                  {rings.map((ring) => (
                    <div key={ring.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ring.color }}></div>
                          <span className="font-medium">{ring.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{ring.description}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeRing(ring.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="ring-name">Ring Name</Label>
                    <Input id="ring-name" placeholder="e.g., Adopt" />
                  </div>
                  <div>
                    <Label htmlFor="ring-description">Description</Label>
                    <Input id="ring-description" placeholder="Brief description" />
                  </div>
                  <div>
                    <Label htmlFor="ring-color">Color</Label>
                    <div className="flex gap-2">
                      <Input id="ring-color" type="color" className="w-12" defaultValue="#6366F1" />
                      <Button className="flex-1">Add Ring</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quadrants (Categories)</h3>
                <div className="space-y-2">
                  {quadrants.map((quadrant) => (
                    <div key={quadrant.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="space-y-0.5">
                        <span className="font-medium">{quadrant.name}</span>
                        <p className="text-sm text-muted-foreground">{quadrant.description}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeQuadrant(quadrant.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="quadrant-name">Quadrant Name</Label>
                    <Input id="quadrant-name" placeholder="e.g., Techniques" />
                  </div>
                  <div>
                    <Label htmlFor="quadrant-description">Description</Label>
                    <div className="flex gap-2">
                      <Input id="quadrant-description" placeholder="Brief description" />
                      <Button>Add</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="technologies" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Technologies</h3>
                <div className="space-y-2">
                  {technologies.map((tech) => (
                    <div key={tech.id} className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tech.name}</span>
                        {tech.isNew && <Badge variant="outline">New</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {quadrants.find((q) => q.id === tech.quadrant)?.name} /
                          {rings.find((r) => r.id === tech.ring)?.name}
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => removeTechnology(tech.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <Label htmlFor="tech-name">Technology Name</Label>
                    <Input id="tech-name" placeholder="e.g., GPT-4" />
                  </div>
                  <div>
                    <Label htmlFor="tech-quadrant">Quadrant</Label>
                    <Select>
                      <SelectTrigger id="tech-quadrant">
                        <SelectValue placeholder="Select quadrant" />
                      </SelectTrigger>
                      <SelectContent>
                        {quadrants.map((quadrant) => (
                          <SelectItem key={quadrant.id} value={quadrant.id}>
                            {quadrant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tech-ring">Ring</Label>
                    <Select>
                      <SelectTrigger id="tech-ring">
                        <SelectValue placeholder="Select ring" />
                      </SelectTrigger>
                      <SelectContent>
                        {rings.map((ring) => (
                          <SelectItem key={ring.id} value={ring.id}>
                            {ring.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="tech-is-new" />
                      <Label htmlFor="tech-is-new">Mark as new</Label>
                    </div>
                    <Button className="ml-auto">Add</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="display" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Options</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="radar-title">Radar Title</Label>
                    <Input id="radar-title" defaultValue="AI Technology Radar" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="radar-description">Description</Label>
                    <Textarea
                      id="radar-description"
                      defaultValue="An overview of AI technologies and their adoption status"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="show-legend" defaultChecked />
                    <Label htmlFor="show-legend">Show legend</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="show-grid" defaultChecked />
                    <Label htmlFor="show-grid">Show grid lines</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="show-labels" defaultChecked />
                    <Label htmlFor="show-labels">Show technology labels</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="interactive" defaultChecked />
                    <Label htmlFor="interactive">Interactive (hover/click)</Label>
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

