import LoginForm from '@/components/auth/LoginForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='h-[90vh] flex items-center px-2 md:px-0'>
      <div className='max-w-sm  mx-auto'>
        <Card className=''>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Welcome back! Sign in to continue where you left off.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm></LoginForm>
          </CardContent>
          <CardFooter>
            Don&apos;t have an account? &nbsp;
            <Link to='/signup' className='text-blue-700 underline'>
              Sign up here!
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login
