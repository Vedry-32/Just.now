"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, Bell, Lock, Shield, Globe, Smartphone, CreditCard, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("account")
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  useEffect(() => {
    if (user) {
      setIsUserLoaded(true)
    } else {
      router.push("/login")
    }
  }, [user, router])

  if (!isUserLoaded) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="max-w-4xl mx-auto pt-4 px-4">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="text-[#FDF0D5] mr-2" onClick={() => router.push("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-[#FDF0D5]">Settings</h1>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-[#121212] rounded-xl p-4 border border-[#003049] h-fit">
            <nav className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "account" ? "bg-[#1E1E1E] text-[#C1121F]" : "text-[#FDF0D5] hover:bg-[#1E1E1E]"
                }`}
                onClick={() => setActiveSection("account")}
              >
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "notifications"
                    ? "bg-[#1E1E1E] text-[#C1121F]"
                    : "text-[#FDF0D5] hover:bg-[#1E1E1E]"
                }`}
                onClick={() => setActiveSection("notifications")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "privacy" ? "bg-[#1E1E1E] text-[#C1121F]" : "text-[#FDF0D5] hover:bg-[#1E1E1E]"
                }`}
                onClick={() => setActiveSection("privacy")}
              >
                <Lock className="h-4 w-4 mr-2" />
                Privacy & Safety
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "appearance" ? "bg-[#1E1E1E] text-[#C1121F]" : "text-[#FDF0D5] hover:bg-[#1E1E1E]"
                }`}
                onClick={() => setActiveSection("appearance")}
              >
                <Globe className="h-4 w-4 mr-2" />
                Appearance
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "devices" ? "bg-[#1E1E1E] text-[#C1121F]" : "text-[#FDF0D5] hover:bg-[#1E1E1E]"
                }`}
                onClick={() => setActiveSection("devices")}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Devices
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "billing" ? "bg-[#1E1E1E] text-[#C1121F]" : "text-[#FDF0D5] hover:bg-[#1E1E1E]"
                }`}
                onClick={() => setActiveSection("billing")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "help" ? "bg-[#1E1E1E] text-[#C1121F]" : "text-[#FDF0D5] hover:bg-[#1E1E1E]"
                }`}
                onClick={() => setActiveSection("help")}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Button>

              <Separator className="my-2 bg-[#003049]" />

              <Button
                variant="ghost"
                className="w-full justify-start text-[#C1121F] hover:bg-[#1E1E1E]"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 bg-[#121212] rounded-xl p-6 border border-[#003049]">
            {activeSection === "account" && (
              <div>
                <h2 className="text-xl font-bold text-[#FDF0D5] mb-4">Account Settings</h2>
                <Separator className="mb-4 bg-[#003049]" />

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-[#FDF0D5] mb-2">Account Information</h3>
                    <p className="text-[#669BBC] mb-4">Manage your account details and preferences</p>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[#FDF0D5]">Username</p>
                          <p className="text-[#669BBC]">@{user.username}</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
                        >
                          Edit
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[#FDF0D5]">Email</p>
                          <p className="text-[#669BBC]">{user.email}</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
                        >
                          Change
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[#FDF0D5]">Password</p>
                          <p className="text-[#669BBC]">Last changed 3 months ago</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-[#003049]" />

                  <div>
                    <h3 className="text-lg font-medium text-[#FDF0D5] mb-2">Account Preferences</h3>
                    <p className="text-[#669BBC] mb-4">Customize your account experience</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#FDF0D5]">Language</p>
                          <p className="text-[#669BBC]">English (US)</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
                        >
                          Change
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#FDF0D5]">Time Zone</p>
                          <p className="text-[#669BBC]">Eastern Time (US & Canada)</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-[#003049]" />

                  <div>
                    <h3 className="text-lg font-medium text-[#FDF0D5] mb-2">Danger Zone</h3>
                    <p className="text-[#669BBC] mb-4">Permanent actions for your account</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#FDF0D5]">Deactivate Account</p>
                          <p className="text-[#669BBC]">Temporarily disable your account</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#C1121F] text-[#C1121F] hover:bg-[#780000]/20 hover:text-[#C1121F]"
                        >
                          Deactivate
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#FDF0D5]">Delete Account</p>
                          <p className="text-[#669BBC]">Permanently delete your account and all data</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#C1121F] text-[#C1121F] hover:bg-[#780000]/20 hover:text-[#C1121F]"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div>
                <h2 className="text-xl font-bold text-[#FDF0D5] mb-4">Notification Settings</h2>
                <Separator className="mb-4 bg-[#003049]" />

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-[#FDF0D5] mb-2">Push Notifications</h3>
                    <p className="text-[#669BBC] mb-4">Control notifications on your devices</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[#FDF0D5]">Direct Messages</Label>
                          <p className="text-xs text-[#669BBC]">Get notified when someone messages you</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[#FDF0D5]">Mentions</Label>
                          <p className="text-xs text-[#669BBC]">Get notified when someone mentions you</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[#FDF0D5]">Likes and Comments</Label>
                          <p className="text-xs text-[#669BBC]">Get notified about reactions to your posts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[#FDF0D5]">New Followers</Label>
                          <p className="text-xs text-[#669BBC]">Get notified when someone follows you</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-[#003049]" />

                  <div>
                    <h3 className="text-lg font-medium text-[#FDF0D5] mb-2">Email Notifications</h3>
                    <p className="text-[#669BBC] mb-4">Control which emails you receive</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[#FDF0D5]">Product Updates</Label>
                          <p className="text-xs text-[#669BBC]">Receive emails about new features and updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[#FDF0D5]">Security Alerts</Label>
                          <p className="text-xs text-[#669BBC]">Receive emails about account security</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[#FDF0D5]">Marketing Emails</Label>
                          <p className="text-xs text-[#669BBC]">Receive promotional emails and offers</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection !== "account" && activeSection !== "notifications" && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-[#1E1E1E] p-6 rounded-full mb-4">
                  {activeSection === "privacy" && <Shield className="h-12 w-12 text-[#669BBC]" />}
                  {activeSection === "appearance" && <Globe className="h-12 w-12 text-[#669BBC]" />}
                  {activeSection === "devices" && <Smartphone className="h-12 w-12 text-[#669BBC]" />}
                  {activeSection === "billing" && <CreditCard className="h-12 w-12 text-[#669BBC]" />}
                  {activeSection === "help" && <HelpCircle className="h-12 w-12 text-[#669BBC]" />}
                </div>
                <h3 className="text-xl font-bold text-[#FDF0D5] mb-2">
                  {activeSection === "privacy" && "Privacy & Safety Settings"}
                  {activeSection === "appearance" && "Appearance Settings"}
                  {activeSection === "devices" && "Devices Settings"}
                  {activeSection === "billing" && "Billing Settings"}
                  {activeSection === "help" && "Help & Support"}
                </h3>
                <p className="text-[#669BBC] text-center max-w-md mb-6">
                  This section is currently under development. Check back soon for more options to customize your
                  experience.
                </p>
                <Button className="bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5]">Coming Soon</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

