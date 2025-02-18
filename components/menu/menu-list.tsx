'use client'

import { ComponentProps } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from '@/constant/menu'

import { cn } from '@/lib/utils'

import { Heading } from '../common/heading'
import { buttonVariants } from '../ui/button'

type MenuListProps = ComponentProps<'div'> & {
  menu: Menu[]
}

export default function MenuList({ className, menu, ...props }: MenuListProps) {
  const pathname = usePathname()

  return (
    <div className={cn('space-y-4 py-4', className)} {...props}>
      <div className="p-2">
        <Link href="/" className="inline-block">
          <Heading level={2} className="mb-4 px-2 text-lg">
            Milk Management
          </Heading>
        </Link>

        <div className="space-y-1">
          {menu.map((menu) => (
            <Link key={`${menu.title}-${menu.href}`} href={menu.href} className={cn(buttonVariants({ variant: pathname === menu.href ? 'secondary' : 'ghost' }), 'w-full justify-start gap-2 p-2')}>
              <menu.icon size={15} />
              {menu.title}
            </Link>
          ))}
        </div>
      </div>

      {/* If we want to have another list */}
      {/* <div className="px-3 py-2">
    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Library</h2>
    <div className="space-y-1">
      <Button variant="ghost" className="w-full justify-start">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
          <path d="M21 15V6" />
          <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M12 12H3" />
          <path d="M16 6H3" />
          <path d="M12 18H3" />
        </svg>
        Playlists
      </Button>
    </div>
  </div> */}
    </div>
  )
}
