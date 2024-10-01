import ChatAreaHeader from './ChatAreaHeader'
import MessageConatiner from './MessageContainer'
import ChatInput from './ChatInput'

const ChatArea = () => {
  return (
    <>
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <ChatAreaHeader />

        {/* Messages */}
        <MessageConatiner />

        {/* Input Area */}
        <ChatInput />
      </div>
    </>
  )
}

export default ChatArea
