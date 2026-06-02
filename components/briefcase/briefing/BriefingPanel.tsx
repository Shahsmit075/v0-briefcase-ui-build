"use client"

import { BriefingHeader } from "./BriefingHeader"
import { SituationSection } from "./SituationSection"
import { PeopleSection } from "./PeopleSection"
import { OpenThreadsSection } from "./OpenThreadsSection"
import { HowToOpenSection } from "./HowToOpenSection"
import { AssessmentSection } from "./AssessmentSection"
import { PrepChecklist } from "./PrepChecklist"
import { QuickNotes } from "./QuickNotes"
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
  notes?: Record<string, string>
  setNotes?: (notes: Record<string, string>) => void
}

export function BriefingPanel({
  meeting,
  briefing,
  isLoading,
  checkedItems,
  setCheckedItems,
  overrides,
  setOverrides,
  onFocusMode,
  notes = {},
  setNotes = () => {}
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
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-8">
      {/* Past Meeting Banner */}
      {isPast && (
        <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-4 mb-8 text-sm text-[var(--text-secondary)]">
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
            className="gap-2 text-[var(--warning-amber)] border-[var(--warning-amber)]/30 hover:bg-[var(--warning-bg)]"
          >
            <Mail className="w-4 h-4" />
            Decline & Send Summary Instead
          </Button>
        </div>
      )}

      <div className="space-y-8">
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

        {/* Quick Notes */}
        {!isPast && (
          <QuickNotes 
            meetingId={meeting.id}
            notes={notes}
            setNotes={setNotes}
          />
        )}
      </div>

      {/* Human Override */}
      {!isPast && (
        <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
          <OverrideBar
            meetingId={meeting.id}
            currentOverride={overrides[meeting.id]}
            onOverride={handleOverride}
            importance={meeting.importance}
            health={meeting.health}
            worthMeeting={meeting.worthMeeting}
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
        <BriefingFooter briefing={briefing} onFocusMode={onFocusMode} />
      </div>
    </div>
  )
}
