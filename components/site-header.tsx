"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"
import { useDevMode } from "@/contexts/dev-mode-context"
import { Badge } from "@/components/ui/badge"

export function SiteHeader() {
  const pathname = usePathname()
  const { isDevMode } = useDevMode()

  // Don't show header on auth pages
  if (pathname?.startsWith("/auth/")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MobileNav />
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
              AI
            </div>
          </div>
          <span className="hidden font-bold sm:inline-block">
            AI Agents Platform
            {isDevMode && (
              <Badge
                variant="outline"
                className="ml-2 bg-warning/20 text-warning dark:bg-warning/30 dark:text-warning-foreground"
              >
                Dev Mode
              </Badge>
            )}
          </span>
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
      {isDevMode && (
        <div className="bg-warning/20 text-warning dark:bg-warning/30 dark:text-warning-foreground text-xs text-center py-0.5">
          Development Mode: All pages are accessible without authentication
        </div>
      )}
    </header>
  )
}

