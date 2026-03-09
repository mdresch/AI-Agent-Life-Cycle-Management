"use client"

import { Bookmark, BookmarkCheck, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { newsArticles, type TrendCategory } from "@/lib/mock-data/trends"
import { formatDate } from "@/lib/utils"

interface NewsArticlesProps {
  category: TrendCategory
  bookmarkedIds: Set<string>
  onToggleBookmark: (id: string) => void
}

export function NewsArticles({ category, bookmarkedIds, onToggleBookmark }: NewsArticlesProps) {
  const filtered =
    category === "all" ? newsArticles : newsArticles.filter((a) => a.category === category)

  const handleShare = async (article: (typeof newsArticles)[number]) => {
    try {
      await navigator.clipboard.writeText(article.sourceUrl)
      toast.success("Link copied!")
    } catch {
      toast.error("Failed to copy link.")
    }
  }

  return (
    <div className="space-y-4">
      {filtered.map((article) => {
        const isBookmarked = bookmarkedIds.has(article.id)
        const visibleTags = article.tags.slice(0, 3)
        const extraTags = article.tags.length - visibleTags.length

        const formattedDate = formatDate(article.publishedAt)

        return (
          <Card key={article.id}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <p className="font-semibold leading-snug">{article.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {article.source} · {formattedDate}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {visibleTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {extraTags > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        +{extraTags} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleBookmark(article.id)}
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare(article)}
                    aria-label="Share"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No articles found for this category.
        </p>
      )}
    </div>
  )
}
