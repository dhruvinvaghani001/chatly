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
import { DialogForm } from './DialogForm'
import { Loader2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logOut as storeLogout, useAuthContext } from '@/context/authSlice'
import { useNavigate } from 'react-router-dom'
import { encryptStorage } from '@/lib/storage'

const Sidebar = () => {
  const [loading, setLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const { width } = useWindowsize()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { chats, unreadMessages } = useChatContext()
  const { userData } = useAuthContext()

  //fetch all chats and  store to redux store
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
  }, [dispatch])

  // function to store unread messages to db to keep track if user logout
  const handleUnreadMessages = async () => {
    unreadMessages.forEach(async message => {
      if (!message?.fromDb) {
        requestHandler(
          async () =>
            await addunreadMessage({
              userId: userData._id,
              messageId: message._id,
              chatId: message.chat
            }),
          setLoggingOut,
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
      }
    })
  }

  // funnction to logout
  const handleLogout = async () => {
    await handleUnreadMessages()
    dispatch(storeLogout())
    navigate('/login')
    encryptStorage.clear()
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
                <DialogForm />
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
