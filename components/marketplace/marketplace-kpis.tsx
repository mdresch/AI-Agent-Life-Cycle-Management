import { KpiCard } from "@/components/dashboard/kpi-card"
import { Download, Package, Sparkles, Star } from "lucide-react"
import type { MarketplaceKpis as MarketplaceKpisType } from "@/lib/types"

interface MarketplaceKpisProps {
  kpis: MarketplaceKpisType
}

export function MarketplaceKpis({ kpis }: MarketplaceKpisProps) {
  const formattedDownloads =
    kpis.totalDownloads >= 1000
      ? `${(kpis.totalDownloads / 1000).toFixed(1)}K`
      : String(kpis.totalDownloads)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Total Available"
        value={kpis.totalListings.toLocaleString()}
        trend="up"
        trendValue="+156 from last month"
        icon={<Package className="h-4 w-4" />}
      />
      <KpiCard
        label="Total Downloads"
        value={formattedDownloads}
        trend="up"
        trendValue="+12.5% this month"
        icon={<Download className="h-4 w-4" />}
      />
      <KpiCard
        label="Average Rating"
        value={kpis.averageRating.toFixed(1)}
        unit="/5"
        trend="up"
        trendValue="+0.2"
        icon={<Star className="h-4 w-4" />}
      />
      <KpiCard
        label="New This Week"
        value={kpis.newThisWeek}
        trend="up"
        trendValue="+8 from last week"
        icon={<Sparkles className="h-4 w-4" />}
      />
    </div>
  )
}
