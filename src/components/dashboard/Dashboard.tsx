import { LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { logOut as storeLogout } from '@/context/authSlice'
import { encryptStorage } from '@/lib/storage'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div>
      <Button
        className='px-2 py-4 text-xl bg-violet-600 rounded-full'
        onClick={() => {
          dispatch(storeLogout())
          encryptStorage.clear()
          navigate('/')
        }}
      >
        <LogOut />
      </Button>
    </div>
  )
}

export default Dashboard
