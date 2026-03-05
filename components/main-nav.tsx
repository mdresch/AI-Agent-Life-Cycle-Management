"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bot } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2 text-white">
        <Bot className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">AI Agents Platform</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className={cn(
            "transition-colors hover:text-white",
            pathname === "/"
              ? "text-white border-b-2 border-accent pb-0.5"
              : "text-white/75",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/agents"
          aria-current={pathname?.startsWith("/agents") ? "page" : undefined}
          className={cn(
            "transition-colors hover:text-white",
            pathname?.startsWith("/agents")
              ? "text-white border-b-2 border-accent pb-0.5"
              : "text-white/75",
          )}
        >
          Agents
        </Link>
        <Link
          href="/business-agents"
          aria-current={pathname?.startsWith("/business-agents") ? "page" : undefined}
          className={cn(
            "transition-colors hover:text-white",
            pathname?.startsWith("/business-agents")
              ? "text-white border-b-2 border-accent pb-0.5"
              : "text-white/75",
          )}
        >
          Business Agents
        </Link>
        <Link
          href="/studio"
          aria-current={pathname?.startsWith("/studio") ? "page" : undefined}
          className={cn(
            "transition-colors hover:text-white",
            pathname?.startsWith("/studio")
              ? "text-white border-b-2 border-accent pb-0.5"
              : "text-white/75",
          )}
        >
          AI Studio
        </Link>
        <Link
          href="/trends"
          aria-current={pathname?.startsWith("/trends") ? "page" : undefined}
          className={cn(
            "transition-colors hover:text-white",
            pathname?.startsWith("/trends")
              ? "text-white border-b-2 border-accent pb-0.5"
              : "text-white/75",
          )}
        >
          Trends
        </Link>
        <Link
          href="/lifecycle"
          aria-current={pathname?.startsWith("/lifecycle") ? "page" : undefined}
          className={cn(
            "transition-colors hover:text-white",
            pathname?.startsWith("/lifecycle")
              ? "text-white border-b-2 border-accent pb-0.5"
              : "text-white/75",
          )}
        >
          Lifecycle
        </Link>
        <Link
          href="/marketplace"
          aria-current={pathname?.startsWith("/marketplace") ? "page" : undefined}
          className={cn(
            "transition-colors hover:text-white",
            pathname?.startsWith("/marketplace")
              ? "text-white border-b-2 border-accent pb-0.5"
              : "text-white/75",
          )}
        >
          Marketplace
        </Link>
      </nav>
    </div>
  )
}

