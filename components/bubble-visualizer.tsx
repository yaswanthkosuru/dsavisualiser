"use client"

import React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import type { BubbleItem } from "@/lib/bubbleSort"

interface BubbleVisualizerProps {
  array: BubbleItem[]
  comparing: number[]
  swapping: number[]
  sorted: number[]
}

const colors = {
  default: "bg-gradient-to-br from-blue-500 to-blue-600",
  comparing: "bg-gradient-to-br from-amber-500 to-orange-600",
  swapping: "bg-gradient-to-br from-red-500 to-rose-600",
  sorted: "bg-gradient-to-br from-emerald-500 to-green-600",
}

export function BubbleVisualizer({ array, comparing, swapping, sorted }: BubbleVisualizerProps) {
  const getBubbleState = (index: number) => {
    if (sorted.includes(index)) return "sorted"
    if (swapping.includes(index)) return "swapping"
    if (comparing.includes(index)) return "comparing"
    return "default"
  }


  return (
    <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 min-h-[400px] p-6 lg:p-8">
      <AnimatePresence mode="popLayout">
        {array.map((item, index) => {
          const state = getBubbleState(index)
          // Scale apple size based on value (60px to 140px diameter)
          const bubbleSize = 60 + (item.value / 99) * 80

          // Check if there should be a sorted boundary line after this element
          const showSortedLine = sorted.length > 0 && index === array.length - sorted.length - 1

          return (
            <React.Fragment key={item.id}>
            <motion.div
              layout
              animate={{
                y: state === "swapping" ? -20 : 0,
              }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                },
                y: { duration: 0.3, type: "spring" },
              }}
              className="flex flex-col items-center gap-2 relative"
            >
              {/* Downward arrow for comparing elements */}
              {state === "comparing" && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 z-10"
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" className="text-amber-500">
                    <path
                      d="M20 8 L20 32 M20 32 L14 26 M20 32 L26 26"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </motion.div>
              )}

              <motion.div
                className="relative flex flex-col items-center justify-center gap-3"
                style={{
                  width: `${bubbleSize}px`,
                  height: `${bubbleSize + 40}px`,
                }}
              >
                {/* Apple Icon - size represents value */}
                <div className="relative flex-shrink-0">
                  <div
                    className="text-[3em] transition-all duration-200"
                    style={{
                      fontSize: `${bubbleSize}px`,
                      filter: state === "comparing"
                        ? "drop-shadow(0 8px 16px rgba(251, 191, 36, 0.5)) brightness(1.15)"
                        : state === "swapping"
                        ? "drop-shadow(0 8px 16px rgba(239, 68, 68, 0.5)) brightness(1.15) contrast(1.1)"
                        : state === "sorted"
                        ? "drop-shadow(0 6px 12px rgba(34, 197, 94, 0.4)) saturate(1.2)"
                        : "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                    }}
                  >
                    🍎
                  </div>
                </div>
                {/* Value label - prominent and readable */}
                <div
                  className={cn(
                    "flex items-center justify-center font-bold rounded-lg shadow-lg transition-all duration-200 min-w-[48px] px-3 py-1.5 border-2",
                    state === "comparing" && "bg-amber-50 text-amber-900 border-amber-400 ring-2 ring-amber-200",
                    state === "swapping" && "bg-rose-50 text-rose-900 border-rose-400 ring-2 ring-rose-200 animate-pulse",
                    state === "sorted" && "bg-emerald-50 text-emerald-900 border-emerald-400 ring-2 ring-emerald-200",
                    state === "default" && "bg-white text-gray-900 border-gray-300"
                  )}
                  style={{
                    fontSize: `${Math.max(14, bubbleSize * 0.18)}px`,
                  }}
                >
                  {item.value}
                </div>
              </motion.div>

            </motion.div>

            {/* Sorted boundary line */}
            {showSortedLine && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                className="flex flex-col items-center justify-center h-48 mx-3"
              >
                <div className="h-full w-0.5 relative">
                  {/* Dotted line using repeating gradient */}
                  <svg className="h-full w-full" preserveAspectRatio="none">
                    <line
                      x1="50%"
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="8,6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap shadow-lg border-2 border-white">
                    Sorted →
                  </div>
                </div>
              </motion.div>
            )}
            </React.Fragment>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
