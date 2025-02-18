import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'

import { Task } from '@/lib/types'
import { useTasks } from '@/hooks/use-tasks'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, dropdownMenuItemClassName, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import DeleteSheet from './dialogs/delete-sheet'
import { EditTaskButton } from './dialogs/task-edit-sheet'
import TaskDialog from './task-dialog'

type TaskRowActionProps = {
  task: Task
}

export default function TaskRowAction({ task }: TaskRowActionProps) {
  const { removeTask } = useTasks()
  const [open, setOpen] = useState(false)

  function handleDelete() {
    removeTask(task.id)
    setOpen(false)
  }

  function handleEditSuccess() {
    setOpen(false)
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="!pli-0 ml-auto flex size-8 data-[state=open]:bg-muted">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <TaskDialog task={task} onSuccess={handleEditSuccess}>
            <EditTaskButton />
          </TaskDialog>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <DeleteSheet
            handleClick={handleDelete}
            trigger={
              <div className={dropdownMenuItemClassName}>
                Delete
                <DropdownMenuShortcut>⌘ ⌫</DropdownMenuShortcut>
              </div>
            }
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
