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
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-gold)] mb-4">
        MEETING ASSESSMENT
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {/* Purpose Card */}
        <div className="bg-white rounded-lg border border-[var(--border-subtle)] p-4">
          <h3 className="text-xs font-medium uppercase text-[var(--text-muted)] mb-2">
            Purpose
          </h3>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">
            {assessment.whyMeeting}
          </p>
        </div>

        {/* Worth Having Card */}
        <div className={cn(
          "rounded-lg border p-4",
          assessment.worthHaving === "yes" 
            ? "bg-green-50 border-green-200" 
            : assessment.worthHaving === "no"
            ? "bg-red-50 border-red-200"
            : "bg-amber-50 border-amber-200"
        )}>
          <h3 className="text-xs font-medium uppercase text-[var(--text-muted)] mb-2">
            Worth Having?
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {assessment.worthHaving === "yes" ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : assessment.worthHaving === "no" ? (
              <X className="w-5 h-5 text-red-600" />
            ) : (
              <span className="text-amber-600 text-lg">?</span>
            )}
            <span className={cn(
              "font-semibold",
              assessment.worthHaving === "yes" && "text-green-700",
              assessment.worthHaving === "no" && "text-red-700",
              assessment.worthHaving === "maybe" && "text-amber-700"
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
          "rounded-lg border p-4",
          assessment.couldBeEmail === "no" 
            ? "bg-white border-[var(--border-subtle)]"
            : assessment.couldBeEmail === "likely"
            ? "bg-amber-50 border-amber-200"
            : "bg-gray-50 border-gray-200"
        )}>
          <h3 className="text-xs font-medium uppercase text-[var(--text-muted)] mb-2">
            Could Be An Email?
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {assessment.couldBeEmail === "no" ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Check className="w-5 h-5 text-amber-600" />
            )}
            <span className={cn(
              "font-semibold",
              assessment.couldBeEmail === "no" && "text-gray-700",
              assessment.couldBeEmail !== "no" && "text-amber-700"
            )}>
              {assessment.couldBeEmail === "no" ? "No" : assessment.couldBeEmail === "likely" ? "Likely" : "Possibly"}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {assessment.emailReason}
          </p>
        </div>

        {/* Duration Card */}
        <div className="bg-white rounded-lg border border-[var(--border-subtle)] p-4">
          <h3 className="text-xs font-medium uppercase text-[var(--text-muted)] mb-2">
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
                  ? "text-amber-600" 
                  : "text-[var(--text-primary)]"
              )}>
                {assessment.suggestedDuration} min
              </span>
            </div>
            <div className="pt-2 border-t border-[var(--border-subtle)] mt-2">
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
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800 font-medium">
            💰 {assessment.collectiveHoursAtStake} collective hours is a high cost for a status sync with no open decisions
          </p>
        </div>
      )}
    </motion.section>
  )
}
