import { Task, TASK_STATUS } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import TaskRowAction from './task-row-action'

interface KanbanCardProps {
  task: Task
}

export function KanbanCard({ task }: KanbanCardProps) {
  return (
    <Card className="cursor-move">
      <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
        <TaskRowAction task={task} />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Badge
          variant={task.status === 'completed' ? 'default' : 'outline'}
          className={task.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' : task.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}
        >
          {TASK_STATUS[task.status]}
        </Badge>
      </CardContent>
    </Card>
  )
}
