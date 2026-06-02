"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { WarmthIndicator } from "../shared/WarmthIndicator"
import { cn } from "@/lib/utils"
import type { PersonDetail } from "@/lib/mock-data"

interface PeopleSectionProps {
  people: PersonDetail[]
}

export function PeopleSection({ people }: PeopleSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-5">
        THE PEOPLE
      </h2>
      <div className="space-y-5">
        {people.map((person, index) => (
          <motion.div
            key={person.email}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-[var(--bg-elevated)] rounded-lg p-5 border border-[var(--border-subtle)]"
          >
            {/* Person Header */}
            <div className="flex items-start gap-4 mb-4">
              <Avatar className={cn(
                "h-12 w-12 border-2",
                person.warmth === "warm" && "border-[var(--healthy-green)] ring-2 ring-[var(--healthy-green)]/30",
                person.warmth === "cooling" && "border-[var(--warning-amber)] ring-2 ring-[var(--warning-amber)]/30",
                person.warmth === "cold" && "border-[var(--critical-red)] ring-2 ring-[var(--critical-red)]/30",
                !person.warmth && "border-[var(--border-soft)]"
              )}>
                <AvatarFallback className="bg-[var(--bg-card)] text-[var(--text-secondary)] text-sm font-medium">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[var(--text-primary)]">{person.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{person.email}</p>
                  </div>
                  <WarmthIndicator warmth={person.warmth} lastContact={person.lastContact} />
                </div>
              </div>
            </div>

            {/* Context */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Context
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {person.context}
              </p>
            </div>

            {/* Tone Hint */}
            <div className="mb-4 bg-[var(--bg-card)] rounded-md p-4 border border-[var(--border-subtle)]">
              <h4 className="text-xs font-semibold text-[var(--accent-gold)] uppercase tracking-widest mb-2">
                Tone Hint
              </h4>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                {person.toneHint}
              </p>
            </div>

            {/* Previous Meetings Timeline */}
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                Previous Meetings ({person.previousMeetings})
              </h4>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {person.interactionHistory.map((meeting, i) => (
                  <span
                    key={i}
                    className="shrink-0 px-3 py-1.5 bg-[var(--bg-card)] rounded text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                  >
                    {meeting}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
