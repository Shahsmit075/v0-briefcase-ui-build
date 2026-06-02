"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { TopNav } from "./dashboard/TopNav"
import { MetricsNavbar } from "./dashboard/MetricsNavbar"
import { AlertBanner } from "./dashboard/AlertBanner"
import { MeetingTimeline } from "./dashboard/MeetingTimeline"
import { MeetingSearch } from "./dashboard/MeetingSearch"
import { MeetingSuggestions } from "./dashboard/MeetingSuggestions"
import { BriefingPanel } from "./briefing/BriefingPanel"
import { FocusMode } from "./focus/FocusMode"
import { MOCK_MEETINGS, ACTIVE_BRIEFING, WASTEFUL_BRIEFING } from "@/lib/mock-data"
import type { ActiveBriefing } from "@/lib/mock-data"
import type { FilterState } from "./dashboard/MeetingSearch"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({})

  // Filter meetings based on search and filters
  const filteredMeetings = useMemo(() => {
    return MOCK_MEETINGS.filter(meeting => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = meeting.title.toLowerCase().includes(query)
        const matchesAttendee = meeting.attendees.some(a => a.name.toLowerCase().includes(query))
        if (!matchesTitle && !matchesAttendee) return false
      }

      // Importance filter
      if (filters.importance && meeting.importance !== filters.importance) {
        return false
      }

      // Status filter
      if (filters.status === "past" && !meeting.isPast) return false
      if (filters.status === "upcoming" && meeting.isPast) return false

      // Alerts filter
      if (filters.hasAlert && (!meeting.alerts || meeting.alerts.length === 0)) {
        return false
      }

      return true
    })
  }, [searchQuery, filters])

  const activeMeeting = filteredMeetings.find(m => m.id === activeMeetingId)
  
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

      const currentIndex = filteredMeetings.findIndex(m => m.id === activeMeetingId)

      switch (e.key.toLowerCase()) {
        case "j":
          // Next meeting
          if (currentIndex < filteredMeetings.length - 1) {
            setActiveMeetingId(filteredMeetings[currentIndex + 1].id)
          }
          break
        case "k":
          // Previous meeting
          if (currentIndex > 0) {
            setActiveMeetingId(filteredMeetings[currentIndex - 1].id)
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
  }, [activeMeetingId, filteredMeetings])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <TopNav focusMode={focusMode} setFocusMode={setFocusMode} />
      
      {/* Metrics Navbar */}
      <MetricsNavbar stats={{
        meetingsToday: filteredMeetings.filter(m => !m.isPast).length,
        criticalMeetings: filteredMeetings.filter(m => m.importance === "critical").length,
        lowValueMeetings: filteredMeetings.filter(m => m.importance === "optional").length,
        totalPrepTime: filteredMeetings.reduce((acc, m) => acc + (m.prepTime || 0), 0),
        weeklyMeetingLoad: [2, 3, 4, 5, 2, 1, 0],
        warmthCount: 4
      }} />

      <main className="flex gap-8 px-8 py-6 max-w-[1800px] mx-auto">
        {/* Left Panel - Timeline & Search */}
        <div className="w-[380px] shrink-0 space-y-5 overflow-y-auto h-[calc(100vh-280px)] scrollbar-thin pr-2">
          {/* Search & Filter */}
          <MeetingSearch 
            onSearch={setSearchQuery}
            onFilterChange={setFilters}
          />
          
          {/* Meeting Suggestions */}
          <MeetingSuggestions meetings={filteredMeetings.filter(m => !m.isPast)} />
          
          {/* Alerts */}
          <AlertBanner 
            dismissedAlerts={dismissedAlerts} 
            setDismissedAlerts={setDismissedAlerts} 
          />

          {/* Timeline */}
          <MeetingTimeline
            meetings={filteredMeetings}
            activeMeetingId={activeMeetingId}
            setActiveMeetingId={setActiveMeetingId}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            generatingBriefings={generatingBriefings}
            onGenerateBriefing={handleGenerateBriefing}
          />
        </div>

        {/* Right Panel - Briefing */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-280px)] scrollbar-thin pr-2">
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
