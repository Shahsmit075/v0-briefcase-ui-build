"use client"

import { useState } from "react"
import { Calendar, AlertTriangle, Clock, Users, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { DashboardStats } from "@/lib/mock-data"

interface MetricsNavbarProps {
  stats: DashboardStats
}

export function MetricsNavbar({ stats }: MetricsNavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const days = ["M", "T", "W", "Th", "F"]
  const today = 2 // Wednesday

  return (
    <TooltipProvider>
      <motion.div 
        className="sticky top-[88px] z-40 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] px-8 py-4"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="max-w-[1800px] mx-auto">
          {/* Collapsed View */}
          <motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 0 : 1, height: isExpanded ? 0 : "auto" }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Meeting Metrics
              </span>
              <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
            </div>
          </motion.div>

          {/* Expanded View */}
          <motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-5 gap-3 py-2">
          {/* Meetings Today */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)] cursor-help hover:border-[var(--accent-gold)]/50 transition-colors">
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
            </TooltipTrigger>
            <TooltipContent>
              <p>All meetings scheduled for today</p>
            </TooltipContent>
          </Tooltip>

          {/* Critical / Low Value - Merged Card */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)] cursor-help hover:border-[var(--accent-gold)]/50 transition-colors col-span-2">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-[var(--critical-red)] mt-0.5" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] flex-1">
                    Priority Meetings
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Critical */}
                  <div>
                    <div className="font-mono text-2xl font-semibold text-[var(--critical-red)] mb-1">
                      {stats.criticalMeetings}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Critical
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Require prep
                    </p>
                  </div>

                  {/* Separator */}
                  <div className="flex flex-col items-center justify-start pt-1">
                    <span className="text-xl text-[var(--border-soft)]">/</span>
                  </div>

                  {/* Low Value */}
                  <div>
                    <div className="font-mono text-2xl font-semibold text-[var(--warning-amber)] mb-1">
                      {stats.lowValueMeetings}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Low Value
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Can skip
                    </p>
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Critical: Require immediate prep</p>
              <p>Low Value: Optional or skippable</p>
            </TooltipContent>
          </Tooltip>

          {/* Prep Time Needed with Pie Chart */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)] cursor-help hover:border-[var(--accent-gold)]/50 transition-colors flex flex-col items-center justify-center min-h-[120px]">
                <div className="flex items-center gap-2 mb-2 w-full justify-center">
                  <Clock className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                    Prep Time
                  </span>
                </div>
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-soft)" strokeWidth="8" />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="none" 
                      stroke="var(--accent-gold)" 
                      strokeWidth="8"
                      strokeDasharray={`${(stats.totalPrepTime / 120) * 314} 314`}
                      strokeLinecap="round"
                      style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-[var(--accent-gold)]">{stats.totalPrepTime}</span>
                    <span className="text-xs text-[var(--text-muted)]">min</span>
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total preparation time needed</p>
              <p className="text-xs opacity-80">Across all meetings today</p>
            </TooltipContent>
          </Tooltip>

          {/* Relationship Health */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border-subtle)] cursor-help hover:border-[var(--accent-gold)]/50 transition-colors">
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
                  strong relationships
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Contacts with warm relationships</p>
              <p className="text-xs opacity-80">Ready for engagement</p>
            </TooltipContent>
          </Tooltip>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}
