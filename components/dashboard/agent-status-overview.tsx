"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentActivityChart } from "@/components/charts/agent-activity-chart"

export function AgentStatusOverview() {
  return (
    <Card className="shadow-card border-0 overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4">
        <CardTitle className="text-lg font-medium">Agent Activity Overview</CardTitle>
        <CardDescription>Monitor your agents' performance and activity over time</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="requests"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
            >
              Requests
            </TabsTrigger>
            <TabsTrigger
              value="latency"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
            >
              Latency
            </TabsTrigger>
            <TabsTrigger
              value="errors"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4"
            >
              Errors
            </TabsTrigger>
          </TabsList>
          <div className="p-4">
            <TabsContent value="requests" className="h-[300px] mt-0">
              <AgentActivityChart
                data={[
                  { name: "Mon", Agent1: 400, Agent2: 240, Agent3: 320 },
                  { name: "Tue", Agent1: 300, Agent2: 139, Agent3: 280 },
                  { name: "Wed", Agent1: 200, Agent2: 980, Agent3: 220 },
                  { name: "Thu", Agent1: 278, Agent2: 390, Agent3: 250 },
                  { name: "Fri", Agent1: 189, Agent2: 480, Agent3: 310 },
                  { name: "Sat", Agent1: 239, Agent2: 380, Agent3: 220 },
                  { name: "Sun", Agent1: 349, Agent2: 430, Agent3: 270 },
                ]}
                type="requests"
              />
            </TabsContent>
            <TabsContent value="latency" className="h-[300px] mt-0">
              <AgentActivityChart
                data={[
                  { name: "Mon", Agent1: 1.2, Agent2: 0.8, Agent3: 1.5 },
                  { name: "Tue", Agent1: 1.1, Agent2: 0.7, Agent3: 1.3 },
                  { name: "Wed", Agent1: 1.3, Agent2: 0.9, Agent3: 1.4 },
                  { name: "Thu", Agent1: 1.0, Agent2: 0.8, Agent3: 1.2 },
                  { name: "Fri", Agent1: 1.4, Agent2: 1.0, Agent3: 1.6 },
                  { name: "Sat", Agent1: 1.2, Agent2: 0.7, Agent3: 1.3 },
                  { name: "Sun", Agent1: 1.1, Agent2: 0.8, Agent3: 1.4 },
                ]}
                type="latency"
              />
            </TabsContent>
            <TabsContent value="errors" className="h-[300px] mt-0">
              <AgentActivityChart
                data={[
                  { name: "Mon", Agent1: 12, Agent2: 8, Agent3: 15 },
                  { name: "Tue", Agent1: 11, Agent2: 7, Agent3: 13 },
                  { name: "Wed", Agent1: 13, Agent2: 9, Agent3: 14 },
                  { name: "Thu", Agent1: 10, Agent2: 8, Agent3: 12 },
                  { name: "Fri", Agent1: 14, Agent2: 10, Agent3: 16 },
                  { name: "Sat", Agent1: 12, Agent2: 7, Agent3: 13 },
                  { name: "Sun", Agent1: 11, Agent2: 8, Agent3: 14 },
                ]}
                type="errors"
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

