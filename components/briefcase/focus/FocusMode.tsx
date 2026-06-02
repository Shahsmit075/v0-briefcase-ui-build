"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BriefingHeader } from "../briefing/BriefingHeader"
import { SituationSection } from "../briefing/SituationSection"
import { PeopleSection } from "../briefing/PeopleSection"
import { OpenThreadsSection } from "../briefing/OpenThreadsSection"
import { HowToOpenSection } from "../briefing/HowToOpenSection"
import { AssessmentSection } from "../briefing/AssessmentSection"
import { PrepChecklist } from "../briefing/PrepChecklist"
import { CountdownTimer } from "../shared/CountdownTimer"
import type { Meeting, ActiveBriefing } from "@/lib/mock-data"
import { useEffect } from "react"

interface FocusModeProps {
  isOpen: boolean
  onClose: () => void
  meeting: Meeting | null
  briefing: ActiveBriefing | null
  checkedItems: Record<string, boolean>
  setCheckedItems: (items: Record<string, boolean>) => void
}

export function FocusMode({
  isOpen,
  onClose,
  meeting,
  briefing,
  checkedItems,
  setCheckedItems
}: FocusModeProps) {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!meeting || !briefing) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[var(--bg-primary)]"
        >
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 pointer-events-none" />

          {/* Header */}
          <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] px-8 py-4 z-10">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="font-sans text-xl font-bold text-[var(--text-primary)]">
                  {meeting.title}
                </h1>
                {meeting.status === "next" && meeting.minutesUntil && (
                  <CountdownTimer minutes={meeting.minutesUntil} size="lg" />
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Exit Focus Mode
                <kbd className="ml-2 px-1.5 py-0.5 bg-[var(--bg-primary)] rounded text-[10px] font-mono text-[var(--text-muted)]">
                  ESC
                </kbd>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto h-[calc(100vh-72px)] py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl mx-auto px-8"
            >
              {/* Large countdown */}
              {meeting.status === "next" && meeting.minutesUntil && (
                <div className="text-center mb-8">
                  <span className="text-6xl font-mono font-bold text-[var(--accent-gold)]">
                    <CountdownTimer minutes={meeting.minutesUntil} size="lg" showLabel={false} />
                  </span>
                  <p className="text-[var(--text-muted)] mt-2">until meeting starts</p>
                </div>
              )}

              <div className="bg-white rounded-xl border border-[var(--border-subtle)] p-8 shadow-lg">
                <BriefingHeader
                  meeting={meeting}
                  briefing={briefing}
                  onRefresh={() => {}}
                  onFocusMode={onClose}
                />

                <SituationSection situation={briefing.situation} />
                <PeopleSection people={briefing.people} />
                <OpenThreadsSection threads={briefing.openThreads} />
                <HowToOpenSection 
                  opener={briefing.suggestedOpener} 
                  emailThreadsFound={briefing.emailThreadsFound} 
                />
                <AssessmentSection assessment={briefing.assessment} />
                <PrepChecklist 
                  checkedItems={checkedItems} 
                  setCheckedItems={setCheckedItems} 
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
