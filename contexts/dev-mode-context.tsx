"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type DevModeContextType = {
  isDevMode: boolean
  setDevMode: (value: boolean) => void
  toggleDevMode: () => void
}

const DevModeContext = createContext<DevModeContextType>({
  isDevMode: false,
  setDevMode: () => {},
  toggleDevMode: () => {},
})

export const DevModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(false)

  // Load dev mode state from localStorage on mount
  useEffect(() => {
    const storedDevMode = localStorage.getItem("devMode")
    if (storedDevMode) {
      setIsDevMode(storedDevMode === "true")
    }
  }, [])

  // Save dev mode state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("devMode", isDevMode.toString())
  }, [isDevMode])

  const setDevMode = (value: boolean) => {
    setIsDevMode(value)
  }

  const toggleDevMode = () => {
    setIsDevMode((prev) => !prev)
  }

  return <DevModeContext.Provider value={{ isDevMode, setDevMode, toggleDevMode }}>{children}</DevModeContext.Provider>
}

export const useDevMode = () => useContext(DevModeContext)

