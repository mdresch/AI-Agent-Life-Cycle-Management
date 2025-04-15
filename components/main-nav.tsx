"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { BarChart, BookOpen, Bot, LayoutDashboard, LifeBuoy, Package, Settings, Sparkles } from "lucide-react"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu className={cn("hidden md:flex", className)} {...props}>
      <NavigationMenuList>
        {/* Dashboard Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={pathname === "/" || pathname === "/my-dashboard" ? "bg-primary/10 text-primary" : ""}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <ListItem href="/" title="Main Dashboard">
                Overview of your AI agents platform
              </ListItem>
              <ListItem href="/my-dashboard" title="My Dashboard">
                Your personalized view of AI agents and activities
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Agents Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={pathname?.startsWith("/agents") ? "bg-primary/10 text-primary" : ""}>
            <Bot className="mr-2 h-4 w-4" />
            Agents
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                    href="/agents"
                  >
                    <Bot className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">Agents Overview</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      View and manage all your AI agents in one place
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/agents/new" title="Create New Agent">
                Create a new AI agent with custom capabilities
              </ListItem>
              <ListItem href="/agents?filter=active" title="Active Agents">
                View all your currently active agents
              </ListItem>
              <ListItem href="/agents?filter=draft" title="Draft Agents">
                Continue working on your agent drafts
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Analytics Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={pathname === "/analytics" || pathname?.startsWith("/trends") ? "bg-primary/10 text-primary" : ""}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <ListItem href="/analytics" title="Performance Analytics">
                Track and analyze your agents' performance metrics
              </ListItem>
              <ListItem href="/trends" title="AI Trends & Insights">
                Stay updated with the latest AI trends and insights
              </ListItem>
              <ListItem href="/trends/config" title="Trends Configuration">
                Configure your trends dashboard and data sources
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Lifecycle Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              pathname === "/lifecycle" || pathname === "/health-monitoring" ? "bg-primary/10 text-primary" : ""
            }
          >
            <LifeBuoy className="mr-2 h-4 w-4" />
            Lifecycle
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <ListItem href="/lifecycle" title="Agent Lifecycle">
                Manage the complete lifecycle of your AI agents
              </ListItem>
              <ListItem href="/health-monitoring" title="Health Monitoring">
                Monitor the health and performance of your agents
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Marketplace Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              pathname === "/marketplace" || pathname === "/business-agents" ? "bg-primary/10 text-primary" : ""
            }
          >
            <Package className="mr-2 h-4 w-4" />
            Marketplace
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <ListItem href="/marketplace" title="Agent Marketplace">
                Discover and acquire pre-built AI agents
              </ListItem>
              <ListItem href="/business-agents" title="Business Agents">
                Specialized agents for business applications
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Studio Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={pathname?.startsWith("/studio") ? "bg-primary/10 text-primary" : ""}>
            <Sparkles className="mr-2 h-4 w-4" />
            Studio
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <ListItem href="/studio" title="AI Studio">
                Your workspace for building and training AI agents
              </ListItem>
              <ListItem href="/studio/new-project" title="New Project">
                Start a new AI agent project from scratch
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Excellence Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={pathname?.startsWith("/excellence") ? "bg-primary/10 text-primary" : ""}>
            <BookOpen className="mr-2 h-4 w-4" />
            Excellence
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <ListItem href="/excellence" title="Center of Excellence">
                Resources and best practices for AI agent development
              </ListItem>
              <ListItem href="/excellence/governance" title="Governance Framework">
                Standards and guidelines for responsible AI use
              </ListItem>
              <ListItem href="/excellence/best-practices" title="Best Practices">
                Learn industry best practices for AI agent development
              </ListItem>
              <ListItem href="/excellence/community" title="Community of Practice">
                Connect with other AI practitioners
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* More Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              pathname === "/feedback" || pathname === "/settings" || pathname === "/profile"
                ? "bg-primary/10 text-primary"
                : ""
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <ListItem href="/feedback" title="Feedback">
                Provide feedback and suggestions for improvement
              </ListItem>
              <ListItem href="/settings" title="Settings">
                Configure your platform preferences and account settings
              </ListItem>
              <ListItem href="/profile" title="Profile">
                Manage your user profile and account information
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

