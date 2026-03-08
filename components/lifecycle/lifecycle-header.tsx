import { Layers, Rocket, ArrowUpCircle } from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import type { KpiMetric } from "@/lib/types"

const lifecycleKpis: (KpiMetric & { icon: React.ReactNode })[] = [
  {
    label: "Total in Lifecycle",
    value: 18,
    trend: "up",
    trendValue: "+2 this month",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    label: "In Production",
    value: 9,
    trend: "up",
    trendValue: "+1 from last week",
    icon: <Rocket className="h-4 w-4" />,
  },
  {
    label: "Pending Promotion",
    value: 3,
    trend: "neutral",
    trendValue: "awaiting review",
    icon: <ArrowUpCircle className="h-4 w-4" />,
  },
]

export function LifecycleHeader() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {lifecycleKpis.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </div>
  )
}
