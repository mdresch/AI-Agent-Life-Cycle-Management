"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GovernanceFramework } from "@/components/center-of-excellence/governance-framework"
import { BestPractices } from "@/components/center-of-excellence/best-practices"
import { ResourceLibrary } from "@/components/center-of-excellence/resource-library"
import { TrainingPrograms } from "@/components/center-of-excellence/training-programs"
import { CommunityOfPractice } from "@/components/center-of-excellence/community-of-practice"

export function CenterOfExcellenceDashboard() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Center of Excellence</CardTitle>
          <CardDescription>Centralized hub for AI governance, best practices, and knowledge sharing</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="governance">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
              <TabsTrigger value="resources">Resource Library</TabsTrigger>
              <TabsTrigger value="training">Training Programs</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="governance" className="pt-4">
              <GovernanceFramework />
            </TabsContent>

            <TabsContent value="best-practices" className="pt-4">
              <BestPractices />
            </TabsContent>

            <TabsContent value="resources" className="pt-4">
              <ResourceLibrary />
            </TabsContent>

            <TabsContent value="training" className="pt-4">
              <TrainingPrograms />
            </TabsContent>

            <TabsContent value="community" className="pt-4">
              <CommunityOfPractice />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

