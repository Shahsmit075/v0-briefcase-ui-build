"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LOADING_MESSAGES = [
  "Reading your calendar...",
  "Scanning email history...",
  "Identifying open threads...",
  "Drafting your briefing..."
]

interface LoadingBriefingProps {
  personName?: string
}

export function LoadingBriefing({ personName }: LoadingBriefingProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  const currentMessage = personName && messageIndex === 1 
    ? `Scanning email history with ${personName}...`
    : LOADING_MESSAGES[messageIndex]

  return (
    <div className="bg-white rounded-xl border border-[var(--border-subtle)] p-8">
      {/* Shimmer header */}
      <div className="space-y-4 mb-8">
        <div className="h-8 w-2/3 animate-shimmer rounded" />
        <div className="h-4 w-1/3 animate-shimmer rounded" />
      </div>

      {/* Loading message */}
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[var(--accent-gold)] rounded-full"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[var(--text-secondary)] text-sm"
            >
              {currentMessage}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Shimmer sections */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-32 animate-shimmer rounded" />
            <div className="h-20 w-full animate-shimmer rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
