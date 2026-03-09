/**
 * Shared in-memory stores for API route handlers.
 *
 * Because Next.js route files are separate modules, each would otherwise
 * initialise its own independent copy of the mock data, meaning mutations
 * (e.g. install/uninstall) made through one route would not be visible through
 * another. By exporting the mutable arrays from a single module, all routes
 * share the same reference and mutations are reflected across endpoints.
 *
 * ⚠ This in-memory state resets on every server restart. It is intentional for
 * the current mock/demo phase and must be replaced with real database calls
 * before any production deployment.
 */

import { mockAgents } from "@/lib/mock-data/agents"
import { mockMarketplaceListings } from "@/lib/mock-data/marketplace"
import type { Agent, MarketplaceListing } from "@/lib/types"

export const agentStore: Agent[] = [...mockAgents]

export const listingStore: MarketplaceListing[] = [...mockMarketplaceListings]
