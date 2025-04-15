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
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-soft border-0 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/50">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend === "increase" && <ArrowUp className="h-4 w-4 text-success" />}
        {trend === "decrease" && <ArrowDown className="h-4 w-4 text-destructive" />}
        {trend === "neutral" && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

