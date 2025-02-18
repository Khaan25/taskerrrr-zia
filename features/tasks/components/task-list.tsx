'use client'

import { TASK_PRIORITY, TASK_STATUS } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import TaskRowAction from './task-row-action'

export default function TaskList() {
  const { tasks } = useLocalStorage()

  if (tasks.length === 0) {
    return <div className="mt-4 text-center text-muted-foreground">No tasks yet. Create one to get started.</div>
  }

  return (
    <div className="mt-4">
      <Table>
        <TableCaption>A list of your tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge
                  variant={task.status === 'completed' ? 'default' : 'outline'}
                  className={cn(task.status === 'in_progress' && 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20', task.status === 'completed' && 'bg-green-500 hover:bg-green-600')}
                >
                  {TASK_STATUS[task.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    task.priority === 'urgent' && 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
                    task.priority === 'high' && 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
                    task.priority === 'medium' && 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
                    task.priority === 'low' && 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                  )}
                >
                  {TASK_PRIORITY[task.priority]}
                </Badge>
              </TableCell>
              <TableCell>
                <TaskRowAction task={task} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
