"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { PREP_CHECKLIST } from "@/lib/mock-data"

interface PrepChecklistProps {
  checkedItems: Record<string, boolean>
  setCheckedItems: (items: Record<string, boolean>) => void
}

export function PrepChecklist({ checkedItems, setCheckedItems }: PrepChecklistProps) {
  const allChecked = PREP_CHECKLIST.every((_, i) => checkedItems[`prep-${i}`])

  const toggleItem = (index: number) => {
    setCheckedItems({
      ...checkedItems,
      [`prep-${index}`]: !checkedItems[`prep-${index}`]
    })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-8"
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
        PREP CHECKLIST
      </h2>
      <div className="bg-white rounded-lg border border-[var(--border-subtle)] p-4">
        <div className="space-y-3">
          {PREP_CHECKLIST.map((item, index) => {
            const isChecked = checkedItems[`prep-${index}`]
            return (
              <motion.div
                key={index}
                className={cn(
                  "flex items-start gap-3 cursor-pointer group",
                  isChecked && "opacity-60"
                )}
                onClick={() => toggleItem(index)}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn(
                  "shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5",
                  isChecked 
                    ? "bg-green-500 border-green-500" 
                    : "border-[var(--border-soft)] group-hover:border-[var(--accent-gold)]"
                )}>
                  <AnimatePresence>
                    {isChecked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className={cn(
                  "text-sm text-[var(--text-primary)] leading-relaxed transition-all",
                  isChecked && "line-through text-[var(--text-muted)]"
                )}>
                  {item}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Ready confirmation */}
        <AnimatePresence>
          {allChecked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[var(--border-subtle)]"
            >
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">You&apos;re ready for this meeting!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
