"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"
import { useTheme } from "@/contexts/theme-context"

interface ExplanationPanelProps {
  explanation: string
}

export function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  const { isBlackWhite } = useTheme()

  return (
    <Card className="card-enhanced rounded-xl border-2">
      <CardHeader className="pb-4">
        <CardTitle className={`text-lg font-bold flex items-center gap-2 ${
          isBlackWhite ? 'text-foreground' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
        }`}>
          <svg className={`w-5 h-5 ${isBlackWhite ? 'text-foreground' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Current Step
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          key={explanation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-4 rounded-lg border ${
            isBlackWhite
              ? 'bg-gray-100 border-gray-300'
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
          }`}
        >
          <p className="text-sm leading-relaxed font-medium text-foreground">
            {explanation}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}
