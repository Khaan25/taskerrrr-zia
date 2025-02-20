import { Task } from '@/lib/types'

import { useLocalStorage } from './use-localstorage'

export const useTasks = () => {
  const [value, setValue, removeValue] = useLocalStorage<Task[]>('tasks', [])

  const addTask = (newTask: Task) => {
    setValue((currentTasks) => [...currentTasks, newTask])
  }

  const removeTask = (id: string) => {
    const filteredTasks = value.filter((task) => task.id !== id)
    setValue(filteredTasks)
  }

  const updateTask = (updatedValue: Task) => {
    const updatedTasks = value.map((task) => (task.id === updatedValue.id ? updatedValue : task))
    setValue(updatedTasks)
  }

  const updateTasks = (updatedValue: Task[]) => {
    setValue(updatedValue)
  }

  const clearData = () => {
    removeValue()
  }

  return {
    tasks: value,
    addTask,
    removeTask,
    updateTask,
    updateTasks,
    clearData,
  }
}
