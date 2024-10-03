import { ScrollArea } from '@radix-ui/react-scroll-area'
import React, { useEffect, useState } from 'react'

import MobileSidebar from './MobileSidebar'
import useWindowsize from '@/hooks/useWindowsize'
import { requestHandler } from '@/lib/requestHandler'
import { setChats, useChatContext } from '@/context/chatSlice'
import toast from 'react-hot-toast'
import { addunreadMessage, getAllChats } from '@/api'
import { useDispatch } from 'react-redux'
import AllChats from './AllChats'
import { Loader2, LogOut, PenSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logOut as storeLogout, useAuthContext } from '@/context/authSlice'
import { useNavigate } from 'react-router-dom'
import { encryptStorage } from '@/lib/storage'
import DialogPopUp from '@/components/ui/dialog-popup'
import AddChatForm from './AddChatForm'
import useListenChat from '@/hooks/useListenChat'
import { EncryptStorage } from 'encrypt-storage'
import useListenMessages from '@/hooks/useListenMessages'

const Sidebar = () => {
  console.log('side bar')
  const [loading, setLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const { width } = useWindowsize()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { chats, unreadMessages } = useChatContext()
  const { userData } = useAuthContext()

  console.log(chats)

  useEffect(() => {
    requestHandler(
      async () => await getAllChats(),
      setLoading,
      res => {
        const { data } = res
        console.log(res)
        dispatch(setChats({ chat: data }))
      },
      err => {
        toast.error(err)
      }
    )
  }, [])

  // function to store unread messages to db to keep track if user logout
  const handleUnreadMessages = async () => {
    const mapi = new Map()
    unreadMessages.forEach(message => {
      if (!message.fromDb) {
        if (!mapi.has(message.chat)) {
          mapi.set(message.chat, [message._id])
        }
        mapi.get(message.chat).push(message._id)
      }
    })

    const result = []

    mapi.forEach((messageIds, chatId) => {
      const uniqueMessageIds = [...new Set(messageIds)]
      result.push({
        chatId: chatId,
        messageIds: uniqueMessageIds
      })
    })

    console.log(result)

    const data = {
      values: result,
      userId: userData._id
    }
    console.log(data)
    requestHandler(
      async () => await addunreadMessage({ data }),
      setLoggingOut,
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  // funnction to logout
  const handleLogout = async e => {
    await handleUnreadMessages()
    dispatch(storeLogout())
    encryptStorage.clear()
    navigate('/login')
    setTimeout(() => {
      navigate(0)
    }, 0)
  }

  return (
    <>
      {width < 768 && <MobileSidebar chats={chats} />}
      {width >= 768 && (
        <div className='hidden md:flex md:w-80 flex-col  border-r border-muted-foreground'>
          <div className='p-4 border-b  border-muted-foreground flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Chats</h2>
            <div className='flex items-center'>
              <div className='flex space-x-2'>
                <DialogPopUp
                  TriggerComponent={
                    <Button variant='ghost' size='icon'>
                      <PenSquare className='h-5 w-5' />
                    </Button>
                  }
                  ContentCompnent={AddChatForm}
                />
              </div>
              <Button
                variant={'ghost'}
                className='py-2 px-2.5 ml-2'
                onClick={handleLogout}
              >
                {!loggingOut ? (
                  <LogOut className='w-5'></LogOut>
                ) : (
                  <Loader2 className='animate-spin w-5 ml-1' />
                )}
              </Button>
            </div>
          </div>

          <ScrollArea className='flex-1'>
            {loading ? (
              <div className='flex justify-center mt-4'>
                <Loader2 className='animate-spin flex' />
              </div>
            ) : (
              <AllChats chats={chats} />
            )}
          </ScrollArea>
        </div>
      )}
    </>
  )
}

export default Sidebar
