import { TASK_PRIORITY, TaskPriority } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface TaskPriorityBadgeProps {
  priority: TaskPriority
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        priority === 'urgent' && 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
        priority === 'high' && 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
        priority === 'medium' && 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
        priority === 'low' && 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      )}
    >
      {TASK_PRIORITY[priority]}
    </Badge>
  )
}
