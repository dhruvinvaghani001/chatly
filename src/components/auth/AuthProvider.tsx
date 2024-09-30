import { useAuthContext } from '@/context/authSlice'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthProvider = ({ children, authentication }) => {
  const { status } = useAuthContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!status && authentication) {
      navigate('/login')
    } else if (!authentication && status) {
      navigate('/dashboard')
    } else {
      setLoading(false)
    }
  }, [status, authentication, navigate, loading])

  return (
    <>
      {loading ? (
        <div className='flex items-center justify-center h-screen'>
          <Loader2 className='animate-spin' />
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default AuthProvider
