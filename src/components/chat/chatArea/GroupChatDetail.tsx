import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useAuthContext } from '@/context/authSlice'
import { useChatContext } from '@/context/chatSlice'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Minus, MinusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import React from 'react'

const GroupChatDetail = ({ open, setIsOpen }) => {
  const { selectedChat } = useChatContext()
  const { userData } = useAuthContext()
  const isGroupChat = selectedChat.isGroup
  const oneToOneChatMemeber = selectedChat.members.filter(
    item => item.username != userData.username
  )[0]

  const members = selectedChat?.members

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>{selectedChat.name}</DialogTitle>
        <DialogDescription>Group Chat</DialogDescription>
      </DialogHeader>
      <div>
        {members.map(member => (
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Avatar>
                <AvatarImage
                  className='w-12 h-12 '
                  src={member.avatar}
                  alt={member.username}
                />
              </Avatar>
              {member.username}
              <div className='ml-2'>
                {member._id == selectedChat.admin && <Badge>Admin</Badge>}
              </div>
            </div>
            {userData._id == selectedChat.admin && (
              <div>
                <Button
                  variant={'destructive'}
                  className='w-8 h-8'
                  size={'icon'}
                >
                  <MinusCircle className='w-5'></MinusCircle>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default GroupChatDetail
