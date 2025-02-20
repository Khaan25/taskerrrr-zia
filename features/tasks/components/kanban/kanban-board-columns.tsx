import { Draggable, Droppable } from '@hello-pangea/dnd'

import { Task, TASK_PRIORITY, TaskPriority } from '@/lib/types'
import { cn } from '@/lib/utils'

import { KanbanCard } from '../kanban-card'
import KanbanColumnHeader from './kanban-column-header'

type KanbanBoardColumnsProps = {
  groupedTasks: Record<string, Task[]>
}

export default function KanbanBoardColumns({ groupedTasks }: KanbanBoardColumnsProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Object.entries(TASK_PRIORITY).map(([priority, label]) => (
        <div key={priority} className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
          <KanbanColumnHeader label={label} groupedTasks={groupedTasks} priority={priority} />

          <Droppable droppableId={priority}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={cn('flex-1 space-y-2 p-4 transition-colors', snapshot.isDraggingOver && 'bg-muted/50')}>
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
  )
}
