'use client'
import * as React from 'react'
import { Check, ChevronsUpDown, XCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

type User = {
  value: string
  label: string
}

export const MultiSelectCombobox = ({ users, selectedUser, onChange }) => {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSelect = (user: User) => {
    const alreadySelected = selectedUser?.some(
      selected => selected.value === user.value
    )
    if (!alreadySelected) {
      onChange([...selectedUser, user])
    } else {
      onChange(selectedUser.filter(selected => selected.value !== user.value))
    }
    setOpen(false)
  }
  const filteredUsers = users.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between bg-slate-950 overflow-x-hidden'
          >
            {selectedUser?.length > 0
              ? selectedUser.map(opt => opt.label).join(', ')
              : 'Select users...'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0 bg-slate-900'>
          <Command>
            <CommandInput
              placeholder='Search emails...'
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {filteredUsers.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedUser?.some(opt => opt.value === option.value)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className=' mt-4 flex flex-wrap gap-4'>
        {selectedUser?.map(option => (
          <Badge variant='outline'>
            <div key={option.value} className='flex items-center space-x-2'>
              <span className='text-sm font-medium text-purple-100 ml-2'>
                {option.label}
              </span>
              <button
                type='button'
                onClick={() =>
                  onChange(
                    selectedUser.filter(opt => opt.value !== option.value)
                  )
                }
                className='text-rose-600 cursor-pointer'
              >
                <XCircleIcon className='h-5 w-5' />
              </button>
            </div>
          </Badge>
        ))}
      </div>
    </div>
  )
}
