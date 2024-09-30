import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { PenSquare } from 'lucide-react'
import AddChatForm from './AddChatForm'

export function DialogForm () {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <PenSquare className='h-5 w-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Start a new Chat</DialogTitle>
          <DialogDescription>
            Select a user to start a conversation.Add multiple users to start a
            group conversation
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <AddChatForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
