"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const algorithms = [
    {
      name: "Bubble Sort",
      href: "/bubblesort",
      icon: "🫧",
      description: "A simple comparison-based sorting algorithm that repeatedly steps through the list",
      complexity: "O(n²)",
      available: true,
    },
    {
      name: "Quick Sort",
      href: "/quicksort",
      icon: "⚡",
      description: "An efficient divide-and-conquer sorting algorithm",
      complexity: "O(n log n)",
      available: false,
    },
    {
      name: "Merge Sort",
      href: "/mergesort",
      icon: "🔀",
      description: "A stable divide-and-conquer sorting algorithm",
      complexity: "O(n log n)",
      available: false,
    },
    {
      name: "Insertion Sort",
      href: "/insertionsort",
      icon: "📥",
      description: "Builds the final sorted array one item at a time",
      complexity: "O(n²)",
      available: false,
    },
    {
      name: "Selection Sort",
      href: "/selectionsort",
      icon: "👆",
      description: "Repeatedly finds the minimum element and places it at the beginning",
      complexity: "O(n²)",
      available: false,
    },
    {
      name: "Heap Sort",
      href: "/heapsort",
      icon: "🗻",
      description: "Uses a binary heap data structure to sort elements",
      complexity: "O(n log n)",
      available: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-6 py-12 lg:px-8 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 border border-blue-200 mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Interactive Learning</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            Sorting Algorithm Visualizer
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Learn and understand sorting algorithms through interactive visualizations.
            Watch how different algorithms sort data step-by-step.
          </p>
        </div>

        {/* Algorithm Cards */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose an Algorithm</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algorithm) => (
              <Link
                key={algorithm.name}
                href={algorithm.available ? algorithm.href : "#"}
                className={algorithm.available ? "block" : "block pointer-events-none"}
              >
                <Card className={`rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all h-full ${
                  algorithm.available
                    ? "hover:shadow-lg hover:border-blue-300 cursor-pointer"
                    : "opacity-50"
                }`}>
                  <CardHeader className="pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold flex items-center gap-3 text-gray-900">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                          {algorithm.icon}
                        </div>
                        <span>{algorithm.name}</span>
                      </CardTitle>
                      {!algorithm.available && (
                        <span className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {algorithm.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-500">Time Complexity</span>
                      <code className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-mono text-xs">
                        {algorithm.complexity}
                      </code>
                    </div>

                    {algorithm.available && (
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold pt-2">
                        <span>Try it now</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Why Visualize Algorithms?</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Visualizations help you understand how algorithms work by showing the step-by-step process.
            See comparisons, swaps, and how data moves in real-time to build intuition for different sorting techniques.
          </p>
        </div>
      </main>
    </div>
  )
}
