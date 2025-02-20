import { useState } from 'react'

import { Task, TaskPriority, TaskStatus } from '@/lib/types'

type SortField = 'title' | 'status' | 'priority'
type SortDirection = 'asc' | 'desc' | null

const ITEMS_PER_PAGE = 10

// eslint-disable-next-line no-unused-vars
export function useTaskListLogic(tasks: Task[], updateTasks: (tasks: Task[]) => void) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSort = (field: SortField) => {
    setCurrentPage(1)
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

  const handleBulkDelete = () => {
    const remainingTasks = tasks.filter((task) => !selectedTasks.includes(task.id))
    updateTasks(remainingTasks)
    setSelectedTasks([])
    setShowDeleteDialog(false)
  }

  const handleBulkUpdateStatus = (status: TaskStatus) => {
    const updatedTasks = tasks.map((task) => (selectedTasks.includes(task.id) ? { ...task, status } : task))
    updateTasks(updatedTasks)
  }

  const handleBulkUpdatePriority = (priority: TaskPriority) => {
    const updatedTasks = tasks.map((task) => (selectedTasks.includes(task.id) ? { ...task, priority } : task))
    updateTasks(updatedTasks)
  }

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const filteredAndSortedTasks =
    tasks
      ?.filter((task) => {
        if (!task) return false
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false
        }
        if (statusFilter && task.status !== statusFilter) {
          return false
        }
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
