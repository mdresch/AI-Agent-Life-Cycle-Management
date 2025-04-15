"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2, MessageSquare, Copy, Save } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ProjectPromptsConfig({ data, updateData }) {
  const [templates, setTemplates] = useState(data.templates || [])
  const [activeTemplate, setActiveTemplate] = useState(null)
  const [newTemplate, setNewTemplate] = useState({
    id: "",
    title: "",
    description: "",
    content: "",
    variables: [],
  })
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false)

  // Fix the infinite loop by adding a check before updating
  useEffect(() => {
    // Only update if templates have actually changed
    if (JSON.stringify(templates) !== JSON.stringify(data.templates)) {
      updateData({ templates })
    }
  }, [templates]) // Removed updateData and data from dependencies

  const handleAddTemplate = () => {
    if (newTemplate.title && newTemplate.content) {
      // Extract variables from content (text between {{ and }})
      const variableRegex = /{{(.*?)}}/g
      const matches = [...newTemplate.content.matchAll(variableRegex)]
      const extractedVariables = matches.map((match) => match[1].trim())

      // Remove duplicates
      const uniqueVariables = [...new Set(extractedVariables)]

      const templateWithId = {
        ...newTemplate,
        id: `template-${Date.now()}`,
        variables: uniqueVariables,
      }

      setTemplates([...templates, templateWithId])
      setNewTemplate({
        id: "",
        title: "",
        description: "",
        content: "",
        variables: [],
      })
      setShowNewTemplateForm(false)
    }
  }

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id))
    if (activeTemplate && activeTemplate.id === id) {
      setActiveTemplate(null)
    }
  }

  const handleEditTemplate = () => {
    if (activeTemplate) {
      // Extract variables from content (text between {{ and }})
      const variableRegex = /{{(.*?)}}/g
      const matches = [...activeTemplate.content.matchAll(variableRegex)]
      const extractedVariables = matches.map((match) => match[1].trim())

      // Remove duplicates
      const uniqueVariables = [...new Set(extractedVariables)]

      const updatedTemplate = {
        ...activeTemplate,
        variables: uniqueVariables,
      }

      setTemplates(templates.map((t) => (t.id === activeTemplate.id ? updatedTemplate : t)))
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Prompt Templates</CardTitle>
          <CardDescription>Create and manage prompt templates for your agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Input placeholder="Search templates..." className="max-w-sm" />
              <Button onClick={() => setShowNewTemplateForm(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Template
              </Button>
            </div>

            <ScrollArea className="h-[300px] rounded-md border">
              <div className="space-y-2 p-4">
                {templates.length === 0 ? (
                  <div className="flex h-[200px] items-center justify-center">
                    <p className="text-center text-muted-foreground">
                      No templates yet. Create your first template to get started.
                    </p>
                  </div>
                ) : (
                  templates.map((template) => (
                    <div key={template.id} className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-medium">{template.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => setActiveTemplate(template)}>
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteTemplate(template.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{template.description}</p>
                      {template.variables.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {template.variables.map((variable) => (
                            <Badge key={variable} variant="outline" className="text-xs">
                              {variable}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {showNewTemplateForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Template</CardTitle>
            <CardDescription>Create a new prompt template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={newTemplate.title}
                onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                placeholder="E.g., Customer Greeting"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Input
                id="template-description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                placeholder="E.g., A friendly greeting for new customers"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-content">Template Content</Label>
              <Textarea
                id="template-content"
                className="min-h-[200px] font-mono text-sm"
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                placeholder="Enter your template content. Use {{variable_name}} for variables."
              />
              <p className="text-xs text-muted-foreground">
                Use {{ variable_name }} syntax for variables that will be replaced when the template is used.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowNewTemplateForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTemplate}>
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Template</CardTitle>
            <CardDescription>Edit your prompt template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-template-name">Template Name</Label>
              <Input
                id="edit-template-name"
                value={activeTemplate.title}
                onChange={(e) => setActiveTemplate({ ...activeTemplate, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-template-description">Description</Label>
              <Input
                id="edit-template-description"
                value={activeTemplate.description}
                onChange={(e) => setActiveTemplate({ ...activeTemplate, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-template-content">Template Content</Label>
              <Textarea
                id="edit-template-content"
                className="min-h-[200px] font-mono text-sm"
                value={activeTemplate.content}
                onChange={(e) => setActiveTemplate({ ...activeTemplate, content: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Variables</Label>
              <div className="flex flex-wrap gap-2">
                {activeTemplate.variables.map((variable) => (
                  <Badge key={variable} variant="secondary">
                    {variable}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Variables are automatically detected from the template content.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTemplate(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditTemplate}>
              <Save className="mr-2 h-4 w-4" />
              Update Template
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

