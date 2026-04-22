import { useState, useCallback } from 'react'

// copy text to clipboard hook
type UseCopyTextReturn = readonly [
  isCopying: boolean,
  copyText: (text: string) => Promise<void>,
]

export function useCopyText(): UseCopyTextReturn {
  const [isCopying, setIsCopying] = useState(false)

  const handleCopyText = async (text: string): Promise<void> => {
    // Modern browsers
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }

    // Legacy fallback (deprecated but still works)
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'

    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    try {
      document.execCommand('copy')
    } finally {
      document.body.removeChild(textarea)
    }
  }

  const copyText = useCallback(async (text: string) => {
    try {
      await handleCopyText(text)
      setIsCopying(true)
      setTimeout(() => setIsCopying(false), 1000)
    } catch {
      setIsCopying(false)
    }
  }, [])

  return [isCopying, copyText] as const
}
