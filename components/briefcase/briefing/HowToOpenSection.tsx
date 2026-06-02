"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface HowToOpenSectionProps {
  opener: string
  emailThreadsFound: number
}

export function HowToOpenSection({ opener, emailThreadsFound }: HowToOpenSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-5">
        HOW TO OPEN
      </h2>
      <div className="bg-[var(--bg-elevated)] rounded-lg p-6 border border-[var(--border-subtle)] relative">
        <Quote className="w-6 h-6 text-[var(--accent-gold)]/20 absolute top-4 left-4" />
        <blockquote className="text-lg text-[var(--text-primary)] leading-relaxed italic pl-8 pr-4">
          &quot;{opener}&quot;
        </blockquote>
        <p className="text-xs text-[var(--text-muted)] mt-4 pl-8">
          — Suggested by Briefcase based on {emailThreadsFound} email thread{emailThreadsFound !== 1 ? "s" : ""}
        </p>
      </div>
    </motion.section>
  )
}
