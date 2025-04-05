"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu } from "lucide-react"
import {
  BarChart,
  BookOpen,
  Bot,
  BrainCircuit,
  Building2,
  LayoutDashboard,
  LifeBuoy,
  LineChart,
  Package,
  Settings,
  Sparkles,
} from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const routes = [
    {
      name: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="mr-2 h-5 w-5" />,
      active: pathname === "/",
    },
    {
      name: "Agents",
      href: "/agents",
      icon: <Bot className="mr-2 h-5 w-5" />,
      active: pathname?.startsWith("/agents"),
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <BarChart className="mr-2 h-5 w-5" />,
      active: pathname === "/analytics",
    },
    {
      name: "Trends",
      href: "/trends",
      icon: <LineChart className="mr-2 h-5 w-5" />,
      active: pathname === "/trends",
    },
    {
      name: "Lifecycle",
      href: "/lifecycle",
      icon: <LifeBuoy className="mr-2 h-5 w-5" />,
      active: pathname === "/lifecycle",
    },
    {
      name: "Marketplace",
      href: "/marketplace",
      icon: <Package className="mr-2 h-5 w-5" />,
      active: pathname === "/marketplace",
    },
    {
      name: "Business",
      href: "/business-agents",
      icon: <Building2 className="mr-2 h-5 w-5" />,
      active: pathname === "/business-agents",
    },
    {
      name: "Studio",
      href: "/studio",
      icon: <Sparkles className="mr-2 h-5 w-5" />,
      active: pathname?.startsWith("/studio"),
    },
    {
      name: "Health",
      href: "/health-monitoring",
      icon: <BrainCircuit className="mr-2 h-5 w-5" />,
      active: pathname === "/health-monitoring",
    },
    {
      name: "Feedback",
      href: "/feedback",
      icon: <BookOpen className="mr-2 h-5 w-5" />,
      active: pathname === "/feedback",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="mr-2 h-5 w-5" />,
      active: pathname === "/settings",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                AI
              </div>
            </div>
            <span className="font-bold">AI Agents Platform</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="pl-6 pr-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center py-3 text-base font-medium transition-colors",
                  route.active ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

