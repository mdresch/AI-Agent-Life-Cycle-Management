import Link from "next/link"

export function Sitemap() {
  const sections = [
    {
      title: "Dashboard",
      links: [
        { name: "Main Dashboard", href: "/" },
        { name: "My Dashboard", href: "/my-dashboard" },
      ],
    },
    {
      title: "Agents",
      links: [
        { name: "Agents Overview", href: "/agents" },
        { name: "Create New Agent", href: "/agents/new" },
        { name: "Agent Details", href: "/agents/[id]", note: "(Replace [id] with agent ID)" },
        { name: "Edit Agent", href: "/agents/[id]/edit", note: "(Replace [id] with agent ID)" },
        { name: "Agent Analytics", href: "/agents/[id]/analytics", note: "(Replace [id] with agent ID)" },
      ],
    },
    {
      title: "Analytics",
      links: [
        { name: "Performance Analytics", href: "/analytics" },
        { name: "AI Trends & Insights", href: "/trends" },
        { name: "Trends Configuration", href: "/trends/config" },
      ],
    },
    {
      title: "Lifecycle",
      links: [
        { name: "Agent Lifecycle", href: "/lifecycle" },
        { name: "Health Monitoring", href: "/health-monitoring" },
      ],
    },
    {
      title: "Marketplace",
      links: [
        { name: "Agent Marketplace", href: "/marketplace" },
        { name: "Business Agents", href: "/business-agents" },
      ],
    },
    {
      title: "Studio",
      links: [
        { name: "AI Studio", href: "/studio" },
        { name: "New Project", href: "/studio/new-project" },
      ],
    },
    {
      title: "Excellence",
      links: [
        { name: "Center of Excellence", href: "/excellence" },
        { name: "Governance Framework", href: "/excellence/governance" },
        { name: "Best Practices", href: "/excellence/best-practices" },
        { name: "Community of Practice", href: "/excellence/community" },
      ],
    },
    {
      title: "User",
      links: [
        { name: "Feedback", href: "/feedback" },
        { name: "Settings", href: "/settings" },
        { name: "Profile", href: "/profile" },
      ],
    },
    {
      title: "Authentication",
      links: [
        { name: "Sign In", href: "/auth/sign-in" },
        { name: "Sign Up", href: "/auth/sign-up" },
        { name: "Forgot Password", href: "/auth/forgot-password" },
      ],
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Site Map</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href.includes("[id]") ? "#" : link.href} className="text-primary hover:underline">
                    {link.name}
                  </Link>
                  {link.note && <span className="text-sm text-muted-foreground ml-2">{link.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

