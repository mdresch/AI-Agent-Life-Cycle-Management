import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"
import type { KpiMetric } from "@/lib/types"

interface KpiCardProps extends KpiMetric {
  icon?: React.ReactNode
}

export function KpiCard({ label, value, unit, trend, trendValue, icon }: KpiCardProps) {
  return (
    <Card className="border-l-4 border-l-accent shadow-[0_1px_3px_hsla(220,60%,20%,0.08)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-primary">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">
          {value}
          {unit && <span className="text-lg font-normal text-muted-foreground ml-1">{unit}</span>}
        </div>
        <div className="flex items-center mt-1 gap-1">
          {trend === "up" && <ArrowUp className="h-3 w-3 text-emerald-500 shrink-0" />}
          {trend === "down" && <ArrowDown className="h-3 w-3 text-destructive shrink-0" />}
          {trend === "neutral" && <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />}
          <span
            className={`text-xs font-medium ${
              trend === "up"
                ? "text-emerald-500"
                : trend === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }`}
          >
            {trendValue}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
