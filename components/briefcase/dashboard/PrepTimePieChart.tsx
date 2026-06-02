"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import type { Meeting } from "@/lib/mock-data"

interface PrepTimePieChartProps {
  meetings: Meeting[]
}

export function PrepTimePieChart({ meetings }: PrepTimePieChartProps) {
  const meetsWithPrep = meetings.filter(m => m.prepTime && m.prepTime > 0)
  
  if (meetsWithPrep.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-2xl font-bold text-[var(--accent-gold)]">0</span>
        <span className="text-xs text-[var(--text-muted)]">min</span>
      </div>
    )
  }

  const totalPrepTime = meetsWithPrep.reduce((acc, m) => acc + (m.prepTime || 0), 0)

  // Color palette for different meetings
  const colors = [
    "#E8C547", // gold
    "#4ADE80", // green
    "#60A5FA", // blue
    "#FBBF24", // amber
    "#FF6B6B", // red
    "#A78BFA", // purple
  ]

  const data = meetsWithPrep.map((m, index) => ({
    name: m.title,
    value: m.prepTime || 0,
    color: colors[index % colors.length]
  }))

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={120} height={120}>
        <PieChart>
          <Pie
            data={data}
            cx={60}
            cy={60}
            innerRadius={35}
            outerRadius={55}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center">
          <span className="text-xl font-bold text-[var(--accent-gold)]">{totalPrepTime}</span>
          <span className="text-xs text-[var(--text-muted)] block">min</span>
        </div>
      </div>
    </div>
  )
}
