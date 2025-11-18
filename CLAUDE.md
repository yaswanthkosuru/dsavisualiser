# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 project for creating YouTube tutorials on sorting algorithms, starting with Bubble Sort visualization. The project uses:
- **Next.js 16.0.3** with App Router
- **React 19.2.0**
- **TypeScript** (strict mode enabled)
- **Tailwind CSS v4** with PostCSS
- **shadcn/ui** for UI components
- **Motion library (motion)** for animations (React 19 compatible)
- **pnpm** as the package manager

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start

# Run linter
pnpm lint
```

## Architecture

### Project Structure
```
app/                    # Next.js App Router
  ├── page.tsx         # Main sorting visualizer page
  ├── layout.tsx       # Root layout with fonts
  └── globals.css      # Global styles + shadcn theme
components/
  ├── ui/              # shadcn/ui components (Button, Card, Slider)
  ├── navbar.tsx       # Control navbar (Play/Pause/Speed/Reset)
  ├── bubble-visualizer.tsx    # Animated bubble visualization
  ├── explanation-panel.tsx    # Step-by-step explanation
  ├── code-display.tsx         # Algorithm code with highlighting
  └── complexity-panel.tsx     # Time/space complexity info
lib/
  ├── utils.ts         # cn() utility for className merging
  └── bubbleSort.ts    # Bubble sort generator algorithm
hooks/
  └── useBubbleSort.ts # Custom hook for sort animation state
```

### Animation System
- **Motion library** (not framer-motion) for React 19 compatibility
  - Import from `motion/react`: `import { motion } from "motion/react"`
- **Generator-based algorithm**: `lib/bubbleSort.ts` uses generator functions to yield each step
- **State management**: `useBubbleSort` hook manages animation playback, speed, and state
- **Colored bubble states**:
  - Blue: Unsorted elements
  - Yellow: Comparing elements
  - Red: Swapping elements
  - Green: Sorted elements

### UI Components System
- **shadcn/ui** components manually created (Button, Card, Slider)
- Configuration in `components.json`
- Utility function `cn()` in `lib/utils.ts` for className merging
- All components support dark mode via CSS variables

### Styling Setup
- **Tailwind CSS v4** with `@theme inline` configuration in `globals.css`
- Full shadcn color palette using HSL values
- CSS variables for theming defined in `:root` and `.dark` classes
- Dark mode via `prefers-color-scheme` media query
- Geist fonts loaded via `next/font/google`

### TypeScript Configuration
- Path alias: `@/*` maps to root directory
- Target: ES2017
- Strict mode enabled
- **Important**: Avoid array destructuring assignment syntax in generator functions
  - Use temp variables instead: `const temp = arr[i]; arr[i] = arr[j]; arr[j] = temp`
  - TypeScript's strict mode can have issues with `[arr[i], arr[j]] = [arr[j], arr[i]]` in generators

## Key Patterns

### Adding New Sorting Algorithms
1. Create generator function in `lib/` (e.g., `lib/quickSort.ts`)
2. Use `createStep()` helper to yield SortStep objects
3. Create custom hook in `hooks/` to manage state
4. Update visualizer component to handle new comparison/swap patterns
5. Update code display with algorithm-specific code

### Animation Controls
- Play/Pause toggles `isPlaying` state
- Speed (1-10x) controls interval between steps
- Reset generates new random array and resets generator
- All controls are in the sticky navbar component

## Important Notes

- Use `motion` package, NOT `framer-motion` (React 19 compatibility)
- shadcn components are manually created due to registry connection issues
- Generator functions must explicitly type all yield values
- The visualizer uses Motion's `layout` animations for smooth transitions
- Responsive design: 3-column grid on desktop (2 cols for viz, 1 for sidebar)