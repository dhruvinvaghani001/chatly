import { createGroup, createOneToOneChat, searchAvailableUser } from '@/api'
import { requestHandler } from '@/lib/requestHandler'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Combobox } from '../../ui/Combobox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { addChat, setSelectedChat } from '@/context/chatSlice'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form
} from '@/components/ui/form'

import { MultiSelectCombobox } from '../../ui/MultiSelectCombobox'
import { Input } from '@/components/ui/input'

const groupSchema = z.object({
  name: z.string().min(3, 'Minimum 3 charcterlong group name'),
  members: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(2, 'Please select minimum 2  memeber to create group')
    .max(120, 'You cannot form group more than 120 people!')
})

const AddChatForm = ({ open, setIsOpen }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [isSubmitting, setIssubmitting] = useState(false)
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: '',
      members: []
    }
  })

  useEffect(() => {
    requestHandler(
      async () => await searchAvailableUser(),
      setLoading,
      res => {
        const { data } = res
        const availabelUser = data.map(usr => {
          return { value: usr._id, label: usr.username }
        })
        setUsers(availabelUser)
      },
      err => {
        toast.error(err)
      }
    )
  }, [])

  const createOne2OneChat = async e => {
    e.preventDefault()
    if (!selectedUser) {
      toast.error('Please Select user')
      return
    } else {
      await requestHandler(
        async () => createOneToOneChat(selectedUser),
        setIssubmitting,
        res => {
          const { data } = res
          if (res.stausCode == 201) {
            console.log('hello')
            dispatch(addChat({ chat: data }))
            setIsOpen(false)
            toast.success(res.message)
          } else {
            dispatch(setSelectedChat({ chat: data }))
            setIsOpen(false)
            toast.success(res.message)
          }
        },
        err => {
          toast.error(err?.message || 'Something went wrong!')
          setIsOpen(false)
        }
      )
    }
  }

  const createGroupChat = async (values: z.infer<typeof groupSchema>) => {
    const members = values?.members.map(iteam => iteam.value)
    const data = {
      name: values?.name,
      members: members
    }
    requestHandler(
      async () => await createGroup(data),
      setIssubmitting,
      res => {
        const { data } = res
        dispatch(addChat({ chat: data }))
        dispatch(setSelectedChat({ chat: data }))
        setIsOpen(false)
        toast.success(res.message)
      },
      err => {
        toast.error(err?.message || 'Something Went Wrong!')
      }
    )
  }

  return (
    <Tabs defaultValue='one2one' className='w-full max-w-[450px] mt-4'>
      <TabsList className='grid w-full grid-cols-2 mb-4'>
        <TabsTrigger
          value='one2one'
          className='data-[state=active]:bg-muted-foreground rounded-lg'
        >
          one to one
        </TabsTrigger>
        <TabsTrigger
          value='group'
          className='data-[state=active]:bg-muted-foreground rounded-lg'
        >
          group chat
        </TabsTrigger>
      </TabsList>
      <TabsContent value='one2one'>
        <Card className='border-none'>
          <CardHeader>
            <CardTitle>One To One Chat</CardTitle>
            <CardDescription>Select User and start chat now.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Combobox
              options={users}
              setValue={setSelectedUser}
              value={selectedUser}
              loading={loading}
            ></Combobox>
          </CardContent>
          <CardFooter>
            <Button onClick={createOne2OneChat} disabled={isSubmitting}>
              Start
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value='group'>
        <Card className='border-none'>
          <CardHeader>
            <CardTitle>Group Chat</CardTitle>
            <CardDescription>
              select users and start group discussion.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(createGroupChat)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Group name' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='members'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Group Members</FormLabel>
                      <FormControl>
                        <MultiSelectCombobox
                          users={users}
                          selectedUser={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className='animate-spin'></Loader2>
                  ) : (
                    'Start'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AddChatForm
