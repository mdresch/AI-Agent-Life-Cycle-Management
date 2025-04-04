"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bot } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Bot className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">AI Agents Platform</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/agents"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/agents") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Agents
        </Link>
        <Link
          href="/business-agents"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/business-agents") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Business Agents
        </Link>
        <Link
          href="/studio"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/studio") ? "text-foreground" : "text-foreground/60",
          )}
        >
          AI Studio
        </Link>
        <Link
          href="/trends"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/trends") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Trends
        </Link>
        <Link
          href="/lifecycle"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/lifecycle") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Lifecycle
        </Link>
        <Link
          href="/marketplace"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/marketplace") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Marketplace
        </Link>
      </nav>
    </div>
  )
}

