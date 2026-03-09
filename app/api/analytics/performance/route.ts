import { NextRequest } from "next/server"
import { withAuth } from "@/lib/api/with-auth"
import { apiSuccess, apiError } from "@/lib/api/response"
import { getMockAnalyticsData } from "@/lib/mock-data/analytics"

type TimeWindow = "24h" | "7d" | "30d" | "90d"
const validWindows: TimeWindow[] = ["24h", "7d", "30d", "90d"]

export const GET = withAuth(async (req) => {
  const { searchParams } = new URL(req.url)
  const windowParam = searchParams.get("window") ?? "7d"
  if (!validWindows.includes(windowParam as TimeWindow)) {
    return apiError("Invalid window. Must be one of: 24h, 7d, 30d, 90d", 400)
  }
  const data = getMockAnalyticsData(windowParam as TimeWindow)
  return apiSuccess({ performanceKpis: data.performanceKpis, performanceTrend: data.performanceTrend })
})
