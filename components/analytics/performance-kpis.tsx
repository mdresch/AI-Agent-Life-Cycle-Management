"use client"

import { Activity, CheckCircle2, Clock, Zap } from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import type { PerformanceKpis } from "@/lib/mock-data/analytics"

interface PerformanceKpisProps {
  kpis: PerformanceKpis
}

/**
 * Inverts a trend value for response time: a lower response time (trend "down") is good
 * and should display as green "up" in the KpiCard, while higher (trend "up") is bad and
 * should display as red "down".
 */
function invertResponseTimeTrend(
  trend: "up" | "down" | "neutral",
): "up" | "down" | "neutral" {
  if (trend === "down") return "up"
  if (trend === "up") return "down"
  return "neutral"
}

export function PerformanceKpis({ kpis }: PerformanceKpisProps) {
  const invertedResponseTimeTrend = invertResponseTimeTrend(kpis.responseTimeTrend)

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <KpiCard
        label="Avg Response Time"
        value={kpis.avgResponseTimeMs}
        unit="ms"
        trend={invertedResponseTimeTrend}
        trendValue={
          kpis.responseTimeTrend === "down"
            ? "Improved"
            : kpis.responseTimeTrend === "up"
              ? "Degraded"
              : "Stable"
        }
        icon={<Clock className="h-4 w-4" />}
      />
      <KpiCard
        label="Success Rate"
        value={kpis.successRate}
        unit="%"
        trend={kpis.successRateTrend}
        trendValue={
          kpis.successRateTrend === "up"
            ? "Improving"
            : kpis.successRateTrend === "down"
              ? "Declining"
              : "Stable"
        }
        icon={<CheckCircle2 className="h-4 w-4" />}
      />
      <KpiCard
        label="Throughput"
        value={kpis.throughputPerMin}
        unit="req/min"
        trend={kpis.throughputTrend}
        trendValue={
          kpis.throughputTrend === "up"
            ? "Increasing"
            : kpis.throughputTrend === "down"
              ? "Decreasing"
              : "Stable"
        }
        icon={<Zap className="h-4 w-4" />}
      />
      <KpiCard
        label="Availability"
        value={kpis.availabilityPercent}
        unit="%"
        trend={kpis.availabilityTrend}
        trendValue={
          kpis.availabilityTrend === "up"
            ? "Improving"
            : kpis.availabilityTrend === "down"
              ? "Declining"
              : "Stable"
        }
        icon={<Activity className="h-4 w-4" />}
      />
    </div>
  )
}
