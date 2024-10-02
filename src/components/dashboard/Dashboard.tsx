import React, { useEffect, useState } from 'react'
import ChatInterface from './ChatInterface'
import { requestHandler } from '@/lib/requestHandler'
import { getAllChats, getUnreadMessages } from '@/api'
import { useDispatch } from 'react-redux'
import { setChats, setintialUnreadMessages } from '@/context/chatSlice'
import toast from 'react-hot-toast'
import useListenMessages from '@/hooks/useListenMessages'
import useListenChat from '@/hooks/useListenChat'

const Dashboard = () => {
  const [loading, setLoading] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    requestHandler(
      async () => await getUnreadMessages(),
      setLoading,
      res => {
        console.log(res)
        const { data } = res
        const dataTostore = data.map(message => {
          return { ...message, fromDb: true }
        })
        dispatch(setintialUnreadMessages({ messages: dataTostore }))
      },
      err => {
        toast.error(err)
      }
    )
  }, [])

  return (
    <>
      <ChatInterface />
    </>
  )
}

export default Dashboard
