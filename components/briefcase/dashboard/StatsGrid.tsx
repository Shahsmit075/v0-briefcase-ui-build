"use client"

import { AlertTriangle, Clock, Calendar, Zap } from "lucide-react"
import { DASHBOARD_STATS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

export function StatsGrid() {
  const stats = DASHBOARD_STATS
  const days = ["M", "T", "W", "T", "F"]
  const today = 2 // Wednesday

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Meetings Today */}
      <div className="bg-white rounded-lg border border-[var(--border-subtle)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
            Meetings Today
          </span>
        </div>
        <div className="font-mono text-3xl font-semibold text-[var(--text-primary)] mb-3">
          {stats.meetingsToday}
        </div>
        {/* Week heatmap */}
        <div className="flex gap-1.5 items-end h-6">
          {stats.weeklyMeetingLoad.map((load, i) => (
            <div
              key={i}
              className={cn(
                "w-4 rounded-sm transition-all",
                i === today 
                  ? "bg-[var(--accent-gold)]" 
                  : "bg-[var(--border-soft)]"
              )}
              style={{ height: `${(load / 8) * 100}%` }}
              title={`${days[i]}: ${load} meetings`}
            />
          ))}
        </div>
        <div className="flex gap-1.5 mt-1">
          {days.map((day, i) => (
            <span 
              key={day + i} 
              className={cn(
                "w-4 text-center text-[10px] font-mono",
                i === today ? "text-[var(--accent-gold)] font-medium" : "text-[var(--text-muted)]"
              )}
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Critical Meetings */}
      <div className="bg-white rounded-lg border border-[var(--border-subtle)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
            Critical
          </span>
        </div>
        <div className="font-mono text-3xl font-semibold text-red-600 mb-1">
          {stats.criticalMeetings}
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          Require preparation now
        </p>
      </div>

      {/* Low Value Meetings */}
      <div className="bg-white rounded-lg border border-[var(--border-subtle)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
            Low Value
          </span>
        </div>
        <div className="font-mono text-3xl font-semibold text-amber-600 mb-1">
          {stats.lowValueMeetings}
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          May be skippable
        </p>
      </div>

      {/* Prep Time */}
      <div className="bg-white rounded-lg border border-[var(--border-subtle)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
            Prep Time Needed
          </span>
        </div>
        <div className="font-mono text-3xl font-semibold text-[var(--text-primary)] mb-2">
          {stats.totalPrepTime}<span className="text-lg text-[var(--text-secondary)]">min</span>
        </div>
        <Progress value={70} className="h-1.5 bg-[var(--border-subtle)]" />
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Across 4 meetings
        </p>
      </div>
    </div>
  )
}
