"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TIME_WINDOW_LABELS, type TimeWindow } from "@/lib/mock-data/analytics"

interface TimeWindowSelectorProps {
  value: TimeWindow
  onChange: (w: TimeWindow) => void
}

export function TimeWindowSelector({ value, onChange }: TimeWindowSelectorProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => { if (v) onChange(v as TimeWindow) }}
    >
      {(Object.keys(TIME_WINDOW_LABELS) as TimeWindow[]).map((w) => (
        <ToggleGroupItem
          key={w}
          value={w}
          aria-label={TIME_WINDOW_LABELS[w]}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          {w}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
