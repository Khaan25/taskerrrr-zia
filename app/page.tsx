'use client'

import KanbanBoard from '@/features/tasks/components/kanban-board'
import TaskDialog from '@/features/tasks/components/task-dialog'
import TaskList from '@/features/tasks/components/task-list'
import { LayoutGrid, List } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PageContainer from '@/components/common/page-container'
import PageHeader from '@/components/common/page-header'
import DeleteAllBtn from '@/components/delete-all-btn'
import SeedButton from '@/components/seed-button'

export default function Page() {
  return (
    <PageContainer>
      <PageHeader title="Tasks" description="Manage all tasks.">
        <div className="flex items-center gap-4">
          <DeleteAllBtn />
          <SeedButton />
          <TaskDialog />
        </div>
      </PageHeader>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">
            <List className="mr-2 size-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="kanban">
            <LayoutGrid className="mr-2 size-4" />
            Kanban View
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <TaskList />
        </TabsContent>
        <TabsContent value="kanban">
          <KanbanBoard />
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}
