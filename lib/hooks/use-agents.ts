"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import type { Agent, AgentStatus, CreateAgentPayload } from "@/lib/types"
import { mockAgents } from "@/lib/mock-data/agents"

let agentStore: Agent[] = [...mockAgents]
let listeners: Array<() => void> = []

function notify() {
  listeners.forEach((fn) => fn())
}

export function useAgents(query?: string, typeFilter?: string) {
  const [version, setVersion] = useState(0)

  useEffect(() => {
    const rerender = () => setVersion((n) => n + 1)
    listeners.push(rerender)
    return () => {
      listeners = listeners.filter((fn) => fn !== rerender)
    }
  }, [])

  const agents = useMemo(() => {
    return agentStore.filter((agent) => {
      const matchesQuery =
        !query ||
        agent.name.toLowerCase().includes(query.toLowerCase()) ||
        agent.description.toLowerCase().includes(query.toLowerCase()) ||
        agent.type.toLowerCase().includes(query.toLowerCase())

      const matchesType = !typeFilter || typeFilter === "all" || agent.type === typeFilter

      return matchesQuery && matchesType
    })
  }, [query, typeFilter, version])

  return { agents, isLoading: false }
}

export function useCreateAgent() {
  const [isLoading, setIsLoading] = useState(false)

  const createAgent = useCallback(async (payload: CreateAgentPayload): Promise<Agent> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: payload.name,
      description: payload.description,
      type: payload.type,
      model: payload.model,
      systemPrompt: payload.systemPrompt,
      maxTokens: payload.maxTokens,
      temperature: payload.temperature,
      tools: payload.tools,
      status: payload.autoActivate ? "active" : "inactive",
      lifecycleStage: "development",
      version: "0.1.0",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "user-001",
    }

    agentStore = [newAgent, ...agentStore]
    notify()
    setIsLoading(false)
    return newAgent
  }, [])

  return { createAgent, isLoading }
}

export function useUpdateAgent() {
  const [isLoading, setIsLoading] = useState(false)

  const updateAgent = useCallback(async (id: string, patch: Partial<Agent>): Promise<Agent> => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const index = agentStore.findIndex((a) => a.id === id)
      if (index === -1) throw new Error("Agent not found")

      const updated = { ...agentStore[index], ...patch, updatedAt: new Date().toISOString() }
      agentStore = [...agentStore.slice(0, index), updated, ...agentStore.slice(index + 1)]
      notify()
      return updated
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { updateAgent, isLoading }
}

export function useDeleteAgent() {
  const [isLoading, setIsLoading] = useState(false)

  const deleteAgent = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    agentStore = agentStore.filter((a) => a.id !== id)
    notify()
    setIsLoading(false)
  }, [])

  return { deleteAgent, isLoading }
}

export function useDuplicateAgent() {
  const [isLoading, setIsLoading] = useState(false)

  const duplicateAgent = useCallback(async (id: string): Promise<Agent> => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const source = agentStore.find((a) => a.id === id)
      if (!source) throw new Error("Agent not found")

      const copy: Agent = {
        ...source,
        id: `agent-${Date.now()}`,
        name: `${source.name} (Copy)`,
        status: "inactive" as AgentStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      agentStore = [copy, ...agentStore]
      notify()
      return copy
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { duplicateAgent, isLoading }
}
