"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"

interface HealthBadgeProps {
  health: "healthy" | "unclear" | "wasteful"
  size?: "sm" | "md"
}

export function HealthBadge({ health, size = "md" }: HealthBadgeProps) {
  const config = {
    healthy: {
      label: "Healthy",
      icon: CheckCircle,
      className: "bg-green-500/10 text-green-600 border-green-200"
    },
    unclear: {
      label: "Unclear",
      icon: HelpCircle,
      className: "bg-amber-500/10 text-amber-600 border-amber-200"
    },
    wasteful: {
      label: "Wasteful",
      icon: AlertTriangle,
      className: "bg-red-500/10 text-red-600 border-red-200"
    }
  }

  const { label, icon: Icon, className } = config[health]
  const iconSize = size === "sm" ? 10 : 12

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium gap-1",
        size === "sm" ? "text-[10px] px-1.5 py-0" : "text-xs px-2 py-0.5",
        className
      )}
    >
      <Icon size={iconSize} />
      {label}
    </Badge>
  )
}
