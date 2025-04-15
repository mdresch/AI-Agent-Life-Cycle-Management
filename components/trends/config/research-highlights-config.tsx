"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export function ResearchHighlightsConfig() {
  const [sources, setSources] = useState([
    { id: "1", name: "arXiv", enabled: true },
    { id: "2", name: "Google Scholar", enabled: true },
    { id: "3", name: "IEEE Xplore", enabled: false },
    { id: "4", name: "ACM Digital Library", enabled: false },
    { id: "5", name: "Research Gate", enabled: true },
  ])

  const [categories, setCategories] = useState([
    { id: "1", name: "Machine Learning", enabled: true },
    { id: "2", name: "Natural Language Processing", enabled: true },
    { id: "3", name: "Computer Vision", enabled: true },
    { id: "4", name: "Reinforcement Learning", enabled: false },
    { id: "5", name: "Robotics", enabled: false },
  ])

  const toggleSource = (id: string) => {
    setSources(sources.map((source) => (source.id === id ? { ...source, enabled: !source.enabled } : source)))
  }

  const toggleCategory = (id: string) => {
    setCategories(
      categories.map((category) => (category.id === id ? { ...category, enabled: !category.enabled } : category)),
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Research Highlights Configuration</CardTitle>
          <CardDescription>
            Configure how research papers and academic content are collected and displayed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sources">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="display">Display Options</TabsTrigger>
            </TabsList>
            <TabsContent value="sources" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Research Sources</h3>
                <div className="grid gap-2">
                  {sources.map((source) => (
                    <div key={source.id} className="flex items-center space-x-2">
                      <Switch
                        id={`source-${source.id}`}
                        checked={source.enabled}
                        onCheckedChange={() => toggleSource(source.id)}
                      />
                      <Label htmlFor={`source-${source.id}`}>{source.name}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex items-end space-x-2">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="new-source">Add Source</Label>
                    <Input id="new-source" placeholder="Enter source name" />
                  </div>
                  <Button>Add</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="categories" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Research Categories</h3>
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Switch
                        id={`category-${category.id}`}
                        checked={category.enabled}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex items-end space-x-2">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="new-category">Add Category</Label>
                    <Input id="new-category" placeholder="Enter category name" />
                  </div>
                  <Button>Add</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="display" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Options</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="display-count">Number of papers to display</Label>
                    <Select defaultValue="5">
                      <SelectTrigger id="display-count">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sort-by">Sort by</Label>
                    <Select defaultValue="date">
                      <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Publication Date</SelectItem>
                        <SelectItem value="citations">Citation Count</SelectItem>
                        <SelectItem value="relevance">Relevance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-abstract" />
                    <Label htmlFor="show-abstract">Show abstract</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-authors" defaultChecked />
                    <Label htmlFor="show-authors">Show authors</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-journal" defaultChecked />
                    <Label htmlFor="show-journal">Show journal/conference</Label>
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

