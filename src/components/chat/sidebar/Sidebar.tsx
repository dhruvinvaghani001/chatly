import { ScrollArea } from '@radix-ui/react-scroll-area'
import React, { useEffect, useState } from 'react'

import MobileSidebar from '../MobileSidebar'
import useWindowsize from '@/hooks/useWindowsize'
import { requestHandler } from '@/lib/requestHandler'
import { setChats, useChatContext } from '@/context/chatSlice'
import toast from 'react-hot-toast'
import { getAllChats } from '@/api'
import { useDispatch } from 'react-redux'
import AllChats from './AllChats'
import { DialogForm } from './DialogForm'
import { Loader2 } from 'lucide-react'
import { Switch } from '@radix-ui/react-switch'

const Sidebar = () => {
  const { width } = useWindowsize()

  const [loading, setLoading] = useState(false)
  const { chats } = useChatContext()
  const dispatch = useDispatch()

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

  return (
    <>
      {width < 768 && <MobileSidebar chats={chats} />}
      {width >= 768 && (
        <div className='hidden md:flex md:w-80 flex-col border-r border-secondary'>
          <div className='p-4 border-b border-secondary flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Chats</h2>
            <div className='flex space-x-2'>
              <DialogForm />
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
