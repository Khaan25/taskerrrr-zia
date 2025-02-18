'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

import { TASK_PRIORITY, TASK_STATUS } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useTasks } from '@/hooks/use-tasks'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { TableSortButton } from './table-sort-button'
import { TaskFilterBar } from './task-filter-bar'
import TaskRowAction from './task-row-action'

type SortField = 'title' | 'status' | 'priority'
type SortDirection = 'asc' | 'desc' | null

export default function TaskList() {
  const { tasks , deleteTasks} = useTasks()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc')
      if (sortDirection === 'desc') setSortField(null)
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectTask = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredAndSortedTasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(filteredAndSortedTasks.map((task) => task.id))
    }
  }

  const handleBulkDelete = () => {
    const remainingTasks = tasks.filter((task) => !selectedTasks.includes(task.id))
    deleteTasks(remainingTasks)
    setSelectedTasks([])
    setShowDeleteDialog(false)
  }

  const filteredAndSortedTasks =
    tasks
      ?.filter((task) => {
        if (!task) return false

        // Search filter
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false
        }

        // Status filter
        if (statusFilter && task.status !== statusFilter) {
          return false
        }

        // Priority filter
        if (priorityFilter && task.priority !== priorityFilter) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        if (!sortField || !sortDirection) return 0
        const aValue = a[sortField]
        const bValue = b[sortField]
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }) || []

  if (!tasks || tasks.length === 0) {
    return <div className="mt-4 text-center text-muted-foreground">No tasks yet. Create one to get started.</div>
  }

  return (
    <div className="relative mt-4">
      <TaskFilterBar
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
      />
      {filteredAndSortedTasks.length === 0 ? (
        <div className="mt-4 text-center text-muted-foreground">No tasks match the current filters</div>
      ) : (
        <>
          <Table>
            <TableCaption>A list of your tasks</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox checked={selectedTasks.length === filteredAndSortedTasks.length} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>
                  <TableSortButton label="Title" active={sortField === 'title'} direction={sortField === 'title' ? sortDirection : null} onClick={() => handleSort('title')} />
                </TableHead>
                <TableHead>
                  <TableSortButton label="Status" active={sortField === 'status'} direction={sortField === 'status' ? sortDirection : null} onClick={() => handleSort('status')} />
                </TableHead>
                <TableHead>
                  <TableSortButton label="Priority" active={sortField === 'priority'} direction={sortField === 'priority' ? sortDirection : null} onClick={() => handleSort('priority')} />
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox checked={selectedTasks.includes(task.id)} onCheckedChange={() => handleSelectTask(task.id)} />
                  </TableCell>
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

          {selectedTasks.length > 0 && (
            <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border bg-background px-4 py-2 shadow-lg">
              <span className="text-sm font-medium">
                {selectedTasks.length} {selectedTasks.length === 1 ? 'task' : 'tasks'} selected
              </span>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)} className="gap-2">
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          )}

          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {selectedTasks.length} {selectedTasks.length === 1 ? 'task' : 'tasks'}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  )
}
