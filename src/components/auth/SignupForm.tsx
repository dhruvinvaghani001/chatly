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
import toast from 'react-hot-toast'
import { requestHandler } from '@/lib/requestHandler'
import { signUp } from '@/api'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const formSchema = z
  .object({
    username: z.string().min(2),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 charcters long.' }),
    confirmpassword: z.string()
  })
  .refine(data => data.password === data.confirmpassword, {
    message: 'Password should be match.',
    path: ['confirmpassword']
  })

const SignupForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  // api call more signup
  async function onSubmit (values: z.infer<typeof formSchema>) {
    try {
      await requestHandler(
        async () => await signUp(values),
        setLoading,
        res => {
          console.log(res)
          if (res.success) {
            toast.success(res.message)
            navigate('/login')
          }
        },
        err => {
          toast.error(err)
        }
      )
    } catch (error) {
      toast.error(error?.message)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='jhondoe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder='jhondoe001@gmail.com' {...field} />
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
        <FormField
          control={form.control}
          name='confirmpassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input placeholder='password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={loading}>
          {loading ? <Loader2 className='animate-spin' /> : 'Sign up'}
        </Button>
      </form>
    </Form>
  )
}

export default SignupForm
