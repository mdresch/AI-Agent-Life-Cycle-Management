import type { AgentType } from "@/lib/types"

/** Maps AgentType values to human-readable display labels. */
export const CATEGORY_LABELS: Record<AgentType, string> = {
  "customer-support": "Customer Support",
  analytics: "Analytics",
  creative: "Creative",
  productivity: "Productivity",
  research: "Research",
  communication: "Communication",
  custom: "Custom",
}

/**
 * Formats a download count for display.
 * Values ≥ 1 000 are rendered with a "K" suffix (e.g. 4 800 → "4.8K").
 */
export function formatDownloadCount(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : String(count)
}
