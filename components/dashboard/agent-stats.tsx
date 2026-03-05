import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"

interface AgentStatsProps {
  title: string
  value: string
  description: string
  trend: "increase" | "decrease" | "neutral"
}

export function AgentStats({ title, value, description, trend }: AgentStatsProps) {
  return (
    <Card className="border-l-4 border-l-accent shadow-[0_1px_3px_hsla(220,60%,20%,0.08)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
          {trend === "increase" && <ArrowUp className="h-4 w-4 text-primary" />}
          {trend === "decrease" && <ArrowDown className="h-4 w-4 text-destructive" />}
          {trend === "neutral" && <ArrowRight className="h-4 w-4 text-primary" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

