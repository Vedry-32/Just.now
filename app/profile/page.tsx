"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Edit, MapPin, Calendar, LinkIcon, Twitter, Instagram, Facebook, Globe, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("posts")

  if (!user) {
    router.push("/login")
    return null
  }

  // Mock data for profile
  const profile = {
    bio: "Digital artist and photographer. Exploring the world one pixel at a time. ✨",
    location: "New York, NY",
    joinedDate: "January 2023",
    website: "www.johndoe.com",
    social: {
      twitter: "johndoe",
      instagram: "johndoe.art",
      facebook: "johndoe.official",
    },
    stats: {
      posts: 127,
      following: 542,
      followers: 1024,
    },
  }

  // Mock posts data
  const posts = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    image: `/placeholder.svg?height=400&width=400&text=Post ${i + 1}`,
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 100) + 5,
    caption:
      i % 3 === 0
        ? "Exploring new creative techniques today! #art #digital"
        : i % 3 === 1
          ? "Beautiful day for photography #photo #nature"
          : "Work in progress... can't wait to share the final result!",
  }))

  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="max-w-4xl mx-auto pt-4 px-4">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="text-[#FDF0D5] mr-2" onClick={() => router.push("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-[#FDF0D5]">Profile</h1>
        </div>

        {/* Profile header */}
        <div className="bg-[#121212] rounded-xl overflow-hidden shadow-lg border border-[#003049] mb-6">
          {/* Cover photo */}
          <div className="h-48 bg-gradient-to-r from-[#003049] to-[#780000] relative">
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-4 right-4 bg-[#121212]/80 hover:bg-[#1E1E1E] text-[#FDF0D5]"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Profile info */}
          <div className="px-6 pb-6 relative">
            {/* Avatar */}
            <div className="absolute -top-16 left-6 border-4 border-[#121212] rounded-full">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar || "/placeholder-user.jpg"} />
                <AvatarFallback className="bg-[#780000] text-[#FDF0D5] text-4xl">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 bg-[#121212]/80 hover:bg-[#1E1E1E] text-[#FDF0D5] h-8 w-8"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Edit profile button */}
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                className="border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Name and username */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-[#FDF0D5]">{user.name}</h2>
              <p className="text-[#669BBC]">@{user.username}</p>
            </div>

            {/* Bio */}
            <p className="mt-4 text-[#FDF0D5]">{profile.bio}</p>

            {/* Profile details */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-[#669BBC]">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center text-[#669BBC]">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Joined {profile.joinedDate}</span>
              </div>
              <div className="flex items-center text-[#669BBC]">
                <LinkIcon className="h-4 w-4 mr-2" />
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C1121F]"
                >
                  {profile.website}
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-4 flex gap-3">
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-[#669BBC] text-[#669BBC] hover:bg-[#1E1E1E] hover:text-[#FDF0D5]"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-6">
              <div className="text-center">
                <p className="text-xl font-bold text-[#FDF0D5]">{profile.stats.posts}</p>
                <p className="text-[#669BBC]">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#FDF0D5]">{profile.stats.following}</p>
                <p className="text-[#669BBC]">Following</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#FDF0D5]">{profile.stats.followers}</p>
                <p className="text-[#669BBC]">Followers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content tabs */}
        <Tabs defaultValue="posts" className="mb-6">
          <TabsList className="w-full bg-[#121212] border border-[#003049] rounded-xl overflow-hidden">
            <TabsTrigger
              value="posts"
              className="flex-1 py-3 data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#C1121F] text-[#669BBC]"
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="flex-1 py-3 data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#C1121F] text-[#669BBC]"
              onClick={() => setActiveTab("media")}
            >
              Media
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex-1 py-3 data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#C1121F] text-[#669BBC]"
              onClick={() => setActiveTab("likes")}
            >
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-4">
            <ScrollArea className="h-[calc(100vh-500px)]">
              <div className="grid grid-cols-1 gap-4 pb-10">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#121212] rounded-xl overflow-hidden border border-[#003049] shadow-md"
                  >
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Post ${post.id}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-[#FDF0D5] mb-2">{post.caption}</p>
                      <div className="flex items-center text-[#669BBC] text-sm">
                        <span className="mr-4">{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="media" className="mt-4">
            <ScrollArea className="h-[calc(100vh-500px)]">
              <div className="grid grid-cols-3 gap-2 pb-10">
                {posts.map((post) => (
                  <div key={post.id} className="aspect-square rounded-md overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Media ${post.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="likes" className="mt-4">
            <ScrollArea className="h-[calc(100vh-500px)]">
              <div className="grid grid-cols-1 gap-4 pb-10">
                {posts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#121212] rounded-xl overflow-hidden border border-[#003049] shadow-md"
                  >
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Liked post ${post.id}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-[#FDF0D5] mb-2">{post.caption}</p>
                      <div className="flex items-center text-[#669BBC] text-sm">
                        <span className="mr-4">{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

