'use client'

import { menu } from '@/constant/menu'
import { Menu } from 'lucide-react'

import { DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog'

import { Button } from '../ui/button'
import MenuList from './menu-list'

export default function MobileMenu() {
  return (
    <DialogTrigger>
      <Button variant="ghost" className="h-fit p-1 lg:hidden">
        <Menu />
      </Button>

      <DialogOverlay>
        <DialogContent className="p-0 sm:max-w-[425px]">
          <MenuList menu={menu} />
        </DialogContent>
      </DialogOverlay>
    </DialogTrigger>
  )
}
