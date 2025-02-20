'use client'

import { tasks } from '@/tasks'
import { Info } from 'lucide-react'
import { toast } from 'sonner'

import { useTasks } from '@/hooks/use-tasks'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { Button } from './ui/button'

export default function SeedButton() {
  const { addTask } = useTasks()

  function handleSeedTasks() {
    try {
      // Add each task from the seed data
      tasks.forEach((task) => {
        addTask(task)
      })
    } catch (error) {
      toast.error('Failed to seed tasks')
      console.error('Error seeding tasks:', error)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleSeedTasks} variant="secondary">
            <Info /> Seed Tasks
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Seed tasks</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
