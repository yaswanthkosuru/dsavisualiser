export interface InsertionItem {
  id: string
  value: number
}

export interface InsertionSortStep {
  array: InsertionItem[]
  comparing: string[]
  current: string | null
  sorted: string[]
  explanation: string
  codeHighlight: number
  currentPass: number
  totalPasses: number
  currentIndex: number | null  // The 'i' position - element being inserted
  comparingIndex: number | null  // The 'j' position - element being compared
}

function createStep(
  array: InsertionItem[],
  comparing: string[],
  current: string | null,
  sorted: string[],
  explanation: string,
  codeHighlight: number,
  currentPass: number,
  totalPasses: number,
  currentIndex: number | null,
  comparingIndex: number | null
): InsertionSortStep {
  return { array, comparing, current, sorted, explanation, codeHighlight, currentPass, totalPasses, currentIndex, comparingIndex }
}

export function* insertionSortGenerator(initialArray: InsertionItem[], descending = false): Generator<InsertionSortStep> {
  const arr = [...initialArray]
  const n = arr.length
  const sorted: string[] = [arr[0].id]
  const totalPasses = n - 1

  const orderText = descending ? "descending (largest to smallest)" : "ascending (smallest to largest)"
  yield createStep(
    [...arr],
    [],
    null,
    [arr[0].id],
    `Starting Insertion Sort algorithm in ${orderText} order. The first element is already considered sorted.`,
    0,
    0,
    totalPasses,
    null,
    null
  )

  for (let i = 1; i < n; i++) {
    const currentPass = i
    const currentItem = arr[i]
    const currentValue = currentItem.value

    // Show the element being picked
    yield createStep(
      [...arr],
      [],
      currentItem.id,
      [...sorted],
      `Picking element at position ${i} (value: ${currentValue}) to insert into the sorted portion.`,
      1,
      currentPass,
      totalPasses,
      i,
      null
    )

    // Find the correct position by comparing WITHOUT modifying the array
    let insertPos = i
    for (let j = i - 1; j >= 0; j--) {
      const shouldShift = descending
        ? arr[j].value < currentValue
        : arr[j].value > currentValue

      // Show comparison (array is still unmodified)
      yield createStep(
        [...arr],
        [arr[j].id],
        currentItem.id,
        [...sorted],
        `Comparing ${currentValue} with ${arr[j].value}. ${shouldShift ? `${arr[j].value} > ${currentValue}, need to shift.` : 'Found correct position.'}`,
        2,
        currentPass,
        totalPasses,
        i,
        j
      )

      if (shouldShift) {
        insertPos = j
      } else {
        break
      }
    }

    // Now do the actual insertion using splice (remove then insert)
    if (insertPos < i) {
      // Create new array with element moved
      const newArr = [...arr]
      const removed = newArr.splice(i, 1)[0]
      newArr.splice(insertPos, 0, removed)
      // Update arr reference
      arr.length = 0
      arr.push(...newArr)
    }

    yield createStep(
      [...arr],
      [],
      null,
      [...sorted],
      `Inserted ${currentValue} at position ${insertPos}.`,
      4,
      currentPass,
      totalPasses,
      null,
      null
    )

    // Add all elements from 0 to i to sorted (they're all in correct relative positions now)
    for (let k = 0; k <= i; k++) {
      if (!sorted.includes(arr[k].id)) {
        sorted.push(arr[k].id)
      }
    }

    yield createStep(
      [...arr],
      [],
      null,
      [...sorted],
      `Pass ${i} complete. First ${i + 1} elements are now sorted: ${arr.slice(0, i + 1).map(item => item.value).join(', ')}`,
      5,
      currentPass,
      totalPasses,
      null,
      null
    )
  }

  // Mark all as sorted
  const allSorted = arr.map(item => item.id)

  yield createStep(
    [...arr],
    [],
    null,
    allSorted,
    "Insertion Sort complete! All elements are now sorted.",
    6,
    totalPasses,
    totalPasses,
    null,
    null
  )
}

let uniqueIdCounter = 0

export function generateRandomArray(size: number = 8, min: number = 10, max: number = 99): InsertionItem[] {
  const timestamp = Date.now()
  const baseId = uniqueIdCounter++
  return Array.from({ length: size }, (_, i) => ({
    id: `card-${timestamp}-${baseId}-${i}-${Math.random().toString(36).substring(2, 11)}`,
    value: Math.floor(Math.random() * (max - min + 1)) + min
  }))
}

export function shuffleArray(array: InsertionItem[]): InsertionItem[] {
  const values = array.map(item => item.value)

  // Fisher-Yates shuffle algorithm
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = values[i]
    values[i] = values[j]
    values[j] = temp
  }

  const timestamp = Date.now()
  const baseId = uniqueIdCounter++
  return values.map((value, index) => ({
    id: `card-${timestamp}-${baseId}-${index}-${Math.random().toString(36).substring(2, 11)}`,
    value
  }))
}
