import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignupForm from './components/Auth/SignupForm'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ReactNode } from 'react'
import Home from './pages/Home'
import { ModeToggle } from './components/ui/mode-toggle'

function AuthThemButtonLayout ({ children }: { children: ReactNode }) {
  return (
    <>
      <>{children}</>
      <ModeToggle className='bottom-8 right-4  fixed md:bottom-20 md:right-20'></ModeToggle>
    </>
  )
}

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      index: true,
      element: (
        <>
          <Home />
        </>
      )
    },
    {
      path: '/login',
      element: (
        <AuthThemButtonLayout>
          <Login />
        </AuthThemButtonLayout>
      )
    },
    {
      path: '/signup',
      element: (
        <AuthThemButtonLayout>
          <Signup />
        </AuthThemButtonLayout>
      )
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
