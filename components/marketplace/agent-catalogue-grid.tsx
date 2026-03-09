"use client"

import { useMemo } from "react"
import { Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { StarRating } from "@/components/marketplace/star-rating"
import { CATEGORY_LABELS, formatDownloadCount } from "@/lib/marketplace-utils"
import type { MarketplaceListing } from "@/lib/types"

interface AgentCatalogueGridProps {
  listings: MarketplaceListing[]
  searchQuery: string
  selectedCategory: string
  sortBy: string
  onInstall: (id: string) => void
  onUninstall: (id: string) => void
}

export function AgentCatalogueGrid({
  listings,
  searchQuery,
  selectedCategory,
  sortBy,
  onInstall,
  onUninstall,
}: AgentCatalogueGridProps) {
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase()

    return listings
      .filter((l) => {
        const matchesSearch =
          !q ||
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.authorName.toLowerCase().includes(q)
        const matchesCategory = selectedCategory === "all" || l.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === "most-downloads") return b.downloadCount - a.downloadCount
        if (sortBy === "highest-rated") return b.rating - a.rating
        if (sortBy === "newest")
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        return 0
      })
  }, [listings, searchQuery, selectedCategory, sortBy])

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        No agents match your search.
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((listing) => (
        <CatalogueCard
          key={listing.id}
          listing={listing}
          onInstall={onInstall}
          onUninstall={onUninstall}
        />
      ))}
    </div>
  )
}

interface CatalogueCardProps {
  listing: MarketplaceListing
  onInstall: (id: string) => void
  onUninstall: (id: string) => void
}

function CatalogueCard({ listing, onInstall, onUninstall }: CatalogueCardProps) {
  const formattedDownloads = formatDownloadCount(listing.downloadCount)

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs shrink-0">
            {CATEGORY_LABELS[listing.category] ?? listing.category}
          </Badge>
        </div>
        <CardTitle className="text-sm font-semibold leading-snug mt-1">{listing.title}</CardTitle>
        <p className="text-xs text-muted-foreground">by {listing.authorName}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <p className="text-xs text-muted-foreground line-clamp-2">{listing.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <StarRating rating={listing.rating} size="sm" />
          <span>({listing.reviewCount})</span>
          <span className="flex items-center gap-1 ml-auto">
            <Download className="h-3 w-3" />
            {formattedDownloads}
          </span>
        </div>
        <div className="mt-auto">
          {listing.isInstalled ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="w-full">
                  Uninstall
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Uninstall agent?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove <span className="font-medium">{listing.title}</span> from your
                    workspace. You can reinstall it at any time.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onUninstall(listing.id)}>
                    Uninstall
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button size="sm" className="w-full" onClick={() => onInstall(listing.id)}>
              Install
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
