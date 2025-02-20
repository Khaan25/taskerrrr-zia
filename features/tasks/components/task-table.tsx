import { Task } from '@/lib/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { TableSortButton } from './table-sort-button'
import { TaskPriorityBadge } from './task-priority-badge'
import TaskRowAction from './task-row-action'
import { TaskStatusBadge } from './task-status-badge'

interface TaskTableProps {
  paginatedTasks: Task[]
  selectedTasks: string[]

  // eslint-disable-next-line no-unused-vars
  onSort: (field: 'title' | 'status' | 'priority') => void

  // eslint-disable-next-line no-unused-vars
  onSelectTask: (taskId: string) => void
  onSelectAll: () => void
  sortField: 'title' | 'status' | 'priority' | null
  sortDirection: 'asc' | 'desc' | null
}

export function TaskTable({ paginatedTasks, selectedTasks, onSort, onSelectTask, onSelectAll, sortField, sortDirection }: TaskTableProps) {
  // Check if all tasks on the current page are selected
  const areAllCurrentPageTasksSelected = paginatedTasks.every((task) => selectedTasks.includes(task.id))

  return (
    <Table>
      <TableCaption>A list of your tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox checked={areAllCurrentPageTasksSelected} onCheckedChange={onSelectAll} />
          </TableHead>
          <TableHead>
            <TableSortButton label="Title" onClick={() => onSort('title')} active={sortField === 'title'} direction={sortField === 'title' ? sortDirection : null} />
          </TableHead>
          <TableHead>
            <TableSortButton label="Status" onClick={() => onSort('status')} active={sortField === 'status'} direction={sortField === 'status' ? sortDirection : null} />
          </TableHead>
          <TableHead>
            <TableSortButton label="Priority" onClick={() => onSort('priority')} active={sortField === 'priority'} direction={sortField === 'priority' ? sortDirection : null} />
          </TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedTasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Checkbox checked={selectedTasks.includes(task.id)} onCheckedChange={() => onSelectTask(task.id)} />
            </TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>
              <TaskStatusBadge status={task.status} />
            </TableCell>
            <TableCell>
              <TaskPriorityBadge priority={task.priority} />
            </TableCell>
            <TableCell>
              <TaskRowAction task={task} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
