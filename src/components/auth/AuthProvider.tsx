import { useAuthContext } from '@/context/authSlice'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthProvider = ({ children, authentication }) => {
  const { status } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!status && authentication) {
      navigate('/login')
    } else if (!authentication && status) {
      navigate('/dashboard')
    }
  }, [status, authentication, navigate])

  return <>{children}</>
}

export default AuthProvider
