import type React from "react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 lg:py-10 max-w-7xl">
      <div className="grid items-start gap-8">{children}</div>
    </div>
  )
}

