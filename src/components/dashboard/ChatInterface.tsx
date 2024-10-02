import React, { useEffect, useState } from 'react'
import ChatArea from './chat-area/ChatArea'
import Sidebar from './sidebar/Sidebar'
import { useChatContext } from '@/context/chatSlice'
import useMessages from '@/context/zustand'
import { requestHandler } from '@/lib/requestHandler'
import { getMessagesByChatId } from '@/api'
import toast from 'react-hot-toast'
import useListenMessages from '@/hooks/useListenMessages'
import useListenChat from '@/hooks/useListenChat'

const ChatInterface = () => {
  const { setMessages } = useMessages()
  const [loading, setLoading] = useState()

  const { selectedChat } = useChatContext()

  useEffect(() => {
    if (selectedChat) {
      requestHandler(
        async () => await getMessagesByChatId(selectedChat?._id),
        setLoading,
        res => {
          const { data } = res
          setMessages(data)
        },
        err => {
          toast.error(err)
        }
      )
    }
  }, [selectedChat?._id])

  return (
    <div className='flex h-screen bg-background'>
      <Sidebar />

      {/* Chat Area */}
      {selectedChat && <ChatArea />}
      {!selectedChat && (
        <div className='h-[100vh] w-full flex items-center justify-center'>
          <h2 className='text-2xl md:text-5xl text-primary font-extrabold tracking-wider font-sans'>
            Start Chatting Now . . .
          </h2>
        </div>
      )}
    </div>
  )
}

export default ChatInterface
