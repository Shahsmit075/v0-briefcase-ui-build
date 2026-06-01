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
    <div className="space-y-2">
      {visibleAlerts.map((alert) => {
        const typeStyles = {
          critical: "bg-red-50 border-red-200 text-red-700",
          warning: "bg-amber-50 border-amber-200 text-amber-700",
          info: "bg-blue-50 border-blue-200 text-blue-700"
        }

        const iconColor = {
          critical: "text-red-500",
          warning: "text-amber-500",
          info: "text-blue-500"
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
