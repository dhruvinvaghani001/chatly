import { deleteUnreadMessages } from '@/api'
import { useAuthContext } from '@/context/authSlice'
import {
  removeUnnreadMessages,
  setSelectedChat,
  useChatContext
} from '@/context/chatSlice'
import { requestHandler } from '@/lib/requestHandler'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Bell } from 'lucide-react'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

const Chat = ({ chat }) => {
  const [isSelecting, setIsSelecting] = useState(false)
  const dispatch = useDispatch()

  const { userData } = useAuthContext()
  const { selectedChat, unreadMessages } = useChatContext()

  const isSelectedChat = selectedChat?._id.toString() === chat._id.toString()

  const oneToOneChatMemeber = chat.members.filter(
    item => item.username != userData.username
  )[0]

  const notificationCount = unreadMessages?.filter(
    message => message.chat.toString() == chat._id.toString()
  ).length

  // on selection of chat update to redux store and clear unreadmessages
  const handleChatSelect = () => {
    dispatch(setSelectedChat({ chat: chat }))
    requestHandler(
      async () => await deleteUnreadMessages(chat._id),
      setIsSelecting,
      res => {},
      err => {
        toast.error(err)
      }
    )
    dispatch(removeUnnreadMessages({ chatId: chat?._id.toString() }))
  }

  return (
    <>
      <div
        key={chat.id}
        className={cn(
          'flex items-center justify-between p-4 hover:bg-gray-800 cursor-pointer mt-2',
          isSelectedChat && 'bg-muted-foreground hover:bg-muted-foreground',
          notificationCount && 'border-2 border-destructive'
        )}
        onClick={handleChatSelect}
      >
        <div className='flex items-center'>
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
        <div>
          <div className=''>
            {notificationCount > 0 ? (
              <NotificationBell count={notificationCount}></NotificationBell>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat

const NotificationBell = ({ count = 0 }) => {
  return (
    <motion.div
      className='relative inline-block cursor-pointer'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Bell
        size={28}
        className='text-foreground/80 hover:text-foreground transition-colors duration-200'
      />
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className='absolute -top-2 -right-2 flex items-center justify-center'
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }
              }}
              className='absolute w-full h-full bg-red-500 rounded-full opacity-25'
            />
            <div className='relative bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1'>
              {count > 99 ? '99+' : count}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
