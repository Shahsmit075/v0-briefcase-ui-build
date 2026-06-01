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
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-center gap-2">
          <span className="text-amber-600">⚠️</span>
          <span className="text-sm text-amber-700">
            This meeting appears to be a recurring status update with no active decisions
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Title */}
          <h1 className="font-serif text-2xl font-semibold text-[var(--text-primary)] mb-1">
            {meeting.title}
          </h1>

          {/* Date & Time */}
          <p className="text-sm text-[var(--text-secondary)] font-mono mb-4">
            {currentDate} · {meeting.time} – {meeting.endTime} · {meeting.duration} minutes
          </p>

          {/* Attendees with warmth */}
          <div className="flex items-center gap-4">
            {briefing.people.map((person) => (
              <div key={person.email} className="flex items-center gap-2">
                <Avatar className={cn(
                  "h-9 w-9 border-2 border-white",
                  person.warmth === "warm" && "ring-2 ring-green-400",
                  person.warmth === "cooling" && "ring-2 ring-amber-400",
                  person.warmth === "cold" && "ring-2 ring-red-400"
                )}>
                  <AvatarFallback className="bg-[var(--bg-primary)] text-[var(--text-secondary)] text-xs">
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
                    "text-xs cursor-help",
                    briefing.confidence === "high" && "bg-green-50 text-green-600 border-green-200",
                    briefing.confidence === "medium" && "bg-amber-50 text-amber-600 border-amber-200",
                    briefing.confidence === "low" && "bg-gray-50 text-gray-500 border-gray-200"
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
