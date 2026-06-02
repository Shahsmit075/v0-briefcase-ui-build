"use client"

import { motion } from "framer-motion"

interface SituationSectionProps {
  situation: string
}

export function SituationSection({ situation }: SituationSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
        THE SITUATION
      </h2>
      <div className="border-l-3 border-[var(--accent-gold)] pl-6">
        <p className="text-[var(--text-primary)] leading-relaxed text-sm">
          {situation}
        </p>
      </div>
    </motion.section>
  )
}
