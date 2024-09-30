import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { Button } from '../ui/button'
import { Info } from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Input } from '../ui/input'

const ChatArea = ({ messages }) => {
  return (
    <>
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-700'>
          <div className='flex items-center'>
            <Avatar className='w-10 h-10 mr-3 bg-orange-500'>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className='font-semibold'>Jane Doe</h2>
              <p className='text-sm text-gray-400'>Active 2 mins ago</p>
            </div>
          </div>
          <div className='flex space-x-2'>
            <Button variant='ghost' size='icon'>
              <Info className='h-5 w-5' />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className='flex-1 p-4'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              {!message.isUser && (
                <Avatar className='w-8 h-8 mr-2 bg-orange-500'>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] ${
                  message.isUser ? 'bg-blue-600' : 'bg-gray-700'
                } rounded-lg p-3`}
              >
                <p>{message.content}</p>
                <span className='text-xs text-gray-400 mt-1 block'>
                  {message.time}
                </span>
              </div>
              {message.isUser && (
                <Avatar className='w-8 h-8 ml-2'>
                  <AvatarImage src='/path-to-user-avatar.jpg' />
                  <AvatarFallback>JK</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className='p-4 border-t border-gray-700'>
          <div className='flex items-center'>
            <Input
              className='flex-1 bg-gray-800 border-gray-700 text-white'
              placeholder='Type a message...'
            />
            <Button className='ml-2' variant='ghost'>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatArea
