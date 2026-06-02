"use client"

import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface QuickNotesProps {
  meetingId: string
  notes: Record<string, string>
  setNotes: (notes: Record<string, string>) => void
}

export function QuickNotes({ meetingId, notes, setNotes }: QuickNotesProps) {
  const currentNotes = notes[meetingId] || ""
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (text: string) => {
    setNotes({
      ...notes,
      [meetingId]: text
    })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4 text-[var(--accent-gold)]" />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          Quick Notes
        </h2>
        {currentNotes && (
          <span className="ml-auto text-xs text-[var(--text-muted)]">
            {currentNotes.length} chars
          </span>
        )}
      </div>
      <Textarea
        placeholder="Jot down quick thoughts, questions, or talking points..."
        value={currentNotes}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`min-h-24 bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none transition-all ${
          isFocused ? "ring-2 ring-[var(--accent-gold)]/50 border-[var(--accent-gold)]/50" : ""
        }`}
      />
      <p className="text-xs text-[var(--text-muted)] mt-2">
        These notes are saved locally and not synced
      </p>
    </motion.section>
  )
}
