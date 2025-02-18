import React, { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type DescriptionProps = ComponentProps<'p'>

export default function Description({ className, ...props }: DescriptionProps) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}
