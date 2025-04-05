"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { ApiSettings } from "@/components/settings/api-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { TeamSettings } from "@/components/settings/team-settings"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="api">API Keys</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <ProfileSettings />
        </Card>
      </TabsContent>
      <TabsContent value="api">
        <Card>
          <ApiSettings />
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <NotificationSettings />
        </Card>
      </TabsContent>
      <TabsContent value="team">
        <Card>
          <TeamSettings />
        </Card>
      </TabsContent>
    </Tabs>
  )
}

