import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/authSlice'
import { useChatContext } from '@/context/chatSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Info } from 'lucide-react'
import React from 'react'

const ChatAreaHeader = () => {
  const { userData } = useAuthContext()
  const { selectedChat } = useChatContext()

  const one2oneMemebr = selectedChat?.members.filter(
    item => item.username != userData.username
  )[0]

  const thumbanil = selectedChat?.isGroup
    ? 'https://api.dicebear.com/9.x/adventurer/svg?seed=Eliza'
    : selectedChat?.members.filter(
        item => item.username != userData.username
      )[0].avatar

  return (
    <div>
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        <div className='flex items-center'>
          <Avatar className='w-10 h-10 mr-3'>
            <AvatarImage src={thumbanil}></AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div>
            <h2 className='font-semibold'>
              {selectedChat?.isGroup
                ? selectedChat?.name
                : one2oneMemebr?.username}
            </h2>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button variant='ghost' size='icon'>
            <Info className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatAreaHeader
