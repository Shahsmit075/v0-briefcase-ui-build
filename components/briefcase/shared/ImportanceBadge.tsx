"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ImportanceBadgeProps {
  importance: "critical" | "important" | "routine" | "optional"
  size?: "sm" | "md"
}

export function ImportanceBadge({ importance, size = "md" }: ImportanceBadgeProps) {
  const config = {
    critical: {
      label: "CRITICAL",
      className: "bg-red-500/10 text-red-600 border-red-200 hover:bg-red-500/15"
    },
    important: {
      label: "IMPORTANT",
      className: "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/15"
    },
    routine: {
      label: "ROUTINE",
      className: "bg-gray-500/10 text-gray-600 border-gray-200 hover:bg-gray-500/15"
    },
    optional: {
      label: "OPTIONAL",
      className: "bg-gray-400/10 text-gray-500 border-gray-200 hover:bg-gray-400/15"
    }
  }

  const { label, className } = config[importance]

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-mono font-medium uppercase tracking-wider",
        size === "sm" ? "text-[10px] px-1.5 py-0" : "text-xs px-2 py-0.5",
        className
      )}
    >
      {label}
    </Badge>
  )
}
