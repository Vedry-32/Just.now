"use client"

import { useState } from "react"
import { Flame, X, Heart, Star, MessageCircle, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function SwipeInterface({ onClose }) {
  const [currentProfile, setCurrentProfile] = useState(0)
  const [direction, setDirection] = useState("")
  const [showDetails, setShowDetails] = useState(false)

  const profiles = [
    {
      id: 1,
      name: "Sophie",
      age: 26,
      image: "/placeholder.svg?height=800&width=600",
      bio: "Adventure seeker and coffee enthusiast. Let's explore the city together!",
      distance: "5 miles away",
      interests: ["Travel", "Photography", "Hiking"],
      about:
        "I'm a freelance photographer who loves to travel and capture beautiful moments. When I'm not behind the camera, you can find me hiking or trying out new coffee shops. Looking for someone who shares my sense of adventure and appreciation for the little things in life.",
      additionalImages: [
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
      ],
    },
    {
      id: 2,
      name: "James",
      age: 28,
      image: "/placeholder.svg?height=800&width=600",
      bio: "Music producer by day, chef by night. Looking for someone to share meals with.",
      distance: "3 miles away",
      interests: ["Music", "Cooking", "Movies"],
      about:
        "I've been producing music for indie artists for the past 5 years, and I'm passionate about creating sounds that move people. In my free time, I love to cook elaborate meals - Italian cuisine is my specialty. I'm looking for someone who appreciates good food, good music, and good conversation.",
      additionalImages: [
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
      ],
    },
    {
      id: 3,
      name: "Emma",
      age: 24,
      image: "/placeholder.svg?height=800&width=600",
      bio: "Bookworm and yoga instructor. Let's talk about your favorite novel over coffee.",
      distance: "7 miles away",
      interests: ["Books", "Yoga", "Art"],
      about:
        "I teach yoga during the day and read books all night. I'm currently working on my first novel, a fantasy story inspired by Eastern mythology. I believe in mindfulness and finding beauty in everyday moments. Looking for someone who is thoughtful, creative, and open-minded.",
      additionalImages: [
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
      ],
    },
    {
      id: 4,
      name: "Michael",
      age: 29,
      image: "/placeholder.svg?height=800&width=600",
      bio: "Tech entrepreneur with a passion for rock climbing. Always up for new challenges!",
      distance: "10 miles away",
      interests: ["Tech", "Climbing", "Entrepreneurship"],
      about:
        "I founded a tech startup that helps small businesses with their digital marketing. When I'm not working, I'm usually at the climbing gym or planning my next outdoor climbing trip. I'm looking for someone who is ambitious, adventurous, and doesn't mind my occasionally hectic schedule.",
      additionalImages: [
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
      ],
    },
  ]

  const handleSwipe = (dir) => {
    setDirection(dir)

    // Simulate card animation before changing profile
    setTimeout(() => {
      if (currentProfile < profiles.length - 1) {
        setCurrentProfile(currentProfile + 1)
      } else {
        setCurrentProfile(0) // Loop back to first profile
      }
      setDirection("")
    }, 300)
  }

  const handlePrevious = () => {
    if (currentProfile > 0) {
      setCurrentProfile(currentProfile - 1)
    } else {
      setCurrentProfile(profiles.length - 1) // Loop to last profile
    }
  }

  const handleNext = () => {
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1)
    } else {
      setCurrentProfile(0) // Loop to first profile
    }
  }

  const profile = profiles[currentProfile]

  if (showDetails) {
    return (
      <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col">
        <div className="p-4 border-b border-[#003049] flex items-center">
          <Button variant="ghost" onClick={() => setShowDetails(false)} className="text-[#FDF0D5]">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-bold text-[#FDF0D5] ml-4">
            {profile.name}, {profile.age}
          </h2>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl overflow-hidden mb-4">
              <Image
                src={profile.image || "/placeholder.svg"}
                width={800}
                height={600}
                alt={profile.name}
                className="w-full object-cover"
              />
            </div>

            <div className="bg-[#121212] rounded-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-[#FDF0D5] mb-2">About</h3>
              <p className="text-[#FDF0D5]">{profile.about}</p>
            </div>

            <div className="bg-[#121212] rounded-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-[#FDF0D5] mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="text-sm bg-[#003049] text-[#FDF0D5] px-3 py-1.5 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#121212] rounded-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-[#FDF0D5] mb-2">Photos</h3>
              <div className="grid grid-cols-3 gap-2">
                {profile.additionalImages.map((img, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={img || "/placeholder.svg"}
                      width={300}
                      height={300}
                      alt={`${profile.name}'s photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#003049] flex items-center justify-center gap-4">
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full border-[#003049] text-[#C1121F] hover:border-[#C1121F] hover:text-[#FDF0D5] hover:bg-[#C1121F]"
            onClick={() => handleSwipe("left")}
          >
            <X className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-14 w-14 rounded-full border-[#003049] text-[#C1121F] hover:border-[#C1121F] hover:text-[#FDF0D5] hover:bg-[#C1121F]"
            onClick={() => handleSwipe("right")}
          >
            <Heart className="h-7 w-7" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full border-[#003049] text-[#669BBC] hover:border-[#669BBC] hover:text-[#FDF0D5] hover:bg-[#669BBC]"
          >
            <Star className="h-6 w-6" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 flex flex-col">
      <div className="p-4 border-b border-[#003049] flex items-center">
        <Button variant="ghost" onClick={onClose} className="text-[#FDF0D5]">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Feed
        </Button>
        <h2 className="text-xl font-bold text-[#FDF0D5] ml-4 flex items-center">
          <Flame className="h-5 w-5 text-[#C1121F] mr-2" />
          Swipe
        </h2>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-300 ${
            direction === "left" ? "translate-x-[-100%]" : direction === "right" ? "translate-x-[100%]" : ""
          }`}
          onClick={() => setShowDetails(true)}
        >
          <div className="relative h-full">
            <Image src={profile.image || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#FDF0D5]">
                    {profile.name}, {profile.age}
                  </h3>
                  <p className="text-sm text-[#669BBC]">{profile.distance}</p>
                </div>
                <div className="flex gap-1">
                  {profile.interests.map((interest, index) => (
                    <span key={index} className="text-xs bg-[#003049] text-[#FDF0D5] px-2 py-1 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-[#FDF0D5]">{profile.bio}</p>
              <p className="mt-2 text-sm text-[#669BBC]">Tap to see more</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#003049] flex items-center justify-center gap-4">
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full border-[#003049] text-[#C1121F] hover:border-[#C1121F] hover:text-[#FDF0D5] hover:bg-[#C1121F]"
          onClick={() => handleSwipe("left")}
        >
          <X className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-14 w-14 rounded-full border-[#003049] text-[#C1121F] hover:border-[#C1121F] hover:text-[#FDF0D5] hover:bg-[#C1121F]"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="h-7 w-7" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full border-[#003049] text-[#669BBC] hover:border-[#669BBC] hover:text-[#FDF0D5] hover:bg-[#669BBC]"
        >
          <Star className="h-6 w-6" />
        </Button>
      </div>

      <div className="p-3 border-t border-[#003049] flex items-center justify-between">
        <Button variant="ghost" className="text-[#669BBC]" onClick={handlePrevious}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button className="bg-[#C1121F] hover:bg-[#780000] text-[#FDF0D5]">
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </Button>
        <Button variant="ghost" className="text-[#669BBC]" onClick={handleNext}>
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

