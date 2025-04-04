"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentActivityChart } from "@/components/charts/agent-activity-chart"

export function AgentStatusOverview() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Agent Activity Overview</CardTitle>
        <CardDescription>Monitor your agents' performance and activity over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="requests">
          <TabsList className="mb-4">
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="latency">Latency</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
          <TabsContent value="requests" className="h-[300px]">
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
          <TabsContent value="latency" className="h-[300px]">
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
          <TabsContent value="errors" className="h-[300px]">
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
        </Tabs>
      </CardContent>
    </Card>
  )
}

