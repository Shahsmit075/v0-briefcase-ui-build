"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ALERTS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface AlertBannerProps {
  dismissedAlerts: string[]
  setDismissedAlerts: (alerts: string[]) => void
}

export function AlertBanner({ dismissedAlerts, setDismissedAlerts }: AlertBannerProps) {
  const visibleAlerts = ALERTS.filter(a => !dismissedAlerts.includes(a.id))

  if (visibleAlerts.length === 0) return null

  const dismissAlert = (id: string) => {
    setDismissedAlerts([...dismissedAlerts, id])
  }

  return (
    <div className="space-y-2.5">
      {visibleAlerts.map((alert) => {
        const typeStyles = {
          critical: "bg-[var(--critical-bg)] border-[var(--critical-red)]/30 text-[var(--critical-red)]",
          warning: "bg-[var(--warning-bg)] border-[var(--warning-amber)]/30 text-[var(--warning-amber)]",
          info: "bg-[var(--bg-elevated)] border-[var(--important-blue)]/30 text-[var(--important-blue)]"
        }

        const iconColor = {
          critical: "text-[var(--critical-red)]",
          warning: "text-[var(--warning-amber)]",
          info: "text-[var(--important-blue)]"
        }

        return (
          <div
            key={alert.id}
            className={cn(
              "flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-sm",
              typeStyles[alert.type]
            )}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className={cn("w-4 h-4 shrink-0", iconColor[alert.type])} />
              <span>{alert.message}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-transparent opacity-60 hover:opacity-100"
              onClick={() => dismissAlert(alert.id)}
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
