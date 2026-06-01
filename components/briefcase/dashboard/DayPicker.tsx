"use client"

import { cn } from "@/lib/utils"

interface DayPickerProps {
  selectedDay: number
  setSelectedDay: (day: number) => void
}

export function DayPicker({ selectedDay, setSelectedDay }: DayPickerProps) {
  const days = [
    { label: "M", full: "Monday" },
    { label: "T", full: "Tuesday" },
    { label: "W", full: "Wednesday" },
    { label: "T", full: "Thursday" },
    { label: "F", full: "Friday" }
  ]

  return (
    <div className="flex gap-1">
      {days.map((day, i) => (
        <button
          key={i}
          onClick={() => setSelectedDay(i)}
          className={cn(
            "w-8 h-8 rounded-full text-sm font-medium transition-all",
            i === selectedDay
              ? "bg-[var(--accent-gold)] text-white"
              : "bg-white text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]"
          )}
          title={day.full}
        >
          {day.label}
        </button>
      ))}
    </div>
  )
}
