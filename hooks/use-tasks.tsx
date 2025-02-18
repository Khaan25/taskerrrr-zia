import { useEffect, useState } from 'react'
import { tasks as initialTasks } from '@/tasks'

import { Task, TaskFormValues } from '@/lib/types'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  // Load tasks from localStorage on mount, fallback to initial tasks if none exist
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      setTasks(initialTasks)
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (values: TaskFormValues) => {
    const newTask: Task = {
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
      ...values,
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = (id: number, values: Partial<TaskFormValues>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...values,
            }
          : task
      )
    )
  }

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  }
}
