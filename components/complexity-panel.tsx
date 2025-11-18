"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ComplexityPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Algorithm Complexity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">Time Complexity</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Best Case:</span>
              <code className="bg-muted px-2 py-0.5 rounded">O(n)</code>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Average Case:</span>
              <code className="bg-muted px-2 py-0.5 rounded">O(n²)</code>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Worst Case:</span>
              <code className="bg-muted px-2 py-0.5 rounded">O(n²)</code>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Space Complexity</h4>
          <p className="text-sm">
            <code className="bg-muted px-2 py-0.5 rounded">O(1)</code>
            <span className="text-muted-foreground ml-2">- In-place sorting</span>
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Properties</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Stable sorting algorithm</li>
            <li>• In-place (no extra space needed)</li>
            <li>• Simple to implement</li>
            <li>• Inefficient for large datasets</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
