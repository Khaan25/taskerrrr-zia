'use client'

import { useTasks } from '@/hooks/use-tasks'
import { Icons } from '@/components/icons'

import { BulkActionBar } from './bulk-action-bar'
import DeleteDialog from './dialogs/delete-dialog'
import { TaskFilterBar } from './task-filter-bar'
import { TaskPaginationControls } from './task-pagination-controls'
import { TaskTable } from './task-table'
import { useTaskListLogic } from './use-task-list-logic'

export default function TaskList() {
  const { tasks } = useTasks()
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
  } = useTaskListLogic()

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-dashed border-border p-12 sm:p-16">
        <Icons.empty className="size-48" />
        <div className="mt-4 text-center text-muted-foreground">No tasks yet. Create one to get started.</div>
      </div>
    )
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

          {/* Delete Dialog when clicked Delete button in BulkActionBar */}
          <DeleteDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            onClick={handleBulkDelete}
            content={{
              title: 'Are you absolutely sure?',
              description: `This action cannot be undone. This will permanently delete ${selectedTasks.length} ${selectedTasks.length === 1 ? 'task' : 'tasks'}.`,
            }}
          />
        </>
      )}
    </div>
  )
}
