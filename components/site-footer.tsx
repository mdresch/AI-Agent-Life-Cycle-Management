import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0 bg-background/60 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} AI Agents Platform. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link href="/sitemap" className="hover:text-foreground transition-colors">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  )
}

