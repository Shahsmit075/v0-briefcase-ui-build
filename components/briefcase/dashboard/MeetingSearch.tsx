"use client"

import { useState } from "react"
import { Search, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MeetingSearchProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  importance?: "critical" | "important" | "routine" | "optional"
  status?: "upcoming" | "past"
  hasAlert?: boolean
}

export function MeetingSearch({ onSearch, onFilterChange }: MeetingSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterState>({})

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const toggleFilter = (key: string, value: any) => {
    const newFilters = { ...activeFilters }
    if (newFilters[key as keyof FilterState] === value) {
      delete newFilters[key as keyof FilterState]
    } else {
      newFilters[key as keyof FilterState] = value
    }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters = Object.keys(activeFilters).length > 0

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <Input
            placeholder="Search meetings by title, attendee..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          {hasActiveFilters && <span className="text-xs font-semibold">{Object.keys(activeFilters).length}</span>}
        </Button>
      </div>

      {showFilters && (
        <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg p-4 space-y-3">
          {/* Importance Filter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              Importance
            </p>
            <div className="flex gap-2 flex-wrap">
              {["critical", "important", "routine", "optional"].map((imp) => (
                <Button
                  key={imp}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "text-xs h-7",
                    activeFilters.importance === imp && "bg-[var(--accent-gold)] text-[var(--bg-primary)] border-[var(--accent-gold)]"
                  )}
                  onClick={() => toggleFilter("importance", imp)}
                >
                  {imp.charAt(0).toUpperCase() + imp.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              Status
            </p>
            <div className="flex gap-2">
              {["upcoming", "past"].map((stat) => (
                <Button
                  key={stat}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "text-xs h-7",
                    activeFilters.status === stat && "bg-[var(--accent-gold)] text-[var(--bg-primary)] border-[var(--accent-gold)]"
                  )}
                  onClick={() => toggleFilter("status", stat)}
                >
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Alerts Filter */}
          <div>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "text-xs h-7",
                activeFilters.hasAlert && "bg-[var(--warning-amber)] text-[var(--bg-primary)] border-[var(--warning-amber)]"
              )}
              onClick={() => toggleFilter("hasAlert", !activeFilters.hasAlert)}
            >
              ⚠️ Has Alerts Only
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
