import { Task, TaskPriority } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

import TaskDialog from '../task-dialog'

type KanbanColumnHeaderProps = {
  label: string
  groupedTasks: Record<string, Task[]>
  priority: string
}

export default function KanbanColumnHeader({ label, groupedTasks, priority }: KanbanColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{label}</h3>
        <Badge variant="outline" className="ml-2">
          {groupedTasks[priority as TaskPriority]?.length ?? 0}
        </Badge>
      </div>
      <TaskDialog>
        <button className="text-sm text-muted-foreground hover:text-foreground">Add Task</button>
      </TaskDialog>
    </div>
  )
}
