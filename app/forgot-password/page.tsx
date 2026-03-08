import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Bot className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Forgot your password?</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Password reset is not available in the demo. Please use the demo credentials to sign in.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-8 shadow-sm space-y-4">
          <p className="text-sm text-muted-foreground">
            Demo account credentials:
          </p>
          <div className="rounded-md bg-muted px-4 py-3 text-left space-y-1">
            <p className="text-sm">
              <span className="text-muted-foreground">Email: </span>
              <span className="font-mono font-medium">demo@example.com</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Password: </span>
              <span className="font-mono font-medium">demo1234</span>
            </p>
          </div>
          <Link href="/login">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
