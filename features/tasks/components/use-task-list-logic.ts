import { useState } from 'react'

import { SortDirection, SortField, TaskPriority, TaskStatus } from '@/lib/types'
import { useTasks } from '@/hooks/use-tasks'

const ITEMS_PER_PAGE = 10

export function useTaskListLogic() {
  const { tasks, updateTasks } = useTasks()

  // We could also debounce this
  const [searchQuery, setSearchQuery] = useState('')

  // Sorting - title, status, priority
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  // Filtering - status, priority
  const [statusFilter, setStatusFilter] = useState<TaskStatus | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | null>(null)

  // Selection - selected tasks
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  // Delete dialog - show delete dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Sorting - title, status, priority
  const handleSort = (field: SortField) => {
    setCurrentPage(1)

    // If the field is the same as the current sort field, toggle the sort direction
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc')

      // If the sort direction is descending, reset the sort field
      if (sortDirection === 'desc') setSortField(null)
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Selection - selected tasks
  const handleSelectTask = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  // Selection - select all tasks on the current page
  const handleSelectAll = () => {
    // Get the IDs of tasks on the current page
    const currentPageTaskIds = paginatedTasks.map((task) => task.id)

    // If all current page tasks are selected, deselect them
    // Otherwise, select all current page tasks
    const allCurrentPageTasksSelected = currentPageTaskIds.every((id) => selectedTasks.includes(id))

    if (allCurrentPageTasksSelected) {
      // Remove current page tasks from selection
      setSelectedTasks((prev) => prev.filter((id) => !currentPageTaskIds.includes(id)))
    } else {
      // Add current page tasks to selection (avoiding duplicates)
      setSelectedTasks((prev) => {
        const newSelection = new Set([...prev, ...currentPageTaskIds])
        return Array.from(newSelection)
      })
    }
  }

  // Delete dialog - delete selected tasks
  const handleBulkDelete = () => {
    const remainingTasks = tasks.filter((task) => !selectedTasks.includes(task.id))
    updateTasks(remainingTasks)

    // Clear selection and hide delete dialog
    setSelectedTasks([])
    setShowDeleteDialog(false)
  }

  // Bulk update status - update the status of selected tasks
  const handleBulkUpdateStatus = (status: TaskStatus) => {
    const updatedTasks = tasks.map((task) => (selectedTasks.includes(task.id) ? { ...task, status } : task))
    updateTasks(updatedTasks)
  }

  // Bulk update priority - update the priority of selected tasks
  const handleBulkUpdatePriority = (priority: TaskPriority) => {
    const updatedTasks = tasks.map((task) => (selectedTasks.includes(task.id) ? { ...task, priority } : task))
    updateTasks(updatedTasks)
  }

  // Filtering - change filters
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const filteredAndSortedTasks =
    tasks
      ?.filter((task) => {
        // If the task is not defined, return false
        if (!task) return false

        // If the search query is not empty, perform case-insensitive search
        if (searchQuery) {
          const normalizedTitle = task.title.toLowerCase().trim()
          const normalizedQuery = searchQuery.toLowerCase().trim()

          // Simple exact match instead of word splitting
          return normalizedTitle.includes(normalizedQuery)
        }

        // If the status filter is not empty and the task status does not match the status filter, return false
        if (statusFilter && task.status !== statusFilter) {
          return false
        }

        // If the priority filter is not empty and the task priority does not match the priority filter, return false
        if (priorityFilter && task.priority !== priorityFilter) {
          return false
        }

        return true
      })
      // Sort the tasks based on the sort field and direction
      .sort((a, b) => {
        if (!sortField || !sortDirection) return 0
        const aValue = a[sortField]
        const bValue = b[sortField]
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }) || []

  // Get the tasks for the current page
  const paginatedTasks = filteredAndSortedTasks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return {
    searchQuery,
    statusFilter,
    priorityFilter,
    selectedTasks,
    currentPage,
    showDeleteDialog,
    paginatedTasks,
    filteredAndSortedTasks,
    handleSort,
    handleSelectTask,
    handleSelectAll,
    handleBulkDelete,
    handleBulkUpdateStatus,
    handleBulkUpdatePriority,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    handleFilterChange,
    setShowDeleteDialog,
    setCurrentPage,
    sortField,
    sortDirection,
  }
}
