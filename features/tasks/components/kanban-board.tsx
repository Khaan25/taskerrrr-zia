import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd'

import { TASK_PRIORITY, TaskPriority } from '@/lib/types'
import { useTasks } from '@/hooks/use-tasks'
import { Badge } from '@/components/ui/badge'

import { KanbanCard } from './kanban-card'
import TaskDialog from './task-dialog'

export default function KanbanBoard() {
  const { tasks, updateTasks } = useTasks()

  // Group tasks by priority
  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.priority]) {
        acc[task.priority] = []
      }
      acc[task.priority].push(task)
      return acc
    },
    {} as Record<TaskPriority, typeof tasks>
  )

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
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(TASK_PRIORITY).map(([priority, label]) => (
            <div key={priority} className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{label}</h3>
                  <Badge variant="outline" className="ml-2">
                    {groupedTasks[priority as TaskPriority]?.length ?? 0}
                  </Badge>
                </div>
                <TaskDialog>
                  <button className="text-sm text-muted-foreground hover:text-foreground">Add Task</button>
                </TaskDialog>
              </div>

              <Droppable droppableId={priority}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className={`flex-1 space-y-2 p-4 transition-colors ${snapshot.isDraggingOver ? 'bg-muted/50' : ''}`}>
                    {groupedTasks[priority as TaskPriority]?.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`${snapshot.isDragging ? 'opacity-50' : ''}`}>
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
