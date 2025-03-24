"use client"

import { useState } from "react"
import { UserPlus, X, Phone, Video, MoreHorizontal, Search, UserCheck, UserX, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanel } from "@/components/resizable-panel"

export function FriendsButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-[#C1121F] text-[#FDF0D5] border-[#C1121F] hover:bg-[#780000] hover:text-[#FDF0D5] hover:border-[#780000]"
        >
          <UserPlus className="h-5 w-5" />
          <span>Friends</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 border-l-[#003049] bg-[#121212] w-auto">
        <ResizablePanel defaultWidth={450} minWidth={350} maxWidth={800} side="left">
          <FriendsList />
        </ResizablePanel>
      </SheetContent>
    </Sheet>
  )
}

function FriendsList() {
  const [activeTab, setActiveTab] = useState("online")

  const friends = [
    {
      id: 1,
      name: "Jane Cooper",
      username: "jane_cooper",
      avatar: "/placeholder-user.jpg",
      status: "online",
      statusText: "Playing Valorant",
    },
    {
      id: 2,
      name: "Alex Morgan",
      username: "alex_m",
      avatar: "/placeholder-user.jpg",
      status: "online",
      statusText: "Listening to Spotify",
    },
    {
      id: 3,
      name: "Taylor Swift",
      username: "taylorswift",
      avatar: "/placeholder-user.jpg",
      status: "idle",
      statusText: "Away for 10 minutes",
    },
    {
      id: 4,
      name: "John Doe",
      username: "johndoe",
      avatar: "/placeholder-user.jpg",
      status: "dnd",
      statusText: "Do not disturb",
    },
    {
      id: 5,
      name: "Sarah Williams",
      username: "sarahw",
      avatar: "/placeholder-user.jpg",
      status: "offline",
      statusText: "Last online 2 hours ago",
    },
  ]

  const pendingRequests = [
    {
      id: 6,
      name: "Mike Johnson",
      username: "mikej",
      avatar: "/placeholder-user.jpg",
      type: "incoming",
    },
    {
      id: 7,
      name: "Emma Davis",
      username: "emmad",
      avatar: "/placeholder-user.jpg",
      type: "outgoing",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-[#C1121F]"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="px-4 py-3 border-b border-[#003049] text-left">
        <SheetTitle className="text-[#FDF0D5] text-xl">Friends</SheetTitle>
      </SheetHeader>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#669BBC]" />
          <Input
            placeholder="Search friends..."
            className="pl-8 bg-[#1E1E1E] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70"
          />
        </div>
      </div>

      <Tabs defaultValue="online" className="flex-1">
        <TabsList className="w-full bg-[#000000] p-0 h-auto">
          <TabsTrigger
            value="online"
            className="flex-1 rounded-none py-2 data-[state=active]:bg-[#121212] data-[state=active]:text-[#C1121F] text-[#669BBC]"
            onClick={() => setActiveTab("online")}
          >
            Online
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="flex-1 rounded-none py-2 data-[state=active]:bg-[#121212] data-[state=active]:text-[#C1121F] text-[#669BBC]"
            onClick={() => setActiveTab("all")}
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="flex-1 rounded-none py-2 data-[state=active]:bg-[#121212] data-[state=active]:text-[#C1121F] text-[#669BBC]"
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="online" className="m-0 p-0 flex-1 overflow-auto">
          <div className="p-2">
            {friends
              .filter((f) => f.status === "online" || f.status === "idle" || f.status === "dnd")
              .map((friend) => (
                <div key={friend.id} className="flex items-center p-2 hover:bg-[#1E1E1E] rounded-md">
                  <div className="relative">
                    <Avatar className="border-2 border-[#003049]">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(friend.status)} border-2 border-[#121212]`}
                    ></div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-[#FDF0D5]">{friend.name}</div>
                    <div className="text-xs text-[#669BBC]">{friend.statusText}</div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-[#669BBC] hover:text-[#C1121F] hover:bg-[#1E1E1E]"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-[#669BBC] hover:text-[#C1121F] hover:bg-[#1E1E1E]"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-[#669BBC] hover:text-[#C1121F] hover:bg-[#1E1E1E]"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="m-0 p-0 flex-1 overflow-auto">
          <div className="p-2">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center p-2 hover:bg-[#1E1E1E] rounded-md">
                <div className="relative">
                  <Avatar className="border-2 border-[#003049]">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(friend.status)} border-2 border-[#121212]`}
                  ></div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-medium text-[#FDF0D5]">{friend.name}</div>
                  <div className="text-xs text-[#669BBC]">{friend.statusText}</div>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-[#669BBC] hover:text-[#C1121F] hover:bg-[#1E1E1E]"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  {friend.status !== "offline" && (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-[#669BBC] hover:text-[#C1121F] hover:bg-[#1E1E1E]"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-[#669BBC] hover:text-[#C1121F] hover:bg-[#1E1E1E]"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="m-0 p-0 flex-1 overflow-auto">
          <div className="p-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-[#669BBC]">INCOMING REQUESTS</div>
            {pendingRequests
              .filter((r) => r.type === "incoming")
              .map((request) => (
                <div key={request.id} className="flex items-center p-2 hover:bg-[#1E1E1E] rounded-md">
                  <Avatar className="border-2 border-[#003049]">
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">{request.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-[#FDF0D5]">{request.name}</div>
                    <div className="text-xs text-[#669BBC]">Incoming Friend Request</div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500 hover:bg-[#1E1E1E]">
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-[#C1121F] hover:bg-[#1E1E1E]">
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

            <div className="px-2 py-1.5 mt-4 text-xs font-semibold text-[#669BBC]">OUTGOING REQUESTS</div>
            {pendingRequests
              .filter((r) => r.type === "outgoing")
              .map((request) => (
                <div key={request.id} className="flex items-center p-2 hover:bg-[#1E1E1E] rounded-md">
                  <Avatar className="border-2 border-[#003049]">
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">{request.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-[#FDF0D5]">{request.name}</div>
                    <div className="text-xs text-[#669BBC]">Outgoing Friend Request</div>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-[#C1121F] hover:bg-[#1E1E1E]">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-3 border-t border-[#003049] mt-auto">
        <Button className="w-full bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5]">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Friend
        </Button>
      </div>
    </div>
  )
}

