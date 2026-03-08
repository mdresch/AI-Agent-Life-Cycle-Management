"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PromptTemplate } from "@/lib/mock-data/studio"

interface NewPromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (prompt: Omit<PromptTemplate, "id" | "createdAt" | "createdBy">) => void
}

export function NewPromptDialog({ open, onOpenChange, onSave }: NewPromptDialogProps) {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [tagsInput, setTagsInput] = useState("")
  const [errors, setErrors] = useState<{ name?: string; content?: string }>({})

  function handleSave() {
    const newErrors: { name?: string; content?: string } = {}
    if (!name.trim()) newErrors.name = "Name is required."
    if (!content.trim()) newErrors.content = "Content is required."
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    onSave({ name: name.trim(), content: content.trim(), tags })
    handleClose()
  }

  function handleClose() {
    setName("")
    setContent("")
    setTagsInput("")
    setErrors({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Prompt Template</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="prompt-name">Name</Label>
            <Input
              id="prompt-name"
              placeholder="e.g. Customer Welcome Message"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
              }}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt-content">Content</Label>
            <Textarea
              id="prompt-content"
              rows={6}
              placeholder="Enter your prompt template content..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }))
              }}
            />
            {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt-tags">Tags</Label>
            <Input
              id="prompt-tags"
              placeholder="comma-separated tags, e.g. support, billing"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Prompt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
