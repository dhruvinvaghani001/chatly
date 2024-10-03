import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useAuthContext } from '@/context/authSlice'
import { setSelectedChat, useChatContext } from '@/context/chatSlice'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Loader2, Minus, MinusCircle, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import React, { useEffect, useState } from 'react'
import GroupMembers from './GroupMembers'
import { MultiSelectCombobox } from '@/components/ui/MultiSelectCombobox'
import AddMembers from './AddMembers'
import useListenChat from '@/hooks/useListenChat'
import { DeleteAlertDialogDemo } from '@/components/ui/delete-alert-dialog'
import { requestHandler } from '@/lib/requestHandler'
import { deleteChats } from '@/api'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const GroupChatDetail = ({ open, setIsOpen }) => {
  const { selectedChat } = useChatContext()
  const { userData } = useAuthContext()
  const [loading, setLoading] = useState()
  const dispatch = useDispatch()

  const isGroupChat = selectedChat.isGroup
  const oneToOneChatMemeber = selectedChat.members.filter(
    item => item.username != userData.username
  )[0]

  const members = selectedChat?.members
  const memberIds = members.map(member => member._id)
  const isAdmin = selectedChat.admin == userData._id

  const handleDeleteChat = () => {
    requestHandler(
      async () => await deleteChats({ type: true, chatId: selectedChat?._id }),
      setLoading,
      res => {
        dispatch(setSelectedChat({ chat: null }))
        toast.success(res.message)
      },
      err => {
        toast.error(err)
      }
    )
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>{selectedChat.name}</DialogTitle>
        <DialogDescription>Group Chat</DialogDescription>
      </DialogHeader>
      <div>
        <GroupMembers />
        {isAdmin && (
          <div className='mt-4'>
            <AddMembers memberIds={memberIds} chatId={selectedChat._id} />
          </div>
        )}
        {isAdmin && (
          <div className='mt-4'>
            <DeleteAlertDialogDemo
              triggerButton={
                <Button
                  variant={'destructive'}
                  className='w-full flex justify-center items-center'
                  disabled={loading}
                >
                  Delete Chat
                  {loading ? (
                    <Loader2 className='animate-spin ml-1' />
                  ) : (
                    <Trash className='w-5 ml-2' />
                  )}
                </Button>
              }
              loading={loading}
              handleSubmit={handleDeleteChat}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default GroupChatDetail
