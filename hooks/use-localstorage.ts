import { Task } from '@/lib/types'

import { useBaseLocalStorage } from './use-base-localstorage'

export const useLocalStorage = () => {
  const [value, addValue, removeValue] = useBaseLocalStorage<Task[]>('tasks', [])

  const addTask = (newValue: Task) => addValue([...value, newValue])

  const removeTask = (id: string) => {
    const filteredTasks = value.filter((task) => task.id !== id)
    addValue(filteredTasks)
  }

  const updateTask = (updatedValue: Task) => {
    const updatedTasks = value.map((task) => (task.id === updatedValue.id ? updatedValue : task))
    addValue(updatedTasks)
  }

  const clearData = () => {
    removeValue()
  }

  return {
    tasks: value,
    addTask,
    removeTask,
    updateTask,
    clearData,
  }
}
