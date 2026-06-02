"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ALERTS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface AlertCarouselProps {
  dismissedAlerts: string[]
  setDismissedAlerts: (alerts: string[]) => void
}

export function AlertCarousel({ dismissedAlerts, setDismissedAlerts }: AlertCarouselProps) {
  const visibleAlerts = ALERTS.filter(a => !dismissedAlerts.includes(a.id))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  if (visibleAlerts.length === 0) return null

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isHovered) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleAlerts.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isHovered, visibleAlerts.length])

  const currentAlert = visibleAlerts[currentIndex]

  const typeStyles = {
    critical: "bg-[var(--critical-bg)] border-[var(--critical-red)]/30 text-[var(--critical-red)]",
    warning: "bg-[var(--warning-bg)] border-[var(--warning-amber)]/30 text-[var(--warning-amber)]",
    info: "bg-[var(--bg-elevated)] border-[var(--important-blue)]/30 text-[var(--important-blue)]"
  }

  const iconColor = {
    critical: "text-[var(--critical-red)]",
    warning: "text-[var(--warning-amber)]",
    info: "text-[var(--important-blue)]"
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Alert Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAlert.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex items-center justify-between gap-3 px-4 py-3 rounded-lg border text-sm",
            typeStyles[currentAlert.type]
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <AlertTriangle className={cn("w-4 h-4 shrink-0", iconColor[currentAlert.type])} />
            <span className="truncate">{currentAlert.message}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-transparent opacity-60 hover:opacity-100 shrink-0"
            onClick={() => setDismissedAlerts([...dismissedAlerts, currentAlert.id])}
          >
            ×
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {visibleAlerts.length > 1 && (
        <div className="flex items-center justify-between mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + visibleAlerts.length) % visibleAlerts.length)}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-1">
            {visibleAlerts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  index === currentIndex 
                    ? "bg-[var(--accent-gold)] w-3" 
                    : "bg-[var(--border-soft)]"
                )}
                aria-label={`Alert ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % visibleAlerts.length)}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}
