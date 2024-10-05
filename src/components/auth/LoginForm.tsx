import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { requestHandler } from '@/lib/requestHandler'
import { login } from '@/api'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as StoreLogin } from '@/context/authSlice'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // to make api call for login
  async function onSubmit (values: z.infer<typeof formSchema>) {
    try {
      await requestHandler(
        async () => await login(values),
        setLoading,
        res => {
          // console.log(res)
          if (res.success) {
            dispatch(StoreLogin({ user: res.data }))
            toast.success(res.message)
            navigate('/dashboard')
          }
        },
        err => {
          toast.error(err)
        }
      )
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder='jhondoe@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder='password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={loading}>
          {loading ? <Loader2 className='animate-spin' /> : 'Login'}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
