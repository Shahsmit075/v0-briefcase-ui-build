"use client"

import { Calendar } from "lucide-react"
import { MeetingCard } from "./MeetingCard"
import { DayPicker } from "./DayPicker"
import type { Meeting } from "@/lib/mock-data"

interface MeetingTimelineProps {
  meetings: Meeting[]
  activeMeetingId: string
  setActiveMeetingId: (id: string) => void
  selectedDay: number
  setSelectedDay: (day: number) => void
  generatingBriefings: string[]
  onGenerateBriefing: (id: string) => void
}

export function MeetingTimeline({
  meetings,
  activeMeetingId,
  setActiveMeetingId,
  selectedDay,
  setSelectedDay,
  generatingBriefings,
  onGenerateBriefing
}: MeetingTimelineProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  }).toUpperCase()

  // Only show meetings for Wednesday (today)
  const isToday = selectedDay === 2

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Today · {currentDate}
          </span>
        </div>
        <DayPicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </div>

      {/* Timeline */}
      {isToday ? (
        <div className="space-y-3.5">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              isActive={activeMeetingId === meeting.id}
              onClick={() => setActiveMeetingId(meeting.id)}
              isGenerating={generatingBriefings.includes(meeting.id)}
              onGenerate={() => onGenerateBriefing(meeting.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] border-dashed p-8 text-center">
          <div className="text-[var(--text-muted)] text-sm mb-4">
            No briefings generated yet for {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][selectedDay]}
          </div>
          <button className="text-[var(--accent-gold)] text-sm font-semibold hover:text-[var(--accent-gold-dim)] transition-colors">
            Generate briefs for {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][selectedDay]} →
          </button>
        </div>
      )}
    </div>
  )
}
