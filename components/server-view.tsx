"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Hash,
  Volume2,
  Search,
  Paperclip,
  ImageIcon,
  Smile,
  Send,
  Users,
  Plus,
  Settings,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function ServerView({ server, onClose }) {
  const [selectedChannel, setSelectedChannel] = useState(
    server.channels.find((c) => c.type === "text") || server.channels[0],
  )

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex">
      {/* Left sidebar - channels */}
      <div className="w-60 bg-[#121212] border-r border-[#003049] flex flex-col">
        <div className="p-4 border-b border-[#003049] flex items-center justify-between">
          <Button variant="ghost" onClick={onClose} className="text-[#FDF0D5]">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
        </div>

        <div className="p-4 border-b border-[#003049]">
          <h2 className="font-bold text-xl text-[#C1121F] flex items-center justify-between">
            {server.name}
            <Button variant="ghost" size="icon" className="text-[#669BBC] hover:text-[#C1121F]">
              <Settings className="h-5 w-5" />
            </Button>
          </h2>
        </div>

        <div className="p-2">
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#669BBC]" />
            <Input
              placeholder="Search channels..."
              className="pl-8 bg-[#1E1E1E] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-xs font-semibold text-[#669BBC]">TEXT CHANNELS</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-[#669BBC]">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {server.channels
              .filter((c) => c.type === "text")
              .map((channel) => (
                <button
                  key={channel.id}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1E1E1E] text-sm w-full text-left text-[#FDF0D5] ${
                    selectedChannel && selectedChannel.id === channel.id ? "bg-[#1E1E1E]" : ""
                  }`}
                  onClick={() => setSelectedChannel(channel)}
                >
                  <Hash className="h-4 w-4 text-[#669BBC]" />
                  {channel.name}
                </button>
              ))}

            <div className="flex items-center justify-between px-2 py-1.5 mt-4">
              <span className="text-xs font-semibold text-[#669BBC]">VOICE CHANNELS</span>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-[#669BBC]">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {server.channels
              .filter((c) => c.type === "voice")
              .map((channel) => (
                <button
                  key={channel.id}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1E1E1E] text-sm w-full text-left text-[#FDF0D5] ${
                    selectedChannel && selectedChannel.id === channel.id ? "bg-[#1E1E1E]" : ""
                  }`}
                  onClick={() => setSelectedChannel(channel)}
                >
                  <Volume2 className="h-4 w-4 text-[#669BBC]" />
                  {channel.name}
                </button>
              ))}
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-[#003049] flex items-center gap-2">
          <Avatar className="h-8 w-8 border-2 border-[#C1121F]">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">UN</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm font-medium text-[#FDF0D5]">Username</div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#669BBC] hover:text-[#C1121F] hover:bg-transparent"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-[#121212]">
        <div className="p-4 border-b border-[#003049] flex items-center justify-between">
          <div className="flex items-center">
            {selectedChannel.type === "text" ? (
              <Hash className="h-5 w-5 text-[#669BBC] mr-2" />
            ) : (
              <Volume2 className="h-5 w-5 text-[#669BBC] mr-2" />
            )}
            <h2 className="font-semibold text-lg text-[#FDF0D5]">{selectedChannel.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#669BBC]">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#669BBC]">
              <Users className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <ServerChatMessages channel={selectedChannel} />
        </ScrollArea>

        <div className="p-4 border-t border-[#003049]">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#669BBC]">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#669BBC]">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Input
              placeholder={`Message #${selectedChannel.name}...`}
              className="flex-1 bg-[#1E1E1E] border-[#003049] text-[#FDF0D5] placeholder:text-[#669BBC]/70"
            />
            <Button variant="ghost" size="icon" className="text-[#669BBC]">
              <Smile className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5]">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right sidebar - members */}
      <div className="w-60 bg-[#121212] border-l border-[#003049] flex flex-col">
        <div className="p-4 border-b border-[#003049]">
          <h2 className="font-semibold text-lg text-[#FDF0D5]">Members</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-[#669BBC]">ONLINE — 5</div>
            <ServerMember name="Jane Cooper" status="online" role="Admin" />
            <ServerMember name="Alex Morgan" status="online" />
            <ServerMember name="Taylor Swift" status="idle" />
            <ServerMember name="John Doe" status="dnd" />
            <ServerMember name="Emma Davis" status="online" />

            <Separator className="my-2 bg-[#003049]" />

            <div className="px-2 py-1.5 text-xs font-semibold text-[#669BBC]">OFFLINE — 3</div>
            <ServerMember name="Michael Brown" status="offline" />
            <ServerMember name="Sarah Williams" status="offline" />
            <ServerMember name="David Miller" status="offline" />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function ServerChatMessages({ channel }) {
  // Sample messages for demonstration
  const messages = [
    {
      id: 1,
      user: {
        name: "Jane Cooper",
        avatar: "/placeholder-user.jpg",
      },
      content: "Hey everyone! Welcome to the channel!",
      timestamp: "Today at 10:32 AM",
    },
    {
      id: 2,
      user: {
        name: "Alex Morgan",
        avatar: "/placeholder-user.jpg",
      },
      content: "Thanks for setting this up. I've been looking for a place to discuss this topic.",
      timestamp: "Today at 10:35 AM",
    },
    {
      id: 3,
      user: {
        name: "Taylor Swift",
        avatar: "/placeholder-user.jpg",
      },
      content: "I'm excited to be here! Does anyone have any recommendations for beginners?",
      timestamp: "Today at 10:40 AM",
    },
    {
      id: 4,
      user: {
        name: "John Doe",
        avatar: "/placeholder-user.jpg",
      },
      content: "I'd recommend starting with the basics. There are some great tutorials online that I can share.",
      timestamp: "Today at 10:42 AM",
    },
    {
      id: 5,
      user: {
        name: "Jane Cooper",
        avatar: "/placeholder-user.jpg",
      },
      content: "That would be great, John! I'm also happy to help anyone who has questions.",
      timestamp: "Today at 10:45 AM",
    },
    {
      id: 6,
      user: {
        name: "Emma Davis",
        avatar: "/placeholder-user.jpg",
      },
      content: "I just joined this server. Looks like a great community!",
      timestamp: "Today at 11:02 AM",
    },
    {
      id: 7,
      user: {
        name: "Alex Morgan",
        avatar: "/placeholder-user.jpg",
      },
      content: "Welcome Emma! Feel free to ask any questions you might have.",
      timestamp: "Today at 11:05 AM",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#003049] mb-2">
          {channel.type === "text" ? (
            <Hash className="h-8 w-8 text-[#FDF0D5]" />
          ) : (
            <Volume2 className="h-8 w-8 text-[#FDF0D5]" />
          )}
        </div>
        <h3 className="text-xl font-bold text-[#FDF0D5]">Welcome to #{channel.name}!</h3>
        <p className="text-[#669BBC]">This is the start of the #{channel.name} channel.</p>
      </div>

      {messages.map((message) => (
        <div key={message.id} className="flex gap-3">
          <Avatar className="h-10 w-10 border-2 border-[#003049]">
            <AvatarImage src={message.user.avatar} />
            <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">{message.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-[#FDF0D5]">{message.user.name}</span>
              <span className="text-xs text-[#669BBC]">{message.timestamp}</span>
            </div>
            <p className="text-[#FDF0D5]">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ServerMember({ name, status, role }) {
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
    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1E1E1E] group">
      <div className="relative">
        <Avatar className="h-8 w-8 border-2 border-[#003049]">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback className="bg-[#780000] text-[#FDF0D5]">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(status)} border-2 border-[#121212] group-hover:border-[#1E1E1E]`}
        ></div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-[#FDF0D5] flex items-center">
          {name}
          {role && <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-[#C1121F] text-[#FDF0D5]">{role}</span>}
        </div>
        {status === "online" && <div className="text-xs text-[#669BBC]">Online</div>}
        {status === "idle" && <div className="text-xs text-[#669BBC]">Idle</div>}
        {status === "dnd" && <div className="text-xs text-[#669BBC]">Do Not Disturb</div>}
        {status === "offline" && <div className="text-xs text-[#669BBC]">Offline</div>}
      </div>
    </div>
  )
}

