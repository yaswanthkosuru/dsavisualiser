"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotesSectionProps {
  algorithm?: "bubble" | "insertion";
}

export function NotesSection({ algorithm = "bubble" }: NotesSectionProps) {
  const isInsertion = algorithm === "insertion";
  return (
    <div className="relative" style={{ fontFamily: 'var(--font-inter)' }}>
      <div className="relative container mx-auto px-6 py-16 lg:px-8 lg:py-20 pb-40">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Heading */}
          <div className="space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-sm font-semibold text-blue-700">
                Algorithm Guide
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Understanding {isInsertion ? "Insertion" : "Bubble"} Sort
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              A comprehensive guide to one of the most fundamental sorting algorithms
            </p>
          </div>

          {/* What is X Sort */}
          <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl">
                  💡
                </div>
                <span>What is {isInsertion ? "Insertion" : "Bubble"} Sort?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <p className="text-lg leading-relaxed text-foreground">
                {isInsertion ? (
                  <>
                    Insertion Sort is a simple{" "}
                    <strong className="text-blue-600">
                      comparison-based sorting algorithm
                    </strong>{" "}
                    that builds the final sorted array one item at a time. It works by
                    taking each element and{" "}
                    <strong className="text-purple-600">&quot;inserting&quot;</strong> it
                    into its correct position among the previously sorted elements,
                    similar to how you might sort playing cards in your hand.
                  </>
                ) : (
                  <>
                    Bubble Sort is a simple{" "}
                    <strong className="text-blue-600">
                      comparison-based sorting algorithm
                    </strong>{" "}
                    that repeatedly steps through the list, compares adjacent
                    elements, and swaps them if they&apos;re in the wrong order. The
                    algorithm gets its name from the way larger elements{" "}
                    <strong className="text-purple-600">&quot;bubble up&quot;</strong> to the
                    end of the array with each pass.
                  </>
                )}
              </p>

              <div className="p-5 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-bold text-blue-900">
                    Key Characteristic
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  {isInsertion ? (
                    <>
                      At any point during the algorithm, the left portion of the array
                      is already sorted, and we insert each new element into its correct
                      position within that sorted portion.
                    </>
                  ) : (
                    <>
                      After each complete pass through the array, the largest
                      unsorted element is guaranteed to be in its final sorted
                      position at the end.
                    </>
                  )}
                </p>
              </div>

              {/* Code example */}
              <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2 font-mono">
                    {isInsertion ? "insertion-sort.js" : "bubble-sort.js"}
                  </span>
                </div>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{isInsertion ? `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;

    // Shift elements to the right
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert current element
    arr[j + 1] = current;
  }
  return arr;
}` : `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* The Intuition */}
          <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl">
                  🧠
                </div>
                <span>The Intuition Behind It</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <p className="text-lg leading-relaxed text-foreground">
                {isInsertion ? (
                  <>
                    Think of insertion sort like{" "}
                    <strong className="text-purple-600">
                      sorting playing cards in your hand
                    </strong>
                    . You pick up one card at a time and insert it into its correct
                    position among the cards you&apos;re already holding, shifting the
                    other cards as needed.
                  </>
                ) : (
                  <>
                    Think of bubble sort like{" "}
                    <strong className="text-purple-600">
                      organizing a line of people by height
                    </strong>
                    . You walk down the line, and whenever you find two people
                    standing next to each other where the taller person is in front,
                    you ask them to swap positions.
                  </>
                )}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <h4 className="font-black text-xl text-gray-800">
                    How it works step-by-step:
                  </h4>
                </div>

                <div className="grid gap-4">
                  {isInsertion ? (
                    <>
                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-blue-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                          1
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Start with second element
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Begin with index i=1 (first element is already &quot;sorted&quot;).
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-amber-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
                          2
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Pick current element
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Store the element at position i as the current element to insert.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-orange-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg">
                          3
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Compare backward
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Compare with elements to the left (j = i-1, i-2, ...) until finding the correct position.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-red-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-700 font-bold text-lg">
                          4
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Shift and insert
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Shift larger elements to the right and insert current element in the correct position.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-emerald-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                          5
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Move to next element
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Increment i and repeat until all elements are processed.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-blue-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                          1
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Compare adjacent pairs
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Start at the beginning and compare the first two
                            elements.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-amber-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
                          2
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Swap if needed
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            If the first element is larger than the second, swap
                            them.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-orange-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg">
                          3
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Move to next pair
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Move one position forward and repeat the comparison.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-red-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-700 font-bold text-lg">
                          4
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Complete the pass
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Continue until you reach the end of the unsorted
                            portion.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-emerald-50">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                          5
                        </div>
                        <div>
                          <p className="font-bold text-base text-gray-800 mb-1">
                            Repeat
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">
                            Start over from the beginning, but ignore the last
                            sorted elements.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-lg border border-purple-200 bg-purple-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💭</span>
                  <p className="text-sm font-bold text-purple-900">
                    Visual Metaphor
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  {isInsertion ? (
                    <>
                      Imagine organizing a hand of playing cards - you pick up one card
                      at a time and slide it into its correct position among the cards
                      already in your hand, just like{" "}
                      <strong className="text-purple-700">&quot;inserting&quot;</strong> each
                      element into the sorted portion of the array.
                    </>
                  ) : (
                    <>
                      Imagine bubbles in water - larger bubbles rise faster to the
                      surface. Similarly, larger numbers{" "}
                      <strong className="text-purple-700">&quot;bubble up&quot;</strong> to
                      their correct positions at the end of the array.
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Why Use X Sort */}
          <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl">
                  ⚖️
                </div>
                <span>Why Use {isInsertion ? "Insertion" : "Bubble"} Sort?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-700">
                    <span className="text-xl">✓</span> Advantages
                  </h4>
                  <ul className="space-y-3">
                    <li className="text-sm leading-relaxed flex gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <div>
                        <strong className="text-gray-800">
                          Simple to understand:
                        </strong>
                        <span className="text-gray-600">
                          {" "}
                          Perfect for teaching sorting concepts
                        </span>
                      </div>
                    </li>
                    <li className="text-sm leading-relaxed flex gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <div>
                        <strong className="text-gray-800">
                          Easy to implement:
                        </strong>
                        <span className="text-gray-600">
                          {" "}
                          Minimal code required
                        </span>
                      </div>
                    </li>
                    <li className="text-sm leading-relaxed flex gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <div>
                        <strong className="text-gray-800">
                          Space efficient:
                        </strong>
                        <span className="text-gray-600">
                          {" "}
                          Only O(1) extra memory
                        </span>
                      </div>
                    </li>
                    <li className="text-sm leading-relaxed flex gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <div>
                        <strong className="text-gray-800">Stable sort:</strong>
                        <span className="text-gray-600">
                          {" "}
                          Maintains relative order
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-red-50 border border-red-200">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-700">
                    <span className="text-xl">✗</span> Disadvantages
                  </h4>
                  <ul className="space-y-3">
                    <li className="text-sm leading-relaxed flex gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <div>
                        <strong className="text-gray-800">
                          Poor time complexity:
                        </strong>
                        <span className="text-gray-600">
                          {" "}
                          O(n²) for large datasets
                        </span>
                      </div>
                    </li>
                    <li className="text-sm leading-relaxed flex gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <div>
                        <strong className="text-gray-800">
                          Slow in practice:
                        </strong>
                        <span className="text-gray-600">
                          {" "}
                          Many unnecessary operations
                        </span>
                      </div>
                    </li>
                    <li className="text-sm leading-relaxed flex gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <div>
                        <strong className="text-gray-800">
                          Not for production:
                        </strong>
                        <span className="text-gray-600">
                          {" "}
                          Better algorithms available
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 rounded-lg border border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⚡</span>
                  <p className="text-sm font-bold text-amber-900">
                    When to Use
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  Bubble sort is primarily used for{" "}
                  <strong>educational purposes</strong> and for very small
                  datasets (n &lt; 10). For production code, use QuickSort,
                  MergeSort, or built-in sorting methods.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Complexity Analysis */}
          <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-xl">
                  📊
                </div>
                <span>Complexity Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-red-50 border border-red-200">
                  <h4 className="font-bold text-lg mb-4 text-red-700 flex items-center gap-2">
                    <span>⏱️</span> Time Complexity
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">
                        Best Case:
                      </span>
                      <code className="px-3 py-1 rounded-md bg-green-100 text-green-700 font-mono text-sm">
                        O(n)
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">
                        Average Case:
                      </span>
                      <code className="px-3 py-1 rounded-md bg-orange-100 text-orange-700 font-mono text-sm">
                        O(n²)
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">
                        Worst Case:
                      </span>
                      <code className="px-3 py-1 rounded-md bg-red-100 text-red-700 font-mono text-sm">
                        O(n²)
                      </code>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-bold text-lg mb-4 text-green-700 flex items-center gap-2">
                    <span>💾</span> Space Complexity
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">
                        Extra Space:
                      </span>
                      <code className="px-3 py-1 rounded-md bg-green-100 text-green-700 font-mono text-sm">
                        O(1)
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">
                        In-place:
                      </span>
                      <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 font-bold text-sm">
                        Yes
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">
                        Stable:
                      </span>
                      <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 font-bold text-sm">
                        Yes
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-gray-100 border border-gray-200">
                <p className="text-sm leading-relaxed text-gray-700">
                  💡 <strong>Key Insight:</strong> The nested loop structure
                  gives bubble sort its characteristic O(n²) time complexity.
                  With n elements, we make approximately n×n comparisons in the
                  worst case.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Analogy */}
          <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold flex items-center gap-3 text-gray-900">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-xl">
                  🌍
                </div>
                <span>Real-World Analogy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <p className="text-lg leading-relaxed text-foreground font-semibold">
                🃏 Imagine youre organizing a deck of numbered cards:
              </p>
              <div className="p-6 rounded-lg border border-indigo-200 bg-indigo-50">
                <ol className="space-y-4">
                  <li className="flex gap-3 text-base leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      1
                    </span>
                    <span className="text-gray-700">
                      You hold the deck face up and look at the first two cards.
                    </span>
                  </li>
                  <li className="flex gap-3 text-base leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      2
                    </span>
                    <span className="text-gray-700">
                      If they&apos;re out of order, you swap them.
                    </span>
                  </li>
                  <li className="flex gap-3 text-base leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      3
                    </span>
                    <span className="text-gray-700">
                      Move to the next pair and repeat.
                    </span>
                  </li>
                  <li className="flex gap-3 text-base leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      4
                    </span>
                    <span className="text-gray-700">
                      After one full pass, the highest card is now at the end.
                    </span>
                  </li>
                  <li className="flex gap-3 text-base leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      5
                    </span>
                    <span className="text-gray-700">
                      Repeat the process, ignoring the already-sorted cards at
                      the end.
                    </span>
                  </li>
                  <li className="flex gap-3 text-base leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      6
                    </span>
                    <span className="text-gray-700">
                      Continue until no more swaps are needed.
                    </span>
                  </li>
                </ol>
              </div>
              <p className="text-lg leading-relaxed text-center text-gray-600 font-semibold">
                This is exactly what bubble sort does - simple, methodical, but
                not the fastest way to sort!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
