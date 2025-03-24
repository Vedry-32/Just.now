"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Search,
  Bell,
  MessageSquare,
  Flame,
  Film,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServersButton } from "@/components/servers-button"
import { FriendsButton } from "@/components/friends-button"
import { SwipeInterface } from "@/components/swipe-interface"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { UserDropdown } from "@/components/user-dropdown"

export function Feed() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [showSwipe, setShowSwipe] = useState(false)
  const [showSwipeDialog, setShowSwipeDialog] = useState(false)
  const [swipeMode, setSwipeMode] = useState("just-now") // "general" or "just-now"
  const [showShorts, setShowShorts] = useState(false)

  const posts = [
    {
      id: 1,
      user: {
        name: "Jane Cooper",
        username: "jane_cooper",
        avatar: "/placeholder-user.jpg",
      },
      content: "Just finished this amazing digital art piece! What do you think? #digitalart #creativity",
      image: "/placeholder.svg?height=600&width=600",
      likes: 243,
      comments: 42,
      time: "2h",
    },
    {
      id: 2,
      user: {
        name: "Alex Morgan",
        username: "alex_m",
        avatar: "/placeholder-user.jpg",
      },
      content:
        "Exploring new hiking trails this weekend. The view was absolutely breathtaking! #nature #hiking #weekend",
      image: "/placeholder.svg?height=600&width=600",
      likes: 512,
      comments: 78,
      time: "5h",
    },
    {
      id: 3,
      user: {
        name: "Taylor Swift",
        username: "taylorswift",
        avatar: "/placeholder-user.jpg",
      },
      content: "New music coming soon... 🎵 #newera",
      image: "/placeholder.svg?height=600&width=600",
      likes: 1243,
      comments: 532,
      time: "1d",
    },
  ]

  const handleSwipeClick = () => {
    setShowSwipeDialog(true)
  }

  const handleSwipeStart = (mode) => {
    setSwipeMode(mode)
    setShowSwipeDialog(false)
    setShowSwipe(true)
  }

  if (showShorts) {
    return <ShortsInterface onClose={() => setShowShorts(false)} />
  }

  if (showSwipe) {
    return <SwipeInterface onClose={() => setShowSwipe(false)} mode={swipeMode} />
  }

  return (
    <div className="max-w-3xl mx-auto pt-4 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#C1121F]">Just Now</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#669BBC]" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8 rounded-full bg-[#121212] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70"
            />
          </div>
          <FriendsButton />
          <Button size="icon" variant="ghost" className="text-[#669BBC] hover:text-[#C1121F] hover:bg-[#121212]">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-[#669BBC] hover:text-[#C1121F] hover:bg-[#121212]">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <UserDropdown />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 gap-4">
        <Tabs defaultValue="for-you" className="flex-1">
          <TabsList className="w-full bg-[#003049]">
            <TabsTrigger
              value="for-you"
              className="flex-1 data-[state=active]:bg-[#C1121F] data-[state=active]:text-[#FDF0D5] text-[#FDF0D5]"
            >
              For You
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="flex-1 data-[state=active]:bg-[#C1121F] data-[state=active]:text-[#FDF0D5] text-[#FDF0D5]"
            >
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant="outline"
          className="gap-2 bg-[#C1121F] text-[#FDF0D5] border-[#C1121F] hover:bg-[#780000] hover:text-[#FDF0D5] hover:border-[#780000]"
          onClick={() => setShowShorts(true)}
        >
          <Film className="h-5 w-5" />
          <span>Shorts</span>
        </Button>
        <Button
          variant="outline"
          className="gap-2 bg-[#C1121F] text-[#FDF0D5] border-[#C1121F] hover:bg-[#780000] hover:text-[#FDF0D5] hover:border-[#780000]"
          onClick={handleSwipeClick}
        >
          <Flame className="h-5 w-5" />
          <span>Swipe</span>
        </Button>
        <ServersButton />
      </div>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="space-y-6 pb-10">
          {posts.map((post) => (
            <div key={post.id} className="border border-[#003049] rounded-xl overflow-hidden bg-[#121212] shadow-md">
              <div className="p-4 flex items-center gap-3 border-b border-[#003049]">
                <Avatar className="border-2 border-[#C1121F]">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-[#FDF0D5]">{post.user.name}</div>
                  <div className="text-sm text-[#669BBC]">
                    @{post.user.username} · {post.time}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto text-[#669BBC] hover:text-[#C1121F] hover:bg-[#121212]"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>

              <div className="px-4 pb-3 pt-3">
                <p className="text-[#FDF0D5]">{post.content}</p>
              </div>

              <Image
                src={post.image || "/placeholder.svg"}
                width={600}
                height={600}
                alt="Post image"
                className="w-full object-cover"
              />

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1.5 text-[#C1121F] hover:bg-[#1E1E1E]"
                    >
                      <Heart className="h-5 w-5" />
                      <span className="text-[#FDF0D5]">{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1.5 text-[#669BBC] hover:bg-[#1E1E1E]"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-[#FDF0D5]">{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[#669BBC] hover:bg-[#1E1E1E]">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#669BBC] hover:bg-[#1E1E1E]">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-[#C1121F]">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">UN</AvatarFallback>
                  </Avatar>
                  <Input
                    placeholder="Add a comment..."
                    className="rounded-full bg-[#1E1E1E] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70"
                  />
                  <Button size="sm" className="rounded-full bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5]">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Swipe Mode Selection Dialog */}
      <Dialog open={showSwipeDialog} onOpenChange={setShowSwipeDialog}>
        <DialogContent className="bg-[#121212] border-[#003049] text-[#FDF0D5]">
          <DialogTitle className="text-[#C1121F] text-xl">Choose Swipe Mode</DialogTitle>
          <DialogDescription className="text-[#669BBC]">
            Select which profiles you want to see in the swipe interface.
          </DialogDescription>

          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className={`flex flex-col h-auto p-6 border-2 bg-[#1E1E1E] border-[#003049] hover:bg-[#C1121F] hover:border-[#C1121F] hover:text-[#FDF0D5] ${
                swipeMode === "general" ? "border-[#C1121F]" : ""
              }`}
              onClick={() => setSwipeMode("general")}
            >
              <span className="text-lg font-bold mb-2">General</span>
              <span className="text-sm text-[#669BBC]">See all profiles</span>
            </Button>

            <Button
              variant="outline"
              className={`flex flex-col h-auto p-6 border-2 bg-[#1E1E1E] border-[#003049] hover:bg-[#C1121F] hover:border-[#C1121F] hover:text-[#FDF0D5] ${
                swipeMode === "just-now" ? "border-[#C1121F]" : ""
              }`}
              onClick={() => setSwipeMode("just-now")}
            >
              <span className="text-lg font-bold mb-2">Just Now</span>
              <span className="text-sm text-[#669BBC]">Only online users</span>
            </Button>
          </div>

          <DialogFooter>
            <Button
              className="bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5]"
              onClick={() => handleSwipeStart(swipeMode)}
            >
              <Flame className="h-4 w-4 mr-2" />
              Start Swiping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ShortsInterface({ onClose }) {
  const [currentShort, setCurrentShort] = useState(0)

  // Ukázková data pro krátká videa
  const shorts = [
    {
      id: 1,
      user: {
        name: "Jane Cooper",
        username: "jane_cooper",
        avatar: "/placeholder-user.jpg",
      },
      description: "Check out this amazing sunset! #nature #sunset #vibes",
      likes: 1243,
      comments: 89,
      shares: 45,
      thumbnail: "/placeholder.svg?height=800&width=450&text=Short+1",
    },
    {
      id: 2,
      user: {
        name: "Alex Morgan",
        username: "alex_m",
        avatar: "/placeholder-user.jpg",
      },
      description: "New dance challenge! Who's in? 💃 #dance #challenge #trending",
      likes: 8721,
      comments: 342,
      shares: 156,
      thumbnail: "/placeholder.svg?height=800&width=450&text=Short+2",
    },
    {
      id: 3,
      user: {
        name: "Taylor Swift",
        username: "taylorswift",
        avatar: "/placeholder-user.jpg",
      },
      description: "Behind the scenes of my new music video! #music #newrelease",
      likes: 24563,
      comments: 1893,
      shares: 876,
      thumbnail: "/placeholder.svg?height=800&width=450&text=Short+3",
    },
    {
      id: 4,
      user: {
        name: "John Doe",
        username: "johndoe",
        avatar: "/placeholder-user.jpg",
      },
      description: "Quick cooking tip that will change your life! #cooking #foodie #hack",
      likes: 5432,
      comments: 231,
      shares: 98,
      thumbnail: "/placeholder.svg?height=800&width=450&text=Short+4",
    },
    {
      id: 5,
      user: {
        name: "Emma Davis",
        username: "emmad",
        avatar: "/placeholder-user.jpg",
      },
      description: "POV: When your cat decides it's 3AM playtime 😂 #cats #funny #pov",
      likes: 9876,
      comments: 543,
      shares: 321,
      thumbnail: "/placeholder.svg?height=800&width=450&text=Short+5",
    },
  ]

  const handleNext = () => {
    setCurrentShort((prev) => (prev === shorts.length - 1 ? 0 : prev + 1))
  }

  const handlePrevious = () => {
    setCurrentShort((prev) => (prev === 0 ? shorts.length - 1 : prev - 1))
  }

  const currentShortData = shorts[currentShort]

  return (
    <div className="fixed inset-0 bg-[#000000] z-50">
      {/* Header */}
      <header className="p-4 border-b border-[#003049] flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center text-[#FDF0D5] bg-transparent border-0 cursor-pointer hover:text-[#C1121F]"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          <span>Back to Feed</span>
        </button>
        <h2 className="text-xl font-bold text-[#FDF0D5] flex items-center">
          <Film className="h-5 w-5 text-[#C1121F] mr-2" />
          Shorts
        </h2>
        <div className="w-[100px]"></div> {/* Spacer for centering */}
      </header>

      {/* Main content */}
      <main className="relative h-[calc(100vh-128px)] overflow-hidden">
        {/* Video container */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
          <img
            src={currentShortData.thumbnail || "/placeholder.svg"}
            alt={`Short by ${currentShortData.user.name}`}
            className="h-full w-auto max-w-full object-contain"
          />

          {/* Navigation buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-[#121212]/50 text-[#FDF0D5] border-0 cursor-pointer hover:bg-[#121212]/70"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6 mx-auto" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-[#121212]/50 text-[#FDF0D5] border-0 cursor-pointer hover:bg-[#121212]/70"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6 mx-auto" />
          </button>

          {/* Video controls overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <img
                  src={currentShortData.user.avatar || "/placeholder.svg"}
                  alt={currentShortData.user.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-[#C1121F]"
                />
              </div>
              <div>
                <div className="font-medium text-[#FDF0D5]">{currentShortData.user.name}</div>
                <div className="text-sm text-[#669BBC]">@{currentShortData.user.username}</div>
              </div>
              <button className="ml-auto bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5] px-4 py-2 rounded-md border-0 cursor-pointer">
                Follow
              </button>
            </div>

            <p className="text-[#FDF0D5] mb-4">{currentShortData.description}</p>

            {/* Interaction buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex flex-col items-center gap-1 text-[#FDF0D5] bg-transparent border-0 cursor-pointer">
                  <Heart className="h-6 w-6 text-[#C1121F]" />
                  <span className="text-xs">{currentShortData.likes}</span>
                </button>

                <button className="flex flex-col items-center gap-1 text-[#FDF0D5] bg-transparent border-0 cursor-pointer">
                  <MessageCircle className="h-6 w-6 text-[#669BBC]" />
                  <span className="text-xs">{currentShortData.comments}</span>
                </button>

                <button className="flex flex-col items-center gap-1 text-[#FDF0D5] bg-transparent border-0 cursor-pointer">
                  <Send className="h-6 w-6 text-[#669BBC]" />
                  <span className="text-xs">{currentShortData.shares}</span>
                </button>
              </div>

              <button className="text-[#FDF0D5] bg-transparent border-0 cursor-pointer">
                <MoreHorizontal className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Progress bar */}
      <div className="h-1 bg-[#003049] w-full">
        <div className="h-full bg-[#C1121F]" style={{ width: `${((currentShort + 1) / shorts.length) * 100}%` }}></div>
      </div>

      {/* Bottom navigation */}
      <footer className="p-4 border-t border-[#003049] flex items-center justify-between">
        <span className="text-[#669BBC]">
          {currentShort + 1} / {shorts.length}
        </span>

        <button className="bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5] px-4 py-2 rounded-md border-0 cursor-pointer flex items-center">
          <Camera className="h-4 w-4 mr-2" />
          Create Short
        </button>

        <button className="text-[#669BBC] bg-transparent border-0 cursor-pointer">For You</button>
      </footer>
    </div>
  )
}

