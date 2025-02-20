import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'

import { SortDirection } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface TableSortButtonProps {
  label: string
  active: boolean
  direction: SortDirection
  onClick: () => void
}

export function TableSortButton({ label, active, direction, onClick }: TableSortButtonProps) {
  return (
    <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[active=true]:font-bold" onClick={onClick} data-active={active}>
      {label}
      {direction === 'asc' ? <ArrowUpIcon className="ml-2 size-4" /> : direction === 'desc' ? <ArrowDownIcon className="ml-2 size-4" /> : <ChevronsUpDownIcon className="ml-2 size-4" />}
    </Button>
  )
}
