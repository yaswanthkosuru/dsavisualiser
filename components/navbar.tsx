"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  // Determine algorithm name based on route
  const getAlgorithmName = () => {
    if (pathname === "/bubblesort") return "Bubble Sort"
    if (pathname === "/quicksort") return "Quick Sort"
    if (pathname === "/mergesort") return "Merge Sort"
    if (pathname === "/insertionsort") return "Insertion Sort"
    if (pathname === "/selectionsort") return "Selection Sort"
    if (pathname === "/heapsort") return "Heap Sort"
    return null
  }

  const algorithmName = getAlgorithmName()

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b backdrop-blur-lg shadow-lg">
      <div className="container flex h-18 items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold gradient-text">
              Sorting Visualizer
            </h1>
          </Link>

          {algorithmName && (
            <>
              <span className="text-muted-foreground">|</span>
              <div className="px-4 py-1.5 rounded-lg font-semibold text-sm shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {algorithmName}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
