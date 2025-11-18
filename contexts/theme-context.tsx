"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type ThemeMode = "colorful" | "blackwhite"

interface ThemeContextType {
  themeMode: ThemeMode
  toggleTheme: () => void
  isBlackWhite: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("themeMode") as ThemeMode
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme)
        return savedTheme
      }
    }
    return "colorful"
  })

  const toggleTheme = () => {
    const newTheme: ThemeMode = themeMode === "colorful" ? "blackwhite" : "colorful"
    setThemeMode(newTheme)
    localStorage.setItem("themeMode", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
        isBlackWhite: themeMode === "blackwhite",
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
