"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Settings, LogOut, HelpCircle, Moon, Sun, UserPlus, LogIn, Bell, Shield, CreditCard } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

export function UserDropdown() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-[#FDF0D5] hover:text-[#FDF0D5] hover:bg-[#780000]"
          onClick={() => router.push("/login")}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Login
        </Button>
        <Button
          className="bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5]"
          size="sm"
          onClick={() => router.push("/register")}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Register
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border-2 border-[#C1121F] cursor-pointer">
          <AvatarImage src={user.avatar || "/placeholder-user.jpg"} />
          <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">{user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#121212] border-[#003049] text-[#FDF0D5]">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-[#669BBC]">@{user.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#003049]" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-[#1E1E1E] focus:bg-[#1E1E1E]"
            onClick={() => router.push("/profile")}
          >
            <User className="mr-2 h-4 w-4 text-[#669BBC]" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-[#1E1E1E] focus:bg-[#1E1E1E]"
            onClick={() => router.push("/settings")}
          >
            <Settings className="mr-2 h-4 w-4 text-[#669BBC]" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-[#1E1E1E] focus:bg-[#1E1E1E]"
            onClick={() => router.push("/notifications")}
          >
            <Bell className="mr-2 h-4 w-4 text-[#669BBC]" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-[#1E1E1E] focus:bg-[#1E1E1E]"
            onClick={() => router.push("/billing")}
          >
            <CreditCard className="mr-2 h-4 w-4 text-[#669BBC]" />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#003049]" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-[#1E1E1E] focus:bg-[#1E1E1E]" onClick={toggleTheme}>
            {theme === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4 text-[#669BBC]" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4 text-[#669BBC]" />
                <span>Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-[#1E1E1E] focus:bg-[#1E1E1E]"
            onClick={() => router.push("/help")}
          >
            <HelpCircle className="mr-2 h-4 w-4 text-[#669BBC]" />
            <span>Help & Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-[#1E1E1E] focus:bg-[#1E1E1E]"
            onClick={() => router.push("/privacy")}
          >
            <Shield className="mr-2 h-4 w-4 text-[#669BBC]" />
            <span>Privacy & Safety</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#003049]" />
        <DropdownMenuItem
          className="cursor-pointer text-[#C1121F] hover:bg-[#1E1E1E] focus:bg-[#1E1E1E]"
          onClick={() => {
            logout()
            router.push("/login")
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

