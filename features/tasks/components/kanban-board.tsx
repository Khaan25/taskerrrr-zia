import { DragDropContext, DropResult } from '@hello-pangea/dnd'

import { TaskPriority } from '@/lib/types'
import { groupTasksByPriority } from '@/lib/utils'
import { useTasks } from '@/hooks/use-tasks'

import KanbanBoardColumns from './kanban/kanban-board-columns'

export default function KanbanBoard() {
  const { tasks, updateTasks } = useTasks()

  const groupedTasks = groupTasksByPriority(tasks)

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside a valid droppable
    if (!destination) return

    // Get source and destination columns
    const sourceCol = source.droppableId as TaskPriority
    const destCol = destination.droppableId as TaskPriority

    // Create a new array from the source column
    const sourceItems = [...groupedTasks[sourceCol]]
    const destItems = sourceCol === destCol ? sourceItems : [...(groupedTasks[destCol] || [])]

    // Remove the dragged item from source
    const [removed] = sourceItems.splice(source.index, 1)

    // If priority changed, update the task's priority
    const updatedTask = sourceCol !== destCol ? { ...removed, priority: destCol } : removed

    // Insert the item at the destination
    destItems.splice(destination.index, 0, updatedTask)

    // Create new state
    const newGroupedTasks = {
      ...groupedTasks,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    }

    // Flatten and update tasks
    const newTasks = Object.values(newGroupedTasks).flat()
    updateTasks(newTasks)
  }

  return (
    <div className="mt-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        <KanbanBoardColumns groupedTasks={groupedTasks} />
      </DragDropContext>
    </div>
  )
}
