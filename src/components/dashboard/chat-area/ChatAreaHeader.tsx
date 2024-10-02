import { Button } from '@/components/ui/button'
import DialogPopUp from '@/components/ui/dialog-popup'
import { useAuthContext } from '@/context/authSlice'
import { setSelectedChat, useChatContext } from '@/context/chatSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Info, Loader2, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { requestHandler } from '@/lib/requestHandler'
import { deleteChats } from '@/api'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import GroupChatDetail from './group-chat/GroupChatDetail'
import { DeleteAlertDialogDemo } from '@/components/ui/delete-alert-dialog'

const ChatAreaHeader = () => {
  const { userData } = useAuthContext()
  const { selectedChat } = useChatContext()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const one2oneMemebr = selectedChat?.members.filter(
    item => item.username != userData.username
  )[0]

  const a = 1
  const thumbanil = selectedChat?.isGroup
    ? 'https://api.dicebear.com/9.x/adventurer/svg?seed=Eliza'
    : selectedChat?.members.filter(
        item => item.username != userData.username
      )[0].avatar

  const handleDeleteChat = async () => {
    requestHandler(
      async () =>
        await deleteChats({
          type: selectedChat.isGroup,
          chatId: selectedChat?._id
        }),
      setLoading,
      res => {
        const { data } = res
        dispatch(setSelectedChat({ chat: null }))
        toast.success(res?.message)
      },
      err => {
        toast.error(err.message)
      }
    )
  }

  return (
    <div>
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        <div className='flex items-center'>
          <Avatar className='w-10 h-10 mr-3'>
            <AvatarImage src={thumbanil}></AvatarImage>
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div>
            <h2 className='font-semibold'>
              {selectedChat?.isGroup
                ? selectedChat?.name
                : one2oneMemebr?.username}
            </h2>
          </div>
        </div>
        <div className='flex space-x-2'>
          {selectedChat.isGroup ? (
            <DialogPopUp
              TriggerComponent={
                <Button variant='ghost' size='icon'>
                  <Info className='h-5 w-5' />
                </Button>
              }
              ContentCompnent={GroupChatDetail}
            />
          ) : (
            <DeleteAlertDialogDemo
              triggerButton={
                <Button variant={'destructive'} size='icon' disabled={loading}>
                  {loading ? (
                    <Loader2 className='animte-spin' />
                  ) : (
                    <Trash className='h-5 w-6' />
                  )}
                </Button>
              }
              handleSubmit={handleDeleteChat}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatAreaHeader