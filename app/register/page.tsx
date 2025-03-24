"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    try {
      await register(name, email, password)
      router.push("/")
    } catch (err) {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#C1121F]">Just Now</h1>
          <p className="text-[#669BBC] mt-2">Create your account and join the community</p>
        </div>

        <div className="bg-[#121212] rounded-xl p-6 shadow-lg border border-[#003049]">
          {error && (
            <div className="mb-4 p-3 bg-[#780000]/20 border border-[#C1121F] rounded-md text-[#FDF0D5]">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#FDF0D5]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#1E1E1E] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#FDF0D5]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1E1E1E] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#FDF0D5]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#1E1E1E] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full text-[#669BBC] hover:text-[#FDF0D5] hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#FDF0D5]">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#1E1E1E] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="border-[#669BBC] data-[state=checked]:bg-[#C1121F] data-[state=checked]:border-[#C1121F]"
                />
                <Label htmlFor="terms" className="text-sm text-[#FDF0D5]">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#C1121F] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#C1121F] hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-[#FDF0D5] border-t-transparent rounded-full" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#669BBC]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#C1121F] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

