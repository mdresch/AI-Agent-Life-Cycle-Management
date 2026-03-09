"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CATEGORY_LABELS } from "@/lib/marketplace-utils"
import type { MarketplaceSubscription } from "@/lib/types"

interface SubscriptionsListProps {
  subscriptions: MarketplaceSubscription[]
}

export function SubscriptionsList({ subscriptions: initialSubscriptions }: SubscriptionsListProps) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleUpdate = (sub: MarketplaceSubscription) => {
    setUpdatingId(sub.id)
    setTimeout(() => {
      setSubscriptions((prev) =>
        prev.map((s) =>
          s.id === sub.id
            ? { ...s, installedVersion: s.latestVersion, hasUpdate: false }
            : s,
        ),
      )
      setUpdatingId(null)
      toast.success(`Updated to v${sub.latestVersion}`)
    }, 1000)
  }

  const handleUnsubscribe = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id))
    toast.success("Unsubscribed successfully")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Subscriptions</CardTitle>
        <CardDescription>Manage the agents installed in your workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Installed Version</TableHead>
              <TableHead>Latest Version</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{sub.title}</span>
                    {sub.hasUpdate && (
                      <Badge
                        variant="outline"
                        className="text-amber-600 border-amber-400 bg-amber-50 text-xs"
                      >
                        Update Available
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {CATEGORY_LABELS[sub.category] ?? sub.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">v{sub.installedVersion}</TableCell>
                <TableCell className="font-mono text-sm">v{sub.latestVersion}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {sub.hasUpdate && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={updatingId === sub.id}
                        onClick={() => handleUpdate(sub)}
                      >
                        {updatingId === sub.id ? (
                          <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="mr-1 h-3.5 w-3.5" />
                        )}
                        Update
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          Unsubscribe
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Unsubscribe from agent?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove{" "}
                            <span className="font-medium">{sub.title}</span> from your workspace.
                            You can reinstall it from the marketplace at any time.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleUnsubscribe(sub.id)}
                          >
                            Unsubscribe
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {subscriptions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No active subscriptions. Browse the marketplace to install agents.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
