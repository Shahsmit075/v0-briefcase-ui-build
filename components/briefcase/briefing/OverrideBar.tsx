"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useState } from "react"

interface OverrideBarProps {
  meetingId: string
  currentOverride?: string
  onOverride: (override: string) => void
  importance: "critical" | "important" | "routine" | "optional"
  health: "healthy" | "unclear" | "wasteful"
  worthMeeting: "yes" | "no" | "maybe"
}

export function OverrideBar({ 
  meetingId, 
  currentOverride, 
  onOverride,
  importance,
  health,
  worthMeeting
}: OverrideBarProps) {
  const [showToast, setShowToast] = useState(false)

  const handleOverride = (override: string) => {
    onOverride(override)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mb-8"
    >
      <div className="bg-[var(--bg-primary)] rounded-lg border border-[var(--border-subtle)] p-4">
        {/* AI Assessment */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide">
            AI Assessment:
          </span>
          <Badge variant="outline" className={cn(
            "text-[10px]",
            importance === "critical" && "text-red-600 border-red-200",
            importance === "important" && "text-blue-600 border-blue-200",
            importance === "routine" && "text-gray-600 border-gray-200",
            importance === "optional" && "text-gray-500 border-gray-200"
          )}>
            {importance.toUpperCase()}
          </Badge>
          <Badge variant="outline" className={cn(
            "text-[10px]",
            health === "healthy" && "text-green-600 border-green-200",
            health === "unclear" && "text-amber-600 border-amber-200",
            health === "wasteful" && "text-red-600 border-red-200"
          )}>
            {health.toUpperCase()}
          </Badge>
          <Badge variant="outline" className={cn(
            "text-[10px]",
            worthMeeting === "yes" && "text-green-600 border-green-200",
            worthMeeting === "no" && "text-red-600 border-red-200",
            worthMeeting === "maybe" && "text-amber-600 border-amber-200"
          )}>
            {worthMeeting === "yes" ? "WORTH ATTENDING" : worthMeeting === "no" ? "MAY SKIP" : "REVIEW"}
          </Badge>
        </div>

        {/* User Override */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide">
            User Override:
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "text-xs h-7",
                currentOverride === "optional" && "bg-amber-50 border-amber-300 text-amber-700"
              )}
              onClick={() => handleOverride("optional")}
            >
              Mark as Optional
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "text-xs h-7",
                currentOverride === "wasteful" && "bg-red-50 border-red-300 text-red-700"
              )}
              onClick={() => handleOverride("wasteful")}
            >
              Mark as Wasteful
            </Button>
            {currentOverride && (
              <Badge variant="outline" className="text-[10px] text-green-600 border-green-200 gap-1">
                <Check className="w-3 h-3" />
                Override saved
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[var(--text-primary)] text-white px-4 py-3 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm">Override saved · AI assessment updated</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
