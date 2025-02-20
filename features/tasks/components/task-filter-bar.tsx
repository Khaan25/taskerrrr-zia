import { Search, X } from 'lucide-react'

import { TASK_PRIORITY, TASK_STATUS } from '@/lib/types'
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
  onStatusChange: (value: string | null) => void
  // eslint-disable-next-line no-unused-vars
  onPriorityChange: (value: string | null) => void
  onFilterChange: () => void
}

export function TaskFilterBar({ searchQuery, statusFilter, priorityFilter, onSearchChange, onStatusChange, onPriorityChange }: TaskFilterBarProps) {
  const statusOptions = [
    { value: 'not_started', label: TASK_STATUS.not_started },
    { value: 'in_progress', label: TASK_STATUS.in_progress },
    { value: 'completed', label: TASK_STATUS.completed },
  ]

  const priorityOptions = [
    { value: 'low', label: TASK_PRIORITY.low },
    { value: 'medium', label: TASK_PRIORITY.medium },
    { value: 'high', label: TASK_PRIORITY.high },
    { value: 'urgent', label: TASK_PRIORITY.urgent },
  ]

  const hasActiveFilters = searchQuery || statusFilter || priorityFilter

  const clearFilters = () => {
    onSearchChange('')
    onStatusChange(null)
    onPriorityChange(null)
  }

  return (
    <div className="mb-4 flex items-center gap-0.5">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute left-2.5 top-3 size-4 text-muted-foreground" />
        <Input placeholder="Search tasks..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="pl-8" />
      </div>
      <div className="flex items-center gap-0.5">
        <TableFilterDropdown options={statusOptions} selectedValue={statusFilter} onChange={onStatusChange} />
        <TableFilterDropdown options={priorityOptions} selectedValue={priorityFilter} onChange={onPriorityChange} />
        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters} className="!ml-2 size-6 p-2 text-destructive hover:bg-destructive/10 hover:text-destructive">
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
