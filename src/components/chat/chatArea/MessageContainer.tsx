import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/authSlice'
import useMessages from '@/context/zustand'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import moment from 'moment'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import useListenMessages from '@/hooks/useListenMessages'

const MessageContainer = () => {
  const { messages } = useMessages()
  const { userData } = useAuthContext()
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    if (!containerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const atBottom = scrollHeight - scrollTop === clientHeight
    setIsScrolledToBottom(atBottom)
    setShowScrollButton(scrollTop > 100)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useListenMessages()

  return (
    <ScrollArea ref={containerRef} className='flex-1 p-4 overflow-y-scroll'>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender._id === userData._id
              ? 'justify-end'
              : 'justify-start'
          } mb-4`}
        >
          {message.sender._id !== userData._id && (
            <Avatar className='w-8 h-8 mr-2 bg-red-600 rounded-full'>
              <AvatarImage src={message?.sender?.avatar} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-[70%] ${
              message.sender._id === userData._id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted-foreground text-foreground'
            } rounded-lg p-3`}
          >
            <p>{message.content}</p>
            <span className='text-xs text-foreground mt-1 block'>
              {moment(message.createdAt).format('Do MMM YY, h:mm a')}
            </span>
          </div>
          {message.sender._id === userData._id && (
            <Avatar className='w-8 h-8 ml-2 bg-red-700 rounded-full'>
              <AvatarImage src={message?.sender?.avatar} />
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
      {showScrollButton && (
        <div className='fixed bottom-24'>
          <Button
            variant='destructive'
            className='rounded-full'
            onClick={isScrolledToBottom ? scrollToTop : scrollToBottom}
          >
            {isScrolledToBottom ? (
              <ArrowBigUp className='w-5' />
            ) : (
              <ArrowBigDown className='w-5' />
            )}
          </Button>
        </div>
      )}
    </ScrollArea>
  )
}

export default MessageContainer
