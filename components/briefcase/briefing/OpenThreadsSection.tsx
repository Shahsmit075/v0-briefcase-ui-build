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
      borderColor: "border-l-[var(--critical-red)]",
      bgColor: "bg-[var(--critical-bg)]",
      labelColor: "text-[var(--critical-red)] bg-[var(--critical-red)]/20"
    },
    medium: {
      label: "MED",
      borderColor: "border-l-[var(--warning-amber)]",
      bgColor: "bg-[var(--warning-bg)]",
      labelColor: "text-[var(--warning-amber)] bg-[var(--warning-amber)]/20"
    },
    low: {
      label: "LOW",
      borderColor: "border-l-[var(--important-blue)]",
      bgColor: "bg-[var(--bg-elevated)]",
      labelColor: "text-[var(--important-blue)] bg-[var(--important-blue)]/20"
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
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
          OPEN THREADS
        </h2>
        <div className="bg-[var(--bg-elevated)] rounded-lg p-5 border border-[var(--border-subtle)] text-center">
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
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-5">
        OPEN THREADS
      </h2>
      <div className="space-y-3.5">
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
                <div className="bg-[var(--bg-card)] rounded-md p-3 ml-10 border border-[var(--border-subtle)]">
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
