import * as React from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
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

export function Combobox ({ options, value, setValue, loading }) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? options.find(option => option.value === value)?.label
            : 'Select options ...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput
            placeholder='Search options...'
            onValueChange={setSearch}
            value={search}
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {loading ? (
                <Loader2 className='animate-spin' />
              ) : (
                filteredOptions.map(opt => (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => {
                      setValue(opt.value)
                      setOpen(false)
                    }}
                  >
                    {opt.label}
                    {value === opt.value && (
                      <Check className='ml-auto h-4 w-4' />
                    )}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
