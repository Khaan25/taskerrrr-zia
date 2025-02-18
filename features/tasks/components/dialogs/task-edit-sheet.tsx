'use client'

import { forwardRef, HTMLAttributes, Ref, useState } from 'react'

import { Task } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { dropdownMenuItemClassName } from '@/components/ui/dropdown-menu'

import { TaskForm } from '../task-form'

export type EditTaskSheetProps = { task: Task }

export const EditTaskButton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref: Ref<HTMLDivElement>) => {
  return (
    <div className={cn(dropdownMenuItemClassName, className)} {...props} ref={ref}>
      Edit
      {/* <DropdownMenuShortcut>E</DropdownMenuShortcut> */}
    </div>
  )
})

type TaskEditSheetProps = {
  task: Task
}

export default function TaskEditSheet({ task }: TaskEditSheetProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 968px)')

  const title = 'Edit Task'
  const description = "Edit your task details below. Click 'Save' when you're done."

  function handleSuccess() {
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <EditTaskButton />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <TaskForm task={task} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <EditTaskButton />
      </DrawerTrigger>

      <DrawerContent>
        <div className="vs-container vs-paddingX w-full overflow-y-auto">
          <DrawerHeader className="p-0 pt-4">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          <TaskForm task={task} onSuccess={handleSuccess} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
