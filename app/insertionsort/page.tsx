"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { InsertionVisualizer } from "@/components/insertion-visualizer"
import { NotesSection } from "@/components/notes-section"
import { useInsertionSort } from "@/hooks/useInsertionSort"

export default function InsertionSortPage() {
  const {
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    playPause,
    reset,
    goToPreviousStep,
    goToNext,
    canGoPrevious,
    canGoNext,
    isDescending,
  } = useInsertionSort()

  const [customInput, setCustomInput] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [inputError, setInputError] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<"asc" | "desc">("asc")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Parse input for preview
  const parsedNumbers = customInput
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v !== "")
    .map((v) => {
      const num = parseInt(v)
      return isNaN(num) ? null : num
    })
    .filter((n): n is number => n !== null)

  const handleCustomArraySubmit = () => {
    setInputError("")

    // Parse and validate input
    const values = customInput
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "")

    if (values.length === 0) {
      setInputError("Please enter at least one number")
      return
    }

    if (values.length > 15) {
      setInputError("Maximum 15 numbers allowed")
      return
    }

    const numbers = values.map((v) => {
      const num = parseInt(v)
      if (isNaN(num)) {
        return null
      }
      return num
    }).filter((n): n is number => n !== null)

    if (numbers.length !== values.length) {
      setInputError("All values must be valid numbers")
      return
    }

    if (numbers.some(n => n < 1 || n > 999)) {
      setInputError("Numbers must be between 1 and 999")
      return
    }

    // Reset with custom array and order
    reset(numbers, selectedOrder === "desc")
    setCustomInput("")
    setShowCustomInput(false)
  }

  const handleRandomReset = () => {
    reset(undefined, selectedOrder === "desc")
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 py-8 lg:px-8 lg:py-12">
        {/* Custom Input Modal */}
        {showCustomInput && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
                <div className="flex items-center justify-between relative">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Custom Array</h3>
                      <p className="text-blue-100 text-sm">Create your own sorting sequence</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomInput(false)
                      setInputError("")
                      setCustomInput("")
                    }}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left Side - Inputs */}
                <div className="space-y-6">
                  {/* Input Field */}
                  <div className="space-y-3">
                    <label htmlFor="custom-array-input" className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      Enter Your Numbers
                    </label>
                    <div className="relative">
                      <input
                        id="custom-array-input"
                        type="text"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="e.g., 42, 15, 8, 23, 67, 4, 91"
                        className="w-full px-4 py-3.5 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base font-mono"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCustomArraySubmit()
                          }
                        }}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
                      <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Enter 1 to 15 numbers (1-999), separated by commas
                      </p>
                    </div>
                  </div>

                  {/* Sort Order Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      Sort Order
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder("asc")}
                        className={`group relative px-5 py-4 rounded-xl border-2 transition-all ${
                          selectedOrder === "asc"
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            selectedOrder === "asc"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-500"
                          }`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                            </svg>
                          </div>
                          <span className={`text-sm font-bold transition-colors ${
                            selectedOrder === "asc" ? "text-blue-700" : "text-gray-600"
                          }`}>
                            Ascending
                          </span>
                          <span className={`text-xs transition-colors ${
                            selectedOrder === "asc" ? "text-blue-600" : "text-gray-400"
                          }`}>
                            1 → 9
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedOrder("desc")}
                        className={`group relative px-5 py-4 rounded-xl border-2 transition-all ${
                          selectedOrder === "desc"
                            ? "border-purple-500 bg-purple-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            selectedOrder === "desc"
                              ? "bg-purple-500 text-white"
                              : "bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-500"
                          }`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <span className={`text-sm font-bold transition-colors ${
                            selectedOrder === "desc" ? "text-purple-700" : "text-gray-600"
                          }`}>
                            Descending
                          </span>
                          <span className={`text-xs transition-colors ${
                            selectedOrder === "desc" ? "text-purple-600" : "text-gray-400"
                          }`}>
                            9 → 1
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {inputError && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border-2 border-red-200 animate-in slide-in-from-top-2 duration-200">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-sm text-red-700 font-semibold leading-relaxed">{inputError}</p>
                    </div>
                  )}
                </div>

                {/* Right Side - Live Preview */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Preview
                  </label>
                  <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 min-h-[300px] flex flex-col">
                    {parsedNumbers.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">No numbers yet</p>
                        <p className="text-xs text-gray-400 mt-1">Enter numbers to see preview</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-600">
                            {parsedNumbers.length} number{parsedNumbers.length !== 1 ? 's' : ''}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            selectedOrder === "asc"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}>
                            {selectedOrder === "asc" ? "Ascending ↑" : "Descending ↓"}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {parsedNumbers.map((num, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center gap-1"
                            >
                              <span className="text-[10px] font-bold text-gray-400">#{idx}</span>
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white shadow-md ${
                                selectedOrder === "asc"
                                  ? "bg-gradient-to-br from-blue-500 to-blue-600"
                                  : "bg-gradient-to-br from-purple-500 to-purple-600"
                              }`}>
                                {num}
                              </div>
                            </div>
                          ))}
                        </div>

                        {parsedNumbers.length > 15 && (
                          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
                            <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-xs text-amber-700 font-medium">Too many numbers! Maximum is 15.</p>
                          </div>
                        )}

                        {parsedNumbers.some(n => n < 1 || n > 999) && (
                          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2">
                            <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-xs text-amber-700 font-medium">Some numbers are out of range (1-999).</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomInput(false)
                    setInputError("")
                    setCustomInput("")
                  }}
                  className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-white hover:border-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCustomArraySubmit}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Apply & Sort
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main visualization area */}
        <div className={`card-enhanced rounded-2xl overflow-hidden shadow-2xl transition-all ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
        }`}>
          {/* Order Badge */}
          <div className="bg-gray-50 border-b border-gray-200 px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">Sort Order:</span>
                <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                  isDescending
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {isDescending ? "Descending ↓" : "Ascending ↑"}
                </span>
              </div>
              <div className="h-5 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">Pass:</span>
                <span className="px-3 py-1 rounded-lg text-sm font-bold bg-indigo-100 text-indigo-700">
                  {currentStep.currentPass} / {currentStep.totalPasses}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                disabled={isPlaying}
                className="px-4 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Custom Input
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Visualization */}
          <div className={`bg-white p-12 flex items-center justify-center ${
            isFullscreen ? "min-h-[calc(100vh-180px)]" : "min-h-[600px]"
          }`}>
            <InsertionVisualizer
              array={currentStep.array}
              comparing={currentStep.comparing}
              current={currentStep.current}
              sorted={currentStep.sorted}
              explanation={currentStep.explanation}
              currentIndex={currentStep.currentIndex}
              comparingIndex={currentStep.comparingIndex}
            />
          </div>

          {/* Controls */}
          <div className="border-t border-gray-200 bg-gray-50 px-8 py-5">
            <div className="flex items-center justify-center gap-3">
              {/* Previous Button */}
              <button
                type="button"
                onClick={goToPreviousStep}
                disabled={!canGoPrevious || isPlaying}
                aria-label="Previous step"
                className="group h-9 w-9 rounded-md disabled:opacity-30 hover:bg-gray-200 active:bg-gray-300 transition-all border border-gray-300 bg-white flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-gray-600 group-disabled:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={playPause}
                aria-label={isPlaying ? "Pause animation" : "Play animation"}
                className="h-11 w-11 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-all bg-blue-500 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={goToNext}
                disabled={!canGoNext || isPlaying}
                aria-label="Next step"
                className="group h-9 w-9 rounded-md disabled:opacity-30 hover:bg-gray-200 active:bg-gray-300 transition-all border border-gray-300 bg-white flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-gray-600 group-disabled:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Divider */}
              <div className="h-7 w-px bg-gray-300 mx-2" />

              {/* Speed Control */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-md bg-white border border-gray-300">
                <label htmlFor="speed-control" className="text-xs font-semibold text-gray-600">Speed</label>
                <input
                  id="speed-control"
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  aria-label="Animation speed control"
                  className="w-24 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-xs font-bold text-blue-600 min-w-7 text-center">{speed}x</span>
              </div>

              {/* Divider */}
              <div className="h-7 w-px bg-gray-300 mx-2" />

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleRandomReset}
                className="h-9 px-4 rounded-md hover:bg-gray-200 active:bg-gray-300 transition-all border border-gray-300 font-semibold text-xs bg-white flex items-center gap-2 text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>
      </main>

      <NotesSection algorithm="insertion" />
    </div>
  )
}
