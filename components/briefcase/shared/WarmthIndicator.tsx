"use client"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WarmthIndicatorProps {
  warmth: "warm" | "cooling" | "cold"
  lastContact: string
  showLabel?: boolean
  size?: "sm" | "md"
}

export function WarmthIndicator({ warmth, lastContact, showLabel = true, size = "md" }: WarmthIndicatorProps) {
  const config = {
    warm: {
      color: "bg-green-500",
      label: "Warm",
      description: "Active relationship"
    },
    cooling: {
      color: "bg-amber-500",
      label: "Cooling",
      description: "Relationship needs attention"
    },
    cold: {
      color: "bg-red-500",
      label: "Cold",
      description: "Overdue for outreach"
    }
  }

  const { color, label, description } = config[warmth]
  const dotSize = size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 cursor-help">
            <span className={cn("rounded-full", color, dotSize)} />
            {showLabel && (
              <span className={cn(
                "text-[var(--text-secondary)]",
                size === "sm" ? "text-xs" : "text-sm"
              )}>
                {label}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-[var(--text-primary)] text-white text-xs px-3 py-2">
          <p className="font-medium">{description}</p>
          <p className="text-white/70 mt-0.5">Last contact: {lastContact}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
