import { addMemberInGroup, searchAvailableUser } from '@/api'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { MultiSelectCombobox } from '@/components/ui/MultiSelectCombobox'
import { setSelectedChat } from '@/context/chatSlice'
import { requestHandler } from '@/lib/requestHandler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

const formSchema = z.object({
  members: z.array(z.object({ value: z.string(), label: z.string() })).min(1)
})

const AddMembers = ({ memberIds, chatId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: []
    }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    requestHandler(
      async () => await searchAvailableUser(),
      setLoading,
      res => {
        const { data } = res
        const users = data.map(usr => {
          return { value: usr._id, label: usr.username }
        })
        const availableUsers = users.filter(
          usr => !memberIds.includes(usr.value)
        )
        setUsers(availableUsers)
      },
      err => {
        toast.error(err)
      }
    )
  }, [memberIds])

  const addMembers = (values: z.infer<typeof formSchema>) => {
    const membersId = values.members.map(item => item.value)
    const data = {
      memberIds: membersId
    }
    requestHandler(
      async () => await addMemberInGroup({ chatId: chatId, data: data }),
      setIsSubmitting,
      res => {
        dispatch(setSelectedChat({ chat: res.data }))
        form.reset()
        toast.success(res.message)
      },
      err => {
        toast.error(err?.message)
      }
    )
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addMembers)} className='space-y-8'>
          <FormField
            control={form.control}
            name='members'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Group Members</FormLabel>
                <FormControl>
                  {loading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    <MultiSelectCombobox
                      users={users}
                      selectedUser={field.value}
                      onChange={field.onChange}
                    />
                  )}
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className='animate-spin'></Loader2>
            ) : (
              'Add Member'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AddMembers
