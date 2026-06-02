"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImportanceBadge } from "../shared/ImportanceBadge"
import { HealthBadge } from "../shared/HealthBadge"
import { CountdownTimer } from "../shared/CountdownTimer"
import { cn } from "@/lib/utils"
import { Check, Clock, MessageSquare, DollarSign, Sparkles } from "lucide-react"
import type { Meeting } from "@/lib/mock-data"

interface MeetingCardProps {
  meeting: Meeting
  isActive: boolean
  onClick: () => void
  isGenerating?: boolean
  onGenerate?: () => void
}

export function MeetingCard({ meeting, isActive, onClick, isGenerating, onGenerate }: MeetingCardProps) {
  const isPast = meeting.status === "past"
  const isNext = meeting.status === "next"
  const isWasteful = meeting.health === "wasteful"

  const borderColor = {
    critical: "border-l-[var(--critical-red)]",
    important: "border-l-[var(--important-blue)]",
    routine: "border-l-[var(--border-soft)]",
    optional: "border-l-[var(--text-muted)]"
  }

  return (
    <div
      className={cn(
        "bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] p-5 cursor-pointer transition-all duration-200 border-l-4 hover:bg-[var(--bg-card-hover)]",
        borderColor[meeting.importance],
        isActive && "ring-2 ring-[var(--accent-gold)] ring-offset-2 ring-offset-[var(--bg-primary)]",
        isPast && "opacity-50",
        isNext && "border-l-[var(--accent-gold)]"
      )}
      onClick={onClick}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <ImportanceBadge importance={meeting.importance} size="sm" />
          {isWasteful && <HealthBadge health="wasteful" size="sm" />}
        </div>
        {isNext && meeting.minutesUntil && (
          <Badge className="bg-[var(--warning-bg)] text-[var(--warning-amber)] border-[var(--warning-amber)]/30 font-mono text-[10px] animate-pulse-gold">
            IN {meeting.minutesUntil} MIN
          </Badge>
        )}
        {isPast && (
          <Badge variant="outline" className="text-[10px] text-[var(--healthy-green)] border-[var(--healthy-green)]/30">
            <Check className="w-3 h-3 mr-1" />
            Done
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className={cn(
        "font-medium text-[var(--text-primary)] mb-1",
        isNext ? "text-base" : "text-sm"
      )}>
        {meeting.title}
      </h3>

      {/* Time & Duration */}
      <p className="text-xs text-[var(--text-secondary)] mb-3 font-mono">
        {meeting.time} · {meeting.duration} min · {meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? "s" : ""}
      </p>

      {/* Avatars */}
      <div className="flex -space-x-2 mb-4">
        {meeting.attendees.slice(0, 4).map((attendee, i) => (
          <Avatar 
            key={i} 
            className={cn(
              "h-8 w-8 border-2",
              attendee.warmth === "warm" && "border-[var(--healthy-green)] ring-1 ring-[var(--healthy-green)]/40",
              attendee.warmth === "cooling" && "border-[var(--warning-amber)] ring-1 ring-[var(--warning-amber)]/40",
              attendee.warmth === "cold" && "border-[var(--critical-red)] ring-1 ring-[var(--critical-red)]/40",
              !attendee.warmth && "border-[var(--border-soft)]"
            )}
          >
            <AvatarFallback className="text-[10px] bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-medium">
              {attendee.initials}
            </AvatarFallback>
          </Avatar>
        ))}
        {meeting.attendees.length > 4 && (
          <div className="h-8 w-8 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--border-soft)] flex items-center justify-center">
            <span className="text-[10px] text-[var(--text-secondary)] font-medium">
              +{meeting.attendees.length - 4}
            </span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      {!isPast && (
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {meeting.prepTime} min prep
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {meeting.openThreads} threads
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {meeting.meetingCost}
          </span>
        </div>
      )}

      {/* Worth Meeting Status */}
      {!isPast && meeting.briefingReady && (
        <div className={cn(
          "text-xs font-semibold",
          meeting.worthMeeting === "yes" && "text-[var(--healthy-green)]",
          meeting.worthMeeting === "no" && "text-[var(--critical-red)]",
          meeting.worthMeeting === "maybe" && "text-[var(--warning-amber)]"
        )}>
          {meeting.worthMeeting === "yes" && "✓ Worth Meeting"}
          {meeting.worthMeeting === "no" && (
            <span className="flex items-center gap-1">
              <span>Could be an email</span>
            </span>
          )}
          {meeting.worthMeeting === "maybe" && "? Worth reviewing"}
        </div>
      )}

      {/* Generate Brief Button */}
      {!meeting.briefingReady && !isPast && (
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-3 text-xs h-8 gap-1.5 border-dashed border-[var(--border-soft)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
          onClick={(e) => {
            e.stopPropagation()
            onGenerate?.()
          }}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-3 h-3 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3" />
              Generate Brief →
            </>
          )}
        </Button>
      )}

      {/* Next Meeting Countdown */}
      {isNext && meeting.minutesUntil && (
        <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
          <CountdownTimer minutes={meeting.minutesUntil} size="md" />
        </div>
      )}
    </div>
  )
}
