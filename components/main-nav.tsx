"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Award, BarChart, Bot, LayoutDashboard, LifeBuoy, Package, Settings, Sparkles } from "lucide-react"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu className={cn("hidden md:flex", className)} {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), pathname === "/" ? "bg-primary/10 text-primary" : "")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

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

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              pathname?.startsWith("/lifecycle") || pathname === "/health-monitoring"
                ? "bg-primary/10 text-primary"
                : ""
            }
          >
            <LifeBuoy className="mr-2 h-4 w-4" />
            Lifecycle
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                    href="/lifecycle"
                  >
                    <LifeBuoy className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">Agent Lifecycle</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Manage the complete lifecycle of your AI agents
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/lifecycle/evaluation" title="Evaluation">
                Evaluate agent performance and quality
              </ListItem>
              <ListItem href="/lifecycle/knowledge" title="Knowledge Management">
                Manage and optimize agent knowledge
              </ListItem>
              <ListItem href="/health-monitoring" title="Health Monitoring">
                Monitor the health and performance of your agents
              </ListItem>
              <ListItem href="/lifecycle/version-history" title="Version History">
                Track changes and updates to your agents
              </ListItem>
              <ListItem href="/lifecycle/agent-retirement" title="Agent Retirement">
                Safely retire and archive agents
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={pathname?.startsWith("/studio") ? "bg-primary/10 text-primary" : ""}>
            <Sparkles className="mr-2 h-4 w-4" />
            Studio
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                    href="/studio"
                  >
                    <Sparkles className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">AI Studio</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Your workspace for building and training AI agents
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/studio/new-project" title="New Project">
                Start a new AI agent project from scratch
              </ListItem>
              <ListItem href="/studio/training-ground" title="Training Ground">
                Train and fine-tune your AI agents
              </ListItem>
              <ListItem href="/studio/prompt-library" title="Prompt Library">
                Access and manage your prompt templates
              </ListItem>
              <ListItem href="/studio/testing" title="Testing Environment">
                Test your agents in various scenarios
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={pathname === "/analytics" || pathname?.startsWith("/trends") ? "bg-primary/10 text-primary" : ""}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                    href="/analytics"
                  >
                    <BarChart className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">Performance Analytics</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Track and analyze your agents' performance metrics
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/trends" title="AI Trends & Insights">
                Stay updated with the latest AI trends and insights
              </ListItem>
              <ListItem href="/trends/config" title="Trends Configuration">
                Configure your trends and insights dashboard
              </ListItem>
              <ListItem href="/analytics/usage" title="Usage Metrics">
                Analyze agent usage patterns and statistics
              </ListItem>
              <ListItem href="/analytics/performance" title="Performance Metrics">
                Detailed performance analysis for your agents
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={pathname?.startsWith("/center-of-excellence") ? "bg-primary/10 text-primary" : ""}
          >
            <Award className="mr-2 h-4 w-4" />
            Excellence
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                    href="/center-of-excellence"
                  >
                    <Award className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">Center of Excellence</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Best practices, governance, and resources for AI agents
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/center-of-excellence/governance" title="Governance Framework">
                Policies, roles, and compliance for responsible AI
              </ListItem>
              <ListItem href="/center-of-excellence/best-practices" title="Best Practices">
                Guidelines and patterns for effective agent development
              </ListItem>
              <ListItem href="/center-of-excellence/resources" title="Resource Library">
                Documents, videos, and templates for agent creators
              </ListItem>
              <ListItem href="/center-of-excellence/training" title="Training Programs">
                Courses, certifications, and workshops for skill development
              </ListItem>
              <ListItem href="/center-of-excellence/community" title="Community of Practice">
                Forums, events, and expert directory for knowledge sharing
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

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
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
                    href="/marketplace"
                  >
                    <Package className="h-6 w-6 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium">Agent Marketplace</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Discover and acquire pre-built AI agents
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/business-agents" title="Business Agents">
                Specialized agents for business applications
              </ListItem>
              <ListItem href="/marketplace/subscriptions" title="Subscriptions">
                Manage your marketplace subscriptions
              </ListItem>
              <ListItem href="/marketplace/publish" title="Publish">
                Publish your agents to the marketplace
              </ListItem>
              <ListItem href="/business-agents/department" title="Department View">
                View agents organized by department
              </ListItem>
              <ListItem href="/business-agents/division" title="Division View">
                View agents organized by division
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={
              pathname === "/feedback" || pathname === "/settings" || pathname === "/my-dashboard"
                ? "bg-primary/10 text-primary"
                : ""
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/my-dashboard" title="My Dashboard">
                Your personalized dashboard and preferences
              </ListItem>
              <ListItem href="/feedback" title="Feedback">
                Provide feedback and suggestions for improvement
              </ListItem>
              <ListItem href="/settings" title="Settings">
                Configure your platform preferences and account settings
              </ListItem>
              <ListItem href="/profile" title="Profile">
                Manage your user profile and preferences
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

