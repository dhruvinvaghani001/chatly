import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/authSlice'
import { useChatContext } from '@/context/chatSlice'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge, MinusCircle } from 'lucide-react'
import React from 'react'
import Member from './Member'

const GroupMembers = () => {
  const { selectedChat } = useChatContext()
  const members = selectedChat.members

  return (
    <div>
      {members.map(member => (
        <Member key={member._id} member={member} />
      ))}
    </div>
  )
}

export default GroupMembers
