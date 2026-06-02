"use client"

import { RefreshCw, Focus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CountdownTimer } from "../shared/CountdownTimer"
import { WarmthIndicator } from "../shared/WarmthIndicator"
import { cn } from "@/lib/utils"
import type { Meeting, ActiveBriefing } from "@/lib/mock-data"

interface BriefingHeaderProps {
  meeting: Meeting
  briefing: ActiveBriefing
  onRefresh: () => void
  onFocusMode: () => void
  isWasteful?: boolean
}

export function BriefingHeader({ meeting, briefing, onRefresh, onFocusMode, isWasteful }: BriefingHeaderProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  })

  return (
    <div className={cn(
      "border-l-4 pl-6 mb-8",
      isWasteful ? "border-l-amber-500" : "border-l-[var(--accent-gold)]"
    )}>
      {/* Wasteful Warning Banner */}
      {isWasteful && (
        <div className="bg-[var(--warning-bg)] border border-[var(--warning-amber)]/30 rounded-lg p-4 mb-6 flex items-center gap-2">
          <span>⚠️</span>
          <span className="text-sm text-[var(--warning-amber)]">
            This meeting appears to be a recurring status update with no active decisions
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Title */}
          <h1 className="font-sans text-2xl font-bold text-[var(--text-primary)] mb-2">
            {meeting.title}
          </h1>

          {/* Date & Time */}
          <p className="text-sm text-[var(--text-secondary)] font-mono mb-5">
            {currentDate} · {meeting.time} – {meeting.endTime} · {meeting.duration} minutes
          </p>

          {/* Attendees with warmth */}
          <div className="flex items-center gap-5">
            {briefing.people.map((person) => (
              <div key={person.email} className="flex items-center gap-2">
                <Avatar className={cn(
                  "h-10 w-10 border-2",
                  person.warmth === "warm" && "border-[var(--healthy-green)] ring-2 ring-[var(--healthy-green)]/30",
                  person.warmth === "cooling" && "border-[var(--warning-amber)] ring-2 ring-[var(--warning-amber)]/30",
                  person.warmth === "cold" && "border-[var(--critical-red)] ring-2 ring-[var(--critical-red)]/30"
                )}>
                  <AvatarFallback className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs font-medium">
                    {person.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {person.name.split(" ")[0]}
                  </p>
                  <WarmthIndicator warmth={person.warmth} lastContact={person.lastContact} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* Confidence Badge */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs cursor-help font-semibold",
                    briefing.confidence === "high" && "bg-[var(--healthy-bg)] text-[var(--healthy-green)] border-[var(--healthy-green)]/30",
                    briefing.confidence === "medium" && "bg-[var(--warning-bg)] text-[var(--warning-amber)] border-[var(--warning-amber)]/30",
                    briefing.confidence === "low" && "bg-[var(--critical-bg)] text-[var(--critical-red)] border-[var(--critical-red)]/30"
                  )}
                >
                  {briefing.confidence.toUpperCase()} CONFIDENCE
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">{briefing.confidenceReason}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Generated at */}
          <p className="text-xs text-[var(--text-muted)]">
            Generated at {briefing.generatedAt}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onFocusMode}
              className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <Focus className="w-4 h-4" />
            </Button>
          </div>

          {/* Countdown */}
          {meeting.status === "next" && meeting.minutesUntil && (
            <CountdownTimer minutes={meeting.minutesUntil} size="lg" className="mt-2" />
          )}
        </div>
      </div>
    </div>
  )
}
