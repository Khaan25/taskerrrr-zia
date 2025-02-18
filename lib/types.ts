export const TASK_STATUS = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
} as const

export const TASK_PRIORITY = {
  none: 'None',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
} as const

export type TaskStatus = keyof typeof TASK_STATUS
export type TaskPriority = keyof typeof TASK_PRIORITY

export type Task = {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
}

export type TaskFormValues = Omit<Task, 'id'>
