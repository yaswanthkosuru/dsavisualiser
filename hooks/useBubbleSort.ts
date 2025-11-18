"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { bubbleSortGenerator, generateRandomArray, shuffleArray, type SortStep, type BubbleItem } from "@/lib/bubbleSort"

export function useBubbleSort(initialSize: number = 8) {
  const [currentStep, setCurrentStep] = useState<SortStep>({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    explanation: "Click Play to start sorting!",
    codeHighlight: 0,
    currentPass: 0,
    totalPasses: 0,
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(5)
  const [stepHistory, setStepHistory] = useState<SortStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isDescending, setIsDescending] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const generatorRef = useRef<Generator<SortStep> | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize only on client side
  useEffect(() => {
    if (!initialized && typeof window !== 'undefined') {
      const newArray = generateRandomArray(initialSize)
      const initialStep: SortStep = {
        array: newArray,
        comparing: [],
        swapping: [],
        sorted: [],
        explanation: "Click Play to start sorting!",
        codeHighlight: 0,
        currentPass: 0,
        totalPasses: newArray.length - 1,
      }
      setCurrentStep(initialStep)
      setStepHistory([initialStep])
      setInitialized(true)
    }
  }, [initialized, initialSize])

  const reset = (customArray?: number[], descending?: boolean) => {
    setIsPlaying(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    let newArray: BubbleItem[]
    if (customArray && customArray.length > 0) {
      newArray = customArray.map((value, index) => ({
        id: `${value}-${index}`,
        value,
      }))
    } else {
      // Shuffle the current array values instead of generating new ones
      newArray = shuffleArray(currentStep.array.length > 0 ? currentStep.array : generateRandomArray(initialSize))
    }

    if (descending !== undefined) {
      setIsDescending(descending)
    }

    generatorRef.current = null
    const initialStep: SortStep = {
      array: newArray,
      comparing: [],
      swapping: [],
      sorted: [],
      explanation: "Click Play to start sorting!",
      codeHighlight: 0,
      currentPass: 0,
      totalPasses: newArray.length - 1,
    }
    setCurrentStep(initialStep)
    setStepHistory([initialStep])
    setCurrentStepIndex(0)
  }

  const playPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const goToNextStep = useCallback(() => {
    if (!generatorRef.current) {
      generatorRef.current = bubbleSortGenerator(currentStep.array, isDescending)
      // Skip the initial intro step
      generatorRef.current.next()
    }

    const { value, done } = generatorRef.current.next()

    if (done || !value) {
      setIsPlaying(false)
      return false
    }

    setCurrentStep(value)
    setStepHistory((prev) => [...prev, value])
    setCurrentStepIndex((prev) => prev + 1)
    return true
  }, [currentStep.array, isDescending])

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1
      setCurrentStep(stepHistory[prevIndex])
      setCurrentStepIndex(prevIndex)
    }
  }

  const goToNext = () => {
    if (currentStepIndex < stepHistory.length - 1) {
      // Go to next from history
      const nextIndex = currentStepIndex + 1
      setCurrentStep(stepHistory[nextIndex])
      setCurrentStepIndex(nextIndex)
    } else {
      // Generate next step
      goToNextStep()
    }
  }

  useEffect(() => {
    if (isPlaying) {
      const delay = 1000 / speed
      timeoutRef.current = setTimeout(() => {
        const hasNext = goToNextStep()
        if (!hasNext) {
          setIsPlaying(false)
        }
      }, delay)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isPlaying, currentStepIndex, speed, goToNextStep])

  return {
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    playPause,
    reset,
    goToPreviousStep,
    goToNext,
    canGoPrevious: currentStepIndex > 0,
    canGoNext: true, // Always can generate next or go to next in history
    currentStepIndex,
    isDescending,
    setIsDescending,
  }
}
