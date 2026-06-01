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
    critical: "border-l-red-500",
    important: "border-l-blue-500",
    routine: "border-l-gray-400",
    optional: "border-l-gray-300"
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-[var(--border-subtle)] p-4 cursor-pointer transition-all duration-200 border-l-4 hover:translate-x-0.5 hover:bg-[var(--bg-card-hover)]",
        borderColor[meeting.importance],
        isActive && "ring-2 ring-[var(--accent-gold)] ring-offset-2",
        isPast && "opacity-60",
        isNext && "border-l-[var(--accent-gold)]"
      )}
      onClick={() => {
        console.log("[v0] MeetingCard clicked:", meeting.id, meeting.title)
        onClick()
      }}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <ImportanceBadge importance={meeting.importance} size="sm" />
          {isWasteful && <HealthBadge health="wasteful" size="sm" />}
        </div>
        {isNext && meeting.minutesUntil && (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 font-mono text-[10px] animate-pulse-gold">
            IN {meeting.minutesUntil} MIN
          </Badge>
        )}
        {isPast && (
          <Badge variant="outline" className="text-[10px] text-green-600 border-green-200">
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
      <div className="flex -space-x-2 mb-3">
        {meeting.attendees.slice(0, 4).map((attendee, i) => (
          <Avatar 
            key={i} 
            className={cn(
              "h-7 w-7 border-2 border-white",
              attendee.warmth === "warm" && "ring-1 ring-green-400",
              attendee.warmth === "cooling" && "ring-1 ring-amber-400",
              attendee.warmth === "cold" && "ring-1 ring-red-400"
            )}
          >
            <AvatarFallback className="text-[10px] bg-[var(--bg-primary)] text-[var(--text-secondary)]">
              {attendee.initials}
            </AvatarFallback>
          </Avatar>
        ))}
        {meeting.attendees.length > 4 && (
          <div className="h-7 w-7 rounded-full bg-[var(--bg-primary)] border-2 border-white flex items-center justify-center">
            <span className="text-[10px] text-[var(--text-secondary)]">
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
          "text-xs font-medium",
          meeting.worthMeeting === "yes" && "text-green-600",
          meeting.worthMeeting === "no" && "text-red-600",
          meeting.worthMeeting === "maybe" && "text-amber-600"
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
          className="w-full mt-2 text-xs h-8 gap-1.5 border-dashed"
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
        <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
          <CountdownTimer minutes={meeting.minutesUntil} size="md" />
        </div>
      )}
    </div>
  )
}
