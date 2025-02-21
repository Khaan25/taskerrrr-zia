import { Search, X } from 'lucide-react'

import { TASK_PRIORITY, TASK_STATUS, TaskPriority, TaskStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { TableFilterDropdown } from './table-filter-dropdown'

interface TaskFilterBarProps {
  searchQuery: string
  statusFilter: string | null
  priorityFilter: string | null

  // eslint-disable-next-line no-unused-vars
  onSearchChange: (value: string) => void

  // eslint-disable-next-line no-unused-vars
  onStatusChange: (value: TaskStatus | null) => void

  // eslint-disable-next-line no-unused-vars
  onPriorityChange: (value: TaskPriority | null) => void

  onFilterChange: () => void
}

const statusOptions = [
  { value: 'not_started', label: `Status: ${TASK_STATUS.not_started}` },
  { value: 'in_progress', label: `Status: ${TASK_STATUS.in_progress}` },
  { value: 'completed', label: `Status: ${TASK_STATUS.completed}` },
]

const priorityOptions = [
  { value: 'low', label: `Priority: ${TASK_PRIORITY.low}` },
  { value: 'medium', label: `Priority: ${TASK_PRIORITY.medium}` },
  { value: 'high', label: `Priority: ${TASK_PRIORITY.high}` },
  { value: 'urgent', label: `Priority: ${TASK_PRIORITY.urgent}` },
]

export function TaskFilterBar({ searchQuery, statusFilter, priorityFilter, onSearchChange, onStatusChange, onPriorityChange }: TaskFilterBarProps) {
  // Check if there are any active filters
  const hasActiveFilters = searchQuery || statusFilter || priorityFilter

  // Clear filters
  const clearFilters = () => {
    onSearchChange('')
    onStatusChange(null)
    onPriorityChange(null)
  }

  return (
    <div className="mb-4 flex items-center gap-0.5">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute left-2.5 top-3 size-4 text-muted-foreground" />
        <Input placeholder="Search task titles..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="pl-8" />
      </div>

      <div className="flex items-center gap-0.5">
        <TableFilterDropdown options={statusOptions} selectedValue={statusFilter} onChange={(value) => onStatusChange(value as TaskStatus | null)} defaultLabel="Filter by Status" />
        <TableFilterDropdown options={priorityOptions} selectedValue={priorityFilter} onChange={(value) => onPriorityChange(value as TaskPriority | null)} defaultLabel="Filter by Priority" />

        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters} className="!ml-2 size-6 p-2 text-destructive hover:bg-destructive/10 hover:text-destructive">
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
