'use client'

import { useTasks } from '@/hooks/use-tasks'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

import { BulkActionBar } from './bulk-action-bar'
import { TaskFilterBar } from './task-filter-bar'
import { TaskPaginationControls } from './task-pagination-controls'
import { TaskTable } from './task-table'
import { useTaskListLogic } from './use-task-list-logic'

export default function TaskList() {
  const { tasks, updateTasks } = useTasks()
  const {
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
  } = useTaskListLogic(tasks, updateTasks)

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
        onFilterChange={handleFilterChange}
      />

      {paginatedTasks.length === 0 ? (
        <div className="mt-4 text-center text-muted-foreground">No tasks match the current filters</div>
      ) : (
        <>
          <TaskTable
            paginatedTasks={paginatedTasks}
            selectedTasks={selectedTasks}
            onSort={handleSort}
            onSelectTask={handleSelectTask}
            onSelectAll={handleSelectAll}
            sortField={sortField}
            sortDirection={sortDirection}
          />

          <TaskPaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} filteredAndSortedTasks={filteredAndSortedTasks} itemsPerPage={10} />

          <BulkActionBar selectedTasks={selectedTasks} onUpdateStatus={handleBulkUpdateStatus} onUpdatePriority={handleBulkUpdatePriority} onDeleteClick={() => setShowDeleteDialog(true)} />

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
