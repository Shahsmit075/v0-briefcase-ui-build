"use client"

import { useState, useEffect, useCallback } from "react"
import { TopNav } from "./dashboard/TopNav"
import { StatsGrid } from "./dashboard/StatsGrid"
import { AlertBanner } from "./dashboard/AlertBanner"
import { MeetingTimeline } from "./dashboard/MeetingTimeline"
import { BriefingPanel } from "./briefing/BriefingPanel"
import { FocusMode } from "./focus/FocusMode"
import { MOCK_MEETINGS, ACTIVE_BRIEFING, WASTEFUL_BRIEFING, RELATIONSHIP_HEALTH } from "@/lib/mock-data"
import type { ActiveBriefing } from "@/lib/mock-data"
import { Users } from "lucide-react"

export function Dashboard() {
  const [activeMeetingId, setActiveMeetingId] = useState("m3")
  const [focusMode, setFocusMode] = useState(false)
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])
  const [selectedDay, setSelectedDay] = useState(2) // Wednesday
  const [generatingBriefings, setGeneratingBriefings] = useState<string[]>([])
  const [generatedBriefings, setGeneratedBriefings] = useState<string[]>(["m1", "m2", "m3", "m4"])
  const [notes, setNotes] = useState<Record<string, string>>({})

  const activeMeeting = MOCK_MEETINGS.find(m => m.id === activeMeetingId)
  
  // Get the appropriate briefing based on the active meeting
  const getActiveBriefing = (): ActiveBriefing | null => {
    if (!activeMeeting) return null
    if (activeMeetingId === "m4") return WASTEFUL_BRIEFING
    if (generatedBriefings.includes(activeMeetingId)) {
      return { ...ACTIVE_BRIEFING, meetingId: activeMeetingId }
    }
    return null
  }

  const activeBriefing = getActiveBriefing()
  const isLoading = generatingBriefings.includes(activeMeetingId)

  const handleGenerateBriefing = useCallback((meetingId: string) => {
    setGeneratingBriefings(prev => [...prev, meetingId])
    
    // Simulate generation
    setTimeout(() => {
      setGeneratingBriefings(prev => prev.filter(id => id !== meetingId))
      setGeneratedBriefings(prev => [...prev, meetingId])
    }, 4000)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const currentIndex = MOCK_MEETINGS.findIndex(m => m.id === activeMeetingId)

      switch (e.key.toLowerCase()) {
        case "j":
          // Next meeting
          if (currentIndex < MOCK_MEETINGS.length - 1) {
            setActiveMeetingId(MOCK_MEETINGS[currentIndex + 1].id)
          }
          break
        case "k":
          // Previous meeting
          if (currentIndex > 0) {
            setActiveMeetingId(MOCK_MEETINGS[currentIndex - 1].id)
          }
          break
        case "f":
          // Toggle focus mode
          setFocusMode(prev => !prev)
          break
        case "r":
          // Refresh (just a visual indicator in demo)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [activeMeetingId])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <TopNav focusMode={focusMode} setFocusMode={setFocusMode} />

      <main className="max-w-[1800px] mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Left Panel - Timeline */}
          <div className="w-[400px] shrink-0 space-y-8 overflow-y-auto h-[calc(100vh-200px)] scrollbar-thin pr-3">
            <StatsGrid />
            
            <AlertBanner 
              dismissedAlerts={dismissedAlerts} 
              setDismissedAlerts={setDismissedAlerts} 
            />

            {/* Relationship Health Mini Card */}
            <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-[var(--accent-gold)]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Relationship Health
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--healthy-green)]" />
                  <span className="text-[var(--text-secondary)]">{RELATIONSHIP_HEALTH.warm} Warm</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--warning-amber)]" />
                  <span className="text-[var(--text-secondary)]">{RELATIONSHIP_HEALTH.cooling} Cooling</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--critical-red)]" />
                  <span className="text-[var(--text-secondary)]">{RELATIONSHIP_HEALTH.cold} Cold</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-xs text-[var(--text-muted)] mb-2">Overdue for outreach:</p>
                <p className="text-xs text-[var(--critical-red)]">
                  {RELATIONSHIP_HEALTH.coldContacts.join(", ")}
                </p>
              </div>
            </div>

            <MeetingTimeline
              meetings={MOCK_MEETINGS}
              activeMeetingId={activeMeetingId}
              setActiveMeetingId={setActiveMeetingId}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              generatingBriefings={generatingBriefings}
              onGenerateBriefing={handleGenerateBriefing}
            />
          </div>

          {/* Right Panel - Briefing */}
          <div className="flex-1 overflow-y-auto h-[calc(100vh-200px)] scrollbar-thin pr-3">
            {activeMeeting && (
              <BriefingPanel
                meeting={activeMeeting}
                briefing={activeBriefing}
                isLoading={isLoading}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                overrides={overrides}
                setOverrides={setOverrides}
                onFocusMode={() => setFocusMode(true)}
                notes={notes}
                setNotes={setNotes}
              />
            )}
          </div>
        </div>
      </main>

      {/* Focus Mode Overlay */}
      <FocusMode
        isOpen={focusMode}
        onClose={() => setFocusMode(false)}
        meeting={activeMeeting || null}
        briefing={activeBriefing}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
    </div>
  )
}
