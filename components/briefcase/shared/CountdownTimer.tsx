"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  minutes: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function CountdownTimer({ minutes, size = "md", showLabel = true, className }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(minutes * 60)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isUrgent = mins < 5

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl"
  }

  // Show placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={cn("font-mono", className)}>
        {showLabel && (
          <span className="mr-1 text-[var(--accent-gold)]">IN</span>
        )}
        <span className={cn(sizeClasses[size], "font-semibold tabular-nums text-[var(--accent-gold)]")}>
          --:--
        </span>
      </div>
    )
  }

  return (
    <div className={cn("font-mono", className)}>
      {showLabel && (
        <span className={cn(
          "mr-1",
          isUrgent ? "text-red-500" : "text-[var(--accent-gold)]"
        )}>
          IN
        </span>
      )}
      <span className={cn(
        sizeClasses[size],
        "font-semibold tabular-nums",
        isUrgent ? "text-red-500 animate-pulse" : "text-[var(--accent-gold)]"
      )}>
        {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
      </span>
    </div>
  )
}
