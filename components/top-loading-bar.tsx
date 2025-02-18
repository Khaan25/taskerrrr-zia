'use client'

import { useTheme } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'

export default function TopLoadingBar() {
  const { resolvedTheme } = useTheme()
  const color = resolvedTheme === 'light' ? '#09090b' : resolvedTheme === 'dark' ? '#ffffff' : '#09090b'

  return <NextTopLoader color={color} showSpinner={false} />
}
