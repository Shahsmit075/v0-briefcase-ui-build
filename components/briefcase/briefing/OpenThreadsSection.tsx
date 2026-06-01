"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { OpenThread } from "@/lib/mock-data"

interface OpenThreadsSectionProps {
  threads: OpenThread[]
}

export function OpenThreadsSection({ threads }: OpenThreadsSectionProps) {
  const urgencyConfig = {
    high: {
      label: "HIGH",
      borderColor: "border-l-red-500",
      bgColor: "bg-red-50",
      labelColor: "text-red-600 bg-red-100"
    },
    medium: {
      label: "MED",
      borderColor: "border-l-amber-500",
      bgColor: "bg-amber-50",
      labelColor: "text-amber-600 bg-amber-100"
    },
    low: {
      label: "LOW",
      borderColor: "border-l-blue-500",
      bgColor: "bg-blue-50",
      labelColor: "text-blue-600 bg-blue-100"
    }
  }

  if (threads.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
          OPEN THREADS
        </h2>
        <div className="bg-[var(--bg-primary)] rounded-lg p-5 border border-[var(--border-subtle)] text-center">
          <p className="text-sm text-[var(--text-muted)]">
            No open threads detected — this appears to be an informational meeting
          </p>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
        OPEN THREADS
      </h2>
      <div className="space-y-3">
        {threads.map((thread, index) => {
          const config = urgencyConfig[thread.urgency]
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className={cn(
                "rounded-lg border border-[var(--border-subtle)] overflow-hidden",
                config.bgColor
              )}
            >
              <div className={cn("border-l-4 p-4", config.borderColor)}>
                {/* Header */}
                <div className="flex items-start gap-3 mb-2">
                  <span className={cn(
                    "shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium",
                    config.labelColor
                  )}>
                    {config.label}
                  </span>
                  <h3 className="font-medium text-sm text-[var(--text-primary)] leading-tight">
                    {thread.subject}
                  </h3>
                </div>

                {/* Status */}
                <p className="text-sm text-[var(--text-secondary)] mb-3 ml-10">
                  {thread.status}
                </p>

                {/* Suggested Action */}
                <div className="bg-white rounded-md p-3 ml-10 border border-[var(--border-subtle)]">
                  <p className="text-sm text-[var(--text-primary)]">
                    <span className="text-[var(--accent-gold)] font-medium">→ </span>
                    {thread.suggestedAction}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
