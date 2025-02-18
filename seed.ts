'use client'

import { tasks } from '@/tasks'

import { useTasks } from './hooks/use-tasks'
import { Task } from './lib/types'

export function SeedTasks() {
  const { addTask } = useTasks()

  // Convert tasks array to string and store in localStorage

  tasks.map((task) => addTask(task as Task))
  console.log('✅ Tasks seeded successfully')
}
