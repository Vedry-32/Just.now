"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ResizablePanelProps {
  children: React.ReactNode
  defaultWidth?: number
  minWidth?: number
  maxWidth?: number
  className?: string
  side?: "left" | "right"
}

export function ResizablePanel({
  children,
  defaultWidth = 400,
  minWidth = 300,
  maxWidth = 800,
  className,
  side = "right",
}: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth)
  const [isResizing, setIsResizing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef<number>(0)
  const startWidthRef = useRef<number>(defaultWidth)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    startXRef.current = e.clientX
    startWidthRef.current = width
    document.body.style.cursor = side === "right" ? "ew-resize" : "w-resize"
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const delta = side === "right" ? startXRef.current - e.clientX : e.clientX - startXRef.current

      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + delta))
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = ""
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
    }
  }, [isResizing, minWidth, maxWidth, side])

  return (
    <div ref={panelRef} className={cn("relative", className)} style={{ width: `${width}px` }}>
      {children}

      <div
        className={cn(
          "absolute top-0 bottom-0 w-4 cursor-ew-resize z-10 hover:bg-[#003049]/20 transition-colors",
          side === "right" ? "left-0" : "right-0",
        )}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}

