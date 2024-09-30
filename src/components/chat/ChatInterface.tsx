import React from 'react'
import ChatArea from './ChatArea'
import Sidebar from './sidebar/Sidebar'

const ChatInterface = () => {
  const messages = [
    {
      sender: 'Jane Doe',
      content: 'Hey, Jakob',
      time: '10:00 AM',
      isUser: false
    },
    { sender: 'Jakob', content: 'Hey!', time: '10:01 AM', isUser: true },
    {
      sender: 'Jane Doe',
      content: 'How are you?',
      time: '10:02 AM',
      isUser: false
    },
    {
      sender: 'Jakob',
      content: 'I am good, you?',
      time: '10:03 AM',
      isUser: true
    }
  ]

  return (
    <div className='flex h-screen bg-gray-900 text-white'>
      {/* Compact Sidebar for Small Devices */}
      <Sidebar />

      {/* Chat Area */}
      <ChatArea messages={messages} />
    </div>
  )
}

export default ChatInterface
