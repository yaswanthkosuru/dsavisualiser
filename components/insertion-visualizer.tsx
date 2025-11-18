"use client"

import React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import type { InsertionItem } from "@/lib/insertionSort"

interface InsertionVisualizerProps {
  array: InsertionItem[]
  comparing: string[]
  current: string | null
  sorted: string[]
  explanation?: string
  currentIndex: number | null
  comparingIndex: number | null
}

export function InsertionVisualizer({ array, comparing, current, sorted, explanation, currentIndex, comparingIndex }: InsertionVisualizerProps) {
  const getCardState = (item: InsertionItem) => {
    if (current === item.id) return "current"
    if (sorted.includes(item.id)) return "sorted"
    if (comparing.includes(item.id)) return "comparing"
    return "default"
  }

  // Get current status text
  const getStatusText = () => {
    if (current !== null) {
      const currentItem = array.find(item => item.id === current)
      if (currentItem) {
        return {
          action: "Inserting",
          values: `Element ${currentItem.value} into sorted portion`,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-300"
        }
      }
    }
    if (comparing.length > 0) {
      const comparingItem = array.find(item => item.id === comparing[0])
      if (comparingItem) {
        return {
          action: "Comparing",
          values: `${comparingItem.value} with current element`,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-300"
        }
      }
    }
    if (sorted.length === array.length && sorted.length > 0) {
      return {
        action: "Complete",
        values: "All elements sorted!",
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-300"
      }
    }
    // Default state - show explanation from previous step
    return {
      action: "Status",
      values: explanation || "Click Play to start",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300"
    }
  }

  const status = getStatusText()

  // Remove the sorted boundary line - not needed
  const sortedBoundary = -1

  return (
    <div className="space-y-4">
      {/* Status Header - Always visible */}
      <motion.div
        key={`${status.action}-${status.values}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "mx-auto max-w-4xl rounded-xl border-2 px-6 py-3 shadow-lg min-h-[60px] flex items-center",
          status.bgColor,
          status.borderColor
        )}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
          <span className={cn("text-base font-bold whitespace-nowrap", status.color)}>
            {status.action}:
          </span>
          <span className="text-lg font-bold text-gray-900 text-center sm:text-left">
            {status.values}
          </span>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="flex items-center justify-center gap-3 lg:gap-4 min-h-[400px] p-6 lg:p-8 relative overflow-x-auto">
        <AnimatePresence mode="popLayout">
          {array.map((item, index) => {
            const state = getCardState(item)
            // Scale card size based on value (50px to 90px for better fit)
            const cardSize = 50 + (item.value / 99) * 40

            // Check if there should be a sorted boundary line after this element
            const showSortedLine = sortedBoundary >= 0 && index === sortedBoundary && index < array.length - 1

            return (
              <React.Fragment key={item.id}>
                <motion.div
                  layout
                  animate={{
                    y: state === "current" ? -20 : 0,
                    scale: state === "current" ? 1.1 : 1,
                  }}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    },
                    y: { duration: 0.3, type: "spring" },
                    scale: { duration: 0.3 },
                  }}
                  className="flex flex-col items-center gap-2 relative z-10"
                  style={{ zIndex: state === "current" ? 20 : 10 }}
                >
                  {/* Index pointer for 'j' (comparing position) */}
                  {comparingIndex !== null && index === comparingIndex && (
                    <motion.div
                      initial={{ y: -10, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -10, opacity: 0, scale: 0.8 }}
                      className="absolute -top-24 left-1/2 -translate-x-1/2 z-20"
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="bg-amber-500 text-white text-xs font-mono font-bold px-2.5 py-1.5 rounded-md border-2 border-amber-600 shadow-lg">
                          j = {comparingIndex}
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" className="text-amber-500">
                          <path
                            d="M12 4 L12 20 M12 20 L8 16 M12 20 L16 16"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  )}

                  {/* Index pointer for 'i' (current position) */}
                  {currentIndex !== null && index === currentIndex && (
                    <motion.div
                      initial={{ y: -10, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -10, opacity: 0, scale: 0.8 }}
                      className="absolute -top-24 left-1/2 -translate-x-1/2 z-20"
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="bg-purple-500 text-white text-xs font-mono font-bold px-2.5 py-1.5 rounded-md border-2 border-purple-600 shadow-lg animate-pulse">
                          i = {currentIndex}
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" className="text-purple-500">
                          <path
                            d="M12 4 L12 20 M12 20 L8 16 M12 20 L16 16"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  )}

                  {/* Downward arrow for comparing elements */}
                  {state === "comparing" && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="absolute -top-52 left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-full border border-amber-300 whitespace-nowrap">
                          Comparing
                        </span>
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
                      </div>
                    </motion.div>
                  )}

                  {/* Upward arrow for current element being inserted */}
                  {state === "current" && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="absolute -top-52 left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full border border-purple-300 whitespace-nowrap animate-pulse">
                          Inserting
                        </span>
                        <svg width="40" height="40" viewBox="0 0 40 40" className="text-purple-500 animate-bounce">
                          <path
                            d="M20 8 L20 32 M20 32 L14 26 M20 32 L26 26"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    className="relative flex flex-col items-center justify-center gap-3"
                    style={{
                      width: `${cardSize}px`,
                      height: `${cardSize + 40}px`,
                    }}
                  >
                    {/* Playing Card Icon - size represents value */}
                    <div className="relative shrink-0">
                      <div
                        className="text-[3em] transition-all duration-200"
                        style={{
                          fontSize: `${cardSize}px`,
                          filter: state === "comparing"
                            ? "drop-shadow(0 8px 16px rgba(251, 191, 36, 0.5)) brightness(1.15)"
                            : state === "current"
                            ? "drop-shadow(0 8px 16px rgba(168, 85, 247, 0.5)) brightness(1.15) contrast(1.1)"
                            : state === "sorted"
                            ? "drop-shadow(0 6px 12px rgba(34, 197, 94, 0.4)) saturate(1.2)"
                            : "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                        }}
                      >
                        🃏
                      </div>
                    </div>
                    {/* Value label - prominent and readable */}
                    <div
                      className={cn(
                        "flex items-center justify-center font-bold rounded-lg shadow-lg transition-all duration-200 min-w-12 px-3 py-1.5 border-2",
                        state === "comparing" && "bg-amber-50 text-amber-900 border-amber-400 ring-2 ring-amber-200",
                        state === "current" && "bg-purple-50 text-purple-900 border-purple-400 ring-2 ring-purple-200 animate-pulse",
                        state === "sorted" && "bg-emerald-50 text-emerald-900 border-emerald-400 ring-2 ring-emerald-200",
                        state === "default" && "bg-white text-gray-900 border-gray-300"
                      )}
                      style={{
                        fontSize: `${Math.max(14, cardSize * 0.18)}px`,
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
                        ← Sorted
                      </div>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
