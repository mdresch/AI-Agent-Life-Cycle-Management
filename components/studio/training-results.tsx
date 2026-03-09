"use client"

import { CheckCircle2, XCircle, MinusCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { TrainingStep } from "@/lib/mock-data/studio"

interface TrainingResultsProps {
  results: TrainingStep[] | null
  isRunning: boolean
}

export function TrainingResults({ results, isRunning }: TrainingResultsProps) {
  if (isRunning) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Running training...</p>
      </div>
    )
  }

  if (results === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
        <p className="text-sm">Run a scenario to see results</p>
      </div>
    )
  }

  const passCount = results.filter((s) => s.result === "pass").length
  const failCount = results.filter((s) => s.result === "fail").length
  const totalScore = Math.round(
    results.filter((s) => s.result !== "skip").reduce((acc, s) => acc + s.score, 0) /
      Math.max(results.filter((s) => s.result !== "skip").length, 1),
  )

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {results.map((step, idx) => (
          <li key={step.id} className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{step.description}</p>
                {step.details && <p className="mt-0.5 text-xs text-muted-foreground">{step.details}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge
                  variant={step.result === "pass" ? "default" : step.result === "fail" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {step.score > 0 ? `${step.score}` : "—"}
                </Badge>
                {step.result === "pass" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                {step.result === "fail" && <XCircle className="h-4 w-4 text-destructive" />}
                {step.result === "skip" && <MinusCircle className="h-4 w-4 text-muted-foreground" />}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between rounded-md border bg-muted/50 px-4 py-3">
        <div className="flex gap-4 text-sm">
          <span className="font-medium text-emerald-600 dark:text-emerald-400">{passCount} passed</span>
          <span className="font-medium text-destructive">{failCount} failed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Overall score</span>
          <Badge variant="outline" className="font-bold">
            {totalScore} / 100
          </Badge>
        </div>
      </div>
    </div>
  )
}
