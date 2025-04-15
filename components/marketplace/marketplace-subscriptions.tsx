"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Download, RotateCcw, Settings, Trash2, CreditCard, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MarketplaceSubscriptions() {
  const subscriptions = [
    {
      id: 1,
      name: "Data Visualization Expert",
      category: "Analytics",
      status: "active",
      price: "$9.99/mo",
      nextBilling: "May 15, 2025",
      installed: true,
    },
    {
      id: 2,
      name: "Content Creation Suite",
      category: "Creative",
      status: "active",
      price: "$14.99/mo",
      nextBilling: "May 22, 2025",
      installed: true,
    },
    {
      id: 3,
      name: "Meeting Assistant Pro",
      category: "Productivity",
      status: "active",
      price: "$7.99/mo",
      nextBilling: "Jun 05, 2025",
      installed: true,
    },
    {
      id: 4,
      name: "Market Research Agent",
      category: "Research",
      status: "paused",
      price: "$19.99/mo",
      nextBilling: "Paused",
      installed: false,
    },
  ]

  const freeAgents = [
    {
      id: 1,
      name: "Advanced Customer Support Agent",
      category: "Support",
      installed: true,
      lastUpdated: "Apr 10, 2025",
    },
    {
      id: 2,
      name: "Basic Email Assistant",
      category: "Communication",
      installed: true,
      lastUpdated: "Mar 25, 2025",
    },
    {
      id: 3,
      name: "Simple Scheduler",
      category: "Productivity",
      installed: false,
      lastUpdated: "Feb 18, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paid Subscriptions</CardTitle>
          <CardDescription>Manage your paid agent subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{subscription.name}</p>
                      <p className="text-xs text-muted-foreground">{subscription.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                      {subscription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscription.price}</TableCell>
                  <TableCell>{subscription.nextBilling}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {subscription.installed ? (
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Install
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        {subscription.status === "active" ? (
                          <>
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Resume
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Total monthly: $32.97</div>
          <Button variant="outline" size="sm">
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Billing
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Free Agents</CardTitle>
          <CardDescription>Free agents you've downloaded from the marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {freeAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="font-medium">{agent.name}</div>
                  </TableCell>
                  <TableCell>{agent.category}</TableCell>
                  <TableCell>
                    <Badge variant={agent.installed ? "default" : "outline"}>
                      {agent.installed ? "Installed" : "Not Installed"}
                    </Badge>
                  </TableCell>
                  <TableCell>{agent.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {agent.installed ? (
                        <>
                          <Button variant="outline" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Uninstall
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Install
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
          <CardDescription>Manage your marketplace subscriptions and billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-yellow-100 p-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">Payment Method Expiring</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your credit card ending in 4242 will expire next month. Please update your payment method to avoid
                  service interruption.
                </p>
                <Button className="mt-4" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Update Payment Method
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Billing Cycle</h3>
              <p className="text-sm text-muted-foreground">
                Your subscriptions are billed on different dates based on when you subscribed. You can align all billing
                dates.
              </p>
              <Button variant="outline" className="mt-4" size="sm">
                Align Billing Dates
              </Button>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Subscription History</h3>
              <p className="text-sm text-muted-foreground">
                View your subscription history, past invoices, and payment receipts.
              </p>
              <Button variant="outline" className="mt-4" size="sm">
                View History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

