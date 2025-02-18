import { Edit } from 'lucide-react'

import { TASK_PRIORITY, TASK_STATUS, TaskPriority, TaskStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TaskBulkEditDialogProps {
  selectedCount: number

  // eslint-disable-next-line no-unused-vars
  onUpdateStatus: (status: TaskStatus) => void

  // eslint-disable-next-line no-unused-vars
  onUpdatePriority: (priority: TaskPriority) => void
}

export function TaskBulkEditDialog({ selectedCount, onUpdateStatus, onUpdatePriority }: TaskBulkEditDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="gap-2">
          <Edit className="size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Bulk edit {selectedCount} {selectedCount === 1 ? 'task' : 'tasks'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select onValueChange={onUpdateStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TASK_STATUS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select onValueChange={onUpdatePriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TASK_PRIORITY).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
