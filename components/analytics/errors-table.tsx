"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ErrorEvent } from "@/lib/mock-data/analytics"

interface ErrorsTableProps {
  events: ErrorEvent[]
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export function ErrorsTable({ events }: ErrorsTableProps) {
  const recent = [...events]
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    .slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Error Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Error Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="whitespace-nowrap">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium whitespace-nowrap">{event.agentName}</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="capitalize">
                    {event.errorType.replace(/_/g, " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-[320px] truncate">
                  {event.errorMessage}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                  {formatTime(event.occurredAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
