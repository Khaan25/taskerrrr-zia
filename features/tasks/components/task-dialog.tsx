'use client'

import { ReactNode, useState } from 'react'

import { Task } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { TaskForm } from './task-form'

type TaskDialogProps = {
  task?: Task
  onSuccess?: () => void
  children?: ReactNode
}

export default function TaskDialog({ task, onSuccess, children }: TaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const title = task ? 'Edit Task' : 'Create Task'
  const description = task ? 'Edit an existing task.' : 'Create a new task.'

  function handleSuccess() {
    setIsOpen(false)
    onSuccess?.()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children ?? <Button>{title}</Button>}</DialogTrigger>
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
