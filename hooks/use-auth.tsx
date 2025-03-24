"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  username: string
  email: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("just-now-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser = {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      email: email,
      avatar: "/placeholder-user.jpg",
    }

    setUser(mockUser)
    localStorage.setItem("just-now-user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser = {
      id: "1",
      name: name,
      username: name.toLowerCase().replace(/\s+/g, ""),
      email: email,
      avatar: "/placeholder-user.jpg",
    }

    setUser(mockUser)
    localStorage.setItem("just-now-user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("just-now-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

