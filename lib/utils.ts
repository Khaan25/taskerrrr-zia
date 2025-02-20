import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

import { Task, TaskPriority } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  return uuidv4()
}

export function groupTasksByPriority(tasks: Task[]) {
  return tasks.reduce(
    (acc, task) => {
      // if the priority is not in the accumulator
      if (!acc[task.priority]) {
        // create an empty array for the priority
        acc[task.priority] = []
      }

      // add the task to the priority
      acc[task.priority].push(task)
      return acc
    },
    {} as Record<TaskPriority, typeof tasks>
  )
}
