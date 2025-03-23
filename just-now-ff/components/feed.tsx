"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Search, Bell, MessageSquare, Flame } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServersButton } from "@/components/servers-button"
import { FriendsButton } from "@/components/friends-button"
import { SwipeInterface } from "@/components/swipe-interface"

export function Feed() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [showSwipe, setShowSwipe] = useState(false)

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

  if (showSwipe) {
    return <SwipeInterface onClose={() => setShowSwipe(false)} />
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
          <Avatar className="border-2 border-[#C1121F]">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">UN</AvatarFallback>
          </Avatar>
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
            <TabsTrigger
              value="trending"
              className="flex-1 data-[state=active]:bg-[#C1121F] data-[state=active]:text-[#FDF0D5] text-[#FDF0D5]"
            >
              Trending
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant="outline"
          className="gap-2 bg-[#C1121F] text-[#FDF0D5] border-[#C1121F] hover:bg-[#780000] hover:text-[#FDF0D5] hover:border-[#780000]"
          onClick={() => setShowSwipe(true)}
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
    </div>
  )
}

