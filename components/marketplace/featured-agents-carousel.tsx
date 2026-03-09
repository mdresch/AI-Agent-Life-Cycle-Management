"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@/components/marketplace/star-rating"
import type { MarketplaceListing } from "@/lib/types"

const CATEGORY_LABELS: Record<string, string> = {
  "customer-support": "Customer Support",
  analytics: "Analytics",
  creative: "Creative",
  productivity: "Productivity",
  research: "Research",
  communication: "Communication",
  custom: "Custom",
}

interface FeaturedAgentsCarouselProps {
  listings: MarketplaceListing[]
  onInstall: (id: string) => void
}

export function FeaturedAgentsCarousel({ listings, onInstall }: FeaturedAgentsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex-none w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            >
              <FeaturedAgentCard listing={listing} onInstall={onInstall} />
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full shadow-md"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full shadow-md"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}

interface FeaturedAgentCardProps {
  listing: MarketplaceListing
  onInstall: (id: string) => void
}

function FeaturedAgentCard({ listing, onInstall }: FeaturedAgentCardProps) {
  const formattedDownloads =
    listing.downloadCount >= 1000
      ? `${(listing.downloadCount / 1000).toFixed(1)}K`
      : String(listing.downloadCount)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs shrink-0">
            {CATEGORY_LABELS[listing.category] ?? listing.category}
          </Badge>
          <Badge variant="default" className="text-xs shrink-0 bg-primary">
            Featured
          </Badge>
        </div>
        <CardTitle className="text-base font-semibold leading-snug mt-1">{listing.title}</CardTitle>
        <p className="text-xs text-muted-foreground">by {listing.authorName}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{listing.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <StarRating rating={listing.rating} size="sm" />
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Download className="h-3 w-3" />
              {formattedDownloads}
            </span>
          </div>
          <Button
            size="sm"
            variant={listing.isInstalled ? "secondary" : "default"}
            onClick={() => !listing.isInstalled && onInstall(listing.id)}
            disabled={listing.isInstalled}
          >
            {listing.isInstalled ? "Installed ✓" : "Install"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
