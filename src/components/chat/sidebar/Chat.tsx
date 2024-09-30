import { useAuthContext } from '@/context/authSlice'
import { setSelectedChat, useChatContext } from '@/context/chatSlice'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { useDispatch } from 'react-redux'

const Chat = ({ chat }) => {
  const dispatch = useDispatch()

  const { userData } = useAuthContext()

  const { selectedChat } = useChatContext()

  const oneToOneChatMemeber = chat.members.filter(
    item => item.username != userData.username
  )[0]

  const isSelectedChat = selectedChat?._id.toString() === chat._id.toString()

  const handleChatSelect = () => {
    dispatch(setSelectedChat({ chat: chat }))
  }

  return (
    <>
      <div
        key={chat.id}
        className={cn(
          'flex items-center p-4 hover:bg-gray-800 cursor-pointer',
          isSelectedChat && 'bg-muted-foreground hover:bg-muted-foreground'
        )}
        onClick={handleChatSelect}
      >
        <Avatar className={`w-12 h-12 mr-3`}>
          <AvatarImage src={oneToOneChatMemeber?.avatar}></AvatarImage>
          <AvatarFallback>{}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className='font-semibold'>
            {chat.isGroup ? chat.name : oneToOneChatMemeber.username}
          </h3>
          <p className='text-sm text-gray-400'>{}</p>
        </div>
      </div>
    </>
  )
}

export default Chat
