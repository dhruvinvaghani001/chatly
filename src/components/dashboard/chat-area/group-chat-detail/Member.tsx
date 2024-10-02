import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/authSlice'
import { setSelectedChat, useChatContext } from '@/context/chatSlice'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Loader2, MinusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { requestHandler } from '@/lib/requestHandler'
import { removeMemberFromGroup } from '@/api'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const Member = ({ member }) => {
  const { selectedChat } = useChatContext()
  const { userData } = useAuthContext()
  const [loading, setLoading] = useState()
  const dispatch = useDispatch()

  const handleRemoveMember = () => {
    requestHandler(
      async () =>
        await removeMemberFromGroup({
          chatId: selectedChat?._id,
          memberId: member._id
        }),
      setLoading,
      res => {
        console.log(res)
        dispatch(setSelectedChat({ chat: res.data }))
        toast.success(res.message)
      },
      err => {
        toast.error(err?.message)
      }
    )
  }

  return (
    <>
      <div className='flex items-center justify-between mt-2'>
        <div className='flex items-center'>
          <Avatar>
            <AvatarImage
              className='w-12 h-12 '
              src={member.avatar}
              alt={member.username}
            />
          </Avatar>
          {member.username}
          <div className='ml-2'>
            {member._id == selectedChat.admin && <Badge>Admin</Badge>}
          </div>
          <div className='ml-2'>
            {member?._id == userData._id && <Badge>You</Badge>}{' '}
          </div>
        </div>
        {userData._id == selectedChat.admin && member._id != userData._id && (
          <div>
            <Button
              variant={'ghost'}
              size={'default'}
              onClick={handleRemoveMember}
              disabled={loading}
            >
              Remove
              {loading ? (
                <Loader2 className='animate-spin ml-2' />
              ) : (
                <MinusCircle className='w-5 ml-2 text-destructive'></MinusCircle>
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default Member
