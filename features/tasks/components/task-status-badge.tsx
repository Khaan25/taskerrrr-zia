import { TASK_STATUS, TaskStatus } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface TaskStatusBadgeProps {
  status: TaskStatus
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <Badge
      variant={status === 'completed' ? 'default' : 'outline'}
      className={cn('text-nowrap', status === 'in_progress' && 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20', status === 'completed' && 'bg-green-500 hover:bg-green-600')}
    >
      {TASK_STATUS[status]}
    </Badge>
  )
}
