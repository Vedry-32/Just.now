import { Feed } from "@/components/feed"

export default function Home() {
  return (
    <div className="flex h-screen bg-[#000000]">
      <main className="flex-1 overflow-auto">
        <Feed />
      </main>
    </div>
  )
}

