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
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Filter, ArrowUpDown, Image } from "lucide-react"

// Mock data for news articles
const initialArticles = [
  {
    id: 1,
    title: "OpenAI Introduces GPT-5 with Enhanced Agent Capabilities",
    source: "TechCrunch",
    date: "2 days ago",
    summary:
      "OpenAI has unveiled GPT-5, featuring significant improvements in reasoning, planning, and agent-like behaviors. The new model demonstrates enhanced capabilities in executing complex tasks autonomously.",
    url: "#",
    categories: ["LLM", "Agents", "OpenAI"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    title: "Google DeepMind's New Framework for Multi-Agent Collaboration",
    source: "VentureBeat",
    date: "3 days ago",
    summary:
      "Google DeepMind researchers have published a new framework that enables multiple AI agents to collaborate effectively on complex tasks, showing promising results in problem-solving scenarios.",
    url: "#",
    categories: ["Agents", "Collaboration", "Google"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    title: "AI Agents Revolutionizing Customer Service Operations",
    source: "Forbes",
    date: "5 days ago",
    summary:
      "Major enterprises are reporting significant improvements in customer satisfaction and operational efficiency after deploying specialized AI agents for customer service tasks.",
    url: "#",
    categories: ["Agents", "Business", "Customer Service"],
    image: "/placeholder.svg?height=100&width=200",
  },
]

export function NewsArticlesConfig() {
  const [articles, setArticles] = useState(initialArticles)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<any>(null)
  const [newArticle, setNewArticle] = useState({
    title: "",
    source: "",
    date: "",
    summary: "",
    url: "",
    categories: [] as string[],
    image: "/placeholder.svg?height=100&width=200",
  })
  const [newCategory, setNewCategory] = useState("")

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.categories.some((category) => category.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAddArticle = () => {
    const id = Math.max(0, ...articles.map((a) => a.id)) + 1
    setArticles([...articles, { ...newArticle, id }])
    setNewArticle({
      title: "",
      source: "",
      date: "",
      summary: "",
      url: "",
      categories: [],
      image: "/placeholder.svg?height=100&width=200",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditArticle = () => {
    setArticles(articles.map((article) => (article.id === currentArticle.id ? currentArticle : article)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteArticle = () => {
    setArticles(articles.filter((article) => article.id !== currentArticle.id))
    setIsDeleteDialogOpen(false)
  }

  const handleAddCategory = () => {
    if (newCategory && !newArticle.categories.includes(newCategory)) {
      setNewArticle({ ...newArticle, categories: [...newArticle.categories, newCategory] })
      setNewCategory("")
    }
  }

  const handleAddCategoryToEdit = () => {
    if (newCategory && !currentArticle.categories.includes(newCategory)) {
      setCurrentArticle({ ...currentArticle, categories: [...currentArticle.categories, newCategory] })
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setNewArticle({
      ...newArticle,
      categories: newArticle.categories.filter((c) => c !== category),
    })
  }

  const handleRemoveCategoryFromEdit = (category: string) => {
    setCurrentArticle({
      ...currentArticle,
      categories: currentArticle.categories.filter((c: string) => c !== category),
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>News & Articles Configuration</CardTitle>
              <CardDescription>Manage news articles displayed on the AI Trends & Insights dashboard</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Article
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Article</DialogTitle>
                  <DialogDescription>
                    Create a new news article to display on the AI Trends & Insights dashboard
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Article Title</Label>
                    <Input
                      id="title"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                      placeholder="e.g., New Breakthrough in AI Research"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="source">Source</Label>
                      <Input
                        id="source"
                        value={newArticle.source}
                        onChange={(e) => setNewArticle({ ...newArticle, source: e.target.value })}
                        placeholder="e.g., TechCrunch"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        value={newArticle.date}
                        onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
                        placeholder="e.g., 2 days ago"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      value={newArticle.summary}
                      onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                      placeholder="Brief summary of the article"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">Article URL</Label>
                    <Input
                      id="url"
                      value={newArticle.url}
                      onChange={(e) => setNewArticle({ ...newArticle, url: e.target.value })}
                      placeholder="e.g., https://example.com/article"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        value={newArticle.image}
                        onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                        placeholder="e.g., https://example.com/image.jpg"
                      />
                      <Button variant="outline" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Categories</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newArticle.categories.map((category) => (
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
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddArticle}>Add Article</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
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
                    <span>Title</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No articles found. Add a new article to get started.
                  </TableCell>
                </TableRow>
              ) : (
                filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{article.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{article.summary}</div>
                      </div>
                    </TableCell>
                    <TableCell>{article.source}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {article.categories.map((category) => (
                          <Badge key={category} variant="outline">
                            {category}
                          </Badge>
                        ))}
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
                              setCurrentArticle(article)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentArticle(article)
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
            Showing {filteredArticles.length} of {articles.length} articles
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
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>Update the details of this news article</DialogDescription>
          </DialogHeader>
          {currentArticle && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Article Title</Label>
                <Input
                  id="edit-title"
                  value={currentArticle.title}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-source">Source</Label>
                  <Input
                    id="edit-source"
                    value={currentArticle.source}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, source: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    value={currentArticle.date}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-summary">Summary</Label>
                <Textarea
                  id="edit-summary"
                  value={currentArticle.summary}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, summary: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-url">Article URL</Label>
                <Input
                  id="edit-url"
                  value={currentArticle.url}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, url: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-image"
                    value={currentArticle.image}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, image: e.target.value })}
                  />
                  <Button variant="outline" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Categories</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentArticle.categories.map((category: string) => (
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
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditArticle}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the article "{currentArticle?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteArticle} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

