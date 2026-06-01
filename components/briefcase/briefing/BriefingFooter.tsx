"use client"

import { Copy, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ActiveBriefing } from "@/lib/mock-data"

interface BriefingFooterProps {
  briefing: ActiveBriefing
  onFocusMode: () => void
}

export function BriefingFooter({ briefing, onFocusMode }: BriefingFooterProps) {
  const copyBrief = () => {
    // In a real app, this would copy a formatted version
    navigator.clipboard.writeText(briefing.situation + "\n\n" + briefing.suggestedOpener)
  }

  return (
    <div className="border-t border-[var(--border-subtle)] pt-6 mt-8">
      <div className="flex items-center justify-between">
        <div className="text-xs text-[var(--text-muted)]">
          Generated 2 minutes ago · Based on {briefing.emailThreadsFound} email threads · {briefing.people.length} previous meetings with these attendees
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs h-8"
            onClick={copyBrief}
          >
            <Copy className="w-3.5 h-3.5" />
            Copy Brief
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs h-8"
          >
            <Calendar className="w-3.5 h-3.5" />
            Block 15 min prep
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs h-8"
            onClick={onFocusMode}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Focus Mode
          </Button>
        </div>
      </div>
    </div>
  )
}
