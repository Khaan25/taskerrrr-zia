'use client'

import { Trash2 } from 'lucide-react'

import { useTasks } from '@/hooks/use-tasks'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { Button } from './ui/button'

export default function DeleteAllBtn() {
  const { clearData } = useTasks()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={clearData} variant="destructive" size="icon" className="rounded-full">
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Delete All tasks</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
