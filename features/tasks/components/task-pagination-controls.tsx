import { Task } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface TaskPaginationControlsProps {
  currentPage: number

  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (page: number) => void
  filteredAndSortedTasks: Task[]
  itemsPerPage: number
}

export function TaskPaginationControls({ currentPage, setCurrentPage, filteredAndSortedTasks, itemsPerPage }: TaskPaginationControlsProps) {
  const totalPages = Math.ceil(filteredAndSortedTasks.length / itemsPerPage)

  // Current start and end of the page
  const start = (currentPage - 1) * itemsPerPage + 1
  const end = Math.min(currentPage * itemsPerPage, filteredAndSortedTasks.length)

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {start} to {end} of {filteredAndSortedTasks.length}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}
