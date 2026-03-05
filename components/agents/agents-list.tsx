"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, Edit, Play, Pause, Trash2, Copy, BarChart, Bot } from "lucide-react"
import { toast } from "sonner"
import { DeleteConfirmDialog } from "@/components/agents/delete-confirm-dialog"
import { useAgents, useUpdateAgent, useDeleteAgent, useDuplicateAgent } from "@/lib/hooks/use-agents"
import type { Agent, AgentType } from "@/lib/types"

const agentTypeLabels: Record<AgentType, string> = {
  "customer-support": "Customer Support",
  analytics: "Analytics",
  creative: "Creative",
  productivity: "Productivity",
  research: "Research",
  communication: "Communication",
  custom: "Custom",
}

const agentTypeOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Types" },
  ...Object.entries(agentTypeLabels).map(([value, label]) => ({ value, label })),
]

function StatusBadge({ status }: { status: Agent["status"] }) {
  if (status === "active") return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Active</Badge>
  if (status === "error") return <Badge variant="destructive">Error</Badge>
  return <Badge variant="secondary">Inactive</Badge>
}

function AgentCard({
  agent,
  onToggleStatus,
  onDuplicate,
  onDelete,
}: {
  agent: Agent
  onToggleStatus: (agent: Agent) => void
  onDuplicate: (agent: Agent) => void
  onDelete: (agent: Agent) => void
}) {
  const isActive = agent.status === "active"
  const borderClass = agent.status === "active"
    ? "border-l-4 border-l-primary"
    : agent.status === "error"
      ? "border-l-4 border-l-destructive"
      : ""

  return (
    <Card className={borderClass}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="min-w-0 flex-1 pr-2">
          <CardTitle className="text-base truncate">{agent.name}</CardTitle>
          <CardDescription className="flex items-center gap-1 mt-0.5">
            <span>{agentTypeLabels[agent.type]}</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="font-mono text-xs">{agent.model}</span>
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 shrink-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/agents/${agent.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onToggleStatus(agent)}
              disabled={agent.status === "error"}
            >
              {isActive ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  <span>Activate</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(agent)}>
              <Copy className="mr-2 h-4 w-4" />
              <span>Duplicate</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/analytics?agent=${agent.id}`}>
                <BarChart className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onDelete(agent)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
          <div className="flex items-center justify-between">
            <StatusBadge status={agent.status} />
            <span className="text-xs text-muted-foreground">
              v{agent.version} · {new Date(agent.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AgentsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [deleteTarget, setDeleteTarget] = useState<Agent | null>(null)

  const { agents } = useAgents(searchQuery, typeFilter)
  const { updateAgent } = useUpdateAgent()
  const { deleteAgent } = useDeleteAgent()
  const { duplicateAgent } = useDuplicateAgent()

  async function handleToggleStatus(agent: Agent) {
    if (agent.status === "error") return
    const newStatus = agent.status === "active" ? "inactive" : "active"
    await updateAgent(agent.id, { status: newStatus })
    toast.success(
      newStatus === "active"
        ? `Agent "${agent.name}" activated.`
        : `Agent "${agent.name}" paused.`
    )
  }

  async function handleDuplicate(agent: Agent) {
    await duplicateAgent(agent.id)
    toast.success(`Agent "${agent.name}" duplicated.`)
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return
    await deleteAgent(deleteTarget.id)
    toast.success(`Agent "${deleteTarget.name}" deleted.`)
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sticky top-16 z-10 bg-background/95 backdrop-blur py-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents…"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            {agentTypeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {agents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
          <Bot className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No agents found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            {searchQuery || typeFilter !== "all"
              ? "Try adjusting your search or filter."
              : "Create your first agent to get started."}
          </p>
          {!searchQuery && typeFilter === "all" && (
            <Link href="/agents/new" className="mt-4">
              <Button>Create your first agent</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onToggleStatus={handleToggleStatus}
              onDuplicate={handleDuplicate}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        agentName={deleteTarget?.name ?? ""}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

