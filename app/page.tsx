import TaskDialog from '@/features/tasks/components/task-dialog'
import TaskList from '@/features/tasks/components/task-list'

import PageContainer from '@/components/common/page-container'
import PageHeader from '@/components/common/page-header'
import SeedButton from '@/components/seed-button'

export default function Page() {
  return (
    <PageContainer>
      <PageHeader title="Tasks" description="Manage all tasks.">
        <TaskDialog />
      </PageHeader>

      <TaskList />

      <SeedButton />
    </PageContainer>
  )
}
