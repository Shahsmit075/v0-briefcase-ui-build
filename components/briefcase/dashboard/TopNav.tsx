"use client"

import { Briefcase, Focus, HelpCircle, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MOCK_USER } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TopNavProps {
  focusMode: boolean
  setFocusMode: (value: boolean) => void
}

export function TopNav({ focusMode, setFocusMode }: TopNavProps) {
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [dateTime, setDateTime] = useState({ date: "", time: "" })

  useEffect(() => {
    setMounted(true)
    const updateDateTime = () => {
      setDateTime({
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })
      })
    }
    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Demo Banner */}
      <div className="bg-[var(--accent-gold)]/10 border-b border-[var(--accent-gold)]/20 px-6 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between text-sm">
          <span className="text-[var(--accent-gold)]">
            You&apos;re viewing demo data · Connect Google to see your real meetings
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[var(--accent-gold)] hover:text-[var(--accent-gold-dim)] hover:bg-[var(--accent-gold)]/10 h-7 text-xs"
          >
            Connect →
          </Button>
        </div>
      </div>

      {/* Main Nav */}
      <header className="bg-[var(--bg-card)] border-b border-[var(--border-subtle)] px-8 py-4 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--accent-gold)] rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-[var(--bg-primary)]" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-[var(--text-primary)]">
              BRIEFCASE
            </span>
            <Badge variant="outline" className="ml-2 text-[10px] font-mono text-[var(--accent-gold)] border-[var(--accent-gold)]/30">
              DEMO MODE
            </Badge>
          </div>

          {/* Center - Date/Time */}
          <div className="font-mono text-sm text-[var(--text-muted)]">
            {mounted ? `${dateTime.date} · ${dateTime.time}` : "Loading..."}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Keyboard shortcuts */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    onClick={() => setShowShortcuts(!showShortcuts)}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Keyboard shortcuts</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Focus Mode Toggle */}
            <Button
              variant={focusMode ? "default" : "outline"}
              size="sm"
              onClick={() => setFocusMode(!focusMode)}
              className={cn(
                "gap-2 h-8",
                focusMode 
                  ? "bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-dim)] text-white" 
                  : "border-[var(--border-soft)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"
              )}
            >
              <Focus className="w-3.5 h-3.5" />
              Focus Mode
            </Button>

            {/* User Avatar */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-[var(--text-primary)]">
                <AvatarFallback className="bg-[var(--text-primary)] text-white text-xs font-medium">
                  {MOCK_USER.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-[var(--text-primary)] hidden sm:block">
                {MOCK_USER.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && (
        <div className="fixed top-20 right-6 z-50 bg-white rounded-lg shadow-xl border border-[var(--border-subtle)] p-4 w-64">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-sm text-[var(--text-primary)]">Keyboard Shortcuts</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setShowShortcuts(false)}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { key: "J / K", desc: "Navigate meetings" },
              { key: "R", desc: "Refresh brief" },
              { key: "F", desc: "Toggle focus mode" },
              { key: "Space", desc: "Check prep item" },
              { key: "Esc", desc: "Exit focus mode" },
            ].map(({ key, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">{desc}</span>
                <kbd className="px-2 py-0.5 bg-[var(--bg-primary)] rounded text-xs font-mono text-[var(--text-muted)]">
                  {key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
