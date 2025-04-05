"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Gitlab, ChromeIcon as Google, Link2, Loader2, Trash2, Twitter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ConnectedAccount = {
  id: string
  provider: "github" | "gitlab" | "google" | "twitter"
  name: string
  email: string
  connected: string
}

export function ConnectedAccounts() {
  const { toast } = useToast()
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: "1",
      provider: "github",
      name: "GitHub",
      email: "john.doe@example.com",
      connected: "Jul 12, 2023",
    },
    {
      id: "2",
      provider: "google",
      name: "Google",
      email: "john.doe@gmail.com",
      connected: "Aug 3, 2023",
    },
  ])

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "github":
        return <Github className="h-5 w-5" />
      case "gitlab":
        return <Gitlab className="h-5 w-5" />
      case "google":
        return <Google className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      default:
        return <Link2 className="h-5 w-5" />
    }
  }

  const handleConnect = (provider: string) => {
    setIsConnecting(provider)

    // Simulate API call
    setTimeout(() => {
      const newAccount: ConnectedAccount = {
        id: (accounts.length + 1).toString(),
        provider: provider as any,
        name: provider.charAt(0).toUpperCase() + provider.slice(1),
        email: `john.doe@${provider}.com`,
        connected: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }

      setAccounts([...accounts, newAccount])
      setIsConnecting(null)

      toast({
        title: "Account connected",
        description: `Your ${provider} account has been connected successfully`,
      })
    }, 1500)
  }

  const handleDisconnect = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id))

    toast({
      title: "Account disconnected",
      description: "The account has been disconnected successfully",
    })
  }

  const isConnected = (provider: string) => {
    return accounts.some((account) => account.provider === provider)
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>Connect your accounts to enable single sign-on and additional features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-muted p-2">{getProviderIcon(account.provider)}</div>
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground">{account.email}</p>
                  <p className="text-xs text-muted-foreground">Connected on {account.connected}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDisconnect(account.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Disconnect {account.name}</span>
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Connect Additional Accounts</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {!isConnected("github") && (
              <Button
                variant="outline"
                className="justify-start space-x-2"
                onClick={() => handleConnect("github")}
                disabled={isConnecting === "github"}
              >
                {isConnecting === "github" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Github className="h-4 w-4" />
                )}
                <span>Connect GitHub</span>
              </Button>
            )}

            {!isConnected("gitlab") && (
              <Button
                variant="outline"
                className="justify-start space-x-2"
                onClick={() => handleConnect("gitlab")}
                disabled={isConnecting === "gitlab"}
              >
                {isConnecting === "gitlab" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Gitlab className="h-4 w-4" />
                )}
                <span>Connect GitLab</span>
              </Button>
            )}

            {!isConnected("google") && (
              <Button
                variant="outline"
                className="justify-start space-x-2"
                onClick={() => handleConnect("google")}
                disabled={isConnecting === "google"}
              >
                {isConnecting === "google" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Google className="h-4 w-4" />
                )}
                <span>Connect Google</span>
              </Button>
            )}

            {!isConnected("twitter") && (
              <Button
                variant="outline"
                className="justify-start space-x-2"
                onClick={() => handleConnect("twitter")}
                disabled={isConnecting === "twitter"}
              >
                {isConnecting === "twitter" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Twitter className="h-4 w-4" />
                )}
                <span>Connect Twitter</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Connected accounts can be used for authentication and data synchronization.
        </p>
      </CardFooter>
    </>
  )
}

