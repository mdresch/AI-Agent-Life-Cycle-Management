import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  size?: "sm" | "md"
}

export function StarRating({ rating, size = "sm" }: StarRatingProps) {
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5"

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= Math.floor(rating)
        const half = !filled && i < rating && rating - Math.floor(rating) >= 0.5

        return (
          <Star
            key={i}
            className={cn(
              iconClass,
              filled || half
                ? "text-yellow-500 fill-yellow-500"
                : "text-muted-foreground fill-none",
              half && "opacity-50",
            )}
          />
        )
      })}
    </div>
  )
}
