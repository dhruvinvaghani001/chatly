import React from 'react'
import { useAuthContext } from '@/context/authSlice'
import { useChatContext } from '@/context/chatSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DialogPopUp from '@/components/ui/dialog-popup'
import moment from 'moment'
import useWindowsize from '@/hooks/useWindowsize'
import { cn } from '@/lib/utils'

const ImagePopupContent = ({ imageUrl, setIsOpen }) => (
  <div className='relative mt-8'>
    <img
      src={imageUrl}
      alt='Full size attachment'
      className='w-full h-auto max-h-[80vh] object-contain'
    />
  </div>
)

const Message = ({ message }) => {
  const { userData } = useAuthContext()
  const { selectedChat } = useChatContext()
  const { width } = useWindowsize()
  const isCurrentUser = message.sender._id === userData._id
  const isMobile = width < 768
  const getGridClass = filesCount => {
    if (isMobile) {
      return 'grid-cols-1'
    }
    switch (filesCount) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-2'
      case 3:
        return 'grid-cols-2'
      case 4:
        return 'grid-cols-2'
      default:
        return 'grid-cols-3'
    }
  }

  return (
    <div
      className={`flex ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      } animate-in slide-in-from-bottom-2`}
    >
      {!isCurrentUser && (
        <Avatar className='w-8 h-8 mr-2 bg-red-700'>
          <AvatarImage
            src={message.sender.avatar}
            alt={message.sender.username}
          />
          <AvatarFallback>
            {message.sender.username?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isCurrentUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        {selectedChat.isGroup && (
          <p className='text-sm font-medium mb-1'>
            {message.sender._id !== userData._id
              ? `@${message.sender.username}`
              : '@You'}
          </p>
        )}
        <p className='break-words mb-2 max-w-[10rem] md:max-w-xs '>
          {message.content}
        </p>

        {message?.attachmentFiles?.length > 0 && (
          <div
            className={`grid gap-2 ${getGridClass(
              message.attachmentFiles.length
            )}`}
          >
            {message.attachmentFiles.map((file, index) => (
              <DialogPopUp
                key={index}
                TriggerComponent={
                  <div
                    className={`relative cursor-pointer ${
                      message.attachmentFiles.length === 3 && index === 2
                        ? 'col-span-2'
                        : ''
                    }`}
                  >
                    <img
                      src={file.url}
                      alt={`Attachment ${index + 1}`}
                      className={cn(
                        'w-40 h-40 object-cover rounded-md hover:opacity-90 transition-opacity'
                      )}
                    />
                  </div>
                }
                ContentCompnent={({ setIsOpen }) => (
                  <ImagePopupContent
                    imageUrl={file.url}
                    setIsOpen={setIsOpen}
                  />
                )}
              />
            ))}
          </div>
        )}

        <span className='text-xs opacity-70 mt-3 block'>
          {moment(message.createdAt).format('Do MMM YY h:mm a')}
        </span>
      </div>
      {isCurrentUser && (
        <Avatar className='w-8 h-8 ml-2 bg-red-600'>
          <AvatarImage src={userData.avatar} alt={userData.username} />
          <AvatarFallback>{userData.username?.charAt(0) || 'M'}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export default Message
