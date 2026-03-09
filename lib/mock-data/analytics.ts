export type TimeWindow = "24h" | "7d" | "30d" | "90d"

export const TIME_WINDOW_LABELS: Record<TimeWindow, string> = {
  "24h": "Last 24 Hours",
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
}

export interface PerformanceKpis {
  avgResponseTimeMs: number
  successRate: number
  throughputPerMin: number
  availabilityPercent: number
  responseTimeTrend: "up" | "down" | "neutral"
  successRateTrend: "up" | "down" | "neutral"
  throughputTrend: "up" | "down" | "neutral"
  availabilityTrend: "up" | "down" | "neutral"
}

export interface AgentResponseTime {
  agentName: string
  avgMs: number
  p95Ms: number
  p99Ms: number
}

export interface PerformanceTrendPoint {
  date: string
  successRate: number
  avgResponseMs: number
}

export interface UsageKpis {
  totalTokens: number
  totalRequests: number
  activeUsers: number
}

export interface UsageDataPoint {
  date: string
  tokens: number
  requests: number
  users: number
}

export interface ErrorKpis {
  overallErrorRate: number
  agentsWithErrors: number
}

export interface ErrorRateByType {
  agentType: string
  errorRate: number
  errorCount: number
}

export interface ErrorEvent {
  id: string
  agentId: string
  agentName: string
  agentType: string
  errorType: string
  errorMessage: string
  occurredAt: string
}

const AGENT_RESPONSE_TIMES: AgentResponseTime[] = [
  { agentName: "Customer Support", avgMs: 850,  p95Ms: 1275, p99Ms: 1700 },
  { agentName: "Data Analysis",    avgMs: 1840, p95Ms: 2760, p99Ms: 3680 },
  { agentName: "Content Gen",      avgMs: 2300, p95Ms: 3450, p99Ms: 4600 },
  { agentName: "Scheduling",       avgMs: 450,  p95Ms: 675,  p99Ms: 900  },
  { agentName: "Research",         avgMs: 1520, p95Ms: 2280, p99Ms: 3040 },
  { agentName: "Code Review",      avgMs: 1180, p95Ms: 1770, p99Ms: 2360 },
]

const ERROR_RATES: ErrorRateByType[] = [
  { agentType: "Data Analysis",    errorRate: 5.2, errorCount: 312 },
  { agentType: "Research",         errorRate: 3.8, errorCount: 228 },
  { agentType: "Content Gen",      errorRate: 2.9, errorCount: 174 },
  { agentType: "Code Review",      errorRate: 1.7, errorCount: 102 },
  { agentType: "Customer Support", errorRate: 1.1, errorCount:  66 },
  { agentType: "Scheduling",       errorRate: 0.5, errorCount:  30 },
]

const ERROR_EVENTS: ErrorEvent[] = [
  { id: "e1", agentId: "ag-1", agentName: "Data Analysis Bot",    agentType: "Data Analysis",    errorType: "timeout",        errorMessage: "Request timed out after 30s waiting for upstream data source",    occurredAt: "2024-03-15T14:32:00Z" },
  { id: "e2", agentId: "ag-2", agentName: "Research Assistant",   agentType: "Research",         errorType: "rate_limit",     errorMessage: "OpenAI rate limit exceeded: 429 Too Many Requests",               occurredAt: "2024-03-15T13:18:00Z" },
  { id: "e3", agentId: "ag-3", agentName: "Content Generator",    agentType: "Content Gen",      errorType: "context_length", errorMessage: "Prompt exceeds maximum context length of 128k tokens",            occurredAt: "2024-03-15T12:05:00Z" },
  { id: "e4", agentId: "ag-4", agentName: "Code Reviewer",        agentType: "Code Review",      errorType: "api_error",      errorMessage: "Upstream API returned 503 Service Unavailable",                   occurredAt: "2024-03-15T11:47:00Z" },
  { id: "e5", agentId: "ag-1", agentName: "Data Analysis Bot",    agentType: "Data Analysis",    errorType: "timeout",        errorMessage: "Database query timed out after 15s",                              occurredAt: "2024-03-15T10:21:00Z" },
  { id: "e6", agentId: "ag-5", agentName: "Support Agent Pro",    agentType: "Customer Support", errorType: "api_error",      errorMessage: "CRM integration returned unexpected null response",               occurredAt: "2024-03-15T09:55:00Z" },
  { id: "e7", agentId: "ag-2", agentName: "Research Assistant",   agentType: "Research",         errorType: "rate_limit",     errorMessage: "Search API quota exhausted for the current billing period",       occurredAt: "2024-03-15T08:33:00Z" },
  { id: "e8", agentId: "ag-3", agentName: "Content Generator",    agentType: "Content Gen",      errorType: "context_length", errorMessage: "Combined input + output exceeds model context window",            occurredAt: "2024-03-15T07:14:00Z" },
]

function build24hTrend(): PerformanceTrendPoint[] {
  const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  const baseRates = [96.1,95.8,96.0,96.3,96.5,96.7,97.0,97.2,97.5,97.3,97.6,97.8,97.9,98.0,97.8,97.7,97.5,97.3,97.4,97.6,97.8,97.9,98.1,98.2]
  const baseMs    = [720, 750, 740, 710, 690, 670, 650, 630, 610, 625, 605, 595, 590, 580, 598, 615, 630, 645, 628, 612, 598, 585, 572, 560]
  return hours.map((h, i) => ({
    date: `${String(h).padStart(2, "0")}:00`,
    successRate: baseRates[i],
    avgResponseMs: baseMs[i],
  }))
}

function build7dTrend(): PerformanceTrendPoint[] {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  const rates = [95.2, 95.8, 96.1, 96.4, 96.0, 97.1, 97.4]
  const ms    = [1020, 980, 950, 930, 960, 890, 870]
  return days.map((d, i) => ({ date: d, successRate: rates[i], avgResponseMs: ms[i] }))
}

function build30dTrend(): PerformanceTrendPoint[] {
  const months = ["Mar","Apr"]
  const points: PerformanceTrendPoint[] = []
  const baseRate = 94.5
  const baseMs   = 1150
  for (let d = 1; d <= 30; d++) {
    const month = d <= 31 ? months[0] : months[1]
    points.push({
      date: `${month} ${d}`,
      successRate: +(baseRate + d * 0.08 + (d % 3 === 0 ? -0.4 : 0.1)).toFixed(1),
      avgResponseMs: Math.round(baseMs - d * 4 + (d % 5 === 0 ? 30 : -5)),
    })
  }
  return points
}

function build90dTrend(): PerformanceTrendPoint[] {
  const weeks = ["Jan W1","Jan W2","Jan W3","Jan W4","Feb W1","Feb W2","Feb W3","Feb W4","Mar W1","Mar W2","Mar W3","Mar W4","Mar W5"]
  const rates = [92.1, 92.8, 93.2, 93.6, 94.0, 94.3, 94.7, 95.1, 95.4, 95.8, 96.1, 96.4, 96.8]
  const ms    = [1420, 1380, 1340, 1300, 1260, 1230, 1200, 1170, 1140, 1110, 1080, 1050, 1020]
  return weeks.map((w, i) => ({ date: w, successRate: rates[i], avgResponseMs: ms[i] }))
}

function build24hUsage(): UsageDataPoint[] {
  const baseTokens   = [180000, 165000, 152000, 148000, 155000, 172000, 198000, 225000, 260000, 285000, 310000, 328000, 335000, 342000, 330000, 318000, 305000, 295000, 288000, 298000, 312000, 325000, 318000, 305000]
  const baseRequests = [1200, 1100, 980, 950, 990, 1150, 1350, 1580, 1820, 2010, 2200, 2350, 2420, 2450, 2380, 2290, 2200, 2100, 2050, 2120, 2200, 2300, 2250, 2150]
  const baseUsers    = [420, 385, 360, 340, 355, 410, 485, 560, 640, 700, 760, 800, 820, 835, 810, 785, 755, 720, 700, 725, 755, 785, 770, 740]
  return Array.from({ length: 24 }, (_, i) => ({
    date: `${String(i).padStart(2, "0")}:00`,
    tokens:   baseTokens[i],
    requests: baseRequests[i],
    users:    baseUsers[i],
  }))
}

function build7dUsage(): UsageDataPoint[] {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  const tokens   = [3200000, 3450000, 3300000, 3600000, 3820000, 2900000, 2650000]
  const requests = [22000,   24500,   23200,   25800,   27100,   20400,   18600]
  const users    = [4200,    4600,    4400,    4900,    5100,    3800,    3400]
  return days.map((d, i) => ({ date: d, tokens: tokens[i], requests: requests[i], users: users[i] }))
}

function build30dUsage(): UsageDataPoint[] {
  const points: UsageDataPoint[] = []
  for (let d = 1; d <= 30; d++) {
    const weekend = d % 7 === 0 || d % 7 === 6
    points.push({
      date: `Mar ${d}`,
      tokens:   weekend ? 2800000 + d * 20000 : 3400000 + d * 25000,
      requests: weekend ? 18000 + d * 120 : 23000 + d * 150,
      users:    weekend ? 3200 + d * 20 : 4200 + d * 25,
    })
  }
  return points
}

function build90dUsage(): UsageDataPoint[] {
  const weeks = ["Jan W1","Jan W2","Jan W3","Jan W4","Feb W1","Feb W2","Feb W3","Feb W4","Mar W1","Mar W2","Mar W3","Mar W4","Mar W5"]
  return weeks.map((w, i) => ({
    date: w,
    tokens:   18000000 + i * 1200000,
    requests: 130000   + i * 9000,
    users:    22000    + i * 1500,
  }))
}

export function getMockAnalyticsData(window: TimeWindow) {
  const kpisByWindow: Record<TimeWindow, PerformanceKpis> = {
    "24h": { avgResponseTimeMs: 620,  successRate: 98.2, throughputPerMin: 42.5, availabilityPercent: 99.99, responseTimeTrend: "down",    successRateTrend: "up",     throughputTrend: "up",     availabilityTrend: "neutral" },
    "7d":  { avgResponseTimeMs: 960,  successRate: 96.4, throughputPerMin: 28.3, availabilityPercent: 99.95, responseTimeTrend: "down",    successRateTrend: "up",     throughputTrend: "up",     availabilityTrend: "neutral" },
    "30d": { avgResponseTimeMs: 1120, successRate: 95.1, throughputPerMin: 24.8, availabilityPercent: 99.92, responseTimeTrend: "neutral", successRateTrend: "up",     throughputTrend: "neutral", availabilityTrend: "up"     },
    "90d": { avgResponseTimeMs: 1350, successRate: 93.8, throughputPerMin: 21.2, availabilityPercent: 99.87, responseTimeTrend: "up",      successRateTrend: "neutral", throughputTrend: "down",    availabilityTrend: "down"   },
  }

  const usageKpisByWindow: Record<TimeWindow, UsageKpis> = {
    "24h": { totalTokens: 6800000,   totalRequests: 46200,   activeUsers: 820  },
    "7d":  { totalTokens: 24600000,  totalRequests: 165800,  activeUsers: 5100 },
    "30d": { totalTokens: 98400000,  totalRequests: 672000,  activeUsers: 12845 },
    "90d": { totalTokens: 285000000, totalRequests: 1980000, activeUsers: 24300 },
  }

  const errorKpisByWindow: Record<TimeWindow, ErrorKpis> = {
    "24h": { overallErrorRate: 1.8, agentsWithErrors: 3 },
    "7d":  { overallErrorRate: 2.4, agentsWithErrors: 4 },
    "30d": { overallErrorRate: 3.1, agentsWithErrors: 5 },
    "90d": { overallErrorRate: 3.8, agentsWithErrors: 6 },
  }

  const trendBuilders: Record<TimeWindow, () => PerformanceTrendPoint[]> = {
    "24h": build24hTrend,
    "7d":  build7dTrend,
    "30d": build30dTrend,
    "90d": build90dTrend,
  }

  const usageBuilders: Record<TimeWindow, () => UsageDataPoint[]> = {
    "24h": build24hUsage,
    "7d":  build7dUsage,
    "30d": build30dUsage,
    "90d": build90dUsage,
  }

  return {
    performanceKpis:   kpisByWindow[window],
    responseTimeSeries: AGENT_RESPONSE_TIMES,
    performanceTrend:  trendBuilders[window](),
    usageKpis:         usageKpisByWindow[window],
    usageSeries:       usageBuilders[window](),
    errorKpis:         errorKpisByWindow[window],
    errorRates:        ERROR_RATES,
    errorEvents:       ERROR_EVENTS,
  }
}
