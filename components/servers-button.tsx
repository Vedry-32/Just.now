"use client"

import { useState } from "react"
import { Users, X, Hash, Volume2, Mic, Settings, PlusCircle, Send, Paperclip, ImageIcon, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ServerView } from "@/components/server-view"
import { ResizablePanel } from "@/components/resizable-panel"

export function ServersButton() {
  const [expandedChat, setExpandedChat] = useState(false)
  const [activeServer, setActiveServer] = useState(null)
  const [fullScreenServer, setFullScreenServer] = useState(null)

  // If a server is in full-screen mode, render that instead
  if (fullScreenServer !== null) {
    return (
      <ServerView server={servers.find((s) => s.id === fullScreenServer)} onClose={() => setFullScreenServer(null)} />
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-[#C1121F] text-[#FDF0D5] border-[#C1121F] hover:bg-[#780000] hover:text-[#FDF0D5] hover:border-[#780000]"
        >
          <Users className="h-5 w-5" />
          <span>Servers</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 border-l-[#003049] bg-[#121212] w-auto">
        <ResizablePanel defaultWidth={expandedChat ? 1000 : 400} minWidth={350} maxWidth={1200} side="left">
          <ServersSidebar
            expandedChat={expandedChat}
            setExpandedChat={setExpandedChat}
            activeServer={activeServer}
            setActiveServer={setActiveServer}
            setFullScreenServer={setFullScreenServer}
          />
        </ResizablePanel>
      </SheetContent>
    </Sheet>
  )
}

const servers = [
  {
    id: 0,
    name: "Home",
    icon: "JN",
    channels: [
      { id: 1, name: "general", type: "text" },
      { id: 2, name: "welcome", type: "text" },
      { id: 3, name: "voice-lounge", type: "voice" },
    ],
  },
  {
    id: 1,
    name: "Gaming",
    icon: "🎮",
    channels: [
      { id: 4, name: "general", type: "text" },
      { id: 5, name: "valorant", type: "text" },
      { id: 6, name: "minecraft", type: "text" },
      { id: 7, name: "game-night", type: "voice" },
    ],
  },
  {
    id: 2,
    name: "Music",
    icon: "🎵",
    channels: [
      { id: 8, name: "general", type: "text" },
      { id: 9, name: "recommendations", type: "text" },
      { id: 10, name: "production", type: "text" },
      { id: 11, name: "listening-party", type: "voice" },
    ],
  },
  {
    id: 3,
    name: "Art",
    icon: "🎨",
    channels: [
      { id: 12, name: "general", type: "text" },
      { id: 13, name: "showcase", type: "text" },
      { id: 14, name: "critiques", type: "text" },
      { id: 15, name: "art-talk", type: "voice" },
    ],
  },
  {
    id: 4,
    name: "Tech",
    icon: "💻",
    channels: [
      { id: 16, name: "general", type: "text" },
      { id: 17, name: "programming", type: "text" },
      { id: 18, name: "hardware", type: "text" },
      { id: 19, name: "tech-support", type: "voice" },
    ],
  },
]

function ServersSidebar({ expandedChat, setExpandedChat, activeServer, setActiveServer, setFullScreenServer }) {
  const [selectedChannel, setSelectedChannel] = useState(null)

  const handleServerClick = (serverId) => {
    setActiveServer(serverId)
  }

  const handleServerDoubleClick = (serverId) => {
    setFullScreenServer(serverId)
  }

  const handleChannelClick = (channel) => {
    if (channel.type === "text") {
      setSelectedChannel(channel)
      setExpandedChat(true)
    }
  }

  const currentServer = servers.find((s) => s.id === activeServer) || servers[0]

  return (
    <div className="flex h-full">
      {/* Server sidebar */}
      <div className="w-[72px] bg-[#000000] flex flex-col items-center py-3 gap-3">
        {servers.map((server) => (
          <button
            key={server.id}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
              activeServer === server.id
                ? "bg-[#C1121F] text-[#FDF0D5]"
                : "bg-[#003049] text-[#FDF0D5] hover:bg-[#780000]"
            }`}
            onClick={() => handleServerClick(server.id)}
            onDoubleClick={() => handleServerDoubleClick(server.id)}
          >
            {server.icon}
          </button>
        ))}
        <Button
          size="icon"
          variant="outline"
          className="rounded-full mt-2 border-[#669BBC] text-[#669BBC] hover:bg-[#C1121F] hover:text-[#FDF0D5] hover:border-[#C1121F]"
        >
          <PlusCircle className="h-5 w-5" />
          <span className="sr-only">Add Server</span>
        </Button>
      </div>

      {/* Channel sidebar */}
      <div className={`${expandedChat ? "w-60 border-r border-[#003049]" : "flex-1"} bg-[#121212] flex flex-col`}>
        <div className="p-4 border-b border-[#003049]">
          <h2 className="font-semibold text-lg text-[#C1121F]">{currentServer.name}</h2>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-[#669BBC]">TEXT CHANNELS</div>
            {currentServer.channels
              .filter((c) => c.type === "text")
              .map((channel) => (
                <button
                  key={channel.id}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1E1E1E] text-sm w-full text-left text-[#FDF0D5] ${
                    selectedChannel && selectedChannel.id === channel.id ? "bg-[#1E1E1E]" : ""
                  }`}
                  onClick={() => handleChannelClick(channel)}
                >
                  <Hash className="h-4 w-4 text-[#669BBC]" />
                  {channel.name}
                </button>
              ))}

            <div className="px-2 py-1.5 mt-4 text-xs font-semibold text-[#669BBC]">VOICE CHANNELS</div>
            {currentServer.channels
              .filter((c) => c.type === "voice")
              .map((channel) => (
                <button
                  key={channel.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1E1E1E] text-sm w-full text-left text-[#FDF0D5]"
                >
                  <Volume2 className="h-4 w-4 text-[#669BBC]" />
                  {channel.name}
                </button>
              ))}
          </div>
        </div>

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
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#669BBC] hover:text-[#C1121F] hover:bg-transparent"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat area - only shown when expanded */}
      {expandedChat && selectedChannel && (
        <div className="flex-1 flex flex-col bg-[#121212] border-l border-[#003049]">
          <div className="p-4 border-b border-[#003049] flex items-center justify-between">
            <div className="flex items-center">
              <Hash className="h-5 w-5 text-[#669BBC] mr-2" />
              <h2 className="font-semibold text-lg text-[#FDF0D5]">{selectedChannel.name}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setExpandedChat(false)}>
              <X className="h-5 w-5 text-[#669BBC]" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <ChatMessages channel={selectedChannel} />
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
      )}
    </div>
  )
}

function ChatMessages({ channel }) {
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
  ]

  return (
    <div className="space-y-4">
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

