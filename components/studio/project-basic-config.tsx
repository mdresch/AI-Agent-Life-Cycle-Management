"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectBasicConfig({ data, updateData }) {
  const [localData, setLocalData] = useState(data)
  const [temperatureDisplay, setTemperatureDisplay] = useState(data.temperature.toString())

  // This effect was causing an infinite loop - only update parent when local data changes
  useEffect(() => {
    // Don't call updateData on every render
    const hasChanges = JSON.stringify(localData) !== JSON.stringify(data)
    if (hasChanges) {
      updateData(localData)
    }
  }, [localData]) // Removed updateData from dependencies

  const handleChange = (field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTemperatureChange = (e) => {
    const value = Number.parseFloat(e.target.value)
    setLocalData((prev) => ({
      ...prev,
      temperature: value,
    }))
    setTemperatureDisplay(value.toString())
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Configuration</CardTitle>
          <CardDescription>Configure the basic settings for your AI agent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                value={localData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter agent name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-model">Model</Label>
              <Select value={localData.model} onValueChange={(value) => handleChange("model", value)}>
                <SelectTrigger id="agent-model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                  <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-description">Description</Label>
            <Textarea
              id="agent-description"
              value={localData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe what this agent does"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agent-temperature">Temperature</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="agent-temperature"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={localData.temperature}
                  onChange={handleTemperatureChange}
                />
                <span className="w-12 text-center">{temperatureDisplay}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-max-tokens">Max Tokens</Label>
              <Input
                id="agent-max-tokens"
                type="number"
                value={localData.maxTokens}
                onChange={(e) => handleChange("maxTokens", Number.parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="agent-active">Active</Label>
              <Switch
                id="agent-active"
                checked={localData.isActive}
                onCheckedChange={(checked) => handleChange("isActive", checked)}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              When active, this agent will be available for use in the platform
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Prompt</CardTitle>
          <CardDescription>Define the core instructions for your agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Textarea
              value={localData.systemPrompt}
              onChange={(e) => handleChange("systemPrompt", e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Enter the system prompt that defines your agent's behavior and capabilities..."
            />
            <p className="text-sm text-muted-foreground">
              The system prompt is the foundation of your agent's behavior. Be specific about its role, tone, and
              limitations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

