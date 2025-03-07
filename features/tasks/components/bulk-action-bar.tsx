import { Edit, Trash2 } from 'lucide-react'

import { TaskPriority, TaskStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'

import { TaskBulkEditDialog } from './task-bulk-edit-dialog'

interface BulkActionBarProps {
  selectedTasks: string[]

  // eslint-disable-next-line no-unused-vars
  onUpdateStatus: (status: TaskStatus) => void

  // eslint-disable-next-line no-unused-vars
  onUpdatePriority: (priority: TaskPriority) => void
  onDeleteClick: () => void
}

export function BulkActionBar({ selectedTasks, onUpdateStatus, onUpdatePriority, onDeleteClick }: BulkActionBarProps) {
  if (selectedTasks.length === 0) return null

  const selectedTasksText = selectedTasks.length + ' ' + (selectedTasks.length === 1 ? 'task' : 'tasks')

  return (
    <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border bg-background px-4 py-2 shadow-lg">
      <TaskBulkEditDialog selectedCount={selectedTasks.length} onUpdateStatus={onUpdateStatus} onUpdatePriority={onUpdatePriority}>
        <Button variant="secondary" size="sm" className="gap-2">
          <Edit className="size-4" />
          Edit {selectedTasksText}
        </Button>
      </TaskBulkEditDialog>

      <Button variant="destructive" size="sm" onClick={onDeleteClick} className="gap-2">
        <Trash2 className="size-4" />
        Delete {selectedTasksText}
      </Button>
    </div>
  )
}
