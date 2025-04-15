"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { SecuritySettings } from "@/components/profile/security-settings"
import { NotificationPreferences } from "@/components/profile/notification-preferences"
import { ApiTokens } from "@/components/profile/api-tokens"
import { ConnectedAccounts } from "@/components/profile/connected-accounts"

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="api">API Tokens</TabsTrigger>
        <TabsTrigger value="connections">Connections</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <ProfileSettings />
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <SecuritySettings />
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <NotificationPreferences />
        </Card>
      </TabsContent>
      <TabsContent value="api">
        <Card>
          <ApiTokens />
        </Card>
      </TabsContent>
      <TabsContent value="connections">
        <Card>
          <ConnectedAccounts />
        </Card>
      </TabsContent>
    </Tabs>
  )
}

