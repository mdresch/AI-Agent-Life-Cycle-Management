"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useDevMode } from "@/contexts/dev-mode-context"

interface DevModeBannerProps {
  message?: string
}

export function DevModeBanner({ message }: DevModeBannerProps) {
  const { isDevMode } = useDevMode()

  if (!isDevMode) {
    return null
  }

  return (
    <Alert
      variant="warning"
      className="mb-6 border-2 border-warning/30 bg-warning/10 dark:bg-warning/20 dark:border-warning/40"
    >
      <AlertCircle className="h-5 w-5 text-warning" />
      <AlertTitle className="text-warning font-medium">Development Mode</AlertTitle>
      <AlertDescription className="text-warning/90">
        {message || "This page would normally require authentication, but it's accessible in development mode."}
      </AlertDescription>
    </Alert>
  )
}

