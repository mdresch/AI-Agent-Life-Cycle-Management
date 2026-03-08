"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimeWindowSelector } from "@/components/analytics/time-window-selector"
import { PerformanceKpis } from "@/components/analytics/performance-kpis"
import { ResponseTimeChart } from "@/components/analytics/response-time-chart"
import { PerformanceTrendsChart } from "@/components/analytics/performance-trends-chart"
import { UsageMetrics } from "@/components/analytics/usage-metrics"
import { ErrorRateChart } from "@/components/analytics/error-rate-chart"
import { ErrorsTable } from "@/components/analytics/errors-table"
import { ExportButton } from "@/components/analytics/export-button"
import { getMockAnalyticsData, type TimeWindow } from "@/lib/mock-data/analytics"

/** Delay (ms) for the loading skeleton before chart data updates */
const LOADING_DELAY_MS = 300

export function AnalyticsDashboard() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("7d")
  const [isLoading, setIsLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState(() => getMockAnalyticsData("7d"))

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setAnalyticsData(getMockAnalyticsData(timeWindow))
      setIsLoading(false)
    }, LOADING_DELAY_MS)
    return () => clearTimeout(timer)
  }, [timeWindow])

  return (
    <div className="space-y-4">
      <Tabs defaultValue="performance" className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          <TimeWindowSelector value={timeWindow} onChange={setTimeWindow} />
        </div>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4 pt-4">
          {isLoading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <>
              <PerformanceKpis kpis={analyticsData.performanceKpis} />
              <div className="grid gap-4 md:grid-cols-2">
                <ResponseTimeChart data={analyticsData.responseTimeSeries} />
                <PerformanceTrendsChart data={analyticsData.performanceTrend} />
              </div>
              <div className="flex justify-end">
                <ExportButton
                  data={analyticsData.responseTimeSeries}
                  filename="performance"
                />
              </div>
            </>
          )}
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-4 pt-4">
          {isLoading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <>
              <UsageMetrics kpis={analyticsData.usageKpis} series={analyticsData.usageSeries} />
              <div className="flex justify-end">
                <ExportButton
                  data={analyticsData.usageSeries}
                  filename="usage"
                />
              </div>
            </>
          )}
        </TabsContent>

        {/* Errors Tab */}
        <TabsContent value="errors" className="space-y-4 pt-4">
          {isLoading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Overall Error Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">
                      {analyticsData.errorKpis.overallErrorRate}
                      <span className="text-lg font-normal text-muted-foreground ml-1">%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Agents with Errors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">
                      {analyticsData.errorKpis.agentsWithErrors}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <ErrorRateChart data={analyticsData.errorRates} />
              <ErrorsTable events={analyticsData.errorEvents} />
              <div className="flex justify-end">
                <ExportButton
                  data={analyticsData.errorEvents}
                  filename="errors"
                />
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

