import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import React from 'react'
import { DialogForm } from './DialogForm'

const MobileSidebar = ({ chats }) => {
  console.log('from mobile sidebar')
  return (
    <>
      <div className='w-16 md:hidden bg-gray-800 flex flex-col items-center py-4 space-y-4'>
        <h2 className='text-xs font-semibold mb-2'>Chats</h2>
        <DialogForm />
        {chats.map(chat => (
          <Avatar key={chat.id} className={`w-10 h-10 ${chat.color}`}>
            <AvatarFallback>{chat.avatar}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </>
  )
}

export default MobileSidebar
