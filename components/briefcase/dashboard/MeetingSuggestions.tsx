"use client"

import { AlertTriangle, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Meeting } from "@/lib/mock-data"

interface MeetingSuggestionsProps {
  meetings: Meeting[]
}

export function MeetingSuggestions({ meetings }: MeetingSuggestionsProps) {
  // Find back-to-back meetings
  const findBackToBack = () => {
    const suggestions = []
    
    for (let i = 0; i < meetings.length - 1; i++) {
      const current = meetings[i]
      const next = meetings[i + 1]
      
      // Simple check: if end time is close to next start time
      const currentEndMin = parseInt(current.endTime.split(":")[0]) * 60 + parseInt(current.endTime.split(":")[1])
      const nextStartMin = parseInt(next.time.split(":")[0]) * 60 + parseInt(next.time.split(":")[1])
      
      if (nextStartMin - currentEndMin < 15) {
        suggestions.push({
          type: "back-to-back" as const,
          meetings: [current, next],
          message: `Back-to-back meetings detected: ${current.title} → ${next.title}`,
          suggestion: `Consider moving ${next.title} to later in the afternoon`
        })
      }
    }
    
    return suggestions
  }

  const suggestions = findBackToBack()

  if (suggestions.length === 0) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-4 text-center">
        <p className="text-xs text-[var(--text-muted)]">
          <TrendingUp className="w-4 h-4 inline mr-2" />
          No scheduling issues detected
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          className="bg-[var(--warning-bg)] border border-[var(--warning-amber)]/30 rounded-lg p-4"
        >
          <div className="flex items-start gap-3 mb-2">
            <AlertTriangle className="w-4 h-4 text-[var(--warning-amber)] mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--warning-amber)] mb-1">
                {suggestion.message}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {suggestion.suggestion}
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              className="h-7 text-xs gap-1 bg-[var(--warning-amber)] text-[var(--bg-primary)] hover:bg-[var(--warning-amber)]/90"
            >
              <Clock className="w-3 h-3" />
              Suggest Time
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
