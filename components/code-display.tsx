"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CodeDisplayProps {
  highlightedLine: number
}

const codeLines = [
  { line: 0, code: "function bubbleSort(arr) {", indent: 0 },
  { line: 1, code: "for (let i = 0; i < arr.length - 1; i++) {", indent: 1 },
  { line: 2, code: "for (let j = 0; j < arr.length - i - 1; j++) {", indent: 2 },
  { line: 3, code: "if (arr[j] > arr[j + 1]) {", indent: 3 },
  { line: 4, code: "// Swap elements", indent: 4 },
  { line: 5, code: "[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]", indent: 4 },
  { line: 6, code: "}", indent: 3 },
  { line: 7, code: "}", indent: 2 },
  { line: 8, code: "}", indent: 1 },
  { line: 9, code: "return arr", indent: 1 },
  { line: 10, code: "}", indent: 0 },
]

const lineMapping: { [key: number]: number } = {
  0: 0,  // Start
  1: 3,  // Comparing
  2: 5,  // Swapping
  3: 8,  // Pass complete
  4: 10, // Complete
}

export function CodeDisplay({ highlightedLine }: CodeDisplayProps) {
  const actualLine = lineMapping[highlightedLine] ?? 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Algorithm Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-muted p-4 font-mono text-sm">
          {codeLines.map(({ line, code, indent }) => (
            <div
              key={line}
              className={cn(
                "py-1 px-2 -mx-2 rounded transition-colors",
                line === actualLine && "bg-yellow-500/20 border-l-2 border-yellow-500"
              )}
              style={{ paddingLeft: `${indent * 1 + 0.5}rem` }}
            >
              <span className={cn(
                line === actualLine ? "text-foreground font-semibold" : "text-muted-foreground"
              )}>
                {code}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
