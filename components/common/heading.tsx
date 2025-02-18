import { DetailedHTMLProps, HTMLAttributes, JSX } from 'react'

import { cn } from '@/lib/utils'

export interface HeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

interface ClassObject {
  [key: number]: string
}

export const Heading = ({ className, level, children, ...rest }: HeadingProps) => {
  let HeadingTag = 'h1' as keyof JSX.IntrinsicElements

  switch (level) {
    case 1:
      HeadingTag = 'h1'
      break
    case 2:
      HeadingTag = 'h2'
      break
    case 3:
      HeadingTag = 'h3'
      break
    case 4:
      HeadingTag = 'h4'
      break
    case 5:
      HeadingTag = 'h5'
      break
    case 6:
      HeadingTag = 'h6'
      break
    default:
      // If an invalid level is provided, render h1 by default
      HeadingTag = 'h1'
      break
  }

  const customClasses: ClassObject = {
    1: 'text-4xl font-extrabold',
    2: 'text-2xl font-bold',
    3: 'text-xl font-semibold',
    4: 'text-lg font-semibold',
    5: 'text-base font-semibold',
    6: 'text-sm font-medium',
  }

  const headingClass = customClasses[level] || ''

  return (
    <HeadingTag className={cn('font-grotesk tracking-tight', headingClass, className)} {...rest}>
      {children}
    </HeadingTag>
  )
}
