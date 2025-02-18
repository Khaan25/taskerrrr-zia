import { Check, Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface TableFilterDropdownProps {
  options: { label: string; value: string }[]
  selectedValue: string | null
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | null) => void
}

export function TableFilterDropdown({ options, selectedValue, onChange }: TableFilterDropdownProps) {
  const selectedOption = options.find((option) => option.value === selectedValue)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Filter className="mr-2 size-4" />
          {selectedOption ? selectedOption.label : 'Filter'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange(null)}>
          <Check className={`mr-2 size-4 ${!selectedValue ? 'opacity-100' : 'opacity-0'}`} />
          All
        </DropdownMenuItem>
        {options.map((option) => (
          <DropdownMenuItem key={option.value} onClick={() => onChange(option.value)}>
            <Check className={`mr-2 size-4 ${selectedValue === option.value ? 'opacity-100' : 'opacity-0'}`} />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
