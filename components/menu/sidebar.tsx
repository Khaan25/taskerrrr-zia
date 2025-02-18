'use client'

import { ComponentProps } from 'react'
import { menu } from '@/constant/menu'

import { cn } from '@/lib/utils'

import MenuList from './menu-list'

type SidebarProps = ComponentProps<'aside'>

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('pb-12', className)}>
      <MenuList menu={menu} />
    </aside>
  )
}
