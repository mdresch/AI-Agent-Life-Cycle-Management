"use client"

import { Activity, CheckCircle2, Clock, Zap } from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import type { PerformanceKpis } from "@/lib/mock-data/analytics"

interface PerformanceKpisProps {
  kpis: PerformanceKpis
}

export function PerformanceKpis({ kpis }: PerformanceKpisProps) {
  // Response time trend is inverted: a "down" trend (lower ms) is good → show as green "up".
  // A "up" trend (higher ms) is bad → show as red "down".
  const invertedResponseTimeTrend =
    kpis.responseTimeTrend === "down"
      ? "up"
      : kpis.responseTimeTrend === "up"
        ? "down"
        : "neutral"

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
