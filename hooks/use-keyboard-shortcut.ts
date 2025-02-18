'use client'

import { useEffect } from 'react'

type ModifierKeys = {
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  metaKey?: boolean
}

export default function useKeyboardShortcut(func: () => void, key: string, modifiers?: ModifierKeys) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      //   if (e.key === 'n' && (e.metaKey || e.altKey)) {
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ((modifiers?.ctrlKey && e.ctrlKey) || (modifiers?.altKey && e.altKey) || (modifiers?.shiftKey && e.shiftKey) || (modifiers?.metaKey && e.metaKey))
      ) {
        e.preventDefault()
        func()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
}
