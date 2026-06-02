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
    <div className="grid grid-cols-2 gap-4">
      {/* Meetings Today */}
      <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] p-5 transition-colors hover:bg-[var(--bg-card-hover)]">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Meetings Today
          </span>
        </div>
        <div className="font-mono text-3xl font-semibold text-[var(--accent-gold)] mb-4">
          {stats.meetingsToday}
        </div>
        {/* Week heatmap */}
        <div className="flex gap-2 items-end h-8">
          {stats.weeklyMeetingLoad.map((load, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-sm transition-all",
                i === today 
                  ? "bg-[var(--accent-gold)]" 
                  : "bg-[var(--border-soft)] hover:bg-[var(--border-soft)]/80"
              )}
              style={{ height: `${(load / 8) * 100}%` }}
              title={`${days[i]}: ${load} meetings`}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {days.map((day, i) => (
            <span 
              key={day + i} 
              className={cn(
                "flex-1 text-center text-[10px] font-semibold",
                i === today ? "text-[var(--accent-gold)]" : "text-[var(--text-muted)]"
              )}
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Critical Meetings */}
      <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] p-5 transition-colors hover:bg-[var(--bg-card-hover)]">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-[var(--critical-red)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Critical
          </span>
        </div>
        <div className="font-mono text-3xl font-semibold text-[var(--critical-red)] mb-2">
          {stats.criticalMeetings}
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          Require preparation now
        </p>
      </div>

      {/* Low Value Meetings */}
      <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] p-5 transition-colors hover:bg-[var(--bg-card-hover)]">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[var(--warning-amber)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Low Value
          </span>
        </div>
        <div className="font-mono text-3xl font-semibold text-[var(--warning-amber)] mb-2">
          {stats.lowValueMeetings}
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          May be skippable
        </p>
      </div>

      {/* Prep Time */}
      <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] p-5 transition-colors hover:bg-[var(--bg-card-hover)]">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Prep Time Needed
          </span>
        </div>
        <div className="font-mono text-3xl font-semibold text-[var(--text-primary)] mb-3">
          {stats.totalPrepTime}<span className="text-lg text-[var(--text-secondary)]">min</span>
        </div>
        <Progress value={70} className="h-2 bg-[var(--border-soft)]" />
        <p className="text-xs text-[var(--text-secondary)] mt-2">
          Across 4 meetings
        </p>
      </div>
    </div>
  )
}
