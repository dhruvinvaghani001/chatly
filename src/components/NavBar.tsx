import React from 'react'
import { ModeToggle } from './ui/mode-toggle'
import { Logo } from '@/assets'
import { useAuthContext } from '@/context/authSlice'

const NavBar = () => {
  const { status } = useAuthContext()

  return (
    <nav className='bg-muted p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <img src={Logo} alt='Logo' />
        </div>
        <div className='flex items-center'>
          <div className='space-x-4'>
            <a href='/dashboard' className='text-card-foreground'>
              Dashboard
            </a>
            {!status && (
              <>
                <a
                  href='/signup'
                  className='hidden md:inline font-sans text-card-foreground'
                >
                  SignUp
                </a>
                <a href='/login' className='hidden md:inline'>
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
