import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '@/context/authSlice'
import useMessages from '@/context/zustand'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronDown } from 'lucide-react'
import Message from './Message'

const MessageContainer = () => {
  const { messages } = useMessages()
  const scrollAreaRef = useRef(null)
  const prevMessagesLength = useRef(messages.length)

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      setTimeout(() => {
        if (scrollAreaRef.current) {
          const scrollContainer = scrollAreaRef.current.querySelector(
            '[data-radix-scroll-area-viewport]'
          )
          if (scrollContainer) {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight,
              behavior: 'smooth'
            })
          }
        }
      }, 100)
    }
    prevMessagesLength.current = messages.length
  }, [messages])

  return (
    <div className='relative h-[80vh]'>
      <ScrollArea ref={scrollAreaRef} className='h-full p-4'>
        <div className='space-y-4'>
          {messages.map(message => (
            <Message key={message._id} message={message} />
          ))}
        </div>
        <div className='mt-6'></div>
      </ScrollArea>
    </div>
  )
}

export default MessageContainer
