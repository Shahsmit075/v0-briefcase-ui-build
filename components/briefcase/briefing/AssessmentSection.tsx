"use client"

import { motion } from "framer-motion"
import { Check, X, Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Assessment } from "@/lib/mock-data"

interface AssessmentSectionProps {
  assessment: Assessment
  isWasteful?: boolean
}

export function AssessmentSection({ assessment, isWasteful }: AssessmentSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-gold)] mb-5">
        MEETING ASSESSMENT
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Purpose Card */}
        <div className="bg-[var(--bg-elevated)] rounded-lg border border-[var(--border-subtle)] p-5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
            Purpose
          </h3>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">
            {assessment.whyMeeting}
          </p>
        </div>

        {/* Worth Having Card */}
        <div className={cn(
          "rounded-lg border p-5",
          assessment.worthHaving === "yes" 
            ? "bg-[var(--healthy-bg)] border-[var(--healthy-green)]/30" 
            : assessment.worthHaving === "no"
            ? "bg-[var(--critical-bg)] border-[var(--critical-red)]/30"
            : "bg-[var(--warning-bg)] border-[var(--warning-amber)]/30"
        )}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
            Worth Having?
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {assessment.worthHaving === "yes" ? (
              <Check className="w-5 h-5 text-[var(--healthy-green)]" />
            ) : assessment.worthHaving === "no" ? (
              <X className="w-5 h-5 text-[var(--critical-red)]" />
            ) : (
              <span className="text-[var(--warning-amber)] text-lg">?</span>
            )}
            <span className={cn(
              "font-semibold",
              assessment.worthHaving === "yes" && "text-[var(--healthy-green)]",
              assessment.worthHaving === "no" && "text-[var(--critical-red)]",
              assessment.worthHaving === "maybe" && "text-[var(--warning-amber)]"
            )}>
              {assessment.worthHaving === "yes" ? "Yes" : assessment.worthHaving === "no" ? "No" : "Maybe"}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {assessment.worthReason}
          </p>
        </div>

        {/* Could Be Email Card */}
        <div className={cn(
          "rounded-lg border p-5",
          assessment.couldBeEmail === "no" 
            ? "bg-[var(--bg-elevated)] border-[var(--border-subtle)]"
            : assessment.couldBeEmail === "likely"
            ? "bg-[var(--warning-bg)] border-[var(--warning-amber)]/30"
            : "bg-[var(--bg-elevated)] border-[var(--border-soft)]"
        )}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
            Could Be An Email?
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {assessment.couldBeEmail === "no" ? (
              <X className="w-5 h-5 text-[var(--text-muted)]" />
            ) : (
              <Check className="w-5 h-5 text-[var(--warning-amber)]" />
            )}
            <span className={cn(
              "font-semibold",
              assessment.couldBeEmail === "no" && "text-[var(--text-muted)]",
              assessment.couldBeEmail !== "no" && "text-[var(--warning-amber)]"
            )}>
              {assessment.couldBeEmail === "no" ? "No" : assessment.couldBeEmail === "likely" ? "Likely" : "Possibly"}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {assessment.emailReason}
          </p>
        </div>

        {/* Duration Card */}
        <div className="bg-[var(--bg-elevated)] rounded-lg border border-[var(--border-subtle)] p-5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
            Duration
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Scheduled:</span>
              <span className="font-mono text-sm text-[var(--text-primary)]">
                {assessment.scheduledDuration} min
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Suggested:</span>
              <span className={cn(
                "font-mono text-sm font-medium",
                assessment.suggestedDuration < assessment.scheduledDuration 
                  ? "text-[var(--warning-amber)]" 
                  : "text-[var(--text-primary)]"
              )}>
                {assessment.suggestedDuration} min
              </span>
            </div>
            <div className="pt-3 border-t border-[var(--border-subtle)] mt-3">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Users className="w-3.5 h-3.5" />
                <span>{assessment.attendeeCount} attendees</span>
                <span>·</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{assessment.collectiveHoursAtStake}hr collective</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wasteful Meeting Cost Callout */}
      {isWasteful && (
        <div className="mt-5 bg-[var(--warning-bg)] border border-[var(--warning-amber)]/30 rounded-lg p-4">
          <p className="text-sm text-[var(--warning-amber)] font-semibold">
            💰 {assessment.collectiveHoursAtStake} collective hours is a high cost for a status sync with no open decisions
          </p>
        </div>
      )}
    </motion.section>
  )
}
