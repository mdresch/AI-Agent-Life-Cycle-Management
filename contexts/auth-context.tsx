"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  // Development mode flag
  devMode: boolean
  setDevMode: (mode: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  // Add development mode state - default to true for development
  const [devMode, setDevMode] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real application, you would check for a valid session/token here
        // For demo purposes, we'll simulate a user being logged in
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Redirect unauthenticated users away from protected routes
  // Only if not in development mode
  useEffect(() => {
    if (!isLoading && !user && !devMode) {
      const isAuthPage = pathname?.startsWith("/auth/")

      if (!isAuthPage && pathname !== "/") {
        router.push("/auth/sign-in")
      }
    }
  }, [user, isLoading, pathname, router, devMode])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // In a real application, you would make an API call to authenticate the user
      // For demo purposes, we'll simulate a successful authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = {
        id: "1",
        name: "John Doe",
        email,
        avatar: "/placeholder.svg?height=32&width=32",
      }

      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // In a real application, you would make an API call to register the user
      // For demo purposes, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/auth/sign-in")
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)

    try {
      // In a real application, you would make an API call to sign out the user
      // For demo purposes, we'll simulate a successful sign out
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser(null)
      localStorage.removeItem("user")
      router.push("/auth/sign-in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        devMode,
        setDevMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

