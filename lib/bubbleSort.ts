export interface BubbleItem {
  id: string
  value: number
}

export interface SortStep {
  array: BubbleItem[]
  comparing: number[]
  swapping: number[]
  sorted: number[]
  explanation: string
  codeHighlight: number
  currentPass: number
  totalPasses: number
}

function createStep(
  array: BubbleItem[],
  comparing: number[],
  swapping: number[],
  sorted: number[],
  explanation: string,
  codeHighlight: number,
  currentPass: number,
  totalPasses: number
): SortStep {
  return { array, comparing, swapping, sorted, explanation, codeHighlight, currentPass, totalPasses }
}

export function* bubbleSortGenerator(initialArray: BubbleItem[], descending = false): Generator<SortStep> {
  const arr = [...initialArray]
  const n = arr.length
  const sorted: number[] = []
  const totalPasses = n - 1

  const orderText = descending ? "descending (largest to smallest)" : "ascending (smallest to largest)"
  yield createStep(
    [...arr],
    [],
    [],
    [],
    `Starting Bubble Sort algorithm in ${orderText} order. We'll compare adjacent elements and swap them if they're in the wrong order.`,
    0,
    0,
    totalPasses
  )

  for (let i = 0; i < n - 1; i++) {
    const currentPass = i + 1

    for (let j = 0; j < n - i - 1; j++) {
      const shouldSwap = descending
        ? arr[j].value < arr[j + 1].value
        : arr[j].value > arr[j + 1].value

      // Comparing phase
      yield createStep(
        [...arr],
        [j, j + 1],
        [],
        [...sorted],
        `Comparing ${arr[j].value} and ${arr[j + 1].value}. ${shouldSwap ? 'They are out of order, will swap.' : 'They are in correct order.'}`,
        1,
        currentPass,
        totalPasses
      )

      if (shouldSwap) {
        const valJ = arr[j].value
        const valJPlus1 = arr[j + 1].value

        // Swapping phase
        const swapStep: SortStep = createStep(
          [...arr],
          [],
          [j, j + 1],
          [...sorted],
          `Swapping ${valJ} and ${valJPlus1}`,
          2,
          currentPass,
          totalPasses
        )
        yield swapStep

        // Perform swap
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp

        // Show after swap
        const afterSwapStep: SortStep = createStep(
          [...arr],
          [],
          [],
          [...sorted],
          `Swapped! New order: ${arr.join(', ')}`,
          2,
          currentPass,
          totalPasses
        )
        yield afterSwapStep
      }
    }

    // Mark the last element of this pass as sorted
    sorted.push(n - i - 1)

    yield createStep(
      [...arr],
      [],
      [],
      [...sorted],
      `Pass ${i + 1} complete. Element at position ${n - i - 1} (value: ${arr[n - i - 1].value}) is now in its final position.`,
      3,
      currentPass,
      totalPasses
    )
  }

  // Mark all as sorted
  const allSorted = Array.from({ length: n }, (_, i) => i)

  yield createStep(
    [...arr],
    [],
    [],
    allSorted,
    "Bubble Sort complete! All elements are now sorted.",
    4,
    totalPasses,
    totalPasses
  )
}

let uniqueIdCounter = 0

export function generateRandomArray(size: number = 8, min: number = 10, max: number = 99): BubbleItem[] {
  const baseId = uniqueIdCounter++
  return Array.from({ length: size }, (_, i) => ({
    id: `bubble-${baseId}-${i}`,
    value: Math.floor(Math.random() * (max - min + 1)) + min
  }))
}

export function shuffleArray(array: BubbleItem[]): BubbleItem[] {
  const values = array.map(item => item.value)

  // Fisher-Yates shuffle algorithm
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = values[i]
    values[i] = values[j]
    values[j] = temp
  }

  const baseId = uniqueIdCounter++
  return values.map((value, index) => ({
    id: `bubble-${baseId}-${index}`,
    value
  }))
}
