'use client'

import { tasks } from '@/tasks'
import { Info } from 'lucide-react'

import { useTasks } from '@/hooks/use-tasks'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { Button } from './ui/button'

export default function SeedButton() {
  const { addTask } = useTasks()

  function SeedTasks() {
    // Convert tasks array to string and store in localStorage

    for (const task of tasks) {
      addTask(task)
    }
    console.log('✅ Tasks seeded successfully')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={SeedTasks} variant="secondary" size="icon" className="absolute bottom-4 right-4 rounded-full">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="end" sideOffset={40}>
          <p>Seed tasks</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
