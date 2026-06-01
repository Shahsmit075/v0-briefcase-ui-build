"use client"

import { BriefingHeader } from "./BriefingHeader"
import { SituationSection } from "./SituationSection"
import { PeopleSection } from "./PeopleSection"
import { OpenThreadsSection } from "./OpenThreadsSection"
import { HowToOpenSection } from "./HowToOpenSection"
import { AssessmentSection } from "./AssessmentSection"
import { PrepChecklist } from "./PrepChecklist"
import { OverrideBar } from "./OverrideBar"
import { BriefingFooter } from "./BriefingFooter"
import { LoadingBriefing } from "../shared/LoadingBriefing"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import type { Meeting, ActiveBriefing } from "@/lib/mock-data"

interface BriefingPanelProps {
  meeting: Meeting
  briefing: ActiveBriefing | null
  isLoading: boolean
  checkedItems: Record<string, boolean>
  setCheckedItems: (items: Record<string, boolean>) => void
  overrides: Record<string, string>
  setOverrides: (overrides: Record<string, string>) => void
  onFocusMode: () => void
}

export function BriefingPanel({
  meeting,
  briefing,
  isLoading,
  checkedItems,
  setCheckedItems,
  overrides,
  setOverrides,
  onFocusMode
}: BriefingPanelProps) {
  const isWasteful = meeting.health === "wasteful"
  const isPast = meeting.status === "past"

  if (isLoading || !briefing) {
    return <LoadingBriefing personName={meeting.attendees[0]?.name} />
  }

  const handleOverride = (override: string) => {
    setOverrides({
      ...overrides,
      [meeting.id]: override
    })
  }

  return (
    <div className="bg-white rounded-xl border border-[var(--border-subtle)] p-8 shadow-sm">
      {/* Past Meeting Banner */}
      {isPast && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6 text-sm text-gray-600">
          This meeting ended at {meeting.endTime}
        </div>
      )}

      {/* Header */}
      <BriefingHeader
        meeting={meeting}
        briefing={briefing}
        onRefresh={() => {}}
        onFocusMode={onFocusMode}
        isWasteful={isWasteful}
      />

      {/* Wasteful Meeting Actions */}
      {isWasteful && (
        <div className="mb-8 flex gap-3">
          <Button
            variant="outline"
            className="gap-2 text-amber-600 border-amber-300 hover:bg-amber-50"
          >
            <Mail className="w-4 h-4" />
            Decline & Send Summary Instead
          </Button>
        </div>
      )}

      {/* The Situation */}
      <SituationSection situation={briefing.situation} />

      {/* The People */}
      <PeopleSection people={briefing.people} />

      {/* Open Threads */}
      <OpenThreadsSection threads={briefing.openThreads} />

      {/* How to Open */}
      <HowToOpenSection 
        opener={briefing.suggestedOpener} 
        emailThreadsFound={briefing.emailThreadsFound} 
      />

      {/* Meeting Assessment */}
      <AssessmentSection 
        assessment={briefing.assessment} 
        isWasteful={isWasteful} 
      />

      {/* Prep Checklist */}
      {!isPast && !isWasteful && (
        <PrepChecklist 
          checkedItems={checkedItems} 
          setCheckedItems={setCheckedItems} 
        />
      )}

      {/* Human Override */}
      {!isPast && (
        <OverrideBar
          meetingId={meeting.id}
          currentOverride={overrides[meeting.id]}
          onOverride={handleOverride}
          importance={meeting.importance}
          health={meeting.health}
          worthMeeting={meeting.worthMeeting}
        />
      )}

      {/* Footer */}
      <BriefingFooter briefing={briefing} onFocusMode={onFocusMode} />
    </div>
  )
}
