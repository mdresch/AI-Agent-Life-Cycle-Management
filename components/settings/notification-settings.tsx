"use client"

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export function NotificationSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    agentCreation: true,
    agentStatus: true,
    agentErrors: true,
    performanceAlerts: true,
    usageAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    productUpdates: true,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Saved notification settings:", settings)
      setIsSaving(false)
    }, 1000)
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how and when you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Agent Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="agent-creation" className="flex flex-col space-y-1">
                <span>Agent Creation</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications when new agents are created
                </span>
              </Label>
              <Switch
                id="agent-creation"
                checked={settings.agentCreation}
                onCheckedChange={() => handleToggle("agentCreation")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="agent-status" className="flex flex-col space-y-1">
                <span>Status Changes</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications when agent status changes
                </span>
              </Label>
              <Switch
                id="agent-status"
                checked={settings.agentStatus}
                onCheckedChange={() => handleToggle("agentStatus")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="agent-errors" className="flex flex-col space-y-1">
                <span>Error Alerts</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications for agent errors
                </span>
              </Label>
              <Switch
                id="agent-errors"
                checked={settings.agentErrors}
                onCheckedChange={() => handleToggle("agentErrors")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">System Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="performance-alerts" className="flex flex-col space-y-1">
                <span>Performance Alerts</span>
                <span className="font-normal text-sm text-muted-foreground">Receive alerts for performance issues</span>
              </Label>
              <Switch
                id="performance-alerts"
                checked={settings.performanceAlerts}
                onCheckedChange={() => handleToggle("performanceAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="usage-alerts" className="flex flex-col space-y-1">
                <span>Usage Alerts</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive alerts when approaching usage limits
                </span>
              </Label>
              <Switch
                id="usage-alerts"
                checked={settings.usageAlerts}
                onCheckedChange={() => handleToggle("usageAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="security-alerts" className="flex flex-col space-y-1">
                <span>Security Alerts</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive alerts for security-related events
                </span>
              </Label>
              <Switch
                id="security-alerts"
                checked={settings.securityAlerts}
                onCheckedChange={() => handleToggle("securityAlerts")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Marketing & Updates</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                <span>Marketing Emails</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive marketing and promotional emails
                </span>
              </Label>
              <Switch
                id="marketing-emails"
                checked={settings.marketingEmails}
                onCheckedChange={() => handleToggle("marketingEmails")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="product-updates" className="flex flex-col space-y-1">
                <span>Product Updates</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications about new features and updates
                </span>
              </Label>
              <Switch
                id="product-updates"
                checked={settings.productUpdates}
                onCheckedChange={() => handleToggle("productUpdates")}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
      </CardFooter>
    </>
  )
}

