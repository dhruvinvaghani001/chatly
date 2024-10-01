import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { PenSquare } from 'lucide-react'
import AddChatForm from './AddChatForm'
import { useState } from 'react'

export function DialogForm () {
  const [open, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon' onClick={handleOpen}>
          <PenSquare className='h-5 w-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] shadow-sm shadow-card-background'>
        <AddChatForm open={open} setIsOpen={setIsOpen}></AddChatForm>
      </DialogContent>
    </Dialog>
  )
}
