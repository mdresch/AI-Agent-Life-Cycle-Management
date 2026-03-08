"use client"

import { Bookmark, BookmarkCheck, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { BreakthroughAlert } from "@/lib/mock-data/trends"

interface BreakthroughAlertCardProps {
  alert: BreakthroughAlert
  isBookmarked: boolean
  onToggleBookmark: () => void
}

export function BreakthroughAlertCard({
  alert,
  isBookmarked,
  onToggleBookmark,
}: BreakthroughAlertCardProps) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(alert.sourceUrl)
      toast.success("Link copied to clipboard!")
    } catch {
      toast.error("Failed to copy link.")
    }
  }

  const formattedDate = formatDate(alert.publishedAt)

  return (
    <div className="w-full rounded-lg border-l-4 border-primary bg-muted/30 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
        🚀 Breakthrough Alert
      </p>
      <h2 className="text-xl font-bold mb-2">{alert.title}</h2>
      <p className="text-muted-foreground mb-4">{alert.summary}</p>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <a
          href={alert.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          {alert.source}
        </a>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{formattedDate}</span>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
