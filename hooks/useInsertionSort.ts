"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { insertionSortGenerator, generateRandomArray, shuffleArray, type InsertionSortStep, type InsertionItem } from "@/lib/insertionSort"

export function useInsertionSort(initialSize: number = 8) {
  const [currentStep, setCurrentStep] = useState<InsertionSortStep>(() => {
    if (typeof window === 'undefined') {
      return {
        array: [],
        comparing: [],
        current: null,
        sorted: [],
        explanation: "Click Play to start sorting!",
        codeHighlight: 0,
        currentPass: 0,
        totalPasses: 0,
        currentIndex: null,
        comparingIndex: null,
      }
    }
    const newArray = generateRandomArray(initialSize)
    return {
      array: newArray,
      comparing: [],
      current: null,
      sorted: [newArray[0].id],
      explanation: "Click Play to start sorting!",
      codeHighlight: 0,
      currentPass: 0,
      totalPasses: newArray.length - 1,
      currentIndex: null,
      comparingIndex: null,
    }
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(5)
  const [stepHistory, setStepHistory] = useState<InsertionSortStep[]>(() => {
    if (typeof window === 'undefined') return []
    const newArray = generateRandomArray(initialSize)
    return [{
      array: newArray,
      comparing: [],
      current: null,
      sorted: [newArray[0].id],
      explanation: "Click Play to start sorting!",
      codeHighlight: 0,
      currentPass: 0,
      totalPasses: newArray.length - 1,
      currentIndex: null,
      comparingIndex: null,
    }]
  })
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isDescending, setIsDescending] = useState(false)
  const generatorRef = useRef<Generator<InsertionSortStep> | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const reset = (customArray?: number[], descending?: boolean) => {
    setIsPlaying(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    let newArray: InsertionItem[]
    if (customArray && customArray.length > 0) {
      const timestamp = Date.now()
      newArray = customArray.map((value, index) => ({
        id: `custom-${timestamp}-${index}-${value}-${Math.random().toString(36).substring(2, 11)}`,
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
    const initialStep: InsertionSortStep = {
      array: newArray,
      comparing: [],
      current: null,
      sorted: [newArray[0].id],
      explanation: "Click Play to start sorting!",
      codeHighlight: 0,
      currentPass: 0,
      totalPasses: newArray.length - 1,
      currentIndex: null,
      comparingIndex: null,
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
      generatorRef.current = insertionSortGenerator(currentStep.array, isDescending)
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
