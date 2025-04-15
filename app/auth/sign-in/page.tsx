import type { Metadata } from "next"
import Link from "next/link"
import { SignInForm } from "@/components/auth/sign-in-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sign In | AI Agents Platform",
  description: "Sign in to your AI Agents Platform account",
}

export default function SignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to sign in to your account</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your AI Agents and dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-between space-y-4">
            <div className="text-sm text-muted-foreground">
              <span>Don&apos;t have an account? </span>
              <Link href="/auth/sign-up" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <Link href="/auth/forgot-password" className="underline underline-offset-4 hover:text-primary">
                Forgot your password?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

