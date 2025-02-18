import { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import Description from './description'
import { Heading } from './heading'

type PageHeaderProps = ComponentProps<'div'> & {
  title: string | ReactNode
  titleClassName?: string

  description: string | ReactNode
  descriptionClassName?: string

  children?: ReactNode
}

export default function PageHeader({ children, title, titleClassName, description, descriptionClassName, className, ...props }: PageHeaderProps) {
  return (
    <>
      <div className={cn('flex w-full items-center justify-between gap-4', className)} {...props}>
        <div>
          <Heading level={2} className={titleClassName}>
            {title}
          </Heading>
          <Description className={cn('line-clamp-1 text-sm text-muted-foreground', descriptionClassName)}>{description}</Description>
        </div>

        {children}
      </div>

      {/* <Separator className="my-4" /> */}
    </>
  )
}
