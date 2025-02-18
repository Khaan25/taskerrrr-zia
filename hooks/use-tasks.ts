import { Task } from '@/lib/types'

import { useLocalStorage } from './use-localstorage'

export const useTasks = () => {
  const [value, addValue, removeValue] = useLocalStorage<Task[]>('tasks', [])

  const addTask = (newValue: Task) => addValue([...value, newValue])

  const removeTask = (id: string) => {
    const filteredTasks = value.filter((task) => task.id !== id)
    addValue(filteredTasks)
  }

  const updateTask = (updatedValue: Task) => {
    const updatedTasks = value.map((task) => (task.id === updatedValue.id ? updatedValue : task))
    addValue(updatedTasks)
  }

  const deleteTasks = (updatedValue: Task[]) => {
    addValue(updatedValue)
  }

  const clearData = () => {
    removeValue()
  }

  return {
    tasks: value,
    addTask,
    removeTask,
    updateTask,
    deleteTasks,
    clearData,
  }
}
