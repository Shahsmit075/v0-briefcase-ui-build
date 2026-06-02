"use client"

import { Calendar, AlertTriangle, Zap, Clock, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { DashboardStats } from "@/lib/mock-data"

interface MetricsNavbarProps {
  stats: DashboardStats
}

export function MetricsNavbar({ stats }: MetricsNavbarProps) {
  const days = ["M", "T", "W", "Th", "F"]
  const today = 2 // Wednesday

  return (
    <div className="sticky top-[88px] z-40 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] px-8 py-4">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-5 gap-4">
          {/* Meetings Today */}
          <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Today
              </span>
            </div>
            <div className="font-mono text-2xl font-semibold text-[var(--accent-gold)] mb-3">
              {stats.meetingsToday}
            </div>
            <div className="flex gap-1 items-end h-6">
              {stats.weeklyMeetingLoad.map((load, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-all ${
                    i === today 
                      ? "bg-[var(--accent-gold)]" 
                      : "bg-[var(--border-soft)]"
                  }`}
                  style={{ height: `${(load / 8) * 100}%` }}
                  title={`${days[i]}: ${load} meetings`}
                />
              ))}
            </div>
          </div>

          {/* Critical Meetings */}
          <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[var(--critical-red)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Critical
              </span>
            </div>
            <div className="font-mono text-2xl font-semibold text-[var(--critical-red)]">
              {stats.criticalMeetings}
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Require prep
            </p>
          </div>

          {/* Low Value Meetings */}
          <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[var(--warning-amber)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Low Value
              </span>
            </div>
            <div className="font-mono text-2xl font-semibold text-[var(--warning-amber)]">
              {stats.lowValueMeetings}
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              May be skippable
            </p>
          </div>

          {/* Prep Time Needed */}
          <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Prep Time
              </span>
            </div>
            <div className="font-mono text-2xl font-semibold text-[var(--text-primary)] mb-2">
              {stats.totalPrepTime}
              <span className="text-sm text-[var(--text-secondary)]">m</span>
            </div>
            <Progress value={70} className="h-1.5 bg-[var(--border-soft)]" />
          </div>

          {/* Relationship Health */}
          <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[var(--accent-gold)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Warmth
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--healthy-green)]" />
                <span className="text-[var(--text-secondary)]">{stats.warmthCount || 4}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              relationships strong
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
