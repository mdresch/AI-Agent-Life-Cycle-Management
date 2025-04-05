"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Filter, ArrowUpDown } from "lucide-react"

// Mock data for trending topics
const initialTrendingTopics = [
  {
    id: 1,
    name: "Agent-based AI Systems",
    description: "Autonomous AI agents that can perform complex tasks and make decisions",
    trend: "rising",
    percentage: 85,
    categories: ["Agents", "Autonomy"],
    mentions: 1245,
    mentionChange: "+32%",
  },
  {
    id: 2,
    name: "Multimodal Large Language Models",
    description: "LLMs that can process and generate multiple types of data (text, images, audio)",
    trend: "rising",
    percentage: 92,
    categories: ["LLM", "Multimodal"],
    mentions: 2340,
    mentionChange: "+45%",
  },
  {
    id: 3,
    name: "AI Alignment & Safety",
    description: "Ensuring AI systems act in accordance with human values and intentions",
    trend: "rising",
    percentage: 78,
    categories: ["Safety", "Ethics"],
    mentions: 980,
    mentionChange: "+28%",
  },
]

export function TrendingTopicsConfig() {
  const [trendingTopics, setTrendingTopics] = useState(initialTrendingTopics)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<any>(null)
  const [newTopic, setNewTopic] = useState({
    name: "",
    description: "",
    trend: "rising",
    percentage: 75,
    categories: [] as string[],
    mentions: 0,
    mentionChange: "+0%",
  })
  const [newCategory, setNewCategory] = useState("")

  const filteredTopics = trendingTopics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.categories.some((category) => category.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAddTopic = () => {
    const id = Math.max(0, ...trendingTopics.map((t) => t.id)) + 1
    setTrendingTopics([...trendingTopics, { ...newTopic, id }])
    setNewTopic({
      name: "",
      description: "",
      trend: "rising",
      percentage: 75,
      categories: [],
      mentions: 0,
      mentionChange: "+0%",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditTopic = () => {
    setTrendingTopics(trendingTopics.map((topic) => (topic.id === currentTopic.id ? currentTopic : topic)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteTopic = () => {
    setTrendingTopics(trendingTopics.filter((topic) => topic.id !== currentTopic.id))
    setIsDeleteDialogOpen(false)
  }

  const handleAddCategory = () => {
    if (newCategory && !newTopic.categories.includes(newCategory)) {
      setNewTopic({ ...newTopic, categories: [...newTopic.categories, newCategory] })
      setNewCategory("")
    }
  }

  const handleAddCategoryToEdit = () => {
    if (newCategory && !currentTopic.categories.includes(newCategory)) {
      setCurrentTopic({ ...currentTopic, categories: [...currentTopic.categories, newCategory] })
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setNewTopic({
      ...newTopic,
      categories: newTopic.categories.filter((c) => c !== category),
    })
  }

  const handleRemoveCategoryFromEdit = (category: string) => {
    setCurrentTopic({
      ...currentTopic,
      categories: currentTopic.categories.filter((c: string) => c !== category),
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Trending Topics Configuration</CardTitle>
              <CardDescription>Manage trending topics displayed on the AI Trends & Insights dashboard</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Trending Topic</DialogTitle>
                  <DialogDescription>
                    Create a new trending topic to display on the AI Trends & Insights dashboard
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Topic Name</Label>
                    <Input
                      id="name"
                      value={newTopic.name}
                      onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                      placeholder="e.g., Autonomous AI Agents"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTopic.description}
                      onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                      placeholder="Brief description of the trending topic"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="trend">Trend Direction</Label>
                      <Select
                        value={newTopic.trend}
                        onValueChange={(value) => setNewTopic({ ...newTopic, trend: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select trend" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rising">Rising</SelectItem>
                          <SelectItem value="stable">Stable</SelectItem>
                          <SelectItem value="falling">Falling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="percentage">Trend Percentage</Label>
                      <Input
                        id="percentage"
                        type="number"
                        min="0"
                        max="100"
                        value={newTopic.percentage}
                        onChange={(e) => setNewTopic({ ...newTopic, percentage: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Categories</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newTopic.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="flex items-center gap-1">
                          {category}
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(category)}
                            className="ml-1 rounded-full text-xs hover:bg-muted p-1"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add a category"
                        className="flex-1"
                      />
                      <Button type="button" onClick={handleAddCategory} size="sm">
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="mentions">Mentions</Label>
                      <Input
                        id="mentions"
                        type="number"
                        min="0"
                        value={newTopic.mentions}
                        onChange={(e) => setNewTopic({ ...newTopic, mentions: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="mentionChange">Mention Change</Label>
                      <Input
                        id="mentionChange"
                        value={newTopic.mentionChange}
                        onChange={(e) => setNewTopic({ ...newTopic, mentionChange: e.target.value })}
                        placeholder="e.g., +15%"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTopic}>Add Topic</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <div className="flex items-center space-x-1">
                    <span>Topic Name</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Mentions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTopics.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No trending topics found. Add a new topic to get started.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTopics.map((topic) => (
                  <TableRow key={topic.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{topic.name}</div>
                        <div className="text-xs text-muted-foreground">{topic.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          topic.trend === "rising" ? "default" : topic.trend === "stable" ? "secondary" : "destructive"
                        }
                      >
                        {topic.trend}
                      </Badge>
                    </TableCell>
                    <TableCell>{topic.percentage}%</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {topic.categories.map((category) => (
                          <Badge key={category} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{topic.mentions}</span>
                        <Badge variant="outline">{topic.mentionChange}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentTopic(topic)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentTopic(topic)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTopics.length} of {trendingTopics.length} topics
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Trending Topic</DialogTitle>
            <DialogDescription>Update the details of this trending topic</DialogDescription>
          </DialogHeader>
          {currentTopic && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Topic Name</Label>
                <Input
                  id="edit-name"
                  value={currentTopic.name}
                  onChange={(e) => setCurrentTopic({ ...currentTopic, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentTopic.description}
                  onChange={(e) => setCurrentTopic({ ...currentTopic, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-trend">Trend Direction</Label>
                  <Select
                    value={currentTopic.trend}
                    onValueChange={(value) => setCurrentTopic({ ...currentTopic, trend: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rising">Rising</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="falling">Falling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-percentage">Trend Percentage</Label>
                  <Input
                    id="edit-percentage"
                    type="number"
                    min="0"
                    max="100"
                    value={currentTopic.percentage}
                    onChange={(e) =>
                      setCurrentTopic({
                        ...currentTopic,
                        percentage: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Categories</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentTopic.categories.map((category: string) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategoryFromEdit(category)}
                        className="ml-1 rounded-full text-xs hover:bg-muted p-1"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add a category"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddCategoryToEdit} size="sm">
                    Add
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-mentions">Mentions</Label>
                  <Input
                    id="edit-mentions"
                    type="number"
                    min="0"
                    value={currentTopic.mentions}
                    onChange={(e) =>
                      setCurrentTopic({
                        ...currentTopic,
                        mentions: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-mentionChange">Mention Change</Label>
                  <Input
                    id="edit-mentionChange"
                    value={currentTopic.mentionChange}
                    onChange={(e) => setCurrentTopic({ ...currentTopic, mentionChange: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTopic}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the trending topic "{currentTopic?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTopic} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

