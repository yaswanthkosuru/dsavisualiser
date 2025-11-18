"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

interface BottomControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onReset: () => void
  onPrevious: () => void
  onNext: () => void
  speed: number
  onSpeedChange: (speed: number) => void
  canGoPrevious: boolean
  canGoNext: boolean
}

export function BottomControls({
  isPlaying,
  onPlayPause,
  onReset,
  onPrevious,
  onNext,
  speed,
  onSpeedChange,
  canGoPrevious,
  canGoNext,
}: BottomControlsProps) {

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t backdrop-blur-xl shadow-2xl">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-center gap-5 flex-wrap">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevious}
            disabled={!canGoPrevious || isPlaying}
            className="h-11 w-11 rounded-xl disabled:opacity-40 hover:scale-105 transition-all border-2 shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            className="h-14 w-14 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all border-0 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isPlaying ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7 ml-0.5" />
            )}
          </Button>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            disabled={!canGoNext || isPlaying}
            className="h-11 w-11 rounded-xl disabled:opacity-40 hover:scale-105 transition-all border-2 shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Divider */}
          <div className="h-10 w-px bg-border opacity-50" />

          {/* Speed Control */}
          <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-muted/50">
            <span className="text-sm font-semibold whitespace-nowrap">Speed:</span>
            <div className="w-32">
              <Slider
                min={1}
                max={10}
                step={1}
                value={[speed]}
                onValueChange={(value) => onSpeedChange(value[0])}
              />
            </div>
            <span className="text-sm font-bold w-9 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {speed}x
            </span>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-border opacity-50" />

          {/* Reset Button */}
          <Button
            variant="outline"
            size="default"
            onClick={onReset}
            className="h-11 px-5 rounded-xl hover:scale-105 transition-all border-2 shadow-md font-semibold"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
